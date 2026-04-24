<?php

namespace App\Http\Controllers;

use App\Data\JobMarketData;
use App\Models\UserProfile;
use App\Models\UserRoadmap;
use App\Models\WorkReadinessScore;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $profile = UserProfile::where('user_id', $user->id)->first();
        $roadmap = UserRoadmap::where('user_id', $user->id)->latest()->first();
        $score = WorkReadinessScore::where('user_id', $user->id)->latest()->first();

        $marketStats = JobMarketData::getMarketStats();
        
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

        return Inertia::render('Dashboard', [
            'profile' => $profile,
            'roadmap' => $roadmap,
            'score' => $score,
            'marketStats' => $marketStats,
            'gapCount' => $gapCount,
            'trendingSkills' => array_slice(JobMarketData::getTrendingSkills(), 0, 5),
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
