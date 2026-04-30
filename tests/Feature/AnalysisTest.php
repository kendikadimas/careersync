<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\UserProfile;
use App\Services\CvParserService;
use App\Services\GeminiService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class AnalysisTest extends TestCase
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
    public function index_renders_analysis_page(): void
    {
        $user = $this->createOnboardedUser();
        $this->actingAs($user)->get('/analysis')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('Analysis'));
    }

    #[Test]
    public function store_validates_required_career_target(): void
    {
        $user = $this->createOnboardedUser();
        $this->actingAs($user)->post('/analysis/cv', [])
            ->assertSessionHasErrors('career_target');
    }

    #[Test]
    public function store_validates_minimum_cv_text_length(): void
    {
        $user = $this->createOnboardedUser();
        $this->actingAs($user)->post('/analysis/cv', [
            'career_target' => ['Software Engineer'],
            'cv_text' => 'Too short',
        ])->assertSessionHas('error');
    }

    #[Test]
    public function store_accepts_cv_text_and_triggers_analysis(): void
    {
        $user = $this->createOnboardedUser();
        
        $mockGemini = $this->createMock(GeminiService::class);
        $mockParser = $this->createMock(CvParserService::class);
        
        $this->app->instance(GeminiService::class, $mockGemini);
        $this->app->instance(CvParserService::class, $mockParser);

        $cvText = str_repeat('This is a long CV text with skills and experience. ', 10);
        
        $response = $this->actingAs($user)->post('/analysis/cv', [
            'career_target' => ['Backend Developer'],
            'cv_text' => $cvText,
        ]);

        $response->assertRedirect(route('analysis'));
        $this->assertDatabaseHas('user_profiles', [
            'user_id' => $user->id,
            'cv_raw_text' => $cvText,
        ]);
    }

    #[Test]
    public function store_accepts_cv_file_and_triggers_analysis(): void
    {
        $user = $this->createOnboardedUser();
        
        $mockGemini = $this->createMock(GeminiService::class);
        $mockParser = $this->createMock(CvParserService::class);
        
        $mockParser->expects($this->once())
            ->method('extractText')
            ->willReturn(str_repeat('Extracted CV text from PDF file. ', 10));

        $this->app->instance(GeminiService::class, $mockGemini);
        $this->app->instance(CvParserService::class, $mockParser);

        $file = UploadedFile::fake()->create('cv.pdf', 100);
        
        $response = $this->actingAs($user)->post('/analysis/cv', [
            'career_target' => ['Backend Developer'],
            'cv_file' => $file,
        ]);

        $response->assertRedirect(route('analysis'));
        $this->assertDatabaseHas('user_profiles', [
            'user_id' => $user->id,
        ]);
    }
}
