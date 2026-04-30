<?php

namespace Tests\Unit;

use App\Data\JobMarketData;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class JobMarketDataTest extends TestCase
{
    #[Test]
    public function it_returns_skills_for_known_role(): void
    {
        $skills = JobMarketData::getSkillsForRole('Backend Developer');
        $this->assertIsArray($skills);
        $this->assertNotEmpty($skills);
        $this->assertArrayHasKey('skill', $skills[0]);
        $this->assertArrayHasKey('demand', $skills[0]);
    }

    #[Test]
    public function it_returns_empty_for_unknown_role(): void
    {
        $skills = JobMarketData::getSkillsForRole('Underwater Basket Weaver');
        $this->assertIsArray($skills);
        $this->assertEmpty($skills);
    }

    #[Test]
    public function it_handles_array_of_roles(): void
    {
        $skills = JobMarketData::getSkillsForRole(['Software Engineer', 'Frontend Developer']);
        $this->assertIsArray($skills);
        $this->assertNotEmpty($skills);
    }

    #[Test]
    public function it_handles_null_role(): void
    {
        $skills = JobMarketData::getSkillsForRole(null);
        $this->assertIsArray($skills);
        $this->assertEmpty($skills);
    }
}
