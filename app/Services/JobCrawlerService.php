<?php

namespace App\Services;

use App\Models\ScrapedJob;
use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

class JobCrawlerService
{
    protected $client;
    protected $gemini;

    // Constants for sources
    const SOURCE_ARBEITNOW = 'Arbeitnow';
    const SOURCE_JSEARCH = 'JSearch';
    const SOURCE_JOBS_API = 'JobsAPI';
    const SOURCE_LINKEDIN = 'LinkedInAPI';

    public function __construct(GeminiService $gemini)
    {
        $this->client = new Client([
            'timeout' => 30,
            'verify' => false,
            'headers' => [
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            ]
        ]);
        $this->gemini = $gemini;
    }

    /**
     * Fungsi utama untuk menjalankan crawling.
     */
    public function crawl(string $source = self::SOURCE_ARBEITNOW): array
    {
        Log::info("Memulai proses Industry-Data Crawler menggunakan sumber: {$source}...");
        $stats = ['platform' => $source, 'found' => 0, 'saved' => 0, 'errors' => 0, 'http_status' => 'N/A'];

        try {
            $result = match($source) {
                self::SOURCE_ARBEITNOW => $this->scrapeArbeitnow(),
                self::SOURCE_JSEARCH => $this->fetchFromJSearch(),
                self::SOURCE_JOBS_API => $this->fetchFromJobsApi(),
                self::SOURCE_LINKEDIN => $this->fetchFromLinkedInApi(),
                default => throw new \Exception("Sumber data tidak dikenal"),
            };

            $stats['found'] = $result['found'];
            $stats['saved'] = $result['saved'];
            $stats['errors'] = $result['errors'];
            $stats['http_status'] = $result['http_status'] ?? 'SUCCESS';
            
            Log::info("Proses Industry-Data Crawler {$source} selesai.");
        } catch (\Exception $e) {
            Log::error("Crawler Error ({$source}): " . $e->getMessage());
            $stats['error_msg'] = $e->getMessage();
            $stats['http_status'] = 'EXCEPTION';
        }

        return $stats;
    }

    /**
     * Source: Arbeitnow (Direct Scraping)
     */
    private function scrapeArbeitnow(): array
    {
        $url = "https://www.arbeitnow.com/jobs-in-indonesia";
        $results = ['found' => 0, 'saved' => 0, 'errors' => 0];
        
        try {
            $response = $this->client->get($url);
            $html = (string) $response->getBody();
            $crawler = new Crawler($html);

            $crawler->filter('li.list-none.hover\:shadow-sm')->each(function (Crawler $node) use (&$results) {
                try {
                    $results['found']++;
                    $titleNode = $node->filter('h2 a');
                    if ($titleNode->count() === 0) return;
                    
                    $title = trim($titleNode->text());
                    $companyNode = $node->filter('a[title^="Jobs from"]');
                    $company = $companyNode->count() > 0 ? trim($companyNode->text()) : 'Unknown Company';
                    
                    $sourceUrl = $titleNode->attr('href');
                    if (strpos($sourceUrl, 'http') === false) {
                        $sourceUrl = "https://www.arbeitnow.com" . $sourceUrl;
                    }

                    if ($this->saveJob($title, $company, '', $sourceUrl, 'Arbeitnow')) {
                        $results['saved']++;
                    }
                } catch (\Exception $e) { $results['errors']++; }
            });

            return $results;
        } catch (\Exception $e) {
            throw new \Exception("Gagal scrape Arbeitnow: " . $e->getMessage());
        }
    }

    /**
     * Source: JSearch (RapidAPI)
     */
    private function fetchFromJSearch(): array
    {
        $apiKey = config('services.rapidapi.key');
        $results = ['found' => 0, 'saved' => 0, 'errors' => 0, 'http_status' => 'N/A'];
        
        try {
            $url = 'https://jsearch.p.rapidapi.com/search';
            $response = Http::withoutVerifying()->withHeaders([
                'X-RapidAPI-Key' => $apiKey,
                'X-RapidAPI-Host' => 'jsearch.p.rapidapi.com'
            ])->get($url, [
                'query' => 'software engineer', 
                'country' => 'id',              
                'num_pages' => 1
            ]);

            $results['http_status'] = $response->status();
            if ($response->status() == 403) {
                $results['http_status'] = '403 (SUBSCRIBE)';
                return $results;
            }

            $json = $response->json();
            $data = $json['data'] ?? $json ?? [];
            
            foreach ($data as $job) {
                $results['found']++;
                if ($this->saveJob($job['job_title'] ?? 'N/A', $job['employer_name'] ?? 'N/A', $job['job_description'] ?? '', $job['job_apply_link'] ?? '', 'JSearch')) {
                    $results['saved']++;
                }
            }
        } catch (\Exception $e) { $results['errors']++; $results['http_status'] = 'ERROR'; }
        return $results;
    }

    /**
     * Source: Jobs API by Patrick (RapidAPI)
     */
    private function fetchFromJobsApi(): array
    {
        $apiKey = config('services.rapidapi.key');
        $results = ['found' => 0, 'saved' => 0, 'errors' => 0, 'http_status' => 'N/A'];
        
        try {
            // Updated Endpoint URL: /v2/linkedin/search
            $url = 'https://jobs-api14.p.rapidapi.com/v2/linkedin/search';
            $response = Http::withoutVerifying()->withHeaders([
                'X-RapidAPI-Key' => $apiKey,
                'X-RapidAPI-Host' => 'jobs-api14.p.rapidapi.com'
            ])->get($url, [
                'query' => 'software engineer',
                'location' => 'Indonesia'
            ]);

            $results['http_status'] = $response->status();
            if ($response->status() == 403) {
                $results['http_status'] = '403 (SUBSCRIBE)';
                return $results;
            }

            $json = $response->json();
            $data = $json['jobs'] ?? $json ?? [];

            foreach ($data as $job) {
                $results['found']++;
                if ($this->saveJob($job['title'] ?? 'N/A', $job['company'] ?? 'N/A', $job['description'] ?? '', $job['url'] ?? '', 'JobsAPI')) {
                    $results['saved']++;
                }
            }
        } catch (\Exception $e) { $results['errors']++; $results['http_status'] = 'ERROR'; }
        return $results;
    }

    /**
     * Source: LinkedIn Job Search API (RapidAPI)
     */
    private function fetchFromLinkedInApi(): array
    {
        $apiKey = config('services.rapidapi.key');
        $results = ['found' => 0, 'saved' => 0, 'errors' => 0, 'http_status' => 'N/A'];
        
        try {
            // Updated Endpoint URL: /active-jb-7d
            $url = 'https://linkedin-job-search-api.p.rapidapi.com/active-jb-7d';
            $response = Http::withoutVerifying()->withHeaders([
                'X-RapidAPI-Key' => $apiKey,
                'X-RapidAPI-Host' => 'linkedin-job-search-api.p.rapidapi.com'
            ])->get($url, [
                'keywords' => 'software engineer',
                'location' => 'Indonesia'
            ]);

            $results['http_status'] = $response->status();
            if ($response->status() == 403) {
                $results['http_status'] = '403 (SUBSCRIBE)';
                return $results;
            }

            $json = $response->json();
            // Fantastic.jobs API usually returns the array in 'jobs' or directly
            $data = $json['jobs'] ?? $json ?? [];

            foreach ($data as $job) {
                $results['found']++;
                $title = $job['job_title'] ?? $job['title'] ?? 'N/A';
                $company = $job['company_name'] ?? $job['company'] ?? 'N/A';
                $url = $job['job_url'] ?? $job['url'] ?? '';

                if ($this->saveJob($title, $company, $job['description'] ?? '', $url, 'LinkedInAPI')) {
                    $results['saved']++;
                }
            }
        } catch (\Exception $e) { $results['errors']++; $results['http_status'] = 'ERROR'; }
        return $results;
    }

    private function saveJob($title, $company, $description, $url, $platform): bool
    {
        try {
            if (empty($url)) return false;
            
            // Cek duplikasi (kita trim URL atau gunakan hash jika perlu di masa depan)
            if (ScrapedJob::where('source_url', $url)->exists()) return false;

            ScrapedJob::create([
                'title' => $title,
                'company' => $company,
                'description' => $description,
                'source_url' => $url,
                'source_platform' => $platform,
                'posted_at' => now(),
            ]);
            return true;
        } catch (\Exception $e) {
            Log::error("Gagal simpan job ke database: " . $e->getMessage());
            return false;
        }
    }

    private function fetchDescription(string $url): string
    {
        try {
            $response = $this->client->get($url);
            $html = (string) $response->getBody();
            $crawler = new Crawler($html);
            $selectors = ['.job-description', '[itemprop="description"]', '.content', 'article'];
            foreach ($selectors as $selector) {
                $descNode = $crawler->filter($selector);
                if ($descNode->count() > 0) return trim($descNode->text());
            }
            return '';
        } catch (\Exception $e) { return ''; }
    }
}
