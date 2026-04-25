<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('user_profiles', function (Blueprint $table) {
            $table->json('ai_insights')->nullable()->after('skill_gaps');
            $table->json('smart_tips')->nullable()->after('ai_insights');
            $table->timestamp('insights_generated_at')->nullable()->after('smart_tips');
        });
    }

    public function down(): void
    {
        Schema::table('user_profiles', function (Blueprint $table) {
            $table->dropColumn(['ai_insights', 'smart_tips', 'insights_generated_at']);
        });
    }
};
