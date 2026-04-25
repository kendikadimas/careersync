<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$kernel->handle(Illuminate\Http\Request::capture());

$apiKey = config('gemini.api_key');
$url = "https://generativelanguage.googleapis.com/v1beta/models?key={$apiKey}";
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$res = curl_exec($ch);
if(curl_errno($ch)) { echo 'Curl error: ' . curl_error($ch); }
echo $res;
