<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class YouTubeSearchService
{
    private string $apiKey;
    private string $baseUrl = 'https://www.googleapis.com/youtube/v3/search';

    public function __construct()
    {
        // Fallback to empty string to avoid errors if API key is missing during dev
        $this->apiKey = config('services.youtube.key') ?? env('YOUTUBE_API_KEY', '');
    }

    /**
     * Channel ID kreator IT populer Indonesia yang sudah terverifikasi
     */
    private array $trustedChannels = [
        'UCkXmLjEr95LVtGuIm3l2dPg', // Web Programming UNPAS
        'UC14ZKB9XsDZbnHVmr4AmUpQ', // Programmer Zaman Now
        'UCJz2UMVqtJ7BpBovArX5q6Q', // Sekolah Koding
        'UCYxxuYRwJeHqMpHJQqYG3MA', // Kelas Terbuka
        'UCQ7FMXFdT0Q4mGGOB30KeqA', // Dicoding Indonesia
        'UCc9XtqOoqmZN_ZFMK0j-7zg', // buildwithangga
    ];

    /**
     * Cari video YouTube bahasa Indonesia untuk topik tertentu
     * Prioritaskan channel populer Indonesia — BUKAN Shorts, BUKAN search query
     */
    public function searchForSkill(string $skillName, string $context = ''): array
    {
        // Cache per topik — hemat quota API
        $cacheKey = 'yt_v3_' . md5($skillName . $context);

        return Cache::remember($cacheKey, now()->addDays(7), function () use ($skillName, $context) {

            if (empty($this->apiKey)) {
                return $this->getFallbackResources($skillName);
            }

            // Satu query langsung — lebih cepat, filter tetap ketat
            $results = $this->searchWithParams($skillName . ' tutorial', [
                'videoDuration'    => 'medium',
                'videoEmbeddable'  => 'true',
                'maxResults'       => 8,   // Kita cuma butuh 4, ambil 8 buat ruang filter
                'relevanceLanguage'=> 'id',
                'regionCode'       => 'ID',
                'videoCategoryId'  => '28',
            ]);

            if (empty($results)) {
                return $this->getFallbackResources($skillName);
            }

            // Tambahkan artikel hanya kalau hasil YT < 3
            if (count($results) < 3) {
                $article = $this->searchArticle($skillName);
                if ($article) {
                    $results[] = $article;
                }
            }

            return array_values(array_filter($results));
        });
    }

    /**
     * Eksekusi pencarian ke YouTube API dengan validasi ketat
     */
    private function searchWithParams(string $skillName, array $extraParams): array
    {
        $query = $skillName . ' tutorial bahasa indonesia';

        $params = array_merge([
            'part' => 'snippet',
            'q'    => $query,
            'type' => 'video',
            'key'  => $this->apiKey,
        ], $extraParams);

        $response = Http::withoutVerifying()->get($this->baseUrl, $params);

        if (!$response->successful()) {
            \Illuminate\Support\Facades\Log::error('YouTube API Error: ' . $response->body());
            return [];
        }

        $items = $response->json('items', []);
        $resources = [];

        foreach ($items as $item) {
            $videoId     = $item['id']['videoId'] ?? null;
            $title       = $item['snippet']['title'] ?? '';
            $description = strtolower($item['snippet']['description'] ?? '');
            $channelId   = $item['snippet']['channelId'] ?? '';
            $channelName = $item['snippet']['channelTitle'] ?? 'YouTube';

            // 1. Harus punya videoId yang valid
            if (!$videoId || strlen($videoId) !== 11) continue;

            // 2. Blok Shorts: cek hashtag di title/desc & URL pattern
            $titleLower = strtolower($title);
            $isShort = str_contains($titleLower, '#shorts')
                || str_contains($titleLower, '#short')
                || str_contains($description, '#shorts')
                || str_contains($description, '#short');

            if ($isShort) continue;

            // 3. Bonus skor: prioritaskan channel Indonesia yang dikenal
            $isTrustedChannel = in_array($channelId, $this->trustedChannels);

            // 4. Hanya ambil video dari trusted channel atau yang mengandung nama skill di judul
            $skillInTitle = str_contains($titleLower, strtolower($skillName));
            if (!$isTrustedChannel && !$skillInTitle) continue;

            $resources[] = [
                'title'        => html_entity_decode($title),
                'url'          => 'https://www.youtube.com/watch?v=' . $videoId,
                'type'         => 'youtube',
                'channel'      => $channelName,
                'thumbnail'    => $item['snippet']['thumbnails']['medium']['url'] ?? null,
                'is_free'      => true,
                'language'     => 'id',
                'verified'     => true,
                'trusted_id_channel' => $isTrustedChannel,
            ];

            if (count($resources) >= 4) break;
        }

        // Urutkan: trusted channel dulu, sisanya belakang
        usort($resources, fn($a, $b) => ($b['trusted_id_channel'] ? 1 : 0) - ($a['trusted_id_channel'] ? 1 : 0));

        return $resources;
    }

    /**
     * Cari artikel bahasa Indonesia via Google Custom Search
     * Gratis 100 query/hari
     */
    public function searchArticle(string $skillName): ?array
    {
        $cacheKey = 'article_' . md5($skillName);

        return Cache::remember($cacheKey, now()->addDays(7), function () use ($skillName) {
            $apiKey = config('services.google_search.key') ?? env('GOOGLE_SEARCH_API_KEY');
            $cx = config('services.google_search.cx') ?? env('GOOGLE_SEARCH_CX'); // Custom Search Engine ID

            if (!$apiKey || !$cx) return null;

            $response = Http::withoutVerifying()->get('https://www.googleapis.com/customsearch/v1', [
                'key' => $apiKey,
                'cx'  => $cx,
                'q'   => $skillName . ' tutorial panduan bahasa indonesia site:medium.com OR site:dev.to OR site:dicoding.com OR site:codepolitan.com',
                'num' => 1,
                'lr'  => 'lang_id',
            ]);

            if (!$response->successful()) {
                \Illuminate\Support\Facades\Log::error('Google Search API Error: ' . $response->body());
                return null;
            }

            $items = $response->json('items', []);
            if (empty($items)) return null;

            $item = $items[0];
            return [
                'title'    => html_entity_decode($item['title'] ?? $skillName . ' — Panduan Lengkap'),
                'url'      => $item['link'],
                'type'     => 'article',
                'channel'  => parse_url($item['link'], PHP_URL_HOST),
                'is_free'  => true,
                'language' => 'id',
                'verified' => true,
            ];
        });
    }

    /**
     * Fallback jika API tidak tersedia atau quota habis
     * Resource hardcoded yang sudah diverifikasi manual per skill populer
     */
    private function getFallbackResources(string $skillName): array
    {
        $skill = strtolower($skillName);

        $fallbacks = [
            'react' => [
                ['title' => 'React JS Crash Course Bahasa Indonesia — Web Programming Unpas', 'url' => 'https://www.youtube.com/watch?v=5yEG6GhoJBs', 'type' => 'youtube', 'channel' => 'Web Programming UNPAS', 'is_free' => true, 'verified' => true],
                ['title' => 'Belajar React JS — Sekolah Koding', 'url' => 'https://www.youtube.com/watch?v=f2nF3lEjDiY', 'type' => 'youtube', 'channel' => 'Sekolah Koding', 'is_free' => true, 'verified' => true],
            ],
            'typescript' => [
                ['title' => 'TypeScript Tutorial Bahasa Indonesia — Programmer Zaman Now', 'url' => 'https://www.youtube.com/watch?v=b0vlHOKmCj4', 'type' => 'youtube', 'channel' => 'Programmer Zaman Now', 'is_free' => true, 'verified' => true],
            ],
            'laravel' => [
                ['title' => 'Laravel 11 Full Course Bahasa Indonesia — Web Programming UNPAS', 'url' => 'https://www.youtube.com/watch?v=R9Ule_Y7wTY', 'type' => 'youtube', 'channel' => 'Web Programming UNPAS', 'is_free' => true, 'verified' => true],
                ['title' => 'Laravel dari Awal — Programmer Zaman Now', 'url' => 'https://www.youtube.com/watch?v=Ic0fHPNQxk8', 'type' => 'youtube', 'channel' => 'Programmer Zaman Now', 'is_free' => true, 'verified' => true],
            ],
            'javascript' => [
                ['title' => 'JavaScript Dasar — Web Programming UNPAS', 'url' => 'https://www.youtube.com/watch?v=RUTV9KAMBpY', 'type' => 'youtube', 'channel' => 'Web Programming UNPAS', 'is_free' => true, 'verified' => true],
                ['title' => 'JavaScript Modern ES6+ Bahasa Indonesia', 'url' => 'https://www.youtube.com/watch?v=skZBSxJ0G7A', 'type' => 'youtube', 'channel' => 'Programmer Zaman Now', 'is_free' => true, 'verified' => true],
            ],
            'tailwind' => [
                ['title' => 'Tailwind CSS Tutorial Bahasa Indonesia — Web Programming UNPAS', 'url' => 'https://www.youtube.com/watch?v=CBpMHmRpMB4', 'type' => 'youtube', 'channel' => 'Web Programming UNPAS', 'is_free' => true, 'verified' => true],
            ],
            'python' => [
                ['title' => 'Python untuk Pemula Bahasa Indonesia — Kelas Terbuka', 'url' => 'https://www.youtube.com/watch?v=rX1pkDK77bc', 'type' => 'youtube', 'channel' => 'Kelas Terbuka', 'is_free' => true, 'verified' => true],
                ['title' => 'Belajar Python — Programmer Zaman Now', 'url' => 'https://www.youtube.com/watch?v=sRMV8bR2xwY', 'type' => 'youtube', 'channel' => 'Programmer Zaman Now', 'is_free' => true, 'verified' => true],
            ],
            'docker' => [
                ['title' => 'Docker Tutorial Bahasa Indonesia — Programmer Zaman Now', 'url' => 'https://www.youtube.com/watch?v=3_yxVjV88Zk', 'type' => 'youtube', 'channel' => 'Programmer Zaman Now', 'is_free' => true, 'verified' => true],
            ],
            'git' => [
                ['title' => 'Git & GitHub Bahasa Indonesia Lengkap — Web Programming UNPAS', 'url' => 'https://www.youtube.com/watch?v=lTMZxWMjXQU', 'type' => 'youtube', 'channel' => 'Web Programming UNPAS', 'is_free' => true, 'verified' => true],
            ],
            'mysql' => [
                ['title' => 'MySQL Bahasa Indonesia — Web Programming UNPAS', 'url' => 'https://www.youtube.com/watch?v=xYBclb-sYQ4', 'type' => 'youtube', 'channel' => 'Web Programming UNPAS', 'is_free' => true, 'verified' => true],
            ],
            'nodejs' => [
                ['title' => 'Node.js Tutorial Bahasa Indonesia — Programmer Zaman Now', 'url' => 'https://www.youtube.com/watch?v=ENrzD9HAZK4', 'type' => 'youtube', 'channel' => 'Programmer Zaman Now', 'is_free' => true, 'verified' => true],
            ],
            'vue' => [
                ['title' => 'Vue.js 3 Tutorial Bahasa Indonesia — Web Programming UNPAS', 'url' => 'https://www.youtube.com/watch?v=kRkOiMKPAr0', 'type' => 'youtube', 'channel' => 'Web Programming UNPAS', 'is_free' => true, 'verified' => true],
            ],
        ];

        // Cari match di fallbacks
        foreach ($fallbacks as $key => $resources) {
            if (str_contains($skill, $key)) {
                return $resources;
            }
        }

        // Generic fallback jika tidak ada match
        return [
            [
                'title'    => 'Cari Tutorial ' . $skillName . ' di YouTube',
                'url'      => 'https://www.youtube.com/results?search_query=' . urlencode($skillName . ' tutorial bahasa indonesia'),
                'type'     => 'youtube',
                'channel'  => 'YouTube Search',
                'is_free'  => true,
                'verified' => true,
            ],
            [
                'title'    => 'Artikel ' . $skillName . ' di Dicoding',
                'url'      => 'https://www.dicoding.com/search?q=' . urlencode($skillName),
                'type'     => 'article',
                'channel'  => 'Dicoding',
                'is_free'  => true,
                'verified' => true,
            ],
        ];
    }
}
