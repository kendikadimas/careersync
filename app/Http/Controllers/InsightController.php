<?php
namespace App\Http\Controllers;

use App\Services\GeminiService;
use Inertia\Inertia;

class InsightController extends Controller
{
    public function __construct(private GeminiService $gemini) {}

    public function index()
    {
        $user = auth()->user();
        $profile = $user->profile;
        $roadmap = $user->roadmaps()->latest()->first();

        if (!$profile) {
            return redirect()->route('dashboard')->with('error', 'Silakan lengkapi profil terlebih dahulu.');
        }

        if (!$profile->ai_insights || $this->shouldRegenerate($profile)) {
            $insights = $this->gemini->generateInsights([
                'career_target'        => $profile->career_target,
                'skills'               => $profile->skills ?? [],
                'skill_gaps'           => $profile->skill_gaps ?? [],
                'work_readiness_score' => $user->workReadinessScore?->score ?? 0,
                'milestones_completed' => $roadmap?->milestones_completed ?? 0,
                'total_milestones'     => $roadmap?->total_milestones ?? 5,
            ]);

            $profile->update([
                'ai_insights'           => $insights,
                'insights_generated_at' => now(),
            ]);
            
            app(\App\Services\BadgeService::class)->checkAndAwardBadges($user);
        }

        return Inertia::render('Insights', [
            'insights'    => $profile->ai_insights,
            'smart_tips'  => $profile->ai_insights['smart_tips'] ?? [],
            'profile'     => $profile,
            'score'       => $user->workReadinessScore,
            'generated_at'=> $profile->insights_generated_at?->diffForHumans(),
        ]);
    }

    public function regenerate()
    {
        $profile = auth()->user()->profile;
        if($profile) {
            $profile->update(['insights_generated_at' => null]);
        }
        return redirect()->route('insights.index')
            ->with('success', 'Insight diperbarui!');
    }

    public function generateForDashboard()
    {
        $user = auth()->user();
        $profile = $user->profile;
        $roadmap = $user->roadmaps()->latest()->first();

        if (!$profile) return back()->with('error', 'Profil tidak ditemukan.');

        try {
            $insights = $this->gemini->generateInsights([
                'career_target'        => is_array($profile->career_target) ? implode(', ', $profile->career_target) : ($profile->career_target ?? ''),
                'skills'               => $profile->skills ?? [],
                'skill_gaps'           => $profile->skill_gaps ?? [],
                'work_readiness_score' => $user->workReadinessScore?->score ?? 0,
                'milestones_completed' => $roadmap?->milestones_completed ?? 0,
                'total_milestones'     => $roadmap?->total_milestones ?? 5,
            ]);

            $careerPaths = $this->gemini->generateCareerPaths($profile->skills ?? []);

            $profile->update([
                'ai_insights'           => $insights,
                'career_paths'          => $careerPaths,
                'insights_generated_at' => now(),
            ]);

            return back()->with('success', 'AI Feedback berhasil dijana!');
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal menjana feedback: ' . $e->getMessage());
        }
    }

    private function shouldRegenerate($profile): bool
    {
        if (!$profile->insights_generated_at) return true;
        return $profile->insights_generated_at->diffInDays(now()) >= 3;
    }
}
