# Dokumentasi Proyek Career-Sync Academy (Detail)

## 1. Ringkasan Umum
Career-Sync Academy adalah platform EdTech berbasis AI untuk membantu mahasiswa tingkat akhir dan fresh graduate IT menutup kesenjangan kompetensi terhadap kebutuhan industri. Platform ini menggabungkan analisis CV, pemetaan skill gap, roadmap belajar, capstone project, market intelligence, serta gamifikasi (badge, leaderboard, portfolio) dalam satu alur pembelajaran.

Tujuan utama platform:
- Membantu pengguna memahami posisi kompetensi saat ini.
- Memberikan arah belajar terstruktur dan relevan dengan pasar kerja.
- Menyediakan bukti kesiapan kerja melalui capstone dan portfolio.

## 2. Problem yang Diselesaikan
Platform ini menargetkan beberapa problem utama:
- Skill gap antara pembelajaran akademik dan kebutuhan industri.
- Information overload dari banyaknya materi belajar tanpa prioritas jelas.
- Roadmap belajar statis yang tidak adaptif terhadap dinamika job market.
- Kurangnya bukti praktik (proof-of-work) untuk proses rekrutmen entry-level.

## 3. Target Pengguna
- Mahasiswa tingkat akhir jurusan IT/digital.
- Fresh graduate yang ingin cepat siap kerja.
- Early career switcher yang butuh peta belajar terstruktur.
- Institusi pendidikan (potensial) untuk memantau kesiapan lulusan.

## 4. Fitur Inti

### 4.1 Onboarding dan Profil
- User menentukan career target.
- Sistem menyimpan profil awal untuk personalisasi fitur berikutnya.

### 4.2 Analisis CV (AI + Fallback)
Alur fitur:
1. User upload CV (pdf/doc/docx/txt) atau paste teks CV.
2. Sistem ekstrak teks CV.
3. AI parsing mengekstrak skill, pengalaman, pendidikan.
4. Sistem hitung skill gap terhadap role target.
5. Profil pengguna diperbarui dan dipakai lintas fitur.

Teknis penting:
- Jika AI bermasalah (quota/auth/error), sistem fallback ke parser lokal agar proses tetap jalan.
- Proses analisis dipindah ke background-after-response agar UX lebih cepat.

### 4.3 Skill Gap Visualization
- Menampilkan perbandingan skill user vs demand industri.
- Status gap dibuat bertingkat (siap, hampir standar, perlu peningkatan, prioritas belajar).
- Dipakai sebagai dasar roadmap dan insight.

### 4.4 Learning Roadmap
- Generate roadmap berdasarkan career target + skill gap.
- Milestone punya status (current/locked/completed).
- Detail milestone dapat dimuat saat diklik.
- Detail milestone kini tampil inline di bawah timeline (bukan drawer samping).

### 4.5 Materi Belajar Terkurasi (YouTube API)
- Resource video diambil langsung via YouTube API (direct watch URL).
- Prioritas channel Indonesia tertentu untuk konsistensi kualitas.
- Prioritas video durasi panjang/menengah, filter shorts/reels.
- Deduplikasi URL resource.

### 4.6 Capstone Project
- Tiap milestone memiliki capstone assignment.
- Submit membutuhkan link GitHub dan deskripsi proyek.
- Integrasi verifikasi GitHub otomatis.
- Scoring capstone mempertimbangkan:
  - kelengkapan repo,
  - README,
  - commit,
  - file count,
  - demo URL,
  - deskripsi,
  - checklist.

### 4.7 Market Intelligence
- Lowongan diambil dari multi-source API.
- Prioritas hasil lokasi Indonesia di urutan atas.
- Trending skills dihitung dari data live job descriptions.
- Fallback ke data statis/agregasi saat API kosong.

### 4.8 Dashboard dan Job Recommendation
- Ringkasan profile, gap count, market stats, roadmap progress.
- Rekomendasi lowongan berdasarkan target role + skill match.

### 4.9 Insights, Leaderboard, Portfolio
- Insight area tersedia (dengan endpoint regenerate).
- Leaderboard dengan opt-in pengguna.
- Portfolio project untuk menampilkan bukti hasil belajar.

### 4.10 Badge dan Gamifikasi
- Badge otomatis diberikan sesuai pencapaian (CV, roadmap, capstone, score, portfolio, dll).
- Mendorong retensi dan progres belajar.

## 5. Arsitektur Sistem

### 5.1 Backend
- Framework: Laravel 13.
- Pola: MVC + Service Layer.
- Fitur pendukung: queue listener, scheduler, cache, command.

Service penting:
- GeminiService: parsing CV dan fungsi AI.
- JobApiService: pengambilan lowongan multi-source.
- YouTubeSearchService: resource video terkurasi.
- GitHubVerificationService: validasi repo capstone.
- BadgeService: awarding badge otomatis.
- CvParserService: ekstraksi teks CV dari file.

### 5.2 Frontend
- React + Inertia + TypeScript.
- Tailwind CSS v4 untuk styling.
- Recharts untuk visualisasi (radar/stat chart).

### 5.3 Data Layer
- Database relasional (MySQL/SQLite tergantung env).
- Model inti: UserProfile, UserRoadmap, CapstoneSubmission, TrendingSkill, MarketInsight, Badge/UserBadge, PortfolioProject, WorkReadinessScore.

### 5.4 Pipeline Periodik
- Command `jobs:crawl` untuk crawling + agregasi skill.
- Scheduler sudah tersedia untuk menjalankan job secara periodik.

## 6. Teknologi yang Dipakai

Backend:
- PHP 8.3+
- Laravel 13
- inertiajs/inertia-laravel
- guzzlehttp/guzzle
- google-gemini-php/laravel
- smalot/pdfparser
- phpoffice/phpword

Frontend:
- React 19
- TypeScript
- Vite 6
- Tailwind CSS 4
- Recharts
- Framer Motion
- Axios

## 7. Daftar Route Utama (Ringkas)
Public:
- /
- /features
- /how-it-works
- /about
- /blog
- /faq
- /demo

Authenticated:
- /dashboard
- /analysis (GET, POST /analysis/cv)
- /roadmap (GET, POST generate, GET detail milestone)
- /roadmap/{roadmapId}/capstone/{milestoneId} (GET, POST)
- /market
- /insights
- /leaderboard
- /portfolio
- /settings
- /notifications
- /profile/details

## 8. Alur Pengguna End-to-End
1. Register/login.
2. Onboarding memilih career target.
3. Upload/paste CV di halaman Analysis.
4. Sistem proses parsing CV dan hitung skill gap.
5. User generate roadmap dari gap prioritas.
6. User klik milestone, pelajari materi, kerjakan capstone.
7. User submit capstone dan diverifikasi.
8. Score, badge, dan progress roadmap diperbarui.
9. User pantau market jobs + trending skills.
10. User bangun portfolio dan optimasi readiness.

## 9. Konfigurasi Environment Penting
- APP_KEY
- DB_* (database)
- GEMINI_API_KEY
- GEMINI_MODEL / GEMINI_FALLBACK_MODELS
- RAPIDAPI_KEY
- YOUTUBE_API_KEY
- GOOGLE_SEARCH_API_KEY
- GOOGLE_SEARCH_CX
- ADZUNA_APP_ID / ADZUNA_APP_KEY
- JOOBLE_API_KEY
- GITHUB_TOKEN (opsional)

## 10. Kekuatan Implementasi Saat Ini
- Alur utama user (analysis -> roadmap -> capstone) sudah terhubung.
- Fallback strategy cukup baik untuk menjaga availability (AI + job source).
- Integrasi resource pembelajaran kini direct video URL, bukan search link.
- Optimisasi UX pada proses berat sudah dilakukan via background process.
- Market jobs sudah memprioritaskan Indonesia di hasil final.

## 11. Catatan Kondisi Terkini (Penting)
Berdasarkan kode saat ini, beberapa fungsi AI masih placeholder/stub:
- generateRoadmapStructure
- generateInsights
- batchAnalyzeJobMatches
- generateCareerPaths
- generateMarketResearch
- generateCvOptimization

Implikasi:
- Sebagian fitur berjalan dengan fallback/default behavior.
- Untuk produksi penuh, fungsi-fungsi ini perlu diaktifkan dengan output AI yang konsisten dan tervalidasi.

## 12. Risiko dan Mitigasi
Risiko:
- API quota/limit (Gemini, job API, YouTube API).
- Variasi format data antar provider lowongan.
- Inconsistency output AI (JSON invalid).

Mitigasi yang sudah ada:
- Caching hasil API.
- Fallback parser lokal.
- Multi-source job aggregation.
- Validasi dan normalisasi data hasil fetch.

Mitigasi yang disarankan lanjutan:
- Telemetry per fitur (latency, success rate, model hit).
- Retry policy dan circuit-breaker ringan.
- Contract test untuk format output AI.

## 13. Rekomendasi Pengembangan Lanjutan
Prioritas tinggi:
1. Aktifkan implementasi penuh untuk method AI yang masih stub.
2. Tambahkan test otomatis untuk flow kritikal (analysis, roadmap, capstone scoring).
3. Stabilkan scoring capstone agar preview frontend dan backend benar-benar identik.
4. Tambahkan observability dashboard sederhana untuk error API eksternal.

Prioritas menengah:
1. Personalisasi roadmap berdasarkan progress historis user.
2. Improve matching job recommendation dengan embedding/semantic ranking.
3. Tambah mode mentor/reviewer untuk capstone feedback kualitatif.

## 14. Kesimpulan
Career-Sync Academy sudah memiliki fondasi produk yang kuat: alur pengguna jelas, modul fitur terintegrasi, serta dukungan data industri dan AI. Dengan penyempurnaan pada modul AI yang masih placeholder dan penambahan pengujian otomatis, platform ini sangat potensial menjadi ekosistem pembelajaran karier yang adaptif, praktis, dan relevan dengan kebutuhan industri Indonesia.
