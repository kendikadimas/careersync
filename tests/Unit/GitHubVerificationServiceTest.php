<?php

namespace Tests\Unit;

use App\Services\GitHubVerificationService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class GitHubVerificationServiceTest extends TestCase
{
    use RefreshDatabase;

    private GitHubVerificationService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new GitHubVerificationService();
        Cache::flush();
    }

    #[Test]
    public function it_rejects_invalid_github_url(): void
    {
        $result = $this->service->verifyRepo('https://gitlab.com/user/repo');
        $this->assertFalse($result['verified']);
        $this->assertEquals('URL GitHub tidak valid', $result['fail_reason']);
    }

    #[Test]
    public function it_rejects_malformed_url(): void
    {
        $result = $this->service->verifyRepo('not-a-url');
        $this->assertFalse($result['verified']);
    }

    #[Test]
    public function it_returns_fail_when_repo_not_found(): void
    {
        Http::fake(['api.github.com/repos/*' => Http::response([], 404)]);
        $result = $this->service->verifyRepo('https://github.com/nonexistent/repo');
        $this->assertFalse($result['verified']);
        $this->assertTrue(str_contains($result['fail_reason'], 'tidak ditemukan'));
    }

    #[Test]
    public function it_rejects_private_repository(): void
    {
        Http::fake(['api.github.com/repos/user/private-repo' => Http::response(['private' => true, 'stargazers_count' => 0], 200)]);
        $result = $this->service->verifyRepo('https://github.com/user/private-repo');
        $this->assertFalse($result['verified']);
        $this->assertTrue(str_contains($result['fail_reason'], 'PUBLIC'));
    }

    #[Test]
    public function it_verifies_public_repo_with_readme_and_commits(): void
    {
        Http::fake([
            'api.github.com/repos/user/good-repo' => Http::response(['private' => false, 'stargazers_count' => 5, 'description' => 'Great', 'language' => 'PHP', 'pushed_at' => '2026-04-20T00:00:00Z'], 200),
            'api.github.com/repos/user/good-repo/readme' => Http::response(['size' => 500], 200),
            'api.github.com/repos/user/good-repo/commits*' => Http::response([['sha' => 'abc123']], 200),
            'api.github.com/repos/user/good-repo/contents' => Http::response([['name' => 'README.md'], ['name' => 'index.php'], ['name' => 'composer.json'], ['name' => 'src']], 200),
        ]);
        $result = $this->service->verifyRepo('https://github.com/user/good-repo');
        $this->assertTrue($result['verified']);
        $this->assertEquals(75, $result['verified_score']);
        $this->assertEquals(5, $result['stars']);
        $this->assertTrue($result['has_readme']);
        $this->assertTrue($result['has_commits']);
    }

    #[Test]
    public function it_returns_fail_result_structure(): void
    {
        $result = $this->service->verifyRepo('invalid');
        $this->assertArrayHasKey('verified', $result);
        $this->assertArrayHasKey('verified_score', $result);
        $this->assertArrayHasKey('fail_reason', $result);
        $this->assertArrayHasKey('stars', $result);
        $this->assertArrayHasKey('has_readme', $result);
        $this->assertArrayHasKey('has_commits', $result);
        $this->assertArrayHasKey('file_count', $result);
    }
}
