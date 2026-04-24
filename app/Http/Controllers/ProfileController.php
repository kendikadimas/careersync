<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'profile' => $request->user()->profile,
            'roles' => [
                'Frontend Engineer', 'Backend Engineer', 'Data Scientist', 'Mobile Developer',
                'UI/UX Designer', 'Graphic Designer', 'Social Media Specialist', 'Content Writer',
                'Project Manager', 'HR Specialist', 'Accountant', 'Financial Analyst',
                'English Teacher', 'Chef / Cook', 'Barista'
            ]
        ]);
    }

    /**
     * Update the user's career profile.
     */
    public function updateCareer(Request $request): RedirectResponse
    {
        $request->validate([
            'career_target' => 'required|array',
            'skills' => 'array',
        ]);

        $request->user()->profile()->update([
            'career_target' => $request->career_target,
            'skills' => $request->skills,
        ]);

        return Redirect::route('profile.edit')->with('success', 'Profil karir berhasil diperbarui!');
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
