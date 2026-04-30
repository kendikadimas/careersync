<?php

namespace Tests\Feature;

use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class PublicPagesTest extends TestCase
{
    #[Test]
    public function it_renders_landing_page(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    #[Test]
    public function it_renders_features_page(): void
    {
        $response = $this->get('/features');

        $response->assertStatus(200);
    }

    #[Test]
    public function it_renders_how_it_works_page(): void
    {
        $response = $this->get('/how-it-works');

        $response->assertStatus(200);
    }

    #[Test]
    public function it_renders_about_page(): void
    {
        $response = $this->get('/about');

        $response->assertStatus(200);
    }

    #[Test]
    public function it_renders_blog_page(): void
    {
        $response = $this->get('/blog');

        $response->assertStatus(200);
    }

    #[Test]
    public function it_renders_faq_page(): void
    {
        $response = $this->get('/faq');

        $response->assertStatus(200);
    }

    #[Test]
    public function it_renders_demo_page(): void
    {
        $response = $this->get('/demo');

        $response->assertStatus(200);
    }
}
