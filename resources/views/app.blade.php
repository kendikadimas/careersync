<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <meta name="description" content="Career-Sync Academy: Platform EdTech adaptive yang menyelaraskan skill kamu dengan data pasar kerja IT Indonesia secara real-time.">
        <meta name="theme-color" content="#0f172a">

        <!-- Fonts: Inter & Outfit for premium look -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@400;600;800;900&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx'])
        <x-inertia::head>
            <title>{{ config('app.name', 'Career-Sync Academy') }}</title>
        </x-inertia::head>
        
        <style>
            body { font-family: 'Inter', sans-serif; }
            h1, h2, h3, h4, h5, h6 { font-family: 'Outfit', sans-serif; }
        </style>
    </head>
    <body class="font-sans antialiased text-navy-900">
        <x-inertia::app />
    </body>
</html>
