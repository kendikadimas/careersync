<?php

use App\Http\Controllers\{PublicController, DemoController, DashboardController, AnalysisController, RoadmapController, MarketController, OnboardingController, WorkReadinessController, ProfileController};
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
        Route::patch('/roadmap/milestone/{id}/complete', [RoadmapController::class, 'complete'])->name('roadmap.complete');

        // Market
        Route::get('/market', [MarketController::class, 'index'])->name('market');

        // Score
        Route::post('/score/calculate', [WorkReadinessController::class, 'calculate'])->name('score.calculate');
    });

    // Onboarding (exclude from onboarding middleware to prevent infinite redirect)
    Route::get('/onboarding', [OnboardingController::class, 'index'])->name('onboarding');
    Route::post('/onboarding', [OnboardingController::class, 'store'])->name('onboarding.store');

    // Default Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
