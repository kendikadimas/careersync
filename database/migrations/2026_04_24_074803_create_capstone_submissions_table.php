<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('capstone_submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('roadmap_id')->constrained('user_roadmaps')->cascadeOnDelete();
            $table->string('milestone_id'); // e.g., "ms-1"
            $table->string('github_url')->nullable();
            $table->string('demo_url')->nullable();
            $table->text('description')->nullable(); // Penjelasan singkat dari user
            $table->json('checklist_completed'); // Array checklist yang dicentang
            $table->integer('completion_score')->default(0); // 0-100, dihitung otomatis
            $table->enum('status', ['submitted', 'completed'])->default('submitted');
            $table->timestamp('submitted_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('capstone_submissions');
    }
};
