<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Convert existing strings to empty array in JSON format
        \Illuminate\Support\Facades\DB::table('user_profiles')->update(['career_target' => '[]']);
        
        Schema::table('user_profiles', function (Blueprint $table) {
            $table->json('career_target')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_profiles', function (Blueprint $table) {
            $table->string('career_target', 100)->default('')->change();
        });
    }
};
