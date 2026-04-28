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
    public function __construct(
        protected YouTubeSearchService $youtube = new YouTubeSearchService()
    ) {}

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

    public function callGeminiApi(string $prompt): string
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

    public function cleanJson(string $text): string
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

        Log::info('Gemini parseCV start', [
            'target' => $target,
            'cv_length' => strlen($cvText),
        ]);

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
    public function generateRoadmapStructure(array $data, bool $isUpdate = false): array
    {
        $target = $data['career_target'] ?? 'Software Engineer';
        $priorityGaps = json_encode($data['priority_gaps'] ?? []);
        $minorGaps = json_encode($data['minor_gaps'] ?? []);
        $existingSkills = json_encode($data['existing_skills'] ?? []);

        $prompt = <<<PROMPT
Berdasarkan data berikut, buatlah kurikulum roadmap pembelajaran yang sangat terstruktur untuk mencapai target karir sebagai {$target}.

Data Skill Gap User (Prioritas): {$priorityGaps}
Data Skill Lainnya: {$minorGaps}
Data Skill yang sudah dimiliki: {$existingSkills}

Tujuan: Buatlah urutan 5-7 milestone belajar yang logis untuk menutup skill gap tersebut. Milestone harus mencakup aspek teknis (coding/tools) dan non-teknis (workflow/best practices). 
Setiap milestone harus memiliki 'capstone_project' yang menantang dan relevan dengan dunia kerja nyata untuk target peran {$target}.

Status Milestone: Milestone pertama harus 'current', sisanya 'locked'.

Kembalikan HANYA JSON object dengan struktur:
{
  "total_duration_weeks": 12,
  "milestones": [
    {
      "id": 1,
      "title": "Judul Milestone",
      "emoji": "🚀",
      "description": "Deskripsi singkat apa yang dipelajari",
      "skill_gaps_addressed": ["Skill A", "Skill B"],
      "status": "current|locked",
      "capstone_project": {
        "title": "Nama Proyek",
        "description": "Deskripsi proyek kecil untuk menguji milestone ini",
        "tech_used": ["React", "Tailwind"]
      }
    }
  ]
}
PROMPT;

        try {
            $text = $this->callGeminiApi($prompt);
            $cleaned = $this->cleanJson($text);
            $result = json_decode($cleaned, true);
            
            if (!$result || !isset($result['milestones'])) {
                throw new \Exception("Invalid Roadmap Format");
            }
            
            return $result;
        } catch (\Exception $e) {
            Log::error("Roadmap Structure Generation Failed: " . $e->getMessage());
            // Fallback: Basic 3-step roadmap
            return [
                'total_duration_weeks' => 8,
                'milestones' => [
                    [
                        'id' => 1,
                        'title' => 'Mastering Core Fundamentals',
                        'emoji' => '📚',
                        'description' => 'Memperkuat fondasi dasar yang diperlukan untuk peran ' . $target,
                        'skill_gaps_addressed' => array_column($data['priority_gaps'] ?? [], 'skill'),
                        'status' => 'current',
                        'capstone_project' => [
                            'title' => 'Personal Portfolio v1',
                            'description' => 'Membangun aplikasi sederhana menggunakan teknologi inti.',
                            'tech_used' => ['Basic Tools']
                        ]
                    ],
                    [
                        'id' => 2,
                        'title' => 'Advanced Integration',
                        'emoji' => '⚙️',
                        'description' => 'Mempelajari integrasi sistem dan workflow profesional.',
                        'skill_gaps_addressed' => array_column($data['minor_gaps'] ?? [], 'skill'),
                        'status' => 'locked'
                    ],
                    [
                        'id' => 3,
                        'title' => 'Industry Readiness',
                        'emoji' => '💼',
                        'description' => 'Persiapan akhir untuk standar industri dan deployment.',
                        'skill_gaps_addressed' => ['Professional Workflow'],
                        'status' => 'locked'
                    ]
                ]
            ];
        }
    }

    public function generateMilestoneDetails(string $careerTarget, array $milestone): array
    {
        $title = $milestone['title'] ?? 'this milestone';
        $addressed = implode(', ', $milestone['skill_gaps_addressed'] ?? []);
        
        $prompt = <<<PROMPT
Berikan penjelasan mendalam mengapa milestone "{$title}" sangat penting untuk target karir sebagai {$careerTarget}. 
Milestone ini fokus pada penguasaan: {$addressed}.
Berikan penjelasan yang memotivasi dan teknis dalam Bahasa Indonesia yang profesional.

Kembalikan HANYA JSON object:
{
  "why_important": "Penjelasan mendetail dalam 2-3 kalimat"
}
PROMPT;

        try {
            $text = $this->callGeminiApi($prompt);
            $cleaned = $this->cleanJson($text);
            $details = json_decode($cleaned, true) ?: ['why_important' => 'Milestone ini krusial untuk kompetensi industri.'];
            
            // Integrasi dengan YouTubeSearchService untuk materi REAL
            $resources = $this->youtube->searchForSkill($title, $careerTarget);
            $details['resources'] = array_map(function($res) {
                return [
                    'title' => $res['title'],
                    'url' => $res['url'],
                    'type' => $res['type'] ?? 'video'
                ];
            }, $resources);

            return $details;
        } catch (\Exception $e) {
            return [
                'why_important' => 'Mempelajari ' . $title . ' akan membantu kamu menutup gap di ' . $addressed . '.',
                'resources' => [
                    ['title' => 'Tutorial ' . $title . ' di YouTube', 'url' => 'https://youtube.com/results?search_query=' . urlencode($title), 'type' => 'video'],
                    ['title' => 'Dokumentasi Resmi', 'url' => 'https://google.com/search?q=' . urlencode($title . ' docs'), 'type' => 'docs']
                ]
            ];
        }
    }
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
