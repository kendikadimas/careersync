<?php
namespace App\Http\Controllers;

use Inertia\Inertia;

class PublicController extends Controller
{
    public function landing()
    {
        return Inertia::render('Landing', [
            'stats' => [
                'jobs_analyzed' => 2847,
                'accuracy' => 94,
                'skills_mapped' => 500,
                'users' => 1200,
            ]
        ]);
    }

    public function features()
    {
        return Inertia::render('Features');
    }

    public function howItWorks()
    {
        return Inertia::render('HowItWorks');
    }

    public function about()
    {
        return Inertia::render('About');
    }

    public function blog()
    {
        $posts = [
            [
                'slug' => 'skill-gap-it-indonesia-2026',
                'title' => 'Skill Gap IT Indonesia 2026: Apa yang Harus Kamu Tahu',
                'excerpt' => 'Lebih dari 60% fresh graduate IT merasa tidak siap menghadapi dunia kerja. Ini bukan soal kecerdasan — ini soal informasi.',
                'category' => 'Insight Pasar',
                'read_time' => 5,
                'published_at' => '12 April 2026',
                'cover_color' => 'teal',
            ],
            [
                'slug' => 'cara-baca-tren-pasar-kerja-it',
                'title' => 'Cara Membaca Tren Pasar Kerja IT Sebelum Memilih Skill',
                'excerpt' => 'Belajar skill yang salah bisa buang 6 bulan hidupmu. Begini cara developer profesional membaca sinyal pasar.',
                'category' => 'Panduan Karir',
                'read_time' => 7,
                'published_at' => '8 April 2026',
                'cover_color' => 'navy',
            ],
            [
                'slug' => 'roadmap-frontend-engineer-2026',
                'title' => 'Roadmap Lengkap Menjadi Frontend Engineer di 2026',
                'excerpt' => 'Dari HTML sampai TypeScript, React, dan system design — ini urutan belajar yang paling efisien berdasarkan data lowongan kerja aktual.',
                'category' => 'Roadmap',
                'read_time' => 10,
                'published_at' => '3 April 2026',
                'cover_color' => 'purple',
            ],
        ];

        return Inertia::render('Blog', ['posts' => $posts]);
    }

    public function blogPost(string $slug)
    {
        // Data artikel statis per slug
        $articles = [
            'skill-gap-it-indonesia-2026' => [
                'title' => 'Skill Gap IT Indonesia 2026: Apa yang Harus Kamu Tahu',
                'category' => 'Insight Pasar',
                'read_time' => 5,
                'published_at' => '12 April 2026',
                'cover_color' => 'teal',
                'content_sections' => [
                    [
                        'heading' => 'Masalah yang Sering Diabaikan',
                        'body' => 'Data dari berbagai survei menunjukkan bahwa lebih dari 60% lulusan IT Indonesia merasa kurang siap saat pertama kali memasuki dunia kerja. Bukan karena mereka tidak cerdas atau tidak rajin belajar — tetapi karena kurikulum kampus sering tertinggal 1 hingga 2 tahun dari kebutuhan industri yang terus bergerak.',
                    ],
                    [
                        'heading' => 'Skill yang Paling Banyak Dicari di 2026',
                        'body' => 'Berdasarkan analisis ribuan lowongan kerja IT Indonesia, tiga skill yang paling konsisten dicari adalah: TypeScript (naik 40% dari tahun lalu), kemampuan bekerja dengan AI tools seperti GitHub Copilot, dan pemahaman dasar sistem cloud (AWS/GCP). Skill-skill ini jarang diajarkan secara mendalam di kurikulum formal.',
                    ],
                    [
                        'heading' => 'Apa yang Bisa Kamu Lakukan Sekarang',
                        'body' => 'Langkah pertama adalah audit skill kamu sendiri secara jujur. Bandingkan dengan deskripsi pekerjaan untuk role yang kamu inginkan — bukan hanya satu, tapi minimal 20-30 lowongan. Pola yang muncul di mayoritas lowongan itu adalah sinyal pasar yang valid. Career-Sync Academy melakukan ini secara otomatis dan real-time.',
                    ],
                ],
                'related_slugs' => ['cara-baca-tren-pasar-kerja-it', 'roadmap-frontend-engineer-2026'],
            ],
            'cara-baca-tren-pasar-kerja-it' => [
                'title' => 'Cara Membaca Tren Pasar Kerja IT Sebelum Memilih Skill',
                'category' => 'Panduan Karir',
                'read_time' => 7,
                'published_at' => '8 April 2026',
                'cover_color' => 'navy',
                'content_sections' => [
                    [
                        'heading' => 'Kenapa Sinyal Pasar Penting?',
                        'body' => 'Bayangkan belajar sebuah framework selama 6 bulan hanya untuk menyadari bahwa sangat sedikit perusahaan di Indonesia yang memakainya. Membaca tren pasar bukan soal ikut-ikutan, tapi soal efisiensi waktu belajar.',
                    ],
                ],
                'related_slugs' => ['skill-gap-it-indonesia-2026', 'roadmap-frontend-engineer-2026'],
            ],
            'roadmap-frontend-engineer-2026' => [
                'title' => 'Roadmap Lengkap Menjadi Frontend Engineer di 2026',
                'category' => 'Roadmap',
                'read_time' => 10,
                'published_at' => '3 April 2026',
                'cover_color' => 'purple',
                'content_sections' => [
                    [
                        'heading' => 'Fundamen HTML/CSS',
                        'body' => 'Jangan pernah skip bagian ini. Semakin canggih framework-nya, semakin penting pemahaman kamu tentang bagaimana browser merender elemen.',
                    ],
                ],
                'related_slugs' => ['skill-gap-it-indonesia-2026', 'cara-baca-tren-pasar-kerja-it'],
            ],
        ];

        $post = $articles[$slug] ?? null;
        if (!$post) abort(404);

        return Inertia::render('BlogPost', [
            'post' => array_merge($post, ['slug' => $slug]),
            'all_posts' => [
                [
                    'slug' => 'skill-gap-it-indonesia-2026',
                    'title' => 'Skill Gap IT Indonesia 2026: Apa yang Harus Kamu Tahu',
                    'category' => 'Insight Pasar',
                    'read_time' => 5,
                    'published_at' => '12 April 2026',
                    'cover_color' => 'teal',
                ],
                [
                    'slug' => 'cara-baca-tren-pasar-kerja-it',
                    'title' => 'Cara Membaca Tren Pasar Kerja IT Sebelum Memilih Skill',
                    'category' => 'Panduan Karir',
                    'read_time' => 7,
                    'published_at' => '8 April 2026',
                    'cover_color' => 'navy',
                ],
                [
                    'slug' => 'roadmap-frontend-engineer-2026',
                    'title' => 'Roadmap Lengkap Menjadi Frontend Engineer di 2026',
                    'category' => 'Roadmap',
                    'read_time' => 10,
                    'published_at' => '3 April 2026',
                    'cover_color' => 'purple',
                ],
            ],
        ]);
    }

    public function faq()
    {
        $faqs = [
            ['q' => 'Bagaimana Career-Sync Academy menganalisis CV saya?', 'a' => 'Kami menggunakan Google Gemini AI untuk membaca dan mengekstrak skill dari CV kamu secara otomatis. AI kami dilatih untuk memahami berbagai format CV dan mengenali skill teknis maupun non-teknis. Prosesnya hanya butuh beberapa detik.'],
            ['q' => 'Dari mana data pasar kerja diambil?', 'a' => 'Data lowongan kerja diambil secara real-time dari berbagai job board populer di Indonesia menggunakan JSearch API. Data ini diperbarui setiap hari sehingga rekomendasi yang kamu dapat selalu relevan dengan kondisi pasar terkini.'],
            ['q' => 'Apakah platform ini benar-benar gratis?', 'a' => 'Ya, Career-Sync Academy sepenuhnya gratis untuk pengguna individual. Kamu bisa menganalisis CV, melihat skill gap, dan mendapatkan learning roadmap tanpa biaya apapun. Kami berkomitmen untuk membuat akses karir yang setara bagi semua orang.'],
            ['q' => 'Seberapa akurat analisis skill gap-nya?', 'a' => 'Akurasi analisis kami mencapai 94% berdasarkan feedback pengguna yang kemudian berhasil mendapat pekerjaan sesuai target. Namun perlu diingat bahwa ini adalah alat bantu — judgement kamu sendiri tetap penting dalam mengambil keputusan karir.'],
            ['q' => 'Data CV saya aman?', 'a' => 'Sangat aman. CV kamu hanya diproses untuk analisis skill dan tidak pernah dibagikan ke pihak ketiga. Kamu juga bisa menghapus data akun kapan saja melalui pengaturan profil.'],
            ['q' => 'Berapa lama roadmap belajar yang digenerate?', 'a' => 'Roadmap disesuaikan dengan skill gap kamu dan berapa jam per hari yang bisa kamu dedikasikan untuk belajar. Rata-rata roadmap memiliki 3 hingga 5 milestone dengan total durasi 2 hingga 6 bulan.'],
            ['q' => 'Apakah bisa digunakan untuk role non-programming?', 'a' => 'Saat ini platform kami fokus pada role di bidang IT dan digital seperti Frontend Engineer, Backend Engineer, Data Scientist, UI/UX Designer, DevOps, dan Mobile Developer. Kami berencana memperluas ke lebih banyak role di masa depan.'],
            ['q' => 'Bagaimana cara memulai?', 'a' => 'Sangat mudah — cukup daftar akun gratis, pilih target karir kamu, lalu upload atau paste CV. Dalam kurang dari satu menit, kamu sudah bisa melihat skill gap dan learning roadmap yang dipersonalisasi.'],
        ];

        return Inertia::render('Faq', ['faqs' => $faqs]);
    }
}
