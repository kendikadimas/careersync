<?php

namespace App\Http\Controllers;

use App\Data\JobMarketData;
use App\Models\UserProfile;
use App\Models\UserRoadmap;
use App\Models\WorkReadinessScore;
use Illuminate\Http\Request;

class WorkReadinessController extends Controller
{
    public function calculate()
    {
        $user = auth()->user();
        $profile = UserProfile::where('user_id', $user->id)->first();
        $roadmap = UserRoadmap::where('user_id', $user->id)->latest()->first();

        if (!$profile) return back();

        // 1. Skill Match (40%)
        $marketSkills = JobMarketData::getSkillsForRole($profile->career_target);
        $userSkills = $profile->skills ?? [];
        
        $skillScore = 0;
        if (count($marketSkills) > 0) {
            $totalDemand = 0;
            $matchedDemand = 0;
            
            foreach ($marketSkills as $ms) {
                $totalDemand += 100; // Simplified max per skill
                $userLevel = 0;
                foreach ($userSkills as $us) {
                    if (str_contains(strtolower($us['name']), strtolower($ms['skill'])) || 
                        str_contains(strtolower($ms['skill']), strtolower($us['name']))) {
                        $level = $us['level'] ?? 'beginner';
                        $userLevel = match($level) {
                            'expert' => 100,
                            'intermediate' => 70,
                            'beginner' => 40,
                            default => 0
                        };
                        break;
                    }
                }
                $matchedDemand += $userLevel;
            }
            $skillScore = ($matchedDemand / $totalDemand) * 40;
        }

        // 2. Experience Score (30%)
        $experiences = $profile->experiences ?? [];
        $expPoints = 0;
        foreach ($experiences as $exp) {
            $points = match($exp['type'] ?? '') {
                'fulltime' => 30,
                'internship' => 20,
                'freelance' => 15,
                'project' => 10,
                'organization' => 5,
                default => 0
            };
            $expPoints = max($expPoints, $points); // Max 30
        }
        $experienceScore = min($expPoints, 30);

        // 3. Education Score (20%)
        $edu = $profile->education ?? [];
        $major = strtolower($edu['major'] ?? '');
        $itKeywords = ['informatika', 'komputer', 'sistem informasi', 'software', 'ti', 'it', 'computer', 'information'];
        $isIT = false;
        foreach ($itKeywords as $kw) {
            if (str_contains($major, $kw)) {
                $isIT = true;
                break;
            }
        }
        
        $educationScore = $isIT ? 20 : (isset($edu['degree']) ? 12 : 8);

        // 4. Roadmap Progress (10%)
        $roadmapScore = 0;
        if ($roadmap && $roadmap->total_milestones > 0) {
            $roadmapScore = ($roadmap->milestones_completed / $roadmap->total_milestones) * 10;
        }

        $totalScore = (int) round($skillScore + $experienceScore + $educationScore + $roadmapScore);
        
        $category = 'Masih Awal';
        if ($totalScore >= 80) $category = 'Siap Kerja';
        elseif ($totalScore >= 60) $category = 'Hampir Siap';
        elseif ($totalScore >= 40) $category = 'Sedang Berkembang';

        WorkReadinessScore::create([
            'user_id' => $user->id,
            'score' => $totalScore,
            'category' => $category,
            'breakdown' => [
                'skills' => (int)$skillScore,
                'experience' => (int)$experienceScore,
                'education' => (int)$educationScore,
                'roadmap' => (int)$roadmapScore
            ]
        ]);

        return back()->with('success', 'Skor Kesiapan Kerja diperbarui!');
    }
}
