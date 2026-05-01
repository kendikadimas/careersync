<?php
namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class LeaderboardController extends Controller
{
    public function index()
    {
        $leaders = User::where('show_on_leaderboard', true)
            ->with(['badges' => fn($q) => $q->orderByPivot('earned_at','desc')->take(3)])
            ->withCount('badges')
            ->orderByDesc('total_points')
            ->take(50)
            ->get()
            ->map(fn($user) => [
                'id'           => $user->id,
                'name'         => $user->name,
                'rank'         => $user->rank,
                'total_points' => $user->total_points,
                'badges_count' => $user->badges_count,
                'career_target'=> $user->profile?->career_target ?? '-',
                'score'        => $user->workReadinessScore?->score ?? 0,
                'top_badges'   => $user->badges->map(fn($b) => [
                    'emoji' => $b->emoji,
                    'name'  => $b->name,
                    'rarity'=> $b->rarity,
                ]),
                'is_current_user' => $user->id === auth()->id(),
            ]);

        $currentUserRank = $this->getCurrentUserRank();

        return Inertia::render('Leaderboard', [
            'leaders'          => $leaders,
            'current_user_rank'=> $currentUserRank,
            'user_opted_in'    => auth()->user()?->show_on_leaderboard ?? false,
        ]);
    }

    public function toggleOptIn()
    {
        $user = auth()->user();
        $user->update(['show_on_leaderboard' => !$user->show_on_leaderboard]);

        return back()->with('success', $user->show_on_leaderboard
            ? 'Kamu sekarang muncul di leaderboard!'
            : 'Kamu disembunyikan dari leaderboard.'
        );
    }

    private function getCurrentUserRank(): ?int
    {
        $user = auth()->user();
        if (!$user || !$user->show_on_leaderboard) return null;

        $rank = User::where('show_on_leaderboard', true)
            ->where('total_points', '>', $user->total_points)
            ->count();

        return $rank + 1;
    }
}
