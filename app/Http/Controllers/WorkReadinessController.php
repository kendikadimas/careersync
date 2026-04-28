<?php

namespace App\Http\Controllers;

use App\Services\WorkReadinessScoreService;

class WorkReadinessController extends Controller
{
    public function __construct(private WorkReadinessScoreService $scoreService) {}

    public function calculate()
    {
        $user = auth()->user();
        $score = $this->scoreService->calculateForUser($user);
        if (!$score) {
            return back();
        }

        return back()->with('success', 'Skor Kesiapan Kerja diperbarui!');
    }
}
