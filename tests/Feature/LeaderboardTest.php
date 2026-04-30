<?php

namespace Tests\Feature;

use App\Models\Badge;
use App\Models\User;
use App\Models\UserBadge;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class LeaderboardTest extends TestCase
{
    use RefreshDatabase;

    private function seedBadges(): void
    {
        Badge::create(['slug' => 'first-login', 'name' => 'First', 'description' => 'Login', 'emoji' => '🚀', 'category' => 'achievement', 'rarity' => 'COMMON', 'points' => 10]);
    }

    #[Test]
    public function it_redirects_unauthenticated_user(): void
    {
        $this->get('/leaderboard')->assertRedirect('/login');
    }

    #[Test]
    public function it_renders_leaderboard_page(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user)->get('/leaderboard')->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('Leaderboard')->has('leaders')->has('current_user_rank')->has('user_opted_in'));
    }

    #[Test]
    public function it_shows_users_with_badges_on_leaderboard(): void
    {
        $this->seedBadges();
        $user = User::factory()->create(['show_on_leaderboard' => true, 'total_points' => 50]);
        UserBadge::create(['user_id' => $user->id, 'badge_id' => Badge::first()->id, 'earned_at' => now(), 'context' => 'test']);
        $viewer = User::factory()->create();
        $this->actingAs($viewer)->get('/leaderboard')->assertInertia(fn ($page) => $page->has('leaders', 1));
    }

    #[Test]
    public function it_does_not_show_hidden_users(): void
    {
        $this->seedBadges();
        $user = User::factory()->create(['show_on_leaderboard' => false, 'total_points' => 100]);
        UserBadge::create(['user_id' => $user->id, 'badge_id' => Badge::first()->id, 'earned_at' => now(), 'context' => 'test']);
        $viewer = User::factory()->create();
        $this->actingAs($viewer)->get('/leaderboard')->assertInertia(fn ($page) => $page->has('leaders', 0));
    }

    #[Test]
    public function it_toggles_opt_in_status(): void
    {
        $user = User::factory()->create(['show_on_leaderboard' => true]);
        $this->actingAs($user)->post('/leaderboard/toggle-opt-in')->assertRedirect();
        $this->assertFalse($user->fresh()->show_on_leaderboard);
    }

    #[Test]
    public function it_toggles_opt_in_back_to_visible(): void
    {
        $user = User::factory()->create(['show_on_leaderboard' => false]);
        $this->actingAs($user)->post('/leaderboard/toggle-opt-in')->assertRedirect();
        $this->assertTrue($user->fresh()->show_on_leaderboard);
    }

    #[Test]
    public function it_orders_leaders_by_total_points_descending(): void
    {
        $this->seedBadges();
        $badge = Badge::first();
        $u1 = User::factory()->create(['show_on_leaderboard' => true, 'total_points' => 100]);
        $u2 = User::factory()->create(['show_on_leaderboard' => true, 'total_points' => 200]);
        $u3 = User::factory()->create(['show_on_leaderboard' => true, 'total_points' => 50]);
        foreach ([$u1, $u2, $u3] as $u) {
            UserBadge::create(['user_id' => $u->id, 'badge_id' => $badge->id, 'earned_at' => now(), 'context' => 'test']);
        }
        $viewer = User::factory()->create();
        $this->actingAs($viewer)->get('/leaderboard')->assertInertia(fn ($page) =>
            $page->has('leaders', 3)->where('leaders.0.total_points', 200)->where('leaders.1.total_points', 100)->where('leaders.2.total_points', 50)
        );
    }
}
