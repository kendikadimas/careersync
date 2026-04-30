<?php

namespace Tests\Unit;

use App\Models\CapstoneSubmission;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class CapstoneSubmissionTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_calculates_score_with_github_url_only(): void
    {
        $submission = new CapstoneSubmission([
            'github_url' => 'https://github.com/user/repo',
            'demo_url' => null, 'description' => null, 'checklist_completed' => [],
        ]);
        $this->assertEquals(25, $submission->calculateScore());
    }

    #[Test]
    public function it_calculates_score_with_all_auto_fields(): void
    {
        $submission = new CapstoneSubmission([
            'github_url' => 'https://github.com/user/repo',
            'demo_url' => 'https://demo.app',
            'description' => 'This is a project description',
            'checklist_completed' => [],
        ]);
        $this->assertEquals(45, $submission->calculateScore());
    }

    #[Test]
    public function it_calculates_score_with_checklist_items(): void
    {
        $submission = new CapstoneSubmission([
            'github_url' => 'https://github.com/user/repo',
            'demo_url' => null, 'description' => 'Description',
            'checklist_completed' => ['has_readme', 'uses_milestone_tech'],
        ]);
        $this->assertEquals(65, $submission->calculateScore());
    }

    #[Test]
    public function it_caps_score_at_100(): void
    {
        $submission = new CapstoneSubmission([
            'github_url' => 'https://github.com/user/repo',
            'demo_url' => 'https://demo.app', 'description' => 'Description',
            'checklist_completed' => ['has_readme', 'has_screenshot', 'uses_milestone_tech', 'has_description'],
        ]);
        $this->assertLessThanOrEqual(100, $submission->calculateScore());
    }

    #[Test]
    public function it_returns_zero_for_empty_submission(): void
    {
        $submission = new CapstoneSubmission([
            'github_url' => null, 'demo_url' => null, 'description' => null, 'checklist_completed' => [],
        ]);
        $this->assertEquals(0, $submission->calculateScore());
    }

    #[Test]
    public function it_does_not_count_non_github_urls(): void
    {
        $submission = new CapstoneSubmission([
            'github_url' => 'https://gitlab.com/user/repo',
            'demo_url' => null, 'description' => null, 'checklist_completed' => [],
        ]);
        $this->assertEquals(0, $submission->calculateScore());
    }
}
