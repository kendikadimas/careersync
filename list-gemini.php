<?php
$context = stream_context_create([
    'http' => [
        'ignore_errors' => true
    ],
    'ssl' => [
        'verify_peer' => false,
        'verify_peer_name' => false,
    ],
]);
$apiKey = 'AIzaSyBLcf6J1ecgqVVjZkzrtNxxLjQl5cm691c';
$res = file_get_contents("https://generativelanguage.googleapis.com/v1beta/models?key={$apiKey}", false, $context);
$data = json_decode($res, true);

if (isset($data['models'])) {
    foreach ($data['models'] as $m) {
        if (strpos($m['name'], 'gemini') !== false) {
            echo $m['name'] . "\n";
            echo "   Methods: " . implode(', ', $m['supportedGenerationMethods']) . "\n";
        }
    }
} else {
    echo $res;
}
