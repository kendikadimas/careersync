<?php

namespace App\Http\Controllers;

use App\Models\UserSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    public function index(Request $request): Response
    {
        $settings = UserSetting::firstOrCreate(
            ['user_id' => $request->user()->id],
            [
                'email_notifications' => true,
                'product_updates' => true,
                'weekly_summary' => true,
                'language' => 'id',
                'timezone' => 'Asia/Jakarta',
            ]
        );

        return Inertia::render('Settings', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'email_notifications' => 'boolean',
            'product_updates' => 'boolean',
            'weekly_summary' => 'boolean',
            'language' => 'string|max:10',
            'timezone' => 'string|max:64',
        ]);

        $settings = UserSetting::firstOrCreate(['user_id' => $request->user()->id]);
        $settings->update($data);

        return back()->with('success', 'Settings berhasil diperbarui.');
    }
}
