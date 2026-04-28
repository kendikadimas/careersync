<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

/**
 * GEMINI SERVICE DEBUG VERSION 1.1
 */
class GeminiService
{
    private function parseCvFallback(string $cvText): array
    {
        $lowerText = strtolower($cvText);

        $skillKeywords = [
            'php', 'laravel', 'javascript', 'typescript', 'react', 'next.js', 'vue', 'node.js',
            'mysql', 'postgresql', 'mongodb', 'redis', 'docker', 'git', 'tailwind', 'html',
            'css', 'rest api', 'graphql', 'python', 'java', 'c#', 'aws', 'gcp', 'figma',
        ];

        $skills = [];
        foreach ($skillKeywords as $keyword) {
            if (str_contains($lowerText, $keyword)) {
                $skills[] = [
                    'name' => strtoupper($keyword) === $keyword ? $keyword : ucwords($keyword),
                    'level' => 'intermediate',
                    'category' => 'tech',
                ];
            }
        }

        if (empty($skills)) {
            $skills[] = [
                'name' => 'Web Development',
                'level' => 'beginner',
                'category' => 'tech',
            ];
        }

        $education = [
            'degree' => 'Tidak terdeteksi',
            'major' => 'Tidak terdeteksi',
            'university' => 'Tidak terdeteksi',
        ];

        if (preg_match('/(s1|s2|s3|d3|d4|bachelor|master|sarjana)/i', $cvText, $degreeMatch)) {
            $education['degree'] = strtoupper($degreeMatch[1]);
        }

        if (preg_match('/(universitas\s+[a-z0-9\s\-\.]+|university\s+of\s+[a-z0-9\s\-\.]+)/i', $cvText, $uniMatch)) {
            $education['university'] = trim($uniMatch[1]);
        }

        $experiences = [];
        $lines = preg_split('/\r\n|\r|\n/', $cvText) ?: [];
        foreach ($lines as $line) {
            $trimmed = trim($line);
            if ($trimmed === '') {
                continue;
            }

            if (preg_match('/(developer|engineer|intern|programmer|frontend|backend|fullstack|software)/i', $trimmed)) {
                $experiences[] = [
                    'title' => substr($trimmed, 0, 60),
                    'company' => 'Tidak terdeteksi',
                    'duration' => 'Tidak terdeteksi',
                    'description' => substr($trimmed, 0, 120),
                ];
            }

            if (count($experiences) >= 3) {
                break;
            }
        }

        if (empty($experiences)) {
            $experiences[] = [
                'title' => 'Pengalaman belum terdeteksi',
                'company' => 'Tidak terdeteksi',
                'duration' => 'Tidak terdeteksi',
                'description' => 'Parser lokal aktif karena layanan AI sedang tidak tersedia.',
            ];
        }

        return [
            'skills' => $skills,
            'experiences' => $experiences,
            'education' => $education,
        ];
    }

    private function resolveModels(): array
    {
        $primaryModel = (string) config('gemini.model', 'gemini-2.0-flash');
        $fallbackModels = config('gemini.fallback_models', [
            'gemini-2.0-flash-lite',
            'gemini-flash-latest',
            'gemini-flash-lite-latest',
            'gemini-2.5-flash',
        ]);

        if (is_string($fallbackModels)) {
            $fallbackModels = array_map('trim', explode(',', $fallbackModels));
        }

        $models = array_values(array_filter(array_unique(array_merge([$primaryModel], $fallbackModels))));

        return $models ?: ['gemini-2.0-flash'];
    }

    private function callGeminiApi(string $prompt): string
    {
        $apiKey = config('gemini.api_key');
        if (!$apiKey) {
            $apiKey = env('GEMINI_API_KEY');
        }

        if (!$apiKey) {
            throw new \Exception('GEMINI_API_KEY_MISSING: GEMINI_API_KEY belum di-set di .env');
        }

        $models = $this->resolveModels();
        $errors = [];
        
        foreach ($models as $modelName) {
            $url = "https://generativelanguage.googleapis.com/v1beta/models/{$modelName}:generateContent?key={$apiKey}";
            
            try {
                $response = Http::withoutVerifying()
                    ->timeout(30)
                    ->post($url, [
                        'contents' => [
                            [
                                'parts' => [
                                    ['text' => $prompt]
                                ]
                            ]
                        ]
                    ]);

                if ($response->successful()) {
                    $text = $response->json('candidates.0.content.parts.0.text');
                    if ($text) {
                        Log::info("Gemini [{$modelName}] SUCCESS.");
                        return $text;
                    }
                }
                
                $status = $response->status();
                $errMsg = $response->json('error.message') ?? $response->body();
                $errors[] = [
                    'model' => $modelName,
                    'status' => $status,
                    'message' => $errMsg,
                ];
                Log::warning("Gemini [{$modelName}] failed: " . $errMsg);
            } catch (\Exception $e) {
                $errors[] = [
                    'model' => $modelName,
                    'status' => 0,
                    'message' => $e->getMessage(),
                ];
                Log::error("Exception [{$modelName}]: " . $e->getMessage());
            }
        }

        $quotaExceeded = false;
        $authFailed = false;

        foreach ($errors as $error) {
            $msg = strtolower((string) ($error['message'] ?? ''));
            $status = (int) ($error['status'] ?? 0);

            if ($status === 429 || str_contains($msg, 'quota') || str_contains($msg, 'resource_exhausted')) {
                $quotaExceeded = true;
            }

            if ($status === 401 || $status === 403 || str_contains($msg, 'api key not valid') || str_contains($msg, 'permission denied')) {
                $authFailed = true;
            }
        }

        if ($quotaExceeded) {
            throw new \Exception('GEMINI_QUOTA_EXCEEDED: Kuota Gemini sedang habis. Coba lagi beberapa menit, gunakan API key lain, atau upgrade billing Google AI Studio.');
        }

        if ($authFailed) {
            throw new \Exception('GEMINI_AUTH_FAILED: API key Gemini tidak valid atau tidak punya izin untuk model yang dipakai.');
        }

        throw new \Exception("GEMINI_ALL_MODELS_FAILED: Periksa koneksi internet atau API Key. Cek storage/logs/laravel.log untuk detail.");
    }

    private function cleanJson(string $text): string
    {
        $text = preg_replace('/```(?:json)?\n?/', '', $text);
        $text = preg_replace('/\n?```/', '', $text);
        
        $firstBrace = strpos($text, '{');
        $lastBrace = strrpos($text, '}');
        
        if ($firstBrace !== false && $lastBrace !== false) {
            $text = substr($text, $firstBrace, $lastBrace - $firstBrace + 1);
        }
        
        return trim($text);
    }

    public function parseCV(string $cvText, array|string $careerTarget): array
    {
        $target = is_array($careerTarget) ? implode(', ', $careerTarget) : $careerTarget;
        $cacheKey = 'gemini_parse_cv_v2_' . md5($cvText . '|' . $target);

        $cached = Cache::get($cacheKey);
        if (is_array($cached) && !empty($cached)) {
            return $cached;
        }
        
        $prompt = <<<PROMPT
Return ONLY a valid JSON object. No narrative. 
CV: {$cvText}
Target: {$target}

JSON Structure:
{
  "skills": [{"name": "Skill Name", "level": "beginner|intermediate|expert", "category": "tech"}],
  "experiences": [{"title": "Role", "company": "Co", "duration": "Time", "description": "Desc"}],
  "education": {"degree": "Deg", "major": "Maj", "university": "Uni"}
}
PROMPT;

        try {
            $text = $this->callGeminiApi($prompt);
            Log::info("Gemini Response Raw: " . substr($text, 0, 100) . "...");
            
            $cleaned = $this->cleanJson($text);
            $data = json_decode($cleaned, true);
            
            if (json_last_error() !== JSON_ERROR_NONE) {
                Log::error("JSON Decode Error: " . json_last_error_msg());
                throw new \Exception("AI_RETURNED_INVALID_JSON");
            }

            $result = $data ?: [];
            if (!empty($result)) {
                Cache::put($cacheKey, $result, now()->addHours(24));
            }

            return $result;
        } catch (\Exception $e) {
            Log::error("parseCV Final Error: " . $e->getMessage());

            // Fallback parser lokal agar alur analisis CV tetap berjalan saat API bermasalah.
            if (
                str_contains($e->getMessage(), 'GEMINI_QUOTA_EXCEEDED') ||
                str_contains($e->getMessage(), 'GEMINI_AUTH_FAILED') ||
                str_contains($e->getMessage(), 'GEMINI_ALL_MODELS_FAILED') ||
                str_contains($e->getMessage(), 'AI_RETURNED_INVALID_JSON')
            ) {
                Log::warning('Gemini unavailable. Using local fallback parser for CV analysis.');
                $fallback = $this->parseCvFallback($cvText);
                Cache::put($cacheKey, $fallback, now()->addMinutes(10));
                return $fallback;
            }

            throw $e;
        }
    }

    // Stub placeholders
    public function generateRoadmapStructure($d,$f=false) { return ['total_duration_weeks'=>12,'milestones'=>[]]; }
    public function generateInsights($u) { return []; }
    public function analyzeJobMatch($u,$j) { return 70; }
    public function batchAnalyzeJobMatches($u,$j) { return []; }
    public function generateCareerPaths(array $skills): array 
    {
        $skillList = implode(', ', array_column($skills, 'name'));
        $prompt = "Berdasarkan skill ini: [{$skillList}], rekomendasikan 3 jalur karir alternatif. Kembalikan HANYA JSON array dari objek: [{\"title\":\"...\", \"description\":\"...\", \"match_percentage\":85, \"required_skills\":[\"...\", \"...\"]}]";
        
        try {
            $text = $this->callGeminiApi($prompt);
            $cleaned = $this->cleanJson($text);
            return json_decode($cleaned, true) ?: [];
        } catch (\Exception $e) {
            return [
                ['title' => 'Software Engineer', 'description' => 'Membangun aplikasi web dan mobile.', 'match_percentage' => 85, 'required_skills' => ['Logic', 'Problem Solving']],
                ['title' => 'System Analyst', 'description' => 'Menganalisis sistem dan workflow bisnis.', 'match_percentage' => 75, 'required_skills' => ['Analytical', 'Communication']]
            ];
        }
    }

    public function generateCvOptimization(string $cvText, array $skillGaps): string 
    {
        $gaps = implode(', ', array_column($skillGaps, 'skill'));
        $prompt = "CV Text: " . substr($cvText, 0, 2000) . "\nGap Skills: {$gaps}. Berikan SATU kalimat saran optimasi CV yang sangat kuat dan spesifik agar lebih menonjol di mata rekruter untuk skill gap tersebut. Kembalikan teks saja.";
        
        try {
            return $this->callGeminiApi($prompt);
        } catch (\Exception $e) {
            return "Tambahkan proyek nyata yang menggunakan skill {$gaps} untuk menunjukkan bukti penguasaan teknismu kepada rekruter.";
        }
    }

    public function generateMarketResearch($t) { return []; }
}
