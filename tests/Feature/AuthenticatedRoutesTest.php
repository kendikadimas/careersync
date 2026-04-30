<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class AuthenticatedRoutesTest extends TestCase
{
    use RefreshDatabase;

    private function createOnboardedUser(): User
    {
        $user = User::factory()->create();
        UserProfile::create([
            'user_id' => $user->id,
            'career_target' => ['Software Engineer'],
            'onboarding_completed' => true,
        ]);
        return $user;
    }

    #[Test]
    public function dashboard_requires_authentication(): void
    {
        $this->get('/dashboard')->assertRedirect('/login');
    }

    #[Test]
    public function analysis_requires_authentication(): void
    {
        $this->get('/analysis')->assertRedirect('/login');
    }

    #[Test]
    public function roadmap_requires_authentication(): void
    {
        $this->get('/roadmap')->assertRedirect('/login');
    }

    #[Test]
    public function market_requires_authentication(): void
    {
        $this->get('/market')->assertRedirect('/login');
    }

    #[Test]
    public function leaderboard_requires_authentication(): void
    {
        $this->get('/leaderboard')->assertRedirect('/login');
    }

    #[Test]
    public function portfolio_requires_authentication(): void
    {
        $this->get('/portfolio')->assertRedirect('/login');
    }

    #[Test]
    public function settings_requires_authentication(): void
    {
        $this->get('/settings')->assertRedirect('/login');
    }

    #[Test]
    public function insights_requires_authentication(): void
    {
        $this->get('/insights')->assertRedirect('/login');
    }

    #[Test]
    public function notifications_requires_authentication(): void
    {
        $this->get('/notifications')->assertRedirect('/login');
    }

    #[Test]
    public function profile_edit_requires_authentication(): void
    {
        $this->get('/profile')->assertRedirect('/login');
    }

    #[Test]
    public function dashboard_accessible_when_authenticated(): void
    {
        $user = $this->createOnboardedUser();
        $this->actingAs($user)->get('/dashboard')->assertStatus(200);
    }

    #[Test]
    public function analysis_accessible_when_authenticated(): void
    {
        $user = $this->createOnboardedUser();
        $this->actingAs($user)->get('/analysis')->assertStatus(200);
    }

    #[Test]
    public function roadmap_accessible_when_authenticated(): void
    {
        $user = $this->createOnboardedUser();
        $this->actingAs($user)->get('/roadmap')->assertStatus(200);
    }

    #[Test]
    public function leaderboard_accessible_when_authenticated(): void
    {
        $user = $this->createOnboardedUser();
        $this->actingAs($user)->get('/leaderboard')->assertStatus(200);
    }

    #[Test]
    public function portfolio_accessible_when_authenticated(): void
    {
        $user = $this->createOnboardedUser();
        $this->actingAs($user)->get('/portfolio')->assertStatus(200);
    }
}
