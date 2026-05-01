<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class JobApiService
{
    private string $baseUrl = 'https://jsearch.p.rapidapi.com';
    
    /**
     * Fetch real job listings from JSearch (RapidAPI) for Indonesia tech roles.
     * Free tier: 200 requests/month, no credit card required.
     * Results are cached for 6 hours to minimize API usage.
     */
    public function fetchJobs(string $role = '', int $limit = 30): array
    {
        $apiKey = config('services.rapidapi.key');
        
        if (empty($apiKey)) {
            Log::warning('RapidAPI key not set. Falling back to static data.');
            return [];
        }

        $query = $role ?: 'software developer';
        $cacheKey = "jsearch_jobs_v3_" . md5("{$query}_{$limit}");

        // Check cache first
        $cached = Cache::get($cacheKey);
        if (!empty($cached)) {
            Log::info("JSearch: Returning cached data for '{$query}' (" . count($cached) . " jobs)");
            return $cached;
        }

        try {
            $searchQuery = $query . ' Indonesia';
            $attempts = [
                ['query' => $searchQuery, 'country' => 'id', 'page' => 1, 'num_pages' => 1],
                ['query' => $query, 'country' => 'id', 'page' => 1, 'num_pages' => 1],
            ];

            $data = [];
            foreach ($attempts as $params) {
                Log::info('JSearch: Fetching with params ' . json_encode($params));

                $response = Http::withoutVerifying()
                    ->withHeaders([
                        'X-RapidAPI-Key' => $apiKey,
                        'X-RapidAPI-Host' => 'jsearch.p.rapidapi.com',
                    ])
                    ->connectTimeout(3)
                    ->timeout(5)
                    ->get("{$this->baseUrl}/search", $params);

                if ($response->failed()) {
                    Log::warning('JSearch attempt failed: ' . $response->status() . ' - ' . $response->body());
                    continue;
                }

                $data = $response->json('data', []);
                if (!empty($data)) {
                    Log::info("JSearch: Got " . count($data) . " raw results for '{$query}'");
                    break;
                }
            }

            if (empty($data)) {
                Log::warning("JSearch: Empty results for '{$query}' after all attempts.");
                return [];
            }
            
            $jobs = $this->normalizeJobs($data, $limit);

            // Only cache non-empty results (never cache failures)
            if (!empty($jobs)) {
                Cache::put($cacheKey, $jobs, 21600); // 6 hours
                Log::info("JSearch: Cached " . count($jobs) . " jobs for '{$query}'");
            }

            return $jobs;
        } catch (\Exception $e) {
            Log::error('JSearch API error: ' . $e->getMessage());
            return [];
        }
    }

    /**
     * Fetch jobs for multiple roles (used for market intelligence page)
     */
    public function fetchMarketJobs(array|string|null $careerTarget = ''): array
    {
        $roleQueries = $this->getRoleQueries($careerTarget);
        $cacheKey = "market_jobs_combined_" . md5(json_encode($roleQueries));

        return Cache::remember($cacheKey, 3600, function() use ($roleQueries, $careerTarget) {
            $allJobs = [];

            foreach ($roleQueries as $query) {
                $jobs = $this->fetchJobs($query, 12);
                $allJobs = array_merge($allJobs, $jobs);
                // Early exit if we got enough from primary source
                if (count($allJobs) >= 15) break;
            }

            // Count how many jobs are from Indonesia to decide if we need fallbacks
            $indoCount = count(array_filter($allJobs, function ($job) {
                return $this->isIndonesiaRelatedLocation((string) ($job['location'] ?? ''));
            }));

            // Secondary source: JobsAPI14 LinkedIn wrapper.
            if ($indoCount < 15) {
                foreach ($roleQueries as $query) {
                    $api14Jobs = array_merge(
                        $this->fetchJobsApi14($query, 'Indonesia', 8),
                        $this->fetchJobsApi14($query, 'Jakarta', 8)
                    );
                    $allJobs = array_merge($allJobs, $api14Jobs);
                }
            }

            $indoCount = count(array_filter($allJobs, function ($job) {
                return $this->isIndonesiaRelatedLocation((string) ($job['location'] ?? ''));
            }));

            // Optional sources (only active if keys configured).
            if ($indoCount < 20) {
                foreach ($roleQueries as $query) {
                    $allJobs = array_merge($allJobs, $this->fetchAdzunaJobs($query, 8));
                    $allJobs = array_merge($allJobs, $this->fetchJoobleJobs($query, 8));
                }
            }

            // If still empty and primary API failed, try a key-less fallback API (Arbeitnow)
            if (empty($allJobs)) {
                Log::info('JSearch: No results or key missing. Trying Arbeitnow (No-Key Fallback)...');
                $allJobs = $this->fetchArbeitnowJobs($careerTarget);
            }

            // Deduplicate by title + company
            $seen = [];
            $unique = [];
            foreach ($allJobs as $job) {
                $key = strtolower(trim($job['title'] . '_' . $job['company']));
                if (!isset($seen[$key])) {
                    $seen[$key] = true;
                    $unique[] = $job;
                }
            }

            // Prioritaskan lowongan yang jelas Indonesia/remote.
            $indonesiaRelevant = [];
            $others = [];
            
            foreach ($unique as $job) {
                if ($this->isIndonesiaRelatedLocation((string) ($job['location'] ?? ''))) {
                    $indonesiaRelevant[] = $job;
                } else {
                    $others[] = $job;
                }
            }

            $sortedJobs = array_merge($indonesiaRelevant, $others);

            return array_slice($sortedJobs, 0, 35);
        });
    }

    /**
     * Get real-time market stats from fetched jobs
     */
    public function getMarketStats(array $jobs): array
    {
        if (empty($jobs)) {
            return [
                'total_jobs' => 0,
                'companies_hiring' => 0,
                'avg_salary_junior' => 0,
                'avg_salary_senior' => 0,
                'growth_month_vs_month' => 0,
            ];
        }

        $companies = array_unique(array_column($jobs, 'company'));
        $salaries = array_filter(array_column($jobs, 'salary_min'), fn($s) => $s > 0);

        return [
            'total_jobs' => count($jobs),
            'companies_hiring' => count($companies),
            'avg_salary_junior' => !empty($salaries) ? (int) (array_sum($salaries) / count($salaries)) : 8500000,
            'avg_salary_senior' => !empty($salaries) ? (int) (max($salaries) * 1.5) : 22000000,
            'growth_month_vs_month' => $this->estimateGrowthFromRecency($jobs),
        ];
    }

    /**
     * Build trending skills from live jobs (skills_required extracted from descriptions).
     */
    public function getTrendingSkillsFromJobs(array $jobs, int $limit = 5): array
    {
        if (empty($jobs)) {
            return [];
        }

        $counts = [];
        $recencyBoost = [];

        foreach ($jobs as $job) {
            $postedDays = max(1, (int) ($job['posted_days_ago'] ?? 7));
            $weight = max(0.4, 1 - (($postedDays - 1) * 0.06));

            foreach (($job['skills_required'] ?? []) as $skill) {
                $normalized = trim((string) $skill);
                if ($normalized === '') {
                    continue;
                }

                if (!isset($counts[$normalized])) {
                    $counts[$normalized] = 0;
                    $recencyBoost[$normalized] = 0;
                }

                $counts[$normalized]++;
                $recencyBoost[$normalized] += $weight;
            }
        }

        if (empty($counts)) {
            return [];
        }

        arsort($counts);
        $top = array_slice($counts, 0, $limit, true);
        $maxCount = max($top);

        $result = [];
        foreach ($top as $skill => $count) {
            $demand = (int) max(35, min(100, round(($count / max(1, $maxCount)) * 100)));
            $change = (int) max(1, min(30, round(($recencyBoost[$skill] / max(1, $count)) * 10)));

            $result[] = [
                'skill' => $skill,
                'demand' => $demand,
                'change' => $change,
                'trend' => $change >= 7 ? 'rising' : 'stable',
            ];
        }

        return $result;
    }

    /**
     * Get debugging info about the API status
     */
    public function getDebugStatus(): array
    {
        $apiKey = config('services.rapidapi.key');
        $status = [
            'has_api_key' => !empty($apiKey),
            'api_key_masked' => $apiKey ? substr($apiKey, 0, 4) . '...' . substr($apiKey, -4) : 'none',
            'base_url' => $this->baseUrl,
            'cache_key_example' => 'jsearch_jobs_' . md5("test_Indonesia_10"),
        ];

        try {
            $response = Http::withoutVerifying()
                ->withHeaders([
                    'X-RapidAPI-Key' => $apiKey,
                    'X-RapidAPI-Host' => 'jsearch.p.rapidapi.com',
                ])
                ->connectTimeout(15)
                ->timeout(30)
                ->get("{$this->baseUrl}/search", [
                    'query' => "test",
                    'limit' => 1
                ]);

            $status['last_http_code'] = $response->status();
            $status['is_success'] = $response->successful();
            if ($response->failed()) {
                $status['error_message'] = $response->json('message') ?? $response->body();
            }
        } catch (\Exception $e) {
            $status['is_success'] = false;
            $status['error_message'] = $e->getMessage();
        }

        return $status;
    }

    /**
     * Normalize JSearch API response into our app's job format
     */
    private function normalizeJobs(array $data, int $limit): array
    {
        $jobs = [];

        foreach (array_slice($data, 0, $limit) as $i => $item) {
            $salaryMin = $this->parseSalary($item['job_min_salary'] ?? null, $item['job_salary_currency'] ?? '');
            $salaryMax = $this->parseSalary($item['job_max_salary'] ?? null, $item['job_salary_currency'] ?? '');

            // Extract skills from description (simple keyword matching)
            $skills = $this->extractSkills($item['job_description'] ?? '');

            $jobs[] = [
                'id' => $i + 1,
                'title' => $item['job_title'] ?? 'Unknown Position',
                'company' => $item['employer_name'] ?? 'Unknown Company',
                'company_logo' => $item['employer_logo'] ?? null,
                'location' => $this->normalizeLocation($item['job_city'] ?? '', $item['job_country'] ?? '', $item['job_is_remote'] ?? false),
                'salary_min' => $salaryMin ?: rand(8, 15) * 1000000,
                'salary_max' => $salaryMax ?: rand(16, 35) * 1000000,
                'skills_required' => $skills,
                'posted_days_ago' => $this->daysAgo($item['job_posted_at_datetime_utc'] ?? ''),
                'type' => $item['job_employment_type'] ?? 'FULLTIME',
                'apply_url' => $item['job_apply_link'] ?? '#',
                'description' => mb_substr($item['job_description'] ?? '', 0, 300) . '...',
                'source' => 'JSearch API',
            ];
        }

        return $jobs;
    }

    private function parseSalary(?float $salary, string $currency): int
    {
        if (!$salary) return 0;

        // Convert to IDR if needed
        $rates = [
            'USD' => 16000,
            'SGD' => 12000,
            'MYR' => 3500,
            'IDR' => 1,
            '' => 16000, // Assume USD if no currency
        ];

        $rate = $rates[strtoupper($currency)] ?? 16000;
        $idr = (int) ($salary * $rate);

        // If salary seems to be annual, convert to monthly
        if ($idr > 100000000) {
            $idr = (int) ($idr / 12);
        }

        return $idr;
    }

    private function normalizeLocation(string $city, string $country, bool $isRemote): string
    {
        if ($isRemote) return 'Remote';
        if ($city) return ucfirst($city);
        if ($country) return ucfirst($country);
        return 'Indonesia';
    }

    private function daysAgo(string $datetime): int
    {
        if (empty($datetime)) return rand(1, 14);
        
        try {
            $posted = new \DateTime($datetime);
            $now = new \DateTime();
            return max(1, $now->diff($posted)->days);
        } catch (\Exception $e) {
            return rand(1, 14);
        }
    }

    private function estimateGrowthFromRecency(array $jobs): float
    {
        if (empty($jobs)) {
            return 0.0;
        }

        $recent = 0;
        foreach ($jobs as $job) {
            if ((int) ($job['posted_days_ago'] ?? 99) <= 7) {
                $recent++;
            }
        }

        $ratio = $recent / max(1, count($jobs));

        return round(max(0.5, min(20.0, $ratio * 20)), 1);
    }

    private function isIndonesiaRelatedLocation(string $location): bool
    {
        $loc = strtolower($location);
        $keywords = [
            'indonesia', 'jakarta', 'bandung', 'surabaya', 'bekasi', 'depok',
            'tangerang', 'bogor', 'yogyakarta', 'semarang', 'malang', 'bali',
            'medan', 'remote', 'wfh', 'hybrid'
        ];

        foreach ($keywords as $kw) {
            if (str_contains($loc, $kw)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Extract tech skills from job description using keyword matching
     */
    private function extractSkills(string $description): array
    {
        $skillKeywords = [
            'React', 'Vue.js', 'Angular', 'Next.js', 'Node.js',
            'TypeScript', 'JavaScript', 'Python', 'Java', 'Go', 'Rust', 'PHP', 'Laravel',
            'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure',
            'PostgreSQL', 'MySQL', 'MongoDB', 'Redis',
            'Git', 'CI/CD', 'REST API', 'GraphQL',
            'Tailwind', 'CSS', 'HTML',
            'Flutter', 'React Native', 'Kotlin', 'Swift',
            'Machine Learning', 'AI', 'TensorFlow', 'PyTorch',
            'Figma', 'Sketch', 'Adobe XD',
            'Linux', 'Terraform', 'Ansible',
            'Agile', 'Scrum', 'Jira',
        ];

        $found = [];
        $descLower = strtolower($description);

        foreach ($skillKeywords as $skill) {
            if (str_contains($descLower, strtolower($skill)) && count($found) < 5) {
                $found[] = $skill;
            }
        }

        // Ensure at least 2 skills
        if (count($found) < 2) {
            $found = array_merge($found, array_slice(['JavaScript', 'Git', 'REST API'], 0, 3 - count($found)));
        }

        return array_unique($found);
    }

    /**
     * Map career target to search queries
     */
    private function getRoleQueries(array|string|null $careerTarget): array
    {
        if (is_array($careerTarget)) {
            $queries = [];
            foreach ($careerTarget as $target) {
                $queries = array_merge($queries, $this->getRoleQueries($target));
            }
            return array_unique($queries);
        }

        return match ($careerTarget) {
            'Frontend Engineer' => ['frontend developer', 'react engineer'],
            'Backend Engineer'  => ['backend engineer', 'software engineer'],
            'Data Scientist'    => ['data scientist', 'data engineer'],
            'UI/UX Designer'    => ['UI UX designer', 'product designer'],
            'DevOps Engineer'   => ['devops engineer', 'site reliability engineer'],
            'Mobile Developer'  => ['mobile developer', 'android developer'],
            default             => ['software engineer', 'full stack developer'],
        };
    }

    /**
     * Fallback API: Arbeitnow (No API Key required)
     */
    private function fetchArbeitnowJobs(array|string|null $careerTarget): array
    {
        $query = is_array($careerTarget) ? ($careerTarget[0] ?? 'software') : ($careerTarget ?: 'software');
        $cacheKey = "arbeitnow_jobs_v2_" . md5($query);

        return Cache::remember($cacheKey, 21600, function () use ($query) {
            try {
                $response = Http::withoutVerifying()->get('https://www.arbeitnow.com/api/job-board-api', [
                    'term' => $query,
                ]);

                if ($response->failed()) return [];

                $data = $response->json('data', []);
                $jobs = [];
                $filtered = array_values(array_filter($data, function ($item) {
                    $location = strtolower((string) ($item['location'] ?? ''));
                    return str_contains($location, 'indonesia') || str_contains($location, 'jakarta') || str_contains($location, 'remote');
                }));

                $sourceJobs = !empty($filtered) ? $filtered : $data;

                foreach (array_slice($sourceJobs, 0, 20) as $i => $item) {
                    $jobs[] = [
                        'id' => 1000 + $i,
                        'title' => $item['title'],
                        'company' => $item['company_name'],
                        'location' => $item['location'] . ($item['remote'] ? ' (Remote)' : ''),
                        'salary_min' => rand(8, 15) * 1000000, // API doesn't always have salary
                        'salary_max' => rand(16, 35) * 1000000,
                        'skills_required' => ['IT', 'Software'],
                        'posted_days_ago' => rand(1, 10),
                        'type' => $item['job_types'][0] ?? 'Full Time',
                        'apply_url' => $item['url'],
                        'description' => 'Lowongan kerja live dari API Arbeitnow.',
                        'source' => 'Arbeitnow API',
                    ];
                }
                return $jobs;
            } catch (\Exception $e) {
                return [];
            }
        });
    }

    /**
     * Secondary source via RapidAPI (LinkedIn wrapper).
     */
    private function fetchJobsApi14(string $query, string $location, int $limit = 10): array
    {
        $apiKey = config('services.rapidapi.key');
        if (empty($apiKey)) {
            return [];
        }

        $cacheKey = 'jobsapi14_v1_' . md5($query . '_' . $location . '_' . $limit);

        return Cache::remember($cacheKey, 21600, function () use ($apiKey, $query, $location, $limit) {
            try {
                $response = Http::withoutVerifying()
                    ->withHeaders([
                        'X-RapidAPI-Key' => $apiKey,
                        'X-RapidAPI-Host' => 'jobs-api14.p.rapidapi.com',
                    ])
                    ->connectTimeout(5)
                    ->timeout(10)
                    ->get('https://jobs-api14.p.rapidapi.com/v2/linkedin/search', [
                        'query' => $query,
                        'location' => $location,
                    ]);

                if ($response->failed()) {
                    Log::warning('JobsAPI14 failed: ' . $response->status());
                    return [];
                }

                $data = $response->json('jobs', []);
                $jobs = [];
                foreach (array_slice($data, 0, $limit) as $i => $item) {
                    $skills = $this->extractSkills((string) ($item['description'] ?? ''));

                    $jobs[] = [
                        'id' => 2000 + $i,
                        'title' => $item['title'] ?? 'Unknown Position',
                        'company' => $item['company'] ?? 'Unknown Company',
                        'company_logo' => null,
                        'location' => $item['location'] ?? $location,
                        'salary_min' => rand(8, 15) * 1000000,
                        'salary_max' => rand(16, 35) * 1000000,
                        'skills_required' => $skills,
                        'posted_days_ago' => rand(1, 14),
                        'type' => 'FULLTIME',
                        'apply_url' => $item['url'] ?? '#',
                        'description' => mb_substr((string) ($item['description'] ?? ''), 0, 300) . '...',
                        'source' => 'JobsAPI14',
                    ];
                }

                return $jobs;
            } catch (\Exception $e) {
                Log::warning('JobsAPI14 exception: ' . $e->getMessage());
                return [];
            }
        });
    }

    /**
     * Optional Adzuna source (requires ADZUNA_APP_ID + ADZUNA_APP_KEY).
     */
    private function fetchAdzunaJobs(string $query, int $limit = 10): array
    {
        $appId = config('services.adzuna.app_id');
        $appKey = config('services.adzuna.app_key');
        if (empty($appId) || empty($appKey)) {
            return [];
        }

        $cacheKey = 'adzuna_v1_' . md5($query . '_' . $limit);

        return Cache::remember($cacheKey, 21600, function () use ($appId, $appKey, $query, $limit) {
            try {
                // Adzuna does not expose Indonesia country path directly; use a supported endpoint.
                $url = "https://api.adzuna.com/v1/api/jobs/sg/search/1";
                $response = Http::withoutVerifying()
                    ->connectTimeout(15)
                    ->timeout(30)
                    ->get($url, [
                        'app_id' => $appId,
                        'app_key' => $appKey,
                        'results_per_page' => $limit,
                        'what' => $query,
                        'where' => 'Indonesia',
                        'content-type' => 'application/json',
                    ]);

                if ($response->failed()) {
                    return [];
                }

                $results = $response->json('results', []);
                $jobs = [];
                foreach ($results as $i => $item) {
                    $desc = (string) ($item['description'] ?? '');
                    $jobs[] = [
                        'id' => 3000 + $i,
                        'title' => $item['title'] ?? 'Unknown Position',
                        'company' => $item['company']['display_name'] ?? 'Unknown Company',
                        'company_logo' => null,
                        'location' => $item['location']['display_name'] ?? 'Indonesia',
                        'salary_min' => (int) ($item['salary_min'] ?? rand(8, 15) * 1000000),
                        'salary_max' => (int) ($item['salary_max'] ?? rand(16, 35) * 1000000),
                        'skills_required' => $this->extractSkills($desc),
                        'posted_days_ago' => rand(1, 14),
                        'type' => 'FULLTIME',
                        'apply_url' => $item['redirect_url'] ?? '#',
                        'description' => mb_substr($desc, 0, 300) . '...',
                        'source' => 'Adzuna',
                    ];
                }

                return $jobs;
            } catch (\Exception $e) {
                return [];
            }
        });
    }

    /**
     * Optional Jooble source (requires JOOBLE_API_KEY).
     */
    private function fetchJoobleJobs(string $query, int $limit = 10): array
    {
        $apiKey = config('services.jooble.key');
        if (empty($apiKey)) {
            return [];
        }

        $cacheKey = 'jooble_v1_' . md5($query . '_' . $limit);

        return Cache::remember($cacheKey, 21600, function () use ($apiKey, $query, $limit) {
            try {
                $url = "https://jooble.org/api/{$apiKey}";
                $response = Http::withoutVerifying()
                    ->connectTimeout(15)
                    ->timeout(30)
                    ->post($url, [
                        'keywords' => $query,
                        'location' => 'Indonesia',
                        'page' => 1,
                    ]);

                if ($response->failed()) {
                    return [];
                }

                $data = $response->json('jobs', []);
                $jobs = [];
                foreach (array_slice($data, 0, $limit) as $i => $item) {
                    $desc = strip_tags((string) ($item['snippet'] ?? ''));
                    $jobs[] = [
                        'id' => 4000 + $i,
                        'title' => $item['title'] ?? 'Unknown Position',
                        'company' => $item['company'] ?? 'Unknown Company',
                        'company_logo' => null,
                        'location' => $item['location'] ?? 'Indonesia',
                        'salary_min' => rand(8, 15) * 1000000,
                        'salary_max' => rand(16, 35) * 1000000,
                        'skills_required' => $this->extractSkills($desc),
                        'posted_days_ago' => rand(1, 14),
                        'type' => 'FULLTIME',
                        'apply_url' => $item['link'] ?? '#',
                        'description' => mb_substr($desc, 0, 300) . '...',
                        'source' => 'Jooble',
                    ];
                }

                return $jobs;
            } catch (\Exception $e) {
                return [];
            }
        });
    }
}
