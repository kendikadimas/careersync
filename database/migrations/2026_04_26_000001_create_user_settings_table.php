<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->onDelete('cascade');
            $table->boolean('email_notifications')->default(true);
            $table->boolean('product_updates')->default(true);
            $table->boolean('weekly_summary')->default(true);
            $table->string('language', 10)->default('id');
            $table->string('timezone', 64)->default('Asia/Jakarta');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_settings');
    }
};
