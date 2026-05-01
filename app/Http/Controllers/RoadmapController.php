<?php

namespace App\Http\Controllers;

use App\Data\JobMarketData;
use App\Models\UserProfile;
use App\Models\UserRoadmap;
use App\Models\CapstoneSubmission;
use App\Services\GeminiService;
use App\Services\WorkReadinessScoreService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;

class RoadmapController extends Controller
{
    public function __construct(
        protected GeminiService $gemini,
        protected WorkReadinessScoreService $scoreService
    ) {}

    public function index()
    {
        $roadmap = UserRoadmap::where('user_id', auth()->id())->latest()->first();
        $profile = UserProfile::where('user_id', auth()->id())->first();

        return Inertia::render('Roadmap', [
            'roadmap' => $roadmap,
            'profile' => $profile
        ]);
    }

    /**
     * PHASE 1: Generate high-level structure.
     */
    public function generate(Request $request)
    {
        set_time_limit(40); // Cukup 40 detik karena hanya struktur
        $user = auth()->user();
        $profile = UserProfile::where('user_id', $user->id)->first();
        $existingRoadmap = UserRoadmap::where('user_id', $user->id)->latest()->first();

        if (!$profile) {
            return redirect()->route('analysis')->with('error', 'Analisis CV dulu untuk membuat roadmap.');
        }

        $careerTarget = is_array($profile->career_target) ? ($profile->career_target[0] ?? '') : $profile->career_target;
        $skillGapData = is_string($profile->skill_gaps) ? json_decode($profile->skill_gaps, true) : ($profile->skill_gaps ?? []);

        $priorityGaps = [];
        $minorGaps = [];

        foreach ($skillGapData as $gap) {
            $marketDemand = $gap['market_demand'] ?? 0;
            $status = $gap['status'] ?? 'missing';
            
            if ($status === 'missing' && $marketDemand >= 60) {
                $priorityGaps[] = [
                    'skill' => $gap['skill'],
                    'market_demand' => $marketDemand,
                    'reason' => "Dibutuhkan di {$marketDemand}% lowongan {$careerTarget} tapi belum dimiliki",
                ];
            } elseif ($status === 'developing' || ($status === 'missing' && $marketDemand < 60)) {
                $minorGaps[] = [
                    'skill' => $gap['skill'],
                    'market_demand' => $marketDemand,
                ];
            }
        }

        usort($priorityGaps, fn($a, $b) => $b['market_demand'] <=> $a['market_demand']);

        try {
            $roadmapData = $this->gemini->generateRoadmapStructure([
                'career_target' => $careerTarget,
                'existing_skills' => $profile->skills,
                'priority_gaps' => $priorityGaps,
                'minor_gaps' => $minorGaps,
                'hours_per_day' => 4,
                'market_skills' => JobMarketData::getSkillsForRole($careerTarget)
            ], $existingRoadmap ? true : false);

            if (empty($roadmapData) || empty($roadmapData['milestones'] ?? [])) {
                return back()->with('error', 'AI tidak dapat menyusun milestone yang valid saat ini. Silakan coba lagi.');
            }

            $roadmap = UserRoadmap::create([
                'user_id' => $user->id,
                'career_target' => is_array($profile->career_target) ? implode(', ', $profile->career_target) : $profile->career_target,
                'roadmap_data' => $roadmapData,
                'total_milestones' => count($roadmapData['milestones'] ?? []),
                'milestones_completed' => 0
            ]);

            $newBadges = app(\App\Services\BadgeService::class)->checkAndAwardBadges($user->fresh());

            return redirect()->route('roadmap')->with([
                'success' => 'Struktur roadmap berhasil dibuat! Klik milestone untuk detailnya.',
                'new_badges' => $newBadges,
            ]);
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal membuat roadmap: ' . $e->getMessage());
        }
    }

    /**
     * PHASE 2: Generate details for a specific milestone. (AJAX/API)
     */
    public function getMilestoneDetails(Request $request, $roadmapId, $milestoneId)
    {
        $roadmap = UserRoadmap::findOrFail($roadmapId);
        if ($roadmap->user_id != auth()->id()) abort(403);

        $data = $roadmap->roadmap_data;
        $milestoneIndex = -1;
        $milestone = null;

        foreach ($data['milestones'] as $index => $ms) {
            if ($ms['id'] == $milestoneId) {
                $milestone = $ms;
                $milestoneIndex = $index;
                break;
            }
        }

        if (!$milestone) return response()->json(['error' => 'Milestone tidak ditemukan'], 404);

        // Jika detail belum ada, generate menggunakan AI
        if (empty($milestone['resources']) || empty($milestone['why_important'])) {
            $details = $this->gemini->generateMilestoneDetails($roadmap->career_target, $milestone);
            
            // Merge details into milestone
            $data['milestones'][$milestoneIndex] = array_merge($milestone, $details);
            $roadmap->roadmap_data = $data;
            $roadmap->save();
            
            $milestone = $data['milestones'][$milestoneIndex];
        }

        return response()->json($milestone);
    }

    public function complete(Request $request, $id)
    {
        $user = auth()->user();
        $roadmap = UserRoadmap::where('user_id', $user->id)->latest()->first();
        if (!$roadmap) return back()->with('error', 'Roadmap tidak ditemukan.');

        $milestones = $roadmap->roadmap_data['milestones'] ?? [];
        $milestone = collect($milestones)->firstWhere('id', $id);
        
        if (!$milestone) return back()->with('error', 'Milestone tidak ditemukan.');

        // Check if capstone project is required and submitted
        if (!empty($milestone['capstone_project'])) {
            $submission = CapstoneSubmission::where([
                'user_id' => $user->id,
                'roadmap_id' => $roadmap->id,
                'milestone_id' => $id
            ])->first();

            if (!$submission || $submission->status !== 'completed') {
                return back()->with('error', 'Kamu harus mensubmit dan menyelesaikan Capstone Project untuk milestone ini terlebih dahulu.');
            }
        }

        // Check if materials have been viewed (optional check, but good for UX)
        if (empty($milestone['resources']) || empty($milestone['why_important'])) {
             return back()->with('error', 'Silakan buka detail milestone dan pelajari materi yang tersedia terlebih dahulu.');
        }

        $success = $roadmap->completeMilestone($id);
        
        if (!$success) {
            return back()->with('error', 'Gagal memperbarui status milestone.');
        }

        $this->scoreService->calculateForUser($user);
        $newBadges = app(\App\Services\BadgeService::class)->checkAndAwardBadges($user->fresh());
        
        return back()->with([
            'success' => 'Milestone berhasil diselesaikan! Milestone berikutnya telah terbuka.',
            'new_badges' => $newBadges,
        ]);
    }
}
