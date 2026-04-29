<?php

namespace App\Http\Controllers;

use App\Data\JobMarketData;
use App\Models\UserProfile;
use App\Services\GeminiService;
use App\Services\JobApiService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MarketController extends Controller
{
    public function __construct(
        protected GeminiService $gemini,
        protected JobApiService $jobApi
    ) {}

    public function index(Request $request)
    {
        $profile = UserProfile::where('user_id', auth()->id())->first();
        $careerTargets = $profile?->career_target ?? 'software engineer'; // Default fallback

        // Try fetching real jobs from API, fallback to static data
        $jobs = $this->jobApi->fetchMarketJobs($careerTargets);
        $isLiveData = !empty($jobs);

        if (empty($jobs)) {
            $jobs = JobMarketData::getJobListings($careerTargets);
        }

        // Calculate match scores using Batch Analysis for speed
        if ($profile && !empty($jobs)) {
            $scores = $this->gemini->batchAnalyzeJobMatches($profile->skills ?? [], $jobs);
            
            foreach ($jobs as $index => &$job) {
                $job['match_score'] = $scores[$index] ?? 50;
            }
            usort($jobs, fn($a, $b) => ($b['match_score'] ?? 0) <=> ($a['match_score'] ?? 0));
        }

        // Stats: use real if available, else fallback
        $stats = $isLiveData
            ? $this->jobApi->getMarketStats($jobs)
            : JobMarketData::getMarketStats();

        // Trending Skills: prioritaskan live dari job API.
        $trendingSkills = $this->jobApi->getTrendingSkillsFromJobs($jobs, 8);

        // Fallback dari DB agregasi crawler bila live belum tersedia.
        if (empty($trendingSkills)) {
            $trendingSkills = \App\Models\TrendingSkill::where('week_start_date', '>=', now()->startOfWeek())
                ->orderBy('frequency', 'desc')
                ->limit(8)
                ->get()
                ->map(fn($s) => [
                    'skill' => $s->skill_name,
                    'demand' => min($s->frequency * 10, 100),
                    'change' => max(1, min(25, (int) round($s->frequency / 2))),
                    'trend' => $s->frequency >= 3 ? 'rising' : 'stable'
                ])
                ->toArray();
        }

        if (empty($trendingSkills)) {
            $trendingSkills = JobMarketData::getTrendingSkills();
        }

        // Build debug info (only when ?debug=1)
        $debugInfo = null;
        if ($request->has('debug')) {
            $apiStatus = $this->jobApi->getDebugStatus();
            $apiStatus['jobs_fetched'] = count($jobs);
            $apiStatus['data_source'] = $isLiveData ? 'API (Live)' : 'Static Mock Data';
            $apiStatus['career_target'] = $careerTargets ?: '(not set)';
            $debugInfo = $apiStatus;
        }

        // AI Career Outlook (Cached for performance)
        $cacheKey = 'market_outlook_' . md5(is_array($careerTargets) ? implode(',', $careerTargets) : $careerTargets);
        $outlook = Cache::remember($cacheKey, 3600, function() use ($careerTargets) {
            $target = is_array($careerTargets) ? implode(', ', $careerTargets) : $careerTargets;
            try {
                $prompt = "Berikan analisis singkat 2-3 kalimat mengenai prospek karir sebagai {$target} di Indonesia tahun 2024. Sertakan sentimen pasar (bullish/stable/shifting). Kembalikan HANYA JSON: { \"sentiment\": \"...\", \"summary\": \"...\", \"future_skills\": [\"skill1\", \"skill2\"] }";
                $res = $this->gemini->callGeminiApi($prompt);
                return json_decode($this->gemini->cleanJson($res), true);
            } catch (\Exception $e) {
                return [
                    'sentiment' => 'Stable',
                    'summary' => 'Permintaan untuk peran ini tetap tinggi seiring dengan transformasi digital di berbagai sektor industri di Indonesia.',
                    'future_skills' => ['AI Integration', 'Cloud Native', 'Cybersecurity']
                ];
            }
        });

        // Top Hiring Companies (Aggregated from jobs)
        $topCompanies = collect($jobs)
            ->groupBy('company')
            ->map(fn($group) => [
                'name' => $group->first()['company'],
                'count' => count($group),
                'logo' => 'https://ui-avatars.com/api/?name=' . urlencode($group->first()['company']) . '&background=random'
            ])
            ->sortByDesc('count')
            ->take(5)
            ->values()
            ->toArray();

        return Inertia::render('Market', [
            'jobs' => $jobs,
            'trendingSkills' => $trendingSkills,
            'stats' => $stats,
            'profile' => $profile,
            'isLiveData' => $isLiveData,
            'apiDebug' => $debugInfo,
            'outlook' => $outlook,
            'topCompanies' => $topCompanies
        ]);
    }

    public function research()
    {
        set_time_limit(120);
        $user = auth()->user();
        $profile = $user->profile;

        if (!$profile) return back()->with('error', 'Profil tidak ditemukan.');

        $target = is_array($profile->career_target) ? implode(', ', $profile->career_target) : ($profile->career_target ?? 'Software Engineer');

        try {
            $research = $this->gemini->generateMarketResearch($target);

            if (empty($research)) {
                return back()->with('error', 'AI gagal memberikan data riset yang valid.');
            }

            \App\Models\MarketInsight::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'career_target' => $target,
                    'trending_skills' => $research['trending_skills'] ?? [],
                    'market_stats' => $research['market_stats'] ?? [],
                ]
            );

            return back()->with('success', 'Intelligence pasar berhasil diperbarui!');
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal melakukan riset: ' . $e->getMessage());
        }
    }

    public function setTarget(Request $request)
    {
        $request->validate(['target' => 'required|string']);
        $user = auth()->user();
        $profile = UserProfile::where('user_id', $user->id)->first();

        if (!$profile) {
            return back()->with('error', 'Silakan selesaikan analisis CV terlebih dahulu.');
        }

        // 1. Normalize Career Target (Strip seniority levels like 'Senior', 'Lead', etc.)
        $target = $request->target;
        $cleanTarget = preg_replace('/\b(Senior|Junior|Lead|Staff|Principal|Associate|Manager|Head of|Director of|Sr\.|Jr\.|I|II|III|Level \d)\b/i', '', $target);
        $cleanTarget = trim(preg_replace('/\s+/', ' ', $cleanTarget));
        
        // Fallback to original if too short after cleaning
        $finalTarget = strlen($cleanTarget) > 3 ? $cleanTarget : $target;

        $profile->career_target = [$finalTarget];

        // 2. Recalculate Skill Gaps against the new target
        $marketSkills = JobMarketData::getSkillsForRole($request->target);
        $userSkills = $profile->skills ?? [];
        $userSkillNames = array_map(fn($s) => strtolower($s['name'] ?? ''), $userSkills);

        $newGaps = [];
        foreach ($marketSkills as $ms) {
            $userScore = 0;
            $userLevel = 'missing';

            // Simple string matching for now (logic similar to AnalysisController)
            foreach ($userSkills as $us) {
                $uName = strtolower($us['name'] ?? '');
                $mName = strtolower($ms['skill'] ?? '');
                if (str_contains($uName, $mName) || str_contains($mName, $uName)) {
                    $userLevel = $us['level'] ?? 'beginner';
                    $userScore = match(strtolower($userLevel)) {
                        'expert', 'advanced' => 90,
                        'intermediate' => 60,
                        'beginner' => 30,
                        default => 0
                    };
                    break;
                }
            }

            $gap = max(0, $ms['demand'] - $userScore);
            $newGaps[] = [
                'skill' => $ms['skill'],
                'market_demand' => $ms['demand'],
                'user_score' => $userScore,
                'user_level' => $userLevel,
                'gap' => $gap,
                'status' => $gap <= 0 ? 'strong' : ($gap <= 25 ? 'developing' : 'missing'),
                'status_label' => $gap <= 0 ? 'SIAP INDUSTRI' : ($gap <= 25 ? 'PERLU PENINGKATAN' : 'PRIORITAS BELAJAR')
            ];
        }

        $profile->skill_gaps = $newGaps;
        $profile->save();

        return redirect()->route('roadmap')->with('success', "Target karir berhasil diubah ke {$request->target}. Silakan buat roadmap belajar baru.");
    }
}
