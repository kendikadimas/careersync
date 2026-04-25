<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Badge;

class BadgeSeeder extends Seeder
{
    public function run(): void
    {
        $badges = [
            // ACHIEVEMENT BADGES
            ['slug' => 'first-login',        'name' => 'Langkah Pertama',    'emoji' => '👣', 'category' => 'achievement', 'rarity' => 'common',    'description' => 'Daftar dan login pertama kali',                   'points' => 5],
            ['slug' => 'cv-uploaded',        'name' => 'CV Ter-analisis',    'emoji' => '📄', 'category' => 'achievement', 'rarity' => 'common',    'description' => 'Upload dan analisis CV pertama',                  'points' => 10],
            ['slug' => 'roadmap-generated',  'name' => 'Punya Peta Jalan',   'emoji' => '🗺️', 'category' => 'achievement', 'rarity' => 'common',    'description' => 'Generate learning roadmap pertama',               'points' => 10],
            ['slug' => 'first-insight',      'name' => 'Self-Aware',         'emoji' => '🧠', 'category' => 'achievement', 'rarity' => 'common',    'description' => 'Membaca AI insights pertama kali',                'points' => 5],
            ['slug' => 'score-60',           'name' => 'Hampir Siap',        'emoji' => '⚡', 'category' => 'achievement', 'rarity' => 'rare',      'description' => 'Work Readiness Score mencapai 60',                'points' => 25],
            ['slug' => 'score-80',           'name' => 'Siap Kerja',         'emoji' => '🎯', 'category' => 'achievement', 'rarity' => 'epic',      'description' => 'Work Readiness Score mencapai 80',                'points' => 50],
            ['slug' => 'score-100',          'name' => 'Market Ready',       'emoji' => '🏆', 'category' => 'achievement', 'rarity' => 'legendary', 'description' => 'Work Readiness Score sempurna 100',               'points' => 100],

            // MILESTONE BADGES
            ['slug' => 'milestone-1',        'name' => 'Milestone Pertama',  'emoji' => '🥇', 'category' => 'milestone',   'rarity' => 'common',    'description' => 'Menyelesaikan milestone pertama di roadmap',      'points' => 20],
            ['slug' => 'milestone-3',        'name' => 'Setengah Jalan',     'emoji' => '🔥', 'category' => 'milestone',   'rarity' => 'rare',      'description' => 'Menyelesaikan 3 milestone',                       'points' => 40],
            ['slug' => 'milestone-all',      'name' => 'Roadmap Conquered',  'emoji' => '🚀', 'category' => 'milestone',   'rarity' => 'epic',      'description' => 'Menyelesaikan semua milestone di roadmap',        'points' => 100],
            ['slug' => 'first-capstone',     'name' => 'Project Builder',    'emoji' => '🛠️', 'category' => 'milestone',   'rarity' => 'common',    'description' => 'Submit capstone project pertama',                 'points' => 30],
            ['slug' => 'perfect-capstone',   'name' => 'Perfeksionis',       'emoji' => '💯', 'category' => 'milestone',   'rarity' => 'rare',      'description' => 'Capstone project dengan score 100/100',           'points' => 50],

            // SKILL BADGES
            ['slug' => 'skill-5',            'name' => 'Multitalenta',       'emoji' => '🌟', 'category' => 'skill',       'rarity' => 'common',    'description' => 'Memiliki 5 skill terverifikasi',                  'points' => 15],
            ['slug' => 'skill-10',           'name' => 'Skilled Dev',        'emoji' => '⭐', 'category' => 'skill',       'rarity' => 'rare',      'description' => 'Memiliki 10 skill terverifikasi',                 'points' => 30],
            ['slug' => 'skill-expert-3',     'name' => 'Triple Expert',      'emoji' => '💎', 'category' => 'skill',       'rarity' => 'epic',      'description' => 'Punya 3 skill dengan level Expert',               'points' => 60],
            ['slug' => 'portfolio-3',        'name' => 'Portfolio Builder',  'emoji' => '🖼️', 'category' => 'skill',       'rarity' => 'rare',      'description' => 'Menambahkan 3 project ke showcase',               'points' => 35],
            ['slug' => 'github-verified',    'name' => 'Open Source Ready',  'emoji' => '🐙', 'category' => 'skill',       'rarity' => 'common',    'description' => 'Submit project dengan GitHub repo terverifikasi', 'points' => 20],
        ];

        foreach ($badges as $badge) {
            Badge::updateOrCreate(['slug' => $badge['slug']], $badge);
        }
    }
}
