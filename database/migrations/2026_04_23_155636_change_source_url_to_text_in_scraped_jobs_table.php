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
        Schema::table('scraped_jobs', function (Blueprint $table) {
            // Kita ubah ke TEXT agar bisa menampung URL yang sangat panjang
            // Serta kita hapus unique constraint dari database level jika panjangnya lebih dari batas index (767-3072 bytes)
            $table->text('source_url')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('scraped_jobs', function (Blueprint $table) {
            $table->string('source_url')->unique()->change();
        });
    }
};
