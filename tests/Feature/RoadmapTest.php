<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\UserProfile;
use App\Models\UserRoadmap;
use App\Services\GeminiService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class RoadmapTest extends TestCase
{
    use RefreshDatabase;

    private function createUserWithProfile(): User
    {
        $user = User::factory()->create();
        UserProfile::create([
            'user_id' => $user->id,
            'career_target' => ['Backend Developer'],
            'skills' => [['name' => 'PHP', 'level' => 'intermediate']],
            'skill_gaps' => [
                ['skill' => 'Docker', 'market_demand' => 70, 'status' => 'missing']
            ],
            'onboarding_completed' => true
        ]);
        return $user;
    }

    #[Test]
    public function index_renders_roadmap_page(): void
    {
        $user = $this->createUserWithProfile();
        $this->actingAs($user)->get('/roadmap')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('Roadmap'));
    }

    #[Test]
    public function generate_creates_new_roadmap_via_ai(): void
    {
        $user = $this->createUserWithProfile();
        
        $mockGemini = $this->createMock(GeminiService::class);
        $mockGemini->expects($this->once())
            ->method('generateRoadmapStructure')
            ->willReturn([
                'milestones' => [
                    ['id' => 'ms-1', 'title' => 'Learn Docker Basics', 'status' => 'current', 'skills' => ['Docker']]
                ]
            ]);
            
        $this->app->instance(GeminiService::class, $mockGemini);

        $this->actingAs($user)->post('/roadmap/generate')
            ->assertRedirect(route('roadmap'))
            ->assertSessionHas('success');

        $this->assertDatabaseHas('user_roadmaps', [
            'user_id' => $user->id,
            'total_milestones' => 1
        ]);
    }

    #[Test]
    public function get_milestone_details_fetches_via_ai_if_missing(): void
    {
        $user = $this->createUserWithProfile();
        $roadmap = UserRoadmap::create([
            'user_id' => $user->id,
            'career_target' => 'Backend Developer',
            'roadmap_data' => [
                'milestones' => [
                    ['id' => 'ms-1', 'title' => 'Test', 'resources' => [], 'why_important' => '']
                ]
            ],
            'total_milestones' => 1
        ]);

        $mockGemini = $this->createMock(GeminiService::class);
        $mockGemini->expects($this->once())
            ->method('generateMilestoneDetails')
            ->willReturn([
                'resources' => [['title' => 'Guide', 'url' => 'http://test']],
                'why_important' => 'Crucial for devops.'
            ]);
            
        $this->app->instance(GeminiService::class, $mockGemini);

        $response = $this->actingAs($user)->get("/roadmap/{$roadmap->id}/milestone/ms-1/details");
        
        $response->assertStatus(200)
            ->assertJsonPath('why_important', 'Crucial for devops.');
            
        $this->assertEquals('Crucial for devops.', $roadmap->fresh()->roadmap_data['milestones'][0]['why_important']);
    }

    #[Test]
    public function complete_milestone_updates_status_and_score(): void
    {
        $user = $this->createUserWithProfile();
        $roadmap = UserRoadmap::create([
            'user_id' => $user->id,
            'career_target' => 'Backend Developer',
            'roadmap_data' => [
                'milestones' => [
                    ['id' => 'ms-1', 'title' => 'Test', 'status' => 'current', 'resources' => [['t' => 'u']], 'why_important' => 'Yes']
                ]
            ],
            'total_milestones' => 1,
            'milestones_completed' => 0
        ]);

        $this->actingAs($user)->patch("/roadmap/milestone/ms-1/complete")
            ->assertRedirect()
            ->assertSessionHas('success');

        $freshRoadmap = $roadmap->fresh();
        $this->assertEquals(1, $freshRoadmap->milestones_completed);
        $this->assertEquals('completed', $freshRoadmap->roadmap_data['milestones'][0]['status']);
    }
}
