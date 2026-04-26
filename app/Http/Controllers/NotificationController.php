<?php

namespace App\Http\Controllers;

use App\Models\UserNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NotificationController extends Controller
{
    public function index(Request $request): Response
    {
        $notifications = UserNotification::where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return Inertia::render('Notifications', [
            'notifications' => $notifications,
        ]);
    }

    public function markRead(Request $request, UserNotification $notification)
    {
        if ($notification->user_id !== $request->user()->id) {
            abort(403);
        }

        $notification->update(['read_at' => now()]);

        return back()->with('success', 'Notifikasi ditandai sudah dibaca.');
    }
}
