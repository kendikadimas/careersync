<?php

namespace Tests\Unit;

use App\Data\JobMarketData;
use App\Models\User;
use App\Models\UserProfile;
use App\Models\UserRoadmap;
use App\Models\WorkReadinessScore;
use App\Services\WorkReadinessScoreService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class WorkReadinessScoreServiceTest extends TestCase
{
    use RefreshDatabase;

    private WorkReadinessScoreService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new WorkReadinessScoreService();
    }

    #[Test]
    public function it_returns_null_when_user_has_no_profile(): void
    {
        $user = User::factory()->create();
        $result = $this->service->calculateForUser($user);
        $this->assertNull($result);
    }

    #[Test]
    public function it_calculates_score_for_user_with_profile(): void
    {
        $user = User::factory()->create();
        UserProfile::create([
            'user_id' => $user->id,
            'career_target' => ['Software Engineer'],
            'skills' => [
                ['name' => 'JavaScript', 'level' => 'expert'],
                ['name' => 'React.js', 'level' => 'intermediate'],
            ],
            'experiences' => [['type' => 'internship', 'title' => 'Web Dev Intern']],
            'education' => ['degree' => 'S1', 'major' => 'Teknik Informatika'],
        ]);

        $result = $this->service->calculateForUser($user);

        $this->assertNotNull($result);
        $this->assertInstanceOf(WorkReadinessScore::class, $result);
        $this->assertGreaterThan(0, $result->score);
        $this->assertIsArray($result->breakdown);
        $this->assertArrayHasKey('skills', $result->breakdown);
        $this->assertArrayHasKey('experience', $result->breakdown);
        $this->assertArrayHasKey('education', $result->breakdown);
        $this->assertArrayHasKey('roadmap', $result->breakdown);
    }

    #[Test]
    public function it_awards_full_education_score_for_it_major(): void
    {
        $user = User::factory()->create();
        UserProfile::create([
            'user_id' => $user->id,
            'career_target' => ['Software Engineer'],
            'skills' => [], 'experiences' => [],
            'education' => ['degree' => 'S1', 'major' => 'Teknik Informatika'],
        ]);
        $result = $this->service->calculateForUser($user);
        $this->assertEquals(20, $result->breakdown['education']);
    }

    #[Test]
    public function it_gives_partial_education_score_for_non_it_major(): void
    {
        $user = User::factory()->create();
        UserProfile::create([
            'user_id' => $user->id,
            'career_target' => ['Software Engineer'],
            'skills' => [], 'experiences' => [],
            'education' => ['degree' => 'S1', 'major' => 'Manajemen Bisnis'],
        ]);
        $result = $this->service->calculateForUser($user);
        $this->assertEquals(12, $result->breakdown['education']);
    }

    #[Test]
    public function it_gives_highest_experience_score_for_fulltime(): void
    {
        $user = User::factory()->create();
        UserProfile::create([
            'user_id' => $user->id,
            'career_target' => ['Software Engineer'],
            'skills' => [],
            'experiences' => [['type' => 'fulltime', 'title' => 'Software Engineer']],
            'education' => [],
        ]);
        $result = $this->service->calculateForUser($user);
        $this->assertEquals(30, $result->breakdown['experience']);
    }

    #[Test]
    public function it_categorizes_score_correctly(): void
    {
        $user = User::factory()->create();
        UserProfile::create([
            'user_id' => $user->id,
            'career_target' => ['Software Engineer'],
            'skills' => [], 'experiences' => [], 'education' => [],
        ]);
        $result = $this->service->calculateForUser($user);
        $this->assertContains($result->category, ['Masih Awal', 'Sedang Berkembang', 'Hampir Siap', 'Siap Kerja']);
    }

    #[Test]
    public function it_includes_roadmap_progress_in_score(): void
    {
        $user = User::factory()->create();
        UserProfile::create([
            'user_id' => $user->id,
            'career_target' => ['Software Engineer'],
            'skills' => [], 'experiences' => [], 'education' => [],
        ]);
        UserRoadmap::create([
            'user_id' => $user->id, 'career_target' => 'Software Engineer',
            'roadmap_data' => ['milestones' => []],
            'milestones_completed' => 5, 'total_milestones' => 10,
        ]);
        $result = $this->service->calculateForUser($user);
        $this->assertEquals(5, $result->breakdown['roadmap']);
    }

    #[Test]
    public function it_persists_score_to_database(): void
    {
        $user = User::factory()->create();
        UserProfile::create([
            'user_id' => $user->id,
            'career_target' => ['Software Engineer'],
            'skills' => [], 'experiences' => [], 'education' => [],
        ]);
        $this->service->calculateForUser($user);
        $this->assertDatabaseHas('work_readiness_scores', ['user_id' => $user->id]);
    }

    #[Test]
    public function it_caps_total_score_at_100(): void
    {
        $user = User::factory()->create();
        UserProfile::create([
            'user_id' => $user->id,
            'career_target' => ['Software Engineer'],
            'skills' => [
                ['name' => 'JavaScript', 'level' => 'expert'],
                ['name' => 'React.js', 'level' => 'expert'],
                ['name' => 'Node.js', 'level' => 'expert'],
                ['name' => 'TypeScript', 'level' => 'expert'],
                ['name' => 'Git', 'level' => 'expert'],
                ['name' => 'Docker', 'level' => 'expert'],
                ['name' => 'SQL', 'level' => 'expert'],
                ['name' => 'Python', 'level' => 'expert'],
            ],
            'experiences' => [['type' => 'fulltime', 'title' => 'Senior Dev']],
            'education' => ['degree' => 'S1', 'major' => 'Teknik Informatika'],
        ]);
        UserRoadmap::create([
            'user_id' => $user->id, 'career_target' => 'Software Engineer',
            'roadmap_data' => ['milestones' => []],
            'milestones_completed' => 10, 'total_milestones' => 10,
        ]);
        $result = $this->service->calculateForUser($user);
        $this->assertLessThanOrEqual(100, $result->score);
    }
}
