<?php

return [
    /**
     * API Key from Google AI Studio
     */
    'api_key' => env('GEMINI_API_KEY'),

    /**
     * Default model to use
     */
    'model' => env('GEMINI_MODEL', 'gemini-2.0-flash'),

    /**
     * Fallback models (comma-separated in .env)
     */
    'fallback_models' => array_filter(array_map('trim', explode(',', env(
        'GEMINI_FALLBACK_MODELS',
        'gemini-2.0-flash-lite,gemini-flash-latest,gemini-flash-lite-latest,gemini-2.5-flash'
    )))),
];
