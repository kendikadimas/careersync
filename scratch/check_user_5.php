<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\UserProfile;

$profile = UserProfile::where('user_id', 5)->first();
if ($profile) {
    echo "User ID: " . $profile->user_id . "\n";
    echo "Skill Gaps: " . json_encode($profile->skill_gaps, JSON_PRETTY_PRINT) . "\n";
} else {
    echo "No profile found for user 5\n";
}
