<?php

namespace Tests\Feature;

use Tests\TestCase;
use Inertia\Testing\AssertableInertia as Assert;

class AboutIntegrationTest extends TestCase
{
    /**
     * Test if the about page renders correctly with the expected component.
     */
    public function test_about_page_renders_with_correct_component(): void
    {
        $response = $this->get('/about');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('About')
        );
    }
}
