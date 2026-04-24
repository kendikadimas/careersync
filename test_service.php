<?php

use App\Services\GeminiService;
use Illuminate\Support\Facades\Log;

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$service = new GeminiService();

echo "Testing GeminiService with fallback logic...\n";

try {
    // Testing with a simple prompt indirectly through the existing logic or just calling callGeminiApi if possible
    // Since callGeminiApi is private, I'll use a public method like parseCV with dummy data
    // Or I'll use Reflection for testing purposes
    
    $reflection = new ReflectionClass($service);
    $method = $reflection->getMethod('callGeminiApi');
    $method->setAccessible(true);
    
    $result = $method->invoke($service, "Say HELLO exactly");
    echo "SUCCESS! Response: " . $result . "\n";
    
} catch (\Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
