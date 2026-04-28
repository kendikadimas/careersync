<?php

namespace App\Http\Controllers;

use App\Models\CapstoneSubmission;
use App\Models\UserRoadmap;
use App\Services\GitHubVerificationService;
use App\Services\BadgeService;
use App\Services\WorkReadinessScoreService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CapstoneController extends Controller
{
    public function __construct(
        private GitHubVerificationService $github,
        private BadgeService $badgeService,
        private WorkReadinessScoreService $scoreService
    ) {}

    public function show(string $roadmapId, string $milestoneId)
    {
        $roadmap = UserRoadmap::where('user_id', auth()->id())
            ->findOrFail($roadmapId);

        $milestones = $roadmap->roadmap_data['milestones'] ?? [];
        $milestone = collect($milestones)->firstWhere('id', $milestoneId);

        if (!$milestone) abort(404, 'Milestone tidak ditemukan');

        $existingSubmission = CapstoneSubmission::where([
            'user_id'      => auth()->id(),
            'roadmap_id'   => $roadmapId,
            'milestone_id' => $milestoneId,
        ])->first();

        return Inertia::render('Capstone/Submit', [
            'roadmap'    => $roadmap,
            'milestone'  => $milestone,
            'submission' => $existingSubmission,
            'checklist_items' => $this->getChecklistItems($milestone),
        ]);
    }

    public function submit(Request $request, string $roadmapId, string $milestoneId)
    {
        $request->validate([
            'github_url'          => 'required|url|starts_with:https://github.com',
            'demo_url'            => 'nullable|url',
            'description'         => 'required|string|min:50|max:500',
            'checklist_completed' => 'required|array|min:1',
        ]);

        // VERIFIKASI GITHUB OTOMATIS
        $githubData = $this->github->verifyRepo($request->github_url);
        $githubVerifiedScore = $githubData['verified_score'] ?? 0;

        $roadmap = UserRoadmap::where('user_id', auth()->id())->findOrFail($roadmapId);

        $submission = CapstoneSubmission::updateOrCreate(
            ['user_id' => auth()->id(), 'roadmap_id' => $roadmapId, 'milestone_id' => $milestoneId],
            [
                'github_url'          => $request->github_url,
                'demo_url'            => $request->demo_url,
                'description'         => $request->description,
                'checklist_completed' => $request->checklist_completed,
                'github_verified'     => $githubData['verified'],
                'github_verified_data'=> $githubData, 
                'status'              => 'submitted',
                'submitted_at'        => now(),
            ]
        );

        $score = $this->calculateVerifiedScore($submission, $githubData, $request->checklist_completed);
        $submission->update(['completion_score' => $score]);

        if ($score >= 60) {
            $roadmap->completeMilestone($milestoneId);
            $submission->update(['status' => 'completed']);
            $this->scoreService->calculateForUser(auth()->user());
        }

        // Check badges setelah submit
        $newBadges = $this->badgeService->checkAndAwardBadges(auth()->user()->fresh());

        $verificationMsg = $githubData['verified']
            ? " GitHub repo terverifikasi ✓ (+{$githubVerifiedScore} verified points)"
            : " GitHub repo belum terverifikasi — pastikan repo PUBLIC untuk poin penuh.";

        return redirect()->route('roadmap')->with('success', "Score kamu: {$score}/100.{$verificationMsg}")
            ->with('new_badges', $newBadges);
    }

    private function calculateVerifiedScore(CapstoneSubmission $submission, array $githubData, array $checklist): int 
    {
        $score = 0;

        if (!empty($submission->github_url)) $score += 20;         
        if ($githubData['has_readme'] ?? false) $score += 20;      
        if ($githubData['has_commits'] ?? false) $score += 10;     
        if (($githubData['file_count'] ?? 0) >= 3) $score += 5;           
        if (!empty($submission->demo_url)) $score += 10;           
        if (!empty($submission->description) && strlen($submission->description) >= 50) $score += 5; 

        $selfReportMax = 30; 
        $selfReportItems = ['uses_milestone_tech', 'has_screenshot'];
        $selfScore = 0;
        foreach ($checklist as $item) {
            if (in_array($item, $selfReportItems)) $selfScore += 15;
            else $selfScore += 10; // Extra points for custom checklist items
        }
        $score += min($selfReportMax, $selfScore);

        return min(100, $score);
    }

    private function getChecklistItems(array $milestone): array
    {
        $baseChecklist = [
            [
                'key'    => 'uses_milestone_tech',
                'label'  => 'Project menggunakan ' . implode(', ', array_slice($milestone['skills'] ?? [], 0, 3)) . ' secara nyata',
                'points' => 15,
            ],
            [
                'key'    => 'has_screenshot',
                'label'  => 'Ada screenshot atau demo GIF di README atau repo',
                'points' => 15,
            ],
        ];

        $capstone = $milestone['capstone_project'] ?? [];
        if (!empty($capstone['checklist'])) {
            foreach ($capstone['checklist'] as $i => $item) {
                $baseChecklist[] = [
                    'key'    => 'custom_' . $i,
                    'label'  => $item,
                    'points' => 10,
                ];
            }
        }

        return $baseChecklist;
    }
}
