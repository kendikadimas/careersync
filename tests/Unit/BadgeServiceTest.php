<?php

namespace Tests\Unit;

use App\Models\Badge;
use App\Models\User;
use App\Models\UserBadge;
use App\Models\UserProfile;
use App\Models\UserRoadmap;
use App\Models\WorkReadinessScore;
use App\Models\CapstoneSubmission;
use App\Models\PortfolioProject;
use App\Services\BadgeService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class BadgeServiceTest extends TestCase
{
    use RefreshDatabase;

    private BadgeService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new BadgeService();
        $this->seedBadges();
    }

    private function seedBadges(): void
    {
        $badges = [
            ['slug' => 'first-login',       'name' => 'Langkah Pertama',   'emoji' => '🚀', 'rarity' => 'COMMON', 'points' => 10],
            ['slug' => 'cv-uploaded',        'name' => 'CV Ter-analisis',   'emoji' => '📄', 'rarity' => 'COMMON', 'points' => 15],
            ['slug' => 'roadmap-generated',  'name' => 'Punya Peta Jalan', 'emoji' => '🗺️', 'rarity' => 'COMMON', 'points' => 15],
            ['slug' => 'first-insight',      'name' => 'Pencerahan',        'emoji' => '💡', 'rarity' => 'COMMON', 'points' => 10],
            ['slug' => 'score-60',           'name' => 'Setengah Jalan',    'emoji' => '🔥', 'rarity' => 'RARE',   'points' => 25],
            ['slug' => 'score-80',           'name' => 'Hampir Siap',       'emoji' => '⭐', 'rarity' => 'RARE',   'points' => 30],
            ['slug' => 'score-100',          'name' => 'Market Ready',      'emoji' => '🏆', 'rarity' => 'EPIC',   'points' => 50],
            ['slug' => 'milestone-1',        'name' => 'Milestone Pertama', 'emoji' => '🎯', 'rarity' => 'COMMON', 'points' => 15],
            ['slug' => 'milestone-3',        'name' => 'Tiga Milestone',    'emoji' => '🏅', 'rarity' => 'RARE',   'points' => 25],
            ['slug' => 'milestone-all',      'name' => 'Roadmap Conquered', 'emoji' => '🎖️', 'rarity' => 'EPIC',   'points' => 50],
            ['slug' => 'first-capstone',     'name' => 'First Capstone',    'emoji' => '📦', 'rarity' => 'COMMON', 'points' => 20],
            ['slug' => 'perfect-capstone',   'name' => 'Perfect Score',     'emoji' => '💯', 'rarity' => 'EPIC',   'points' => 50],
            ['slug' => 'skill-5',            'name' => 'Multi Talenta',     'emoji' => '🌟', 'rarity' => 'COMMON', 'points' => 15],
            ['slug' => 'skill-10',           'name' => 'Skilled Dev',       'emoji' => '⭐', 'rarity' => 'RARE',   'points' => 25],
            ['slug' => 'skill-expert-3',     'name' => 'Expert Trio',       'emoji' => '🧠', 'rarity' => 'RARE',   'points' => 30],
            ['slug' => 'portfolio-3',        'name' => 'Showcase Builder',  'emoji' => '📁', 'rarity' => 'RARE',   'points' => 25],
            ['slug' => 'github-verified',    'name' => 'GitHub Verified',   'emoji' => '✅', 'rarity' => 'COMMON', 'points' => 20],
        ];

        foreach ($badges as $badge) {
            Badge::create(array_merge($badge, ['description' => "Badge: {$badge['name']}", 'category' => 'achievement']));
        }
    }

    #[Test]
    public function it_awards_first_login_badge_automatically(): void
    {
        $user = User::factory()->create();
        $awarded = $this->service->checkAndAwardBadges($user);
        $this->assertCount(1, $awarded);
        $this->assertEquals('first-login', $awarded[0]->slug);
    }

    #[Test]
    public function it_does_not_award_duplicate_badges(): void
    {
        $user = User::factory()->create();
        $this->service->checkAndAwardBadges($user);
        $awarded = $this->service->checkAndAwardBadges($user->fresh());
        $this->assertCount(0, $awarded);
        $this->assertEquals(1, $user->badges()->count());
    }

    #[Test]
    public function it_awards_cv_uploaded_badge_when_cv_exists(): void
    {
        $user = User::factory()->create();
        UserProfile::create([
            'user_id' => $user->id,
            'cv_raw_text' => 'This is my CV content with skills and experience...',
        ]);
        $awarded = $this->service->checkAndAwardBadges($user);
        $slugs = collect($awarded)->pluck('slug')->toArray();
        $this->assertContains('cv-uploaded', $slugs);
    }

    #[Test]
    public function it_awards_roadmap_badge_when_roadmap_exists(): void
    {
        $user = User::factory()->create();
        UserRoadmap::create([
            'user_id' => $user->id, 'career_target' => 'Software Engineer',
            'roadmap_data' => ['milestones' => []],
            'milestones_completed' => 0, 'total_milestones' => 5,
        ]);
        $awarded = $this->service->checkAndAwardBadges($user);
        $slugs = collect($awarded)->pluck('slug')->toArray();
        $this->assertContains('roadmap-generated', $slugs);
    }

    #[Test]
    public function it_awards_score_60_badge_when_score_reaches_60(): void
    {
        $user = User::factory()->create();
        WorkReadinessScore::create([
            'user_id' => $user->id, 'score' => 65, 'category' => 'Hampir Siap',
            'breakdown' => ['skills' => 20, 'experience' => 20, 'education' => 20, 'roadmap' => 5],
        ]);
        $awarded = $this->service->checkAndAwardBadges($user);
        $slugs = collect($awarded)->pluck('slug')->toArray();
        $this->assertContains('score-60', $slugs);
    }

    #[Test]
    public function it_awards_milestone_badge_correctly(): void
    {
        $user = User::factory()->create();
        UserRoadmap::create([
            'user_id' => $user->id, 'career_target' => 'Software Engineer',
            'roadmap_data' => ['milestones' => [['id' => '1', 'title' => 'M1', 'status' => 'completed']]],
            'milestones_completed' => 1, 'total_milestones' => 5,
        ]);
        $awarded = $this->service->checkAndAwardBadges($user);
        $slugs = collect($awarded)->pluck('slug')->toArray();
        $this->assertContains('milestone-1', $slugs);
    }

    #[Test]
    public function it_awards_skill_5_badge_when_user_has_5_skills(): void
    {
        $user = User::factory()->create();
        UserProfile::create([
            'user_id' => $user->id,
            'skills' => [
                ['name' => 'JavaScript', 'level' => 'expert'], ['name' => 'React', 'level' => 'intermediate'],
                ['name' => 'Node.js', 'level' => 'beginner'], ['name' => 'SQL', 'level' => 'intermediate'],
                ['name' => 'Git', 'level' => 'expert'],
            ],
        ]);
        $awarded = $this->service->checkAndAwardBadges($user);
        $slugs = collect($awarded)->pluck('slug')->toArray();
        $this->assertContains('skill-5', $slugs);
    }

    #[Test]
    public function it_awards_portfolio_3_badge_when_user_has_3_projects(): void
    {
        $user = User::factory()->create();
        for ($i = 0; $i < 3; $i++) {
            PortfolioProject::create([
                'user_id' => $user->id, 'title' => "Project $i",
                'description' => 'Test project', 'github_url' => "https://github.com/test/repo-$i",
                'tech_stack' => ['PHP', 'Laravel'],
            ]);
        }
        $awarded = $this->service->checkAndAwardBadges($user);
        $slugs = collect($awarded)->pluck('slug')->toArray();
        $this->assertContains('portfolio-3', $slugs);
    }

    #[Test]
    public function it_updates_rank_based_on_badge_count(): void
    {
        $user = User::factory()->create(['rank' => 'Apprentice', 'total_points' => 0]);
        $badges = Badge::take(6)->get();
        foreach ($badges as $badge) {
            UserBadge::create(['user_id' => $user->id, 'badge_id' => $badge->id, 'earned_at' => now(), 'context' => 'test']);
        }
        $this->service->updateRankAndPoints($user);
        $user->refresh();
        $this->assertEquals('Practitioner', $user->rank);
        $this->assertGreaterThan(0, $user->total_points);
    }

    #[Test]
    public function it_calculates_rank_apprentice_for_few_badges(): void
    {
        $user = User::factory()->create(['rank' => 'Apprentice', 'total_points' => 0]);
        $badges = Badge::take(2)->get();
        foreach ($badges as $badge) {
            UserBadge::create(['user_id' => $user->id, 'badge_id' => $badge->id, 'earned_at' => now(), 'context' => 'test']);
        }
        $this->service->updateRankAndPoints($user);
        $user->refresh();
        $this->assertEquals('Apprentice', $user->rank);
    }

    #[Test]
    public function it_calculates_rank_developer_for_3_badges(): void
    {
        $user = User::factory()->create(['rank' => 'Apprentice', 'total_points' => 0]);
        $badges = Badge::take(3)->get();
        foreach ($badges as $badge) {
            UserBadge::create(['user_id' => $user->id, 'badge_id' => $badge->id, 'earned_at' => now(), 'context' => 'test']);
        }
        $this->service->updateRankAndPoints($user);
        $user->refresh();
        $this->assertEquals('Developer', $user->rank);
    }

    #[Test]
    public function it_calculates_total_points_from_badges(): void
    {
        $user = User::factory()->create(['rank' => 'Apprentice', 'total_points' => 0]);
        $badge1 = Badge::where('slug', 'first-login')->first();
        $badge2 = Badge::where('slug', 'cv-uploaded')->first();
        UserBadge::create(['user_id' => $user->id, 'badge_id' => $badge1->id, 'earned_at' => now(), 'context' => 'test']);
        UserBadge::create(['user_id' => $user->id, 'badge_id' => $badge2->id, 'earned_at' => now(), 'context' => 'test']);
        $this->service->updateRankAndPoints($user);
        $user->refresh();
        $this->assertEquals(25, $user->total_points);
    }
}
