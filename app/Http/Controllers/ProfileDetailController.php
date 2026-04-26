<?php

namespace App\Http\Controllers;

use App\Models\UserProfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileDetailController extends Controller
{
    public function index(Request $request): Response
    {
        $profile = UserProfile::firstOrCreate(
            ['user_id' => $request->user()->id],
            ['career_target' => '', 'skills' => []]
        );

        return Inertia::render('ProfileDetail', [
            'profile' => $profile,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'headline' => 'nullable|string|max:120',
            'bio' => 'nullable|string',
            'location' => 'nullable|string|max:120',
            'phone' => 'nullable|string|max:40',
            'linkedin' => 'nullable|string|max:180',
            'github' => 'nullable|string|max:180',
        ]);

        $profile = UserProfile::firstOrCreate(
            ['user_id' => $request->user()->id],
            ['career_target' => '', 'skills' => []]
        );

        $profile->update($data);

        return back()->with('success', 'Detail profil berhasil diperbarui.');
    }
}
