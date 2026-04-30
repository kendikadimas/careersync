<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\UserProfile;
use App\Models\WorkReadinessScore;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ScoreCalculationTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_redirects_unauthenticated_user(): void
    {
        $this->post('/score/calculate')->assertRedirect('/login');
    }

    #[Test]
    public function it_calculates_score_for_authenticated_user(): void
    {
        $user = User::factory()->create();
        UserProfile::create(['user_id' => $user->id, 'career_target' => ['SE'], 'skills' => [['name' => 'JS', 'level' => 'intermediate']], 'experiences' => [['type' => 'internship', 'title' => 'Intern']], 'education' => ['degree' => 'S1', 'major' => 'Teknik Informatika'], 'onboarding_completed' => true]);
        $this->actingAs($user)->post('/score/calculate')->assertRedirect();
        $this->assertDatabaseHas('work_readiness_scores', ['user_id' => $user->id]);
    }

    #[Test]
    public function it_creates_new_score_entry_each_time(): void
    {
        $user = User::factory()->create();
        UserProfile::create(['user_id' => $user->id, 'career_target' => ['SE'], 'skills' => [], 'experiences' => [], 'education' => [], 'onboarding_completed' => true]);
        $this->actingAs($user)->post('/score/calculate');
        $this->actingAs($user)->post('/score/calculate');
        $this->assertEquals(2, WorkReadinessScore::where('user_id', $user->id)->count());
    }
}
