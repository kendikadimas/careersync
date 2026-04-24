<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class GeminiService
{
    private array $models = [
        'gemini-2.5-flash',         
        'gemini-2.5-flash-lite',    
        'gemini-flash-latest',      
        'gemini-1.5-flash',         
    ];

    private function callGeminiApi(string $prompt): string
    {
        $apiKey = config('gemini.api_key');
        $lastException = null;

        foreach ($this->models as $model) {
            $url = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key={$apiKey}";
            try {
                $response = Http::withoutVerifying()->timeout(100)->post($url, [
                    'contents' => [['parts' => [['text' => $prompt]]]]
                ]);

                if ($response->status() === 404 || $response->status() === 403 || $response->status() === 503 || $this->isOverloadedError($response)) {
                    $lastException = new \Exception("Gemini API Error ({$model}): " . ($response->json('error.message') ?? $response->body()));
                    continue; 
                }

                if ($response->failed()) throw new \Exception("Gemini API Error [{$model}]: " . ($response->json('error.message') ?? $response->body()));

                $data = $response->json();
                $text = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;
                if (!$text) throw new \Exception("Gemini [{$model}] no content.");
                return $text;
            } catch (\Exception $e) { $lastException = $e; }
        }
        throw new \Exception($lastException ? $lastException->getMessage() : "AI Busy");
    }

    private function isOverloadedError(?\Illuminate\Http\Client\Response $response = null, string $errorMessage = ''): bool
    {
        if ($response !== null) {
            $body = strtolower($response->body());
            if (str_contains($body, 'high demand') || str_contains($body, 'overloaded') || $response->status() === 503 || $response->status() === 429) return true;
        }
        if ($errorMessage) {
            $lower = strtolower($errorMessage);
            return str_contains($lower, 'high demand') || str_contains($lower, 'overloaded') || str_contains($lower, 'not found') || str_contains($lower, 'not supported');
        }
        return false;
    }

    private function cleanJson(string $text): string
    {
        $text = preg_replace('/```(?:json)?\n?|\n?```/', '', $text);
        $firstBrace = strpos($text, '{');
        $firstBracket = strpos($text, '[');
        $start = false;
        if ($firstBrace !== false && ($firstBracket === false || $firstBrace < $firstBracket)) {
            $start = $firstBrace;
            $end = strrpos($text, '}');
        } elseif ($firstBracket !== false) {
            $start = $firstBracket;
            $end = strrpos($text, ']');
        }
        if ($start !== false && $end !== false) $text = substr($text, $start, $end - $start + 1);
        return trim($text);
    }

    private function safeJsonDecode(string $text): array
    {
        $cleaned = $this->cleanJson($text);
        $decoded = json_decode($cleaned, true);
        if (json_last_error() !== JSON_ERROR_NONE) return [];
        return $decoded ?: [];
    }

    public function generateRoadmapStructure(array $data, bool $forceRefresh = false): array
    {
        $cacheKey = 'gemini_roadmap_struct_v5_' . md5(json_encode($data));
        if ($forceRefresh) Cache::forget($cacheKey);

        return Cache::remember($cacheKey, now()->addHours(6), function () use ($data) {
            $careerTarget   = is_array($data['career_target']) ? implode(', ', $data['career_target']) : $data['career_target'];
            $existingSkills = implode(', ', array_map(fn($s) => $s['name'], $data['existing_skills'] ?? []));
            $skillGaps      = implode(', ', array_map(fn($s) => $s['skill'] ?? $s, $data['skill_gaps'] ?? []));

            $prompt = "Spesialis Kurikulum IT Indonesia. Buat roadmap '{$careerTarget}'.
            WAJIB INDONESIA.
            Gaps: [{$skillGaps}].
            JSON: { \"total_duration_weeks\": 12, \"milestones\": [{ \"id\": \"ms-1\", \"title\": \"Indo\", \"emoji\": \"🎯\", \"duration_weeks\": 2, \"skill_gaps_addressed\": [\"Skill\"] }] }";

            try {
                $text = $this->callGeminiApi($prompt);
                $result = $this->safeJsonDecode($text);
                if (!empty($result['milestones'])) $result['milestones'][0]['status'] = 'current';
                return $result;
            } catch (\Exception $e) { throw $e; }
        });
    }

    public function generateMilestoneDetails(string $careerTarget, array $milestone): array
    {
        $cacheKey = 'gemini_ms_detail_v6_' . md5($careerTarget . "_" . $milestone['id']);
        
        return Cache::remember($cacheKey, now()->addDays(7), function () use ($careerTarget, $milestone) {
            $gaps = implode(', ', $milestone['skill_gaps_addressed'] ?? ['General Skills']);
            $prompt = "Detail materi milestone '{$milestone['title']}' (Gap: {$gaps}).
            PENTING: Jangan berikan video YouTube spesifik jika tidak yakin ID videonya aktif.
            Berikan field 'search_query' agar sistem bisa mencari video terbaru.
            
            Format JSON (Bahasa Indonesia):
            {
               \"why_important\": \"Alasan\",
               \"skills\": [\"skill\"],
               \"capstone_project\": { \"title\": \"Judul\", \"description\": \"Deskripsi\", \"tech_used\": [\"tech\"] },
               \"suggested_search\": \"Belajar {$milestone['title']} Bahasa Indonesia\"
            }";

            try {
                $text = $this->callGeminiApi($prompt);
                $details = $this->safeJsonDecode($text);
                
                // Construct the resource based on the search query for 100% reliability
                $query = $details['suggested_search'] ?? ("Tutorial " . $milestone['title'] . " Bahasa Indonesia");
                $details['resources'] = [
                    [
                        'title' => "Tonton Tutorial Pilihan (YouTube)",
                        'url' => "https://www.youtube.com/results?search_query=" . urlencode($query),
                        'type' => 'youtube',
                        'is_free' => true
                    ],
                    [
                        'title' => "Materi: " . $milestone['title'] . " (Web Programming UNPAS)",
                        'url' => "https://www.youtube.com/results?search_query=" . urlencode("Sandhika Galih " . $milestone['title']),
                        'type' => 'youtube',
                        'is_free' => true
                    ]
                ];

                return $details;
            } catch (\Exception $e) { return ['why_important' => 'Gagal memuat detail.', 'resources' => []]; }
        });
    }

    public function parseCV(string $cvText, array|string $careerTarget): array
    {
        $careerTargetText = is_array($careerTarget) ? implode(', ', $careerTarget) : $careerTarget;
        $prompt = "Extract CV JSON: {$cvText}.";
        try {
            $text = $this->callGeminiApi($prompt);
            return $this->safeJsonDecode($text);
        } catch (\Exception $e) { return []; }
    }

    public function extractSkillsFromText(string $text): array
    {
        $prompt = "Extract Skills JSON: {$text}.";
        try {
            $raw = $this->callGeminiApi($prompt);
            return $this->safeJsonDecode($raw);
        } catch (\Exception $e) { return []; }
    }
}
