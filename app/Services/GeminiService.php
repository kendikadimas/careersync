<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    private string $model = 'gemini-2.5-flash';

    public function parseCV(string $cvText, string $careerTarget): array
    {
        $apiKey = config('gemini.api_key');
        $url = "https://generativelanguage.googleapis.com/v1/models/{$this->model}:generateContent?key={$apiKey}";

        $prompt = <<<PROMPT
Kamu adalah career analyst ahli teknologi Indonesia.
Analisis CV berikut dan ekstrak informasi dalam format JSON.

CV:
{$cvText}

Target Karir: {$careerTarget}

Kembalikan HANYA JSON valid tanpa markdown backtick, tanpa penjelasan apapun. Struktur:
{
  "name": "string",
  "education": {
    "degree": "string (S1/D3/SMA/dll)",
    "major": "string",
    "university": "string",
    "gpa": number atau null
  },
  "skills": [
    {
      "name": "string",
      "level": "expert|intermediate|beginner",
      "category": "frontend|backend|data|design|devops|mobile|soft"
    }
  ],
  "experiences": [
    {
      "type": "internship|project|organization|freelance|fulltime",
      "title": "string",
      "company": "string atau null",
      "duration_months": number,
      "skills_used": ["string"],
      "description": "string singkat"
    }
  ],
  "summary": "string 2 kalimat tentang profil kandidat"
}
PROMPT;

        try {
            $response = Http::withoutVerifying()->timeout(30)->post($url, [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ]
            ]);

            if ($response->failed()) {
                $errorMsg = 'Gemini API Error: ' . ($response->json('error.message') ?? $response->body());
                Log::error($errorMsg);
                throw new \Exception($errorMsg);
            }

            $data = $response->json();
            $text = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;

            if (!$text) {
                throw new \Exception('Gemini did not return any content. Response: ' . json_encode($data));
            }

            // Clean JSON
            $text = trim($text);
            $text = preg_replace('/```json\n?|\n?```/', '', $text);
            $text = trim($text);

            $result = json_decode($text, true);
            
            if (json_last_error() !== JSON_ERROR_NONE) {
                Log::error('Gemini JSON Decode Error: ' . json_last_error_msg() . ' | Raw: ' . $text);
                throw new \Exception('Failed to parse AI response: ' . json_last_error_msg());
            }

            return $result ?? [];
        } catch (\Exception $e) {
            Log::error('Gemini parseCV Debug: ' . $e->getMessage());
            throw $e;
        }
    }

    public function generateRoadmap(array $data): array
    {
        $apiKey = config('gemini.api_key');
        $url = "https://generativelanguage.googleapis.com/v1/models/{$this->model}:generateContent?key={$apiKey}";

        $existingSkills = implode(', ', array_map(fn($s) => $s['name'], $data['existing_skills'] ?? []));
        $skillGaps = implode(', ', array_map(fn($s) => $s['skill'], $data['skill_gaps'] ?? []));
        $marketSkills = implode(', ', array_map(fn($s) => $s['skill'], $data['market_skills'] ?? []));

        $prompt = <<<PROMPT
Kamu adalah career coach dan kurikulum designer untuk industri teknologi Indonesia 2026.

Data user:
- Target karir: {$data['career_target']}
- Skill yang sudah dimiliki: {$existingSkills}
- Skill gap utama (perlu dipelajari): {$skillGaps}
- Estimasi waktu belajar per hari: {$data['hours_per_day']} jam

Data pasar kerja Indonesia saat ini:
- Top skills yang paling dicari: {$marketSkills}

Buat learning path yang terstruktur. Kembalikan HANYA JSON valid:
{
  "total_duration_weeks": number,
  "milestones": [
    {
      "id": "ms-1",
      "title": "string singkat",
      "emoji": "1 emoji representatif",
      "duration_weeks": number,
      "skills": ["string"],
      "why_important": "string 1 kalimat",
      "capstone_project": {
        "title": "string",
        "description": "string",
        "tech_used": ["string"]
      },
      "resources": [
        { "title": "string", "url": "https://url.com", "type": "youtube|docs", "is_free": true }
      ],
      "status": "locked"
    }
  ]
}
PROMPT;

        try {
            $response = Http::withoutVerifying()->timeout(30)->post($url, [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ]
            ]);

            if ($response->failed()) {
                Log::error('Gemini API Roadmap Failed: ' . $response->body());
                throw new \Exception('Roadmap API Failed: ' . $response->status());
            }

            $respData = $response->json();
            $text = $respData['candidates'][0]['content']['parts'][0]['text'] ?? '';
            $text = preg_replace('/```json\n?|\n?```/', '', $text);
            
            return json_decode(trim($text), true) ?? [];
        } catch (\Exception $e) {
            Log::error('Gemini generateRoadmap Error: ' . $e->getMessage());
            throw $e;
        }
    }

    public function analyzeJobMatch(array $userSkills, array $jobSkills): int
    {
        if (empty($jobSkills)) return 0;

        $userSkillNames = array_map('strtolower', array_column($userSkills, 'name'));
        $matched = 0;

        foreach ($jobSkills as $required) {
            foreach ($userSkillNames as $userSkill) {
                if (str_contains($userSkill, strtolower($required)) ||
                    str_contains(strtolower($required), $userSkill)) {
                    $matched++;
                    break;
                }
            }
        }

        return (int) round(($matched / count($jobSkills)) * 100);
    }
}
