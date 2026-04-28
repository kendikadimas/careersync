<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\UserProfile;

$profiles = UserProfile::all();
echo "Total profiles: " . $profiles->count() . "\n";
foreach ($profiles as $profile) {
    echo "User ID: " . $profile->user_id . "\n";
    echo " - Skill Gaps: " . (is_array($profile->skill_gaps) ? count($profile->skill_gaps) : "null") . "\n";
}
