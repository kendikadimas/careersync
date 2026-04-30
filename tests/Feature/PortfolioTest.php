<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\PortfolioProject;
use App\Models\UserProfile;
use App\Models\Badge;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class PortfolioTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_redirects_unauthenticated_user(): void
    {
        $this->get('/portfolio')->assertRedirect('/login');
    }

    #[Test]
    public function it_renders_portfolio_index_page(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user)->get('/portfolio')->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('Profile/Portfolio')->has('projects')->has('user'));
    }

    #[Test]
    public function it_stores_a_new_portfolio_project(): void
    {
        $user = User::factory()->create();
        Badge::create(['slug' => 'first-login', 'name' => 'First', 'description' => 'x', 'emoji' => '🚀', 'category' => 'achievement', 'rarity' => 'COMMON', 'points' => 10]);
        Http::fake(['api.github.com/*' => Http::response(['private' => false, 'stargazers_count' => 3], 200)]);
        $this->actingAs($user)->post('/portfolio', [
            'title' => 'My Laravel App', 'description' => 'A REST API',
            'github_url' => 'https://github.com/test/laravel-app',
            'demo_url' => 'https://demo.test.app', 'tech_stack' => ['Laravel', 'PHP'],
        ])->assertRedirect();
        $this->assertDatabaseHas('portfolio_projects', ['user_id' => $user->id, 'title' => 'My Laravel App']);
    }

    #[Test]
    public function it_validates_required_fields_on_store(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user)->post('/portfolio', [])->assertSessionHasErrors(['title', 'description', 'github_url', 'tech_stack']);
    }

    #[Test]
    public function it_validates_github_url_format(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user)->post('/portfolio', [
            'title' => 'Test', 'description' => 'Test',
            'github_url' => 'https://gitlab.com/user/repo', 'tech_stack' => ['PHP'],
        ])->assertSessionHasErrors('github_url');
    }

    #[Test]
    public function it_deletes_own_portfolio_project(): void
    {
        $user = User::factory()->create();
        $project = PortfolioProject::create(['user_id' => $user->id, 'title' => 'Delete Me', 'description' => 'Del', 'github_url' => 'https://github.com/test/x', 'tech_stack' => ['PHP']]);
        $this->actingAs($user)->delete("/portfolio/{$project->id}")->assertRedirect();
        $this->assertDatabaseMissing('portfolio_projects', ['id' => $project->id]);
    }

    #[Test]
    public function it_renders_public_profile_page(): void
    {
        $user = User::factory()->create(['rank' => 'Developer', 'total_points' => 100]);
        UserProfile::create(['user_id' => $user->id, 'career_target' => ['Software Engineer']]);
        $this->get("/profile/{$user->id}")->assertStatus(200);
    }
}
