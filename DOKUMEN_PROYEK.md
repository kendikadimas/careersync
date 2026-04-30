# Dokumen Overview Proyek: Kembangin

## 1. Pengenalan Proyek
**Kembangin** adalah sebuah platform EdTech mutakhir berbasis AI yang bertujuan untuk membantu terutama pengembang web (Web Developers) atau pencari kerja agar kemampuannya lebih relevan (sinkron) dengan kebutuhan pasar kerja saat ini.

Platform ini berfungsi sebagai "jembatan" bagi para talenta untuk menilai seberapa siap mereka menghadapi dunia industri (Workforce Readiness), serta memberikan mereka jalur pembelajaran (*Roadmap*) yang disesuaikan dengan kondisi pasar kerja terkini secara *real-time*.

## 2. Arsitektur dan Teknologi 
Berdasarkan struktur proyek, aplikasi ini dibangun menggunakan stack modern (monolith dengan SPA):
* **Backend Framework**: Laravel 13 (PHP 8.4+)
* **Frontend Framework**: React 18 menggunakan Inertia.js (V3) untuk integrasi SPA (Single Page Application) tanpa perlu membuat API secara terpisah.
* **Styling**: Tailwind CSS v4.
* **AI & Machine Learning**: Integrasi Google Gemini API (model `gemini-2.5-flash`) untuk pemrosesan bahasa alami, analisis CV, dan penyusunan Roadmap belajar.
* **Integrasi Pihak Ketiga**:
  * Job/Market Data API (LinkedIn, JSearch, Arbeitnow).
  * Pencarian konten edukasi di YouTube.
  * Verifikasi submission project via GitHub.

## 3. Fitur Utama & Cara Kerja Layanan (Services)
Struktur di direktori `app/Services` memberikan gambaran yang jelas mengenai fitur utama platform dan alur (*flow*) bisnisnya:

1. **Intelligent CV Parsing (`CvParserService.php`)**
   Pengguna mengunggah CV, kemudian layanan ini akan mengekstrak informasi, pengalaman, dan keahlian (skills) mereka secara otomatis tanpa entri data manual dengan bantuan AI.
   
2. **Real-time Market Analytics (`JobCrawlerService.php`, `JobApiService.php`, `SkillAggregatorService.php`)**
   Sistem di belakang layar (dapat dijalankan otomatis lewat job scheduler/cron) terus memantau lowongan pekerjaan dari berbagai sumber. Data tersebut diagregasi dan dianalisis tingkat keseringan munculnya (*Trending Skills*) sehingga sistem dapat mengetahui *skill* apa saja yang paling dicari perusahaan hari ini.

3. **AI-Driven Roadmap & Materi Belajar (`GeminiService.php`, `YouTubeSearchService.php`)**
   Sistem membandingkan *skill* dari CV pengguna versus *Trending Skills* di pasar. 
   Jika ada "Skill Gap" (kesenjangan keterampilan), AI akan membuatkan **User Roadmap** spesifik sebagai panduan belajar untuk menutupi gap tersebut. Materi ini didukung otomatis oleh `YouTubeSearchService` yang akan mengambil video-video tutorial yang relevan (difokuskan pada konten kreator lokal/Bahasa Indonesia agar mudah dipahami).

4. **Penilaian dan Sertifikasi (`BadgeService.php`, `GitHubVerificationService.php`)**
   * Pengguna diberikan `WorkReadinessScore` (Skor Kesiapan Kerja) yang divisualisasikan, misal dengan *Radar Chart*.
   * Setelah mengikuti alur belajar dan mengerjakan *Capstone Project* atau Portofolio yang dikumpulkan lewat tautan GitHub, `GitHubVerificationService` akan memverifikasi submission. Jika berhasil, pengguna meraih penghargaan berupa lencana digital (Badge) melalui `BadgeService`.

5. **Komunitas Diskusi (`PeerDiscussion`)**
   Menyediakan wadah diskusi di dalam platform (Mirip forum/StackOverflow ringan) agar pengguna yang sedang belajar dapat berinteraksi, bertanya, dan berdiskusi.

## 4. Struktur Database Inti
Berdasarkan skema model pada `app/Models/`, berikut adalah gambaran entitas utama untuk menyimpan data platform:

* **Pengguna & Profil**: `User`, `UserProfile`, `WorkReadinessScore`.
* **Materi Belajar**: `UserRoadmap` (Jalur belajar per pengguna).
* **Validasi Skill**: `PortfolioProject`, `CapstoneSubmission`, `Badge`, `UserBadge`.
* **Data Intelijen Pasar (Market Data)**: `MarketInsight`, `ScrapedJob`, `TrendingSkill`.
* **Forum Komunitas**: `PeerDiscussion`, `PeerDiscussionReply`.

## 5. Kesimpulan
**Kembangin** bukan lagi sekadar web LMS (Learning Management System) statis, melainkan produk AI interaktif yang terus memperbarui diri berdasarkan data industri. Sistem ini secara holistik memetakan kemampuan saat ini, menunjukkan target apa yang harus dipelajari agar cepat dipekerjakan, memberikan panduan belajarnya, sekaligus mewadahi validasi karya dan komunitas bagi penggunanya secara *end-to-end*.