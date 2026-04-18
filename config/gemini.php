<?php

return [
    /**
     * API Key from Google AI Studio
     */
    'api_key' => env('GEMINI_API_KEY'),

    /**
     * Default model to use
     */
    'model' => env('GEMINI_MODEL', 'gemini-1.5-flash'),
];
