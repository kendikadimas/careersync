<?php

namespace App\Http\Controllers;

use App\Data\JobMarketData;
use App\Models\UserProfile;
use App\Services\GeminiService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MarketController extends Controller
{
    public function __construct(protected GeminiService $gemini) {}

    public function index()
    {
        $profile = UserProfile::where('user_id', auth()->id())->first();
        $jobs = JobMarketData::getJobListings();
        $trendingSkills = JobMarketData::getTrendingSkills();
        $stats = JobMarketData::getMarketStats();

        // Calculate match scores
        if ($profile) {
            foreach ($jobs as &$job) {
                $job['match_score'] = $this->gemini->analyzeJobMatch($profile->skills ?? [], $job['skills_required'] ?? []);
            }
            
            // Sort jobs by match score by default
            usort($jobs, fn($a, $b) => $b['match_score'] <=> $a['match_score']);
        }

        return Inertia::render('Market', [
            'jobs' => $jobs,
            'trendingSkills' => $trendingSkills,
            'stats' => $stats,
            'profile' => $profile
        ]);
    }
}
