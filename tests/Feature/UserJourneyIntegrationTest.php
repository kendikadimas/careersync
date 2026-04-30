<?php

namespace Tests\Feature;

use App\Models\Badge;
use App\Models\User;
use App\Models\UserProfile;
use App\Models\UserRoadmap;
use App\Services\CvParserService;
use App\Services\GeminiService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class UserJourneyIntegrationTest extends TestCase
{
    use RefreshDatabase;

    private function seedBadges(): void
    {
        Badge::create(['slug' => 'first-login', 'name' => 'First Login', 'emoji' => '🚀', 'points' => 10, 'category' => 'achievement', 'rarity' => 'COMMON', 'description' => 'Welcome']);
        Badge::create(['slug' => 'cv-uploaded', 'name' => 'CV Hunter', 'emoji' => '📄', 'points' => 20, 'category' => 'achievement', 'rarity' => 'COMMON', 'description' => 'CV Uploaded']);
        Badge::create(['slug' => 'roadmap-generated', 'name' => 'Architect', 'emoji' => '🗺️', 'points' => 30, 'category' => 'achievement', 'rarity' => 'COMMON', 'description' => 'Roadmap Created']);
        Badge::create(['slug' => 'milestone-1', 'name' => 'Fast Learner', 'emoji' => '⚡', 'points' => 40, 'category' => 'achievement', 'rarity' => 'COMMON', 'description' => 'First Milestone']);
    }

    #[Test]
    public function full_user_journey_integration(): void
    {
        $this->seedBadges();

        // 1. Registration
        $response = $this->post('/register', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);
        $response->assertRedirect(route('dashboard'));
        $user = User::where('email', 'john@example.com')->first();
        $user->markEmailAsVerified();
        $this->assertAuthenticatedAs($user);

        // 2. Onboarding
        $this->actingAs($user)->post('/onboarding', [
            'career_target' => ['Backend Developer'],
            'skills' => [['name' => 'PHP', 'level' => 'beginner']],
        ])->assertRedirect(route('dashboard'));
        
        $user->refresh();
        $this->assertTrue($user->profile->onboarding_completed);

        // 3. CV Analysis
        $mockGemini = $this->createMock(GeminiService::class);
        $mockGemini->method('parseCV')->willReturn([
            'skills' => [['name' => 'Laravel', 'level' => 'intermediate']],
            'experiences' => [],
            'education' => []
        ]);
        $mockGemini->method('generateCareerPaths')->willReturn([]);
        $mockGemini->method('generateCvOptimization')->willReturn('Mocked CV advice');
        
        $this->app->instance(GeminiService::class, $mockGemini);

        $cvText = str_repeat('My skills include Laravel and PHP. I want to be a backend developer. ', 5);
        $this->actingAs($user)->post('/analysis/cv', [
            'career_target' => ['Backend Developer'],
            'cv_text' => $cvText
        ])->assertRedirect(route('analysis'));

        // Manually trigger background logic for test
        app(AnalysisController::class)->runAnalysisForUser($user->id, $cvText, ['Backend Developer']);
        
        $user->refresh();
        $this->assertCount(2, $user->profile->skills); // PHP + Laravel
        $this->assertTrue($user->badges()->where('slug', 'cv-uploaded')->exists());

        // 4. Roadmap Generation
        $mockGemini->method('generateRoadmapStructure')->willReturn([
            'milestones' => [
                [
                    'id' => 'ms-1', 
                    'title' => 'Master Docker', 
                    'status' => 'current', 
                    'skills' => ['Docker'],
                    'resources' => [['title' => 'Doc', 'url' => 'http://test']],
                    'why_important' => 'Deployment'
                ]
            ]
        ]);

        $this->actingAs($user)->post('/roadmap/generate')->assertRedirect(route('roadmap'));
        $this->assertDatabaseHas('user_roadmaps', ['user_id' => $user->id]);
        $this->assertTrue($user->badges()->where('slug', 'roadmap-generated')->exists());

        // 5. Milestone Completion
        $this->actingAs($user)->patch('/roadmap/milestone/ms-1/complete')->assertRedirect();
        
        $user->refresh();
        $this->assertEquals(1, $user->roadmaps()->first()->milestones_completed);
        $this->assertTrue($user->badges()->where('slug', 'milestone-1')->exists());
        $this->assertNotNull($user->workReadinessScore);
        $this->assertGreaterThan(0, $user->workReadinessScore->score);

        // 6. Leaderboard Presence
        $this->actingAs($user)->get('/leaderboard')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->has('leaders')
                ->where('leaders.0.name', 'John Doe'));
    }
}

// Minimal stub for AnalysisController to access protected runAnalysisForUser in test
class AnalysisController extends \App\Http\Controllers\AnalysisController {
    public function runAnalysisForUser(int $userId, string $cvText, array $careerTargets): void {
        parent::runAnalysisForUser($userId, $cvText, $careerTargets);
    }
}
