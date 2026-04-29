<?php

use App\Http\Controllers\{PublicController, DemoController, DashboardController, AnalysisController, RoadmapController, MarketController, OnboardingController, WorkReadinessController, ProfileController, SettingsController, NotificationController, ProfileDetailController, HelpCenterController};
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Application;

// Public routes — tidak butuh login
Route::get('/', [PublicController::class, 'landing'])->name('home');
Route::get('/features', [PublicController::class, 'features'])->name('features');
Route::get('/how-it-works', [PublicController::class, 'howItWorks'])->name('how-it-works');
Route::get('/about', [PublicController::class, 'about'])->name('about');
Route::get('/blog', [PublicController::class, 'blog'])->name('blog');
Route::get('/blog/{slug}', [PublicController::class, 'blogPost'])->name('blog.post');
Route::get('/faq', [PublicController::class, 'faq'])->name('faq');

// Demo route — tidak butuh login, tampilkan semua fitur dengan data dummy
Route::get('/demo', [DemoController::class, 'index'])->name('demo');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware(['onboarding'])->group(function() {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Analysis
        Route::get('/analysis', [AnalysisController::class, 'index'])->name('analysis');
        Route::post('/analysis/cv', [AnalysisController::class, 'store'])->name('analysis.store');

        // Roadmap
        Route::get('/roadmap', [RoadmapController::class, 'index'])->name('roadmap');
        Route::post('/roadmap/generate', [RoadmapController::class, 'generate'])->name('roadmap.generate');
        Route::get('/roadmap/{roadmapId}/milestone/{milestoneId}/details', [RoadmapController::class, 'getMilestoneDetails'])->name('roadmap.milestone.details');
        Route::patch('/roadmap/milestone/{id}/complete', [RoadmapController::class, 'complete'])->name('roadmap.complete');

        // Capstone
        Route::get('/roadmap/{roadmapId}/capstone/{milestoneId}', [\App\Http\Controllers\CapstoneController::class, 'show'])->name('capstone.show');
        Route::post('/roadmap/{roadmapId}/capstone/{milestoneId}', [\App\Http\Controllers\CapstoneController::class, 'submit'])->name('capstone.submit');

        // Market
        Route::get('/market', [MarketController::class, 'index'])->name('market');
        Route::post('/market/set-target', [MarketController::class, 'setTarget'])->name('market.set-target');

        // Help Center
        Route::get('/app-faq', [HelpCenterController::class, 'faq'])->name('app.faq');
        Route::get('/help', [HelpCenterController::class, 'help'])->name('help');

        // Score
        Route::post('/score/calculate', [WorkReadinessController::class, 'calculate'])->name('score.calculate');
    });

    // Onboarding (exclude from onboarding middleware to prevent infinite redirect)
    Route::get('/onboarding', [OnboardingController::class, 'index'])->name('onboarding');
    Route::post('/onboarding', [OnboardingController::class, 'store'])->name('onboarding.store');

    // Default Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/career', [ProfileController::class, 'updateCareer'])->name('profile.career.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Settings
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::put('/settings', [SettingsController::class, 'update'])->name('settings.update');

    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::patch('/notifications/{notification}/read', [NotificationController::class, 'markRead'])->name('notifications.read');

    // Profile Details
    Route::get('/profile/details', [ProfileDetailController::class, 'index'])->name('profile.details');
    Route::put('/profile/details', [ProfileDetailController::class, 'update'])->name('profile.details.update');

    // Insights
    Route::get('/insights', [\App\Http\Controllers\InsightController::class, 'index'])->name('insights.index');
    Route::post('/insights/regenerate', [\App\Http\Controllers\InsightController::class, 'regenerate'])->name('insights.regenerate');
    Route::post('/insights/generate-dashboard', [\App\Http\Controllers\InsightController::class, 'generateForDashboard'])->name('insights.generate_dashboard');

    // Leaderboard
    Route::get('/leaderboard', [\App\Http\Controllers\LeaderboardController::class, 'index'])->name('leaderboard');
    Route::post('/leaderboard/toggle-opt-in', [\App\Http\Controllers\LeaderboardController::class, 'toggleOptIn'])->name('leaderboard.opt-in');

    // Portfolio
    Route::get('/portfolio', [\App\Http\Controllers\PortfolioController::class, 'index'])->name('portfolio.index');
    Route::post('/portfolio', [\App\Http\Controllers\PortfolioController::class, 'store'])->name('portfolio.store');
    Route::delete('/portfolio/{project}', [\App\Http\Controllers\PortfolioController::class, 'destroy'])->name('portfolio.destroy');

    // GitHub Verification
    Route::get('/capstone/verify-github', function(\Illuminate\Http\Request $req) {
        $url = $req->query('url');
        if (!$url || !str_starts_with($url, 'https://github.com')) {
            return response()->json(['verified' => false, 'fail_reason' => 'URL tidak valid']);
        }
        return response()->json(app(\App\Services\GitHubVerificationService::class)->verifyRepo($url));
    })->name('capstone.verify-github');
});

Route::get('/profile/{userId}', [\App\Http\Controllers\PortfolioController::class, 'publicProfile'])->name('profile.public');

require __DIR__.'/auth.php';
