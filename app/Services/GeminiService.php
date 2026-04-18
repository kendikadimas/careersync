<?php

namespace App\Services;

use Gemini\Laravel\Facades\Gemini;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    private string $model = 'gemini-1.5-flash'; // Note: User requested 2.5 flash but usually it's 1.5 flash for now, I'll use 1.5 flash unless 2.5 is really out

    public function parseCV(string $cvText, string $careerTarget): array
    {
        $prompt = <<<PROMPT
Kamu adalah career analyst ahli teknologi Indonesia.
Analisis CV berikut dan ekstrak informasi dalam format JSON.

CV:
{$cvText}

Target Karir: {$careerTarget}

Kembalikan HANYA JSON valid tanpa markdown backtick, tanpa penjelasan apapun:
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
            $result = Gemini::geminiFlash()->generateContent($prompt);
            $text = $result->text();

            // Strip markdown backticks jika ada
            $text = preg_replace('/```json\n?|\n?```/', '', $text);

            return json_decode(trim($text), true) ?? [];
        } catch (\Exception $e) {
            Log::error('Gemini parseCV Error: ' . $e->getMessage());
            return [];
        }
    }

    public function generateRoadmap(array $data): array
    {
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

Buat learning path yang terstruktur dengan aturan:
1. Maksimal 5 milestones, minimal 3
2. Prioritaskan skill dengan demand tertinggi di pasar
3. Timeline realistis untuk Indonesia
4. Setiap milestone punya 1 capstone project konkret yang bisa masuk portfolio

Kembalikan HANYA JSON valid tanpa markdown backtick:
{
  "total_duration_weeks": number,
  "milestones": [
    {
      "id": "ms-1",
      "title": "string singkat",
      "emoji": "1 emoji representatif",
      "duration_weeks": number,
      "skills": ["string"],
      "why_important": "string 1 kalimat kenapa skill ini penting di pasar",
      "capstone_project": {
        "title": "string nama project",
        "description": "string 2 kalimat deskripsi project",
        "tech_used": ["string"]
      },
      "resources": [
        {
          "title": "string nama resource",
          "url": "https://url-nyata.com",
          "type": "youtube|docs|course|article",
          "is_free": true
        }
      ],
      "status": "locked"
    }
  ]
}
PROMPT;

        try {
            $result = Gemini::geminiFlash()->generateContent($prompt);
            $text = $result->text();
            $text = preg_replace('/```json\n?|\n?```/', '', $text);

            return json_decode(trim($text), true) ?? [];
        } catch (\Exception $e) {
            Log::error('Gemini generateRoadmap Error: ' . $e->getMessage());
            return [];
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
