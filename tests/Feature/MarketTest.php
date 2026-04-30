<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\UserProfile;
use App\Services\GeminiService;
use App\Services\JobApiService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class MarketTest extends TestCase
{
    use RefreshDatabase;

    private function createUserWithProfile(): User
    {
        $user = User::factory()->create();
        UserProfile::create([
            'user_id' => $user->id,
            'career_target' => ['Backend Developer'],
            'skills' => [['name' => 'PHP', 'level' => 'intermediate']],
            'onboarding_completed' => true
        ]);
        return $user;
    }

    #[Test]
    public function index_renders_market_page(): void
    {
        $user = $this->createUserWithProfile();
        
        $mockJobApi = $this->createMock(JobApiService::class);
        $mockJobApi->method('fetchMarketJobs')->willReturn([]);
        $this->app->instance(JobApiService::class, $mockJobApi);

        $this->actingAs($user)->get('/market')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('Market')
                ->has('jobs')
                ->has('trendingSkills')
                ->has('outlook'));
    }

    #[Test]
    public function research_triggers_ai_market_research(): void
    {
        $user = $this->createUserWithProfile();
        
        $mockGemini = $this->createMock(GeminiService::class);
        $mockGemini->expects($this->once())
            ->method('generateMarketResearch')
            ->willReturn([
                'trending_skills' => [['name' => 'AI', 'demand' => 90]],
                'market_stats' => ['growth' => '10%']
            ]);
            
        $this->app->instance(GeminiService::class, $mockGemini);

        $this->actingAs($user)->post('/market/research')
            ->assertRedirect()
            ->assertSessionHas('success');

        $this->assertDatabaseHas('market_insights', [
            'user_id' => $user->id,
            'career_target' => 'Backend Developer'
        ]);
    }

    #[Test]
    public function set_target_updates_profile_and_recalculates_gaps(): void
    {
        $user = $this->createUserWithProfile();
        
        $this->actingAs($user)->post('/market/set-target', [
            'target' => 'Frontend Developer'
        ])->assertRedirect(route('roadmap'));

        $profile = UserProfile::where('user_id', $user->id)->first();
        $this->assertEquals(['Frontend Developer'], $profile->career_target);
        $this->assertNotEmpty($profile->skill_gaps);
    }
}
