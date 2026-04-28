<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\UserProfile;

$profile = UserProfile::where('user_id', 1)->first();
if ($profile) {
    echo "User ID: " . $profile->user_id . "\n";
    echo "Skill Gaps: " . (is_array($profile->skill_gaps) ? count($profile->skill_gaps) : "null") . "\n";
    if (is_array($profile->skill_gaps)) {
        foreach (array_slice($profile->skill_gaps, 0, 3) as $gap) {
            echo " - " . ($gap['skill'] ?? 'unknown') . ": " . ($gap['user_score'] ?? 0) . "/" . ($gap['market_demand'] ?? 0) . "\n";
        }
    }
    echo "AI Insights: " . ($profile->ai_insights ? "yes" : "no") . "\n";
    echo "Career Paths: " . (is_array($profile->career_paths) ? count($profile->career_paths) : "null") . "\n";
} else {
    echo "No profile found for user 1\n";
}
