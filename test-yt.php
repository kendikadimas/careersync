<?php
// test-yt.php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$kernel->handle(Illuminate\Http\Request::capture());

use App\Services\YouTubeSearchService;
use Illuminate\Support\Facades\Http;

$key = config('services.youtube.key');
echo "Mengetes API Key: " . substr($key, 0, 5) . "********\n";

$service = new YouTubeSearchService();
try {
    $results = $service->searchForSkill('Laravel 11 Indonesia');
    if (!empty($results)) {
        echo "✅ API BERHASIL! Ditemukan " . count($results) . " video.\n";
        foreach ($results as $v) {
            echo "- " . $v['title'] . " (URL: " . $v['url'] . ")\n";
        }
    } else {
        echo "❌ API BERHASIL tapi hasil KOSONG. Coba ganti query.\n";
    }
} catch (\Exception $e) {
    echo "🔴 API GAGAL! Error: " . $e->getMessage() . "\n";
}
