<?php

namespace App\Http\Controllers;

use App\Data\JobMarketData;
use App\Models\UserProfile;
use App\Services\GeminiService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnalysisController extends Controller
{
    public function __construct(protected GeminiService $gemini) {}

    public function index()
    {
        $profile = UserProfile::where('user_id', auth()->id())->first();
        
        $marketSkills = [];
        if ($profile && $profile->career_target) {
            $marketSkills = JobMarketData::getSkillsForRole($profile->career_target);
        }

        return Inertia::render('Analysis', [
            'profile' => $profile,
            'marketSkills' => $marketSkills,
            'trendingSkills' => array_slice(JobMarketData::getTrendingSkills(), 0, 3),
            'marketStats' => JobMarketData::getMarketStats(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'cv_text' => 'required|string',
            'career_target' => 'required|string'
        ]);

        $analysis = $this->gemini->parseCV($request->cv_text, $request->career_target);

        if (empty($analysis)) {
            return back()->with('error', 'Gagal menganalisis CV. Coba lagi nanti.');
        }

        $profile = UserProfile::updateOrCreate(
            ['user_id' => auth()->id()],
            [
                'career_target' => $request->career_target,
                'skills' => $analysis['skills'] ?? [],
                'experiences' => $analysis['experiences'] ?? [],
                'education' => $analysis['education'] ?? [],
                'cv_raw_text' => $request->cv_text,
                'onboarding_completed' => true
            ]
        );

        return redirect()->route('analysis')->with('success', 'CV berhasil dianalisis!');
    }
}
