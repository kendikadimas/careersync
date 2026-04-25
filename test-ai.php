<?php

use App\Services\GeminiService;

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$svc = app(GeminiService::class);
$res = $svc->parseCV('Skills: React, Laravel, PHP. Experience: Intern at Google.', 'Software Engineer');

header('Content-Type: application/json');
echo json_encode([
    'status' => count($res) > 0 ? 'SUCCESS' : 'EMPTY_RESULT',
    'data' => $res
]);
