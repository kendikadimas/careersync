<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('user_profiles', function (Blueprint $table) {
            $table->string('headline', 120)->nullable()->after('career_target');
            $table->text('bio')->nullable()->after('headline');
            $table->string('location', 120)->nullable()->after('bio');
            $table->string('phone', 40)->nullable()->after('location');
            $table->string('linkedin', 180)->nullable()->after('phone');
            $table->string('github', 180)->nullable()->after('linkedin');
        });
    }

    public function down(): void
    {
        Schema::table('user_profiles', function (Blueprint $table) {
            $table->dropColumn(['headline', 'bio', 'location', 'phone', 'linkedin', 'github']);
        });
    }
};
