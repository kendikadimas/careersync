<?php

namespace App\Http\Controllers;

use App\Data\JobMarketData;
use App\Models\UserProfile;
use App\Models\UserRoadmap;
use App\Models\WorkReadinessScore;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use App\Services\GeminiService;
use App\Services\JobApiService;

class DashboardController extends Controller
{
    public function __construct(
        protected GeminiService $gemini,
        protected JobApiService $jobApi
    ) {}

    public function index()
    {
        $user = Auth::user();
        $profile = UserProfile::where('user_id', $user->id)->first();
        $roadmap = UserRoadmap::where('user_id', $user->id)->latest()->first();
        $score = WorkReadinessScore::where('user_id', $user->id)->latest()->first();
        $scoreHistory = WorkReadinessScore::where('user_id', $user->id)
            ->latest()
            ->get(['score', 'created_at'])
            ->groupBy(fn ($row) => $row->created_at->format('Y-m-d'))
            ->map(fn ($group) => [
                'score' => (int) $group->max('score'),
                'label' => $group->first()->created_at->locale('id')->translatedFormat('d M'),
            ])
            ->take(12)
            ->reverse()
            ->values();
        
        // NOTE: Auto-generate insights disabled as per user request to use manual trigger

        $careerTargets = $profile?->career_target ?? 'software engineer';
        $primaryTarget = is_array($careerTargets) ? ($careerTargets[0] ?? 'software engineer') : $careerTargets;
        $liveJobs = $this->jobApi->fetchJobs((string) $primaryTarget, 12);
        $hasLiveJobs = !empty($liveJobs);

        $marketStats = $hasLiveJobs
            ? $this->jobApi->getMarketStats($liveJobs)
            : JobMarketData::getMarketStats();
        
        // Calculate Skill Gap Count
        $gapCount = 0;
        $totalRequired = 0;
        $masteredCount = 0;
        if ($profile && $profile->career_target) {
            $targets = is_array($profile->career_target) ? $profile->career_target : [$profile->career_target];
            $allRequiredSkills = [];
            foreach ($targets as $target) {
                $roleSkills = JobMarketData::getSkillsForRole($target);
                foreach ($roleSkills as $rs) {
                    $allRequiredSkills[strtolower($rs['skill'])] = $rs['skill'];
                }
            }
            
            $totalRequired = count($allRequiredSkills);
            $userSkills = array_map(fn($s) => strtolower($s['name']), $profile->skills ?? []);
            foreach ($allRequiredSkills as $lowerName => $fullName) {
                $found = false;
                foreach ($userSkills as $userSkill) {
                    if (str_contains($userSkill, $lowerName) || str_contains($lowerName, $userSkill)) {
                        $found = true;
                        break;
                    }
                }
                if (!$found) {
                    $gapCount++;
                } else {
                    $masteredCount++;
                }
            }
        }

        // Get Filtered Jobs based on Career Target
        $allJobs = $hasLiveJobs ? $liveJobs : JobMarketData::getJobListings();
        $userSkills = array_map(fn($s) => strtolower($s['name']), $profile->skills ?? []);
        
        $recommendedJobs = [];
        $targets = is_array($profile->career_target) ? $profile->career_target : [$profile->career_target];
        $targetsLower = array_map('strtolower', array_filter($targets));

        foreach ($allJobs as $job) {
            // Priority 1: Match by Title/Target
            $isTarget = false;
            foreach ($targetsLower as $t) {
                if (str_contains(strtolower($job['title']), $t)) {
                    $isTarget = true;
                    break;
                }
            }

            // Calculate skill match percentage
            $required = $job['skills_required'] ?? [];
            if (empty($required)) {
                $matchScore = 50;
            } else {
                $matched = 0;
                foreach ($required as $req) {
                    foreach ($userSkills as $userS) {
                        if (str_contains($userS, strtolower($req)) || str_contains(strtolower($req), $userS)) {
                            $matched++;
                            break;
                        }
                    }
                }
                $matchScore = round(($matched / count($required)) * 100);
            }

            // Only recommend if target matches OR match score is decent
            if ($isTarget || $matchScore > 40) {
                $job['match'] = $matchScore;
                $recommendedJobs[] = $job;
            }
        }

        // Sort by match score and target
        usort($recommendedJobs, fn($a, $b) => $b['match'] <=> $a['match']);

        $marketInsight = \App\Models\MarketInsight::where('user_id', $user->id)->latest()->first();
        $liveTrending = $this->jobApi->getTrendingSkillsFromJobs($allJobs, 5);
        $trendingSkills = !empty($liveTrending)
            ? $liveTrending
            : ($marketInsight ? $marketInsight->trending_skills : array_slice(JobMarketData::getTrendingSkills(), 0, 5));

        if (!$hasLiveJobs && $marketInsight && !empty($marketInsight->market_stats)) {
            $marketStats = $marketInsight->market_stats;
        }

        $roadmapCompleted = (int) ($roadmap?->milestones_completed ?? 0);
        $roadmapTotal = (int) ($roadmap?->total_milestones ?? 0);
        $isScoreStale = $score && $roadmap && $roadmap->updated_at && $roadmap->updated_at->gt($score->created_at);

        return Inertia::render('Dashboard', [
            'user' => [
                'name' => $user->name,
                'rank' => $user->rank ?? 'Apprentice',
                'points' => $user->total_points ?? 0,
            ],
            'badges' => $user->badges()->latest('earned_at')->take(4)->get(),
            'profile' => $profile,
            'roadmap' => $roadmap,
            'score' => $score,
            'scoreHistory' => $scoreHistory,
            'marketStats' => $marketStats,
            'gapCount' => $gapCount,
            'recommendedJobs' => array_slice($recommendedJobs, 0, 5),
            'trendingSkills' => $trendingSkills,
            'skillStats' => [
                'mastered' => $masteredCount,
                'total' => $totalRequired,
            ],
            'roadmapStats' => [
                'completed' => $roadmapCompleted,
                'remaining' => max($roadmapTotal - $roadmapCompleted, 0),
                'total' => $roadmapTotal,
            ],
            'scoreMeta' => [
                'isStale' => (bool) $isScoreStale,
                'lastCalculatedAt' => $score?->created_at?->toDateTimeString(),
            ],
        ]);
    }

    public function demo()
    {
        $demoProfile = [
            'name' => "Budi Santoso",
            'career_target' => "Frontend Engineer",
            'education' => [
                'degree' => "S1",
                'major' => "Teknik Informatika",
                'university' => "Universitas Diponegoro",
                'gpa' => 3.42
            ],
            'skills' => [
                ['name' => "HTML/CSS", 'level' => "expert", 'category' => "frontend"],
                ['name' => "JavaScript", 'level' => "intermediate", 'category' => "frontend"],
                ['name' => "React.js", 'level' => "beginner", 'category' => "frontend"],
                ['name' => "Git", 'level' => "intermediate", 'category' => "devops"],
                ['name' => "PHP/Laravel", 'level' => "intermediate", 'category' => "backend"],
                ['name' => "MySQL", 'level' => "beginner", 'category' => "database"],
            ],
        ];

        $demoScore = [
            'score' => 58,
            'category' => "Sedang Berkembang",
            'breakdown' => [
                'skill_match' => 45,
                'experience' => 10,
                'education' => 20,
                'roadmap' => 5
            ]
        ];

        return Inertia::render('Demo', [
            'profile' => $demoProfile,
            'score' => $demoScore,
            'marketStats' => JobMarketData::getMarketStats(),
            'jobs' => array_slice(JobMarketData::getJobListings(), 0, 5),
            'trendingSkills' => JobMarketData::getTrendingSkills(),
        ]);
    }
}
