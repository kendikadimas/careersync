<?php

namespace App\Http\Controllers;

use App\Data\JobMarketData;
use App\Models\UserProfile;
use App\Models\UserRoadmap;
use App\Models\WorkReadinessScore;
use Illuminate\Http\Request;
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
        $user = auth()->user();
        $profile = UserProfile::where('user_id', $user->id)->first();
        $roadmap = UserRoadmap::where('user_id', $user->id)->latest()->first();
        $score = WorkReadinessScore::where('user_id', $user->id)->latest()->first();
        
        // NOTE: Auto-generate insights disabled as per user request to use manual trigger

        $careerTargets = $profile?->career_target ?? 'software engineer';
        $liveJobs = $this->jobApi->fetchMarketJobs($careerTargets);
        $hasLiveJobs = !empty($liveJobs);

        $marketStats = $hasLiveJobs
            ? $this->jobApi->getMarketStats($liveJobs)
            : JobMarketData::getMarketStats();
        
        // Calculate Skill Gap Count
        $gapCount = 0;
        if ($profile && $profile->career_target) {
            $targets = is_array($profile->career_target) ? $profile->career_target : [$profile->career_target];
            $allRequiredSkills = [];
            foreach ($targets as $target) {
                $roleSkills = JobMarketData::getSkillsForRole($target);
                foreach ($roleSkills as $rs) {
                    $allRequiredSkills[strtolower($rs['skill'])] = $rs['skill'];
                }
            }
            
            $userSkills = array_map(fn($s) => strtolower($s['name']), $profile->skills ?? []);
            foreach ($allRequiredSkills as $lowerName => $fullName) {
                $found = false;
                foreach ($userSkills as $userSkill) {
                    if (str_contains($userSkill, $lowerName) || str_contains($lowerName, $userSkill)) {
                        $found = true;
                        break;
                    }
                }
                if (!$found) $gapCount++;
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

        return Inertia::render('Dashboard', [
            'profile' => $profile,
            'roadmap' => $roadmap,
            'score' => $score,
            'marketStats' => $marketStats,
            'gapCount' => $gapCount,
            'recommendedJobs' => array_slice($recommendedJobs, 0, 5),
            'trendingSkills' => $trendingSkills,
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
