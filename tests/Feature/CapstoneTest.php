<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\UserProfile;
use App\Models\UserRoadmap;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class CapstoneTest extends TestCase
{
    use RefreshDatabase;

    private function createUserWithRoadmap(): array
    {
        $user = User::factory()->create();
        UserProfile::create(['user_id' => $user->id, 'career_target' => ['SE'], 'onboarding_completed' => true]);
        $roadmap = UserRoadmap::create([
            'user_id' => $user->id, 'career_target' => 'SE',
            'roadmap_data' => ['milestones' => [
                ['id' => 'ms-1', 'title' => 'Build REST API', 'status' => 'current', 'skills' => ['Laravel', 'PHP'], 'capstone_project' => ['title' => 'Todo API', 'checklist' => ['CRUD']]],
                ['id' => 'ms-2', 'title' => 'Frontend', 'status' => 'locked', 'skills' => ['React']],
            ]],
            'milestones_completed' => 0, 'total_milestones' => 2,
        ]);
        return [$user, $roadmap];
    }

    #[Test]
    public function it_redirects_unauthenticated_user(): void
    {
        $this->get('/roadmap/1/capstone/ms-1')->assertRedirect('/login');
    }

    #[Test]
    public function it_renders_capstone_submit_page(): void
    {
        [$user, $roadmap] = $this->createUserWithRoadmap();
        $this->actingAs($user)->get("/roadmap/{$roadmap->id}/capstone/ms-1")->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('Capstone/Submit')->has('milestone')->has('checklist_items'));
    }

    #[Test]
    public function it_returns_404_for_nonexistent_milestone(): void
    {
        [$user, $roadmap] = $this->createUserWithRoadmap();
        $this->actingAs($user)->get("/roadmap/{$roadmap->id}/capstone/nonexistent")->assertStatus(404);
    }

    #[Test]
    public function it_submits_capstone_project_successfully(): void
    {
        [$user, $roadmap] = $this->createUserWithRoadmap();
        \App\Models\Badge::create(['slug' => 'first-login', 'name' => 'First', 'description' => 'x', 'emoji' => '🚀', 'category' => 'achievement', 'rarity' => 'COMMON', 'points' => 10]);
        Http::fake([
            'api.github.com/repos/*' => Http::response(['private' => false, 'stargazers_count' => 1], 200),
            'api.github.com/repos/*/readme' => Http::response(['size' => 500], 200),
            'api.github.com/repos/*/commits*' => Http::response([['sha' => 'abc']], 200),
            'api.github.com/repos/*/contents' => Http::response([['name' => 'a'], ['name' => 'b'], ['name' => 'c']], 200),
        ]);
        $this->actingAs($user)->post("/roadmap/{$roadmap->id}/capstone/ms-1", [
            'github_url' => 'https://github.com/test/todo-api', 'demo_url' => 'https://demo.app',
            'description' => 'Built a full CRUD REST API using Laravel with proper validation and tests. Includes authentication.',
            'checklist_completed' => ['uses_milestone_tech', 'has_screenshot'],
        ])->assertRedirect(route('roadmap'));
        $this->assertDatabaseHas('capstone_submissions', ['user_id' => $user->id, 'milestone_id' => 'ms-1']);
    }

    #[Test]
    public function it_validates_capstone_submission_fields(): void
    {
        [$user, $roadmap] = $this->createUserWithRoadmap();
        $this->actingAs($user)->post("/roadmap/{$roadmap->id}/capstone/ms-1", [])->assertSessionHasErrors(['github_url', 'description', 'checklist_completed']);
    }

    #[Test]
    public function it_validates_github_url_must_start_with_github(): void
    {
        [$user, $roadmap] = $this->createUserWithRoadmap();
        $this->actingAs($user)->post("/roadmap/{$roadmap->id}/capstone/ms-1", [
            'github_url' => 'https://gitlab.com/test/repo',
            'description' => 'This is a valid description with at least fifty characters for the requirement.',
            'checklist_completed' => ['uses_milestone_tech'],
        ])->assertSessionHasErrors('github_url');
    }

    #[Test]
    public function it_prevents_access_to_other_users_roadmap(): void
    {
        [$user, $roadmap] = $this->createUserWithRoadmap();
        $otherUser = User::factory()->create();
        UserProfile::create(['user_id' => $otherUser->id, 'career_target' => ['DevOps'], 'onboarding_completed' => true]);
        $this->actingAs($otherUser)->get("/roadmap/{$roadmap->id}/capstone/ms-1")->assertStatus(404);
    }
}
