<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\UserRoadmap;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class UserRoadmapTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_completes_a_milestone_and_updates_count(): void
    {
        $user = User::factory()->create();
        $roadmap = UserRoadmap::create([
            'user_id' => $user->id, 'career_target' => 'SE',
            'roadmap_data' => ['milestones' => [
                ['id' => 'm1', 'title' => 'A', 'status' => 'current'],
                ['id' => 'm2', 'title' => 'B', 'status' => 'locked'],
            ]],
            'milestones_completed' => 0, 'total_milestones' => 2,
        ]);
        $this->assertTrue($roadmap->completeMilestone('m1'));
        $roadmap->refresh();
        $this->assertEquals(1, $roadmap->milestones_completed);
    }

    #[Test]
    public function it_unlocks_next_milestone(): void
    {
        $user = User::factory()->create();
        $roadmap = UserRoadmap::create([
            'user_id' => $user->id, 'career_target' => 'SE',
            'roadmap_data' => ['milestones' => [
                ['id' => 'm1', 'title' => 'A', 'status' => 'current'],
                ['id' => 'm2', 'title' => 'B', 'status' => 'locked'],
            ]],
            'milestones_completed' => 0, 'total_milestones' => 2,
        ]);
        $roadmap->completeMilestone('m1');
        $roadmap->refresh();
        $ms = $roadmap->roadmap_data['milestones'];
        $this->assertEquals('completed', $ms[0]['status']);
        $this->assertEquals('current', $ms[1]['status']);
    }

    #[Test]
    public function it_returns_false_for_nonexistent_milestone(): void
    {
        $user = User::factory()->create();
        $roadmap = UserRoadmap::create([
            'user_id' => $user->id, 'career_target' => 'SE',
            'roadmap_data' => ['milestones' => [['id' => 'm1', 'title' => 'A', 'status' => 'current']]],
            'milestones_completed' => 0, 'total_milestones' => 1,
        ]);
        $this->assertFalse($roadmap->completeMilestone('nonexistent'));
    }
}
