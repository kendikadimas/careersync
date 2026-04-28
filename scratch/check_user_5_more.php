<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\UserProfile;

$profile = UserProfile::where('user_id', 5)->first();
if ($profile) {
    echo "User ID: " . $profile->user_id . "\n";
    echo "Career Paths count: " . (is_array($profile->career_paths) ? count($profile->career_paths) : "null") . "\n";
    echo "Smart Tips: " . ($profile->smart_tips ?: "null") . "\n";
    echo "Skills count: " . (is_array($profile->skills) ? count($profile->skills) : "null") . "\n";
} else {
    echo "No profile found for user 5\n";
}
