<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('portfolio_projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('description');
            $table->string('github_url');
            $table->string('demo_url')->nullable();
            $table->string('thumbnail_url')->nullable();
            $table->json('tech_stack');
            $table->string('milestone_id')->nullable();
            $table->boolean('github_verified')->default(false);
            $table->integer('github_stars')->default(0);
            $table->string('visibility')->default('public');
            $table->timestamp('verified_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('portfolio_projects');
    }
};
