<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\UserProfile;
use App\Models\WorkReadinessScore;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_redirects_unauthenticated_user_to_login(): void
    {
        $this->get('/dashboard')->assertRedirect('/login');
    }

    #[Test]
    public function it_renders_dashboard_for_authenticated_user(): void
    {
        $user = User::factory()->create();
        UserProfile::create(['user_id' => $user->id, 'career_target' => ['Software Engineer'], 'onboarding_completed' => true]);
        $this->actingAs($user)->get('/dashboard')->assertStatus(200);
    }

    #[Test]
    public function it_passes_user_data_to_dashboard(): void
    {
        $user = User::factory()->create(['name' => 'Test User', 'rank' => 'Developer', 'total_points' => 100]);
        UserProfile::create(['user_id' => $user->id, 'career_target' => ['Software Engineer'], 'onboarding_completed' => true]);
        $response = $this->actingAs($user)->get('/dashboard');
        $response->assertInertia(fn ($page) =>
            $page->component('Dashboard')->has('user')->where('user.name', 'Test User')->has('user.id')
        );
    }

    #[Test]
    public function it_passes_score_history_to_dashboard(): void
    {
        $user = User::factory()->create();
        UserProfile::create(['user_id' => $user->id, 'career_target' => ['Software Engineer'], 'onboarding_completed' => true]);
        WorkReadinessScore::create(['user_id' => $user->id, 'score' => 50, 'category' => 'Sedang Berkembang', 'breakdown' => ['skills' => 20, 'experience' => 10, 'education' => 15, 'roadmap' => 5]]);
        $response = $this->actingAs($user)->get('/dashboard');
        $response->assertInertia(fn ($page) => $page->component('Dashboard')->has('scoreHistory')->has('score'));
    }

    #[Test]
    public function it_passes_skill_stats_to_dashboard(): void
    {
        $user = User::factory()->create();
        UserProfile::create(['user_id' => $user->id, 'career_target' => ['Software Engineer'], 'onboarding_completed' => true]);
        $response = $this->actingAs($user)->get('/dashboard');
        $response->assertInertia(fn ($page) => $page->component('Dashboard')->has('skillStats'));
    }
}
