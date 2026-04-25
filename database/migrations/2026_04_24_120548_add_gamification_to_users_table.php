<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('rank')->default('Apprentice')->after('password');
            $table->integer('total_points')->default(0)->after('rank');
            $table->boolean('show_on_leaderboard')->default(true)->after('total_points');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['rank', 'total_points', 'show_on_leaderboard']);
        });
    }
};
