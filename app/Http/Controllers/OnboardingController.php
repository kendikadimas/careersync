<?php

namespace App\Http\Controllers;

use App\Models\UserProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OnboardingController extends Controller
{
    public function index()
    {
        $profile = UserProfile::where('user_id', auth()->id())->first();
        if ($profile && $profile->onboarding_completed) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('Onboarding');
    }

    public function store(Request $request)
    {
        $request->validate([
            'career_target' => 'required|string',
            'skills' => 'array',
        ]);

        UserProfile::updateOrCreate(
            ['user_id' => auth()->id()],
            [
                'career_target' => $request->career_target,
                'skills' => $request->skills ?? [],
                'onboarding_completed' => true
            ]
        );

        return redirect()->route('dashboard')->with('success', 'Onboarding selesai! Selamat datang.');
    }
}
