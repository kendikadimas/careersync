<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <meta name="description" content="Kembangin: Platform EdTech adaptive yang menyelaraskan skill kamu dengan data pasar kerja IT Indonesia secara real-time.">
        <meta name="theme-color" content="#0f172a">

        <!-- Fonts: Geist for modern look -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx'])
        <x-inertia::head>
            <title>{{ config('app.name', 'Kembangin') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased text-navy-900">
        <x-inertia::app />
    </body>
</html>
