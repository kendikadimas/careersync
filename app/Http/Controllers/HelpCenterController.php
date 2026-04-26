<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class HelpCenterController extends Controller
{
    public function faq(): Response
    {
        return Inertia::render('DashboardFaq', [
            'faqs' => config('faq.items'),
        ]);
    }

    public function help(): Response
    {
        return Inertia::render('Help');
    }
}
