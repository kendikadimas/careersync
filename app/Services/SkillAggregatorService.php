<?php

namespace App\Services;

use App\Models\ScrapedJob;
use App\Models\TrendingSkill;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class SkillAggregatorService
{
    protected $gemini;

    public function __construct(GeminiService $gemini)
    {
        $this->gemini = $gemini;
    }

    /**
     * Mengagregasi skill dari lowongan yang baru di-scrape.
     * Mengembalikan statistik untuk debugging terminal.
     */
    public function aggregate(): array
    {
        Log::info("Memulai agregasi trending skills...");
        $stats = ['jobs_processed' => 0, 'skills_extracted' => 0, 'total_new_skills' => 0];

        // Ambil pekerjaan yang belum diolah (misal dalam 24 jam terakhir)
        $jobs = ScrapedJob::where('created_at', '>=', now()->subDay())->get();
        $weekStart = now()->startOfWeek()->format('Y-m-d');

        $skillCounts = [];

        foreach ($jobs as $job) {
            $stats['jobs_processed']++;
            try {
                // Gunakan Gemini untuk mengekstrak kata kunci skill dari deskripsi
                if (empty($job->description)) continue;

                $skills = $this->gemini->extractSkillsFromText($job->description);
                $stats['skills_extracted'] += count($skills);

                foreach ($skills as $skill) {
                    $skillName = trim(ucwords(strtolower($skill)));
                    if (empty($skillName)) continue;

                    if (!isset($skillCounts[$skillName])) {
                        $skillCounts[$skillName] = 0;
                    }
                    $skillCounts[$skillName]++;
                }
            } catch (\Exception $e) {
                Log::error("Gagal agregasi job ID {$job->id}: " . $e->getMessage());
            }
        }

        // Simpan hasil ke database
        foreach ($skillCounts as $name => $count) {
            $stats['total_new_skills']++;
            TrendingSkill::updateOrCreate(
                [
                    'skill_name' => $name,
                    'week_start_date' => $weekStart
                ],
                [
                    'frequency' => \DB::raw("frequency + $count"),
                    'category' => $this->determineCategory($name)
                ]
            );
        }

        Log::info("Agregasi trending skills selesai.");
        return $stats;
    }

    /**
     * Menentukan kategori skill secara sederhana.
     */
    private function determineCategory(string $skill): string
    {
        $skill = strtolower($skill);
        
        $maps = [
            'frontend' => ['react', 'vue', 'tailwind', 'css', 'html', 'javascript', 'typescript', 'nextjs'],
            'backend' => ['laravel', 'php', 'node', 'express', 'python', 'django', 'go', 'golang', 'java', 'spring'],
            'database' => ['mysql', 'postgresql', 'mongodb', 'redis', 'sql', 'nosql', 'oracle'],
            'devops' => ['docker', 'kubernetes', 'aws', 'gcp', 'azure', 'ci/cd', 'jenkins', 'git'],
            'mobile' => ['flutter', 'react native', 'swift', 'kotlin', 'android', 'ios'],
            'data' => ['ai', 'machine learning', 'data science', 'pandas', 'numpy', 'tensorflow', 'pytorch'],
            'soft' => ['communication', 'teamwork', 'problem solving', 'leadership', 'english'],
        ];

        foreach ($maps as $cat => $keywords) {
            foreach ($keywords as $kw) {
                if (str_contains($skill, $kw)) return $cat;
            }
        }

        return 'other';
    }
}
