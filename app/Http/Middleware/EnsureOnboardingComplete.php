<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureOnboardingComplete
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && (!$user->profile || !$user->profile->onboarding_completed)) {
            // Allow onboarding related routes
            if (!$request->routeIs('onboarding*') && !$request->routeIs('logout') && !$request->routeIs('demo')) {
                return redirect()->route('onboarding');
            }
        }

        return $next($request);
    }
}
