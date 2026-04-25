<?php
namespace App\Http\Controllers;

use App\Models\PortfolioProject;
use App\Models\User;
use App\Services\GitHubVerificationService;
use App\Services\BadgeService;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function __construct(
        private GitHubVerificationService $github,
        private BadgeService $badgeService
    ) {}

    public function publicProfile(string $userId)
    {
        $user = User::findOrFail($userId);
        $projects = $user->portfolioProjects()
            ->where('visibility', 'public')
            ->orderByDesc('created_at')
            ->get();

        $badges = $user->badges()
            ->orderBy('user_badges.earned_at', 'desc')
            ->get();

        return Inertia::render('Profile/Public', [
            'profile_user' => [
                'name'          => $user->name,
                'career_target' => $user->profile?->career_target,
                'rank'          => $user->rank,
                'total_points'  => $user->total_points,
                'score'         => $user->workReadinessScore?->score,
            ],
            'projects' => $projects,
            'badges'   => $badges,
        ]);
    }

    public function index()
    {
        return Inertia::render('Profile/Portfolio', [
            'projects' => auth()->user()->portfolioProjects()->orderByDesc('created_at')->get(),
            'user'     => auth()->user()->load(['badges','workReadinessScore','profile']),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'required|string|max:100',
            'description' => 'required|string|max:500',
            'github_url'  => 'required|url|starts_with:https://github.com',
            'demo_url'    => 'nullable|url',
            'tech_stack'  => 'required|array|min:1',
            'visibility'  => 'in:public,private',
        ]);

        $githubData = $this->github->verifyRepo($request->github_url);

        PortfolioProject::create([
            'user_id'        => auth()->id(),
            'title'          => $request->title,
            'description'    => $request->description,
            'github_url'     => $request->github_url,
            'demo_url'       => $request->demo_url,
            'tech_stack'     => $request->tech_stack,
            'visibility'     => $request->visibility ?? 'public',
            'github_verified'=> $githubData['verified'] ?? false,
            'github_stars'   => $githubData['stars'] ?? 0,
            'thumbnail_url'  => $githubData['og_image'] ?? null,
            'verified_at'    => ($githubData['verified'] ?? false) ? now() : null,
        ]);

        $newBadges = $this->badgeService->checkAndAwardBadges(auth()->user());
        
        $msg = ($githubData['verified'] ?? false)
            ? 'Project ditambahkan dan GitHub repo terverifikasi ✓'
            : 'Project ditambahkan. GitHub repo belum bisa diverifikasi — pastikan repo public.';

        return back()
            ->with('success', $msg)
            ->with('new_badges', $newBadges);
    }

    public function destroy(PortfolioProject $project)
    {
        if ($project->user_id !== auth()->id()) abort(403);
        $project->delete();
        return back()->with('success', 'Project dihapus.');
    }
}
