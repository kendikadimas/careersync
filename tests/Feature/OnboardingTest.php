<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class OnboardingTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_redirects_unauthenticated_user(): void
    {
        $this->get('/onboarding')->assertRedirect('/login');
    }

    #[Test]
    public function it_renders_onboarding_page(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user)->get('/onboarding')->assertStatus(200);
    }

    #[Test]
    public function it_redirects_to_onboarding_if_not_completed(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user)->get('/dashboard')->assertRedirect();
    }

    #[Test]
    public function it_stores_onboarding_data(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user)->post('/onboarding', [
            'career_target' => ['Software Engineer'],
            'skills' => [['name' => 'JavaScript', 'level' => 'intermediate']],
            'education' => ['degree' => 'S1', 'major' => 'Teknik Informatika', 'university' => 'Test Univ'],
        ])->assertRedirect();
        $this->assertDatabaseHas('user_profiles', ['user_id' => $user->id]);
    }
}
