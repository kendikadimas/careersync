<?php

namespace App\Http\Controllers;

use App\Data\JobMarketData;
use App\Models\UserProfile;
use App\Services\GeminiService;
use App\Services\JobApiService;
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
        $careerTarget = $profile?->career_target ?? '';

        // Try fetching real jobs from API, fallback to static data
        $jobs = $this->jobApi->fetchMarketJobs($careerTarget);
        $isLiveData = !empty($jobs);

        if (empty($jobs)) {
            $jobs = JobMarketData::getJobListings();
        }

        // Calculate match scores
        if ($profile) {
            foreach ($jobs as &$job) {
                $job['match_score'] = $this->gemini->analyzeJobMatch($profile->skills ?? [], $job['skills_required'] ?? []);
            }
            usort($jobs, fn($a, $b) => $b['match_score'] <=> $a['match_score']);
        }

        // Stats: use real if available, else fallback
        $stats = $isLiveData
            ? $this->jobApi->getMarketStats($jobs)
            : JobMarketData::getMarketStats();

        $trendingSkills = JobMarketData::getTrendingSkills();

        // Build debug info (only when ?debug=1)
        $debugInfo = null;
        if ($request->has('debug')) {
            $apiStatus = $this->jobApi->getDebugStatus();
            $apiStatus['jobs_fetched'] = count($jobs);
            $apiStatus['data_source'] = $isLiveData ? 'JSearch API (Live)' : 'Static Mock Data';
            $apiStatus['career_target'] = $careerTarget ?: '(not set)';
            $debugInfo = $apiStatus;
        }

        return Inertia::render('Market', [
            'jobs' => $jobs,
            'trendingSkills' => $trendingSkills,
            'stats' => $stats,
            'profile' => $profile,
            'isLiveData' => $isLiveData,
            'apiDebug' => $debugInfo,
        ]);
    }
}
