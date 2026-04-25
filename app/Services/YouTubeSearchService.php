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
     * Cari video YouTube bahasa Indonesia untuk topik tertentu
     * Prioritaskan channel populer Indonesia yang relevan dengan IT
     */
    public function searchForSkill(string $skillName, string $context = ''): array
    {
        // Cache per topik — hemat quota API
        $cacheKey = 'yt_' . md5($skillName . $context);

        return Cache::remember($cacheKey, now()->addDays(7), function () use ($skillName, $context) {
            // Query bahasa Indonesia untuk hasil yang lebih relatable
            $query = trim($skillName . ' tutorial bahasa indonesia ' . $context);

            if (empty($this->apiKey)) {
                return $this->getFallbackResources($skillName);
            }

            $response = Http::withoutVerifying()->get($this->baseUrl, [
                'part'          => 'snippet',
                'q'             => $query,
                'type'          => 'video',
                'maxResults'    => 4,
                'relevanceLanguage' => 'id',
                'regionCode'    => 'ID',
                'key'           => $this->apiKey,
                // Filter channel populer IT Indonesia
                'videoCategoryId' => '28', // Science & Technology
            ]);

            if (!$response->successful()) {
                \Illuminate\Support\Facades\Log::error('YouTube API Error: ' . $response->body());
                return $this->getFallbackResources($skillName);
            }

            $items = $response->json('items', []);

            if (empty($items)) {
                return $this->getFallbackResources($skillName);
            }

            $resources = [];
            foreach ($items as $item) {
                $videoId = $item['id']['videoId'] ?? null;
                if (!$videoId) continue;

                $channelTitle = $item['snippet']['channelTitle'] ?? 'YouTube';
                $title = $item['snippet']['title'] ?? $skillName . ' Tutorial';

                $resources[] = [
                    'title'       => html_entity_decode($title),
                    'url'         => 'https://www.youtube.com/watch?v=' . $videoId,
                    'type'        => 'youtube',
                    'channel'     => $channelTitle,
                    'thumbnail'   => $item['snippet']['thumbnails']['medium']['url'] ?? null,
                    'is_free'     => true,
                    'language'    => 'id',
                    'verified'    => true, // URL ini pasti valid karena dari API
                ];
            }

            // Tambahkan 1 artikel Google sebagai pelengkap
            $article = $this->searchArticle($skillName);
            if ($article) {
                $resources[] = $article;
            }

            return array_filter($resources);
        });
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
