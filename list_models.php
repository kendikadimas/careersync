<?php
$key = 'AIzaSyBLcf6J1ecgqVVjZkzrtNxxLjQl5cm691c';
$ctx = stream_context_create(['ssl' => ['verify_peer' => false, 'verify_peer_name' => false]]);

// List models from v1beta
$r = @file_get_contents("https://generativelanguage.googleapis.com/v1beta/models?key={$key}", false, $ctx);
$d = json_decode($r, true);

if (!$d || !isset($d['models'])) {
    echo "ERROR: Could not fetch models list.\n";
    echo $r . "\n";
    exit(1);
}

echo "=== Flash & Gemini-3 models (v1beta) ===\n\n";
$flashModels = [];
foreach ($d['models'] as $m) {
    $name = $m['name'];
    if (stripos($name, 'flash') !== false || stripos($name, 'gemini-3') !== false) {
        $methods = implode(', ', $m['supportedGenerationMethods'] ?? []);
        $supportsGenerate = in_array('generateContent', $m['supportedGenerationMethods'] ?? []);
        $tag = $supportsGenerate ? '[OK generateContent]' : '[NO generateContent]';
        echo str_pad($name, 50) . " {$tag}  methods: {$methods}\n";
        if ($supportsGenerate) {
            $flashModels[] = str_replace('models/', '', $name);
        }
    }
}

echo "\n=== Testing generateContent with each model ===\n\n";

// Test each model that supports generateContent
$testPrompt = 'Reply with exactly: HELLO';

foreach ($flashModels as $model) {
    // Try v1beta first, then v1
    foreach (['v1beta', 'v1'] as $version) {
        $url = "https://generativelanguage.googleapis.com/{$version}/models/{$model}:generateContent?key={$key}";
        $payload = json_encode([
            'contents' => [['parts' => [['text' => $testPrompt]]]],
        ]);

        $opts = [
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/json\r\n",
                'content' => $payload,
                'timeout' => 15,
            ],
            'ssl' => ['verify_peer' => false, 'verify_peer_name' => false],
        ];
        $c = stream_context_create($opts);
        $resp = @file_get_contents($url, false, $c);
        $data = json_decode($resp, true);

        if (isset($data['candidates'][0]['content']['parts'][0]['text'])) {
            $reply = trim($data['candidates'][0]['content']['parts'][0]['text']);
            echo "[PASS] {$model} ({$version}) => \"{$reply}\"\n";
            break; // no need to test v1 if v1beta works
        } else {
            $err = $data['error']['message'] ?? 'unknown error';
            echo "[FAIL] {$model} ({$version}) => {$err}\n";
        }
    }
}
