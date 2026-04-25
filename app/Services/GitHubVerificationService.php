<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class GitHubVerificationService
{
    private string $baseUrl = 'https://api.github.com';

    private function headers(): array
    {
        $headers = ['Accept' => 'application/vnd.github.v3+json', 'User-Agent' => 'CareerSync-Academy'];
        $token = config('services.github.token');
        if ($token) $headers['Authorization'] = "Bearer {$token}";
        return $headers;
    }

    private function parseGithubUrl(string $url): ?array
    {
        preg_match('/github\.com\/([^\/]+)\/([^\/\?#]+)/', $url, $matches);
        if (count($matches) < 3) return null;
        return ['owner' => $matches[1], 'repo' => rtrim($matches[2], '/')];
    }

    public function verifyRepo(string $githubUrl): array
    {
        $parsed = $this->parseGithubUrl($githubUrl);
        if (!$parsed) {
            return $this->failResult('URL GitHub tidak valid');
        }

        $cacheKey = 'gh_verify_' . md5($githubUrl);

        return Cache::remember($cacheKey, now()->addMinutes(30), function () use ($parsed, $githubUrl) {
            ['owner' => $owner, 'repo' => $repo] = $parsed;

            $repoResponse = Http::withoutVerifying()->withHeaders($this->headers())
                ->get("{$this->baseUrl}/repos/{$owner}/{$repo}");

            if (!$repoResponse->successful()) {
                return $this->failResult('Repository tidak ditemukan atau private');
            }

            $repoData = $repoResponse->json();

            if ($repoData['private'] ?? true) {
                return $this->failResult('Repository harus PUBLIC agar bisa diverifikasi');
            }

            $readmeResponse = Http::withoutVerifying()->withHeaders($this->headers())
                ->get("{$this->baseUrl}/repos/{$owner}/{$repo}/readme");
            $hasReadme = $readmeResponse->successful();

            $readmeSize = 0;
            if ($hasReadme) {
                $readmeSize = $readmeResponse->json('size', 0);
                $hasReadme = $readmeSize > 100;
            }

            $commitsResponse = Http::withoutVerifying()->withHeaders($this->headers())
                ->get("{$this->baseUrl}/repos/{$owner}/{$repo}/commits", ['per_page' => 1]);
            $hasCommits = $commitsResponse->successful() && count($commitsResponse->json()) > 0;

            $contentsResponse = Http::withoutVerifying()->withHeaders($this->headers())
                ->get("{$this->baseUrl}/repos/{$owner}/{$repo}/contents");
            $fileCount = $contentsResponse->successful() ? count($contentsResponse->json()) : 0;

            $verifiedChecks = [];
            $verifiedScore = 0;

            if (true) { 
                $verifiedChecks['repo_exists'] = true;
                $verifiedScore += 25;
            }
            if ($hasReadme) {
                $verifiedChecks['has_readme'] = true;
                $verifiedScore += 25;
            }
            if ($hasCommits) {
                $verifiedChecks['has_commits'] = true;
                $verifiedScore += 15;
            }
            if ($fileCount >= 3) {
                $verifiedChecks['has_files'] = true;
                $verifiedScore += 10;
            }

            return [
                'verified'        => $verifiedScore >= 40,
                'verified_score'  => $verifiedScore,       
                'verified_checks' => $verifiedChecks,
                'fail_reason'     => null,
                'stars'           => $repoData['stargazers_count'] ?? 0,
                'description'     => $repoData['description'] ?? null,
                'language'        => $repoData['language'] ?? null,
                'last_pushed'     => $repoData['pushed_at'] ?? null,
                'has_readme'      => $hasReadme,
                'has_commits'     => $hasCommits,
                'file_count'      => $fileCount,
                'og_image'        => "https://opengraph.githubassets.com/1/{$owner}/{$repo}",
                'repo_url'        => $githubUrl,
            ];
        });
    }

    private function failResult(string $reason): array
    {
        return [
            'verified'        => false,
            'verified_score'  => 0,
            'verified_checks' => [],
            'fail_reason'     => $reason,
            'stars'           => 0,
            'has_readme'      => false,
            'has_commits'     => false,
            'file_count'      => 0,
        ];
    }
}
