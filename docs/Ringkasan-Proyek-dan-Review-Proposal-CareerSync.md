# Ringkasan Proyek dan Review Proposal

## Identitas Tim
- Nama Website: Career-Sync Academy
- Tim:
- Dimas Kendika Fazrulfalah - HD023083 - Universitas Jenderal Soedirman
- Sellyjuan Alya Rosalina - HD023006 - Universitas Jenderal Soedirman
- Akmal Adhi Nugroho - H1D025021 - Universitas Jenderal Soedirman
- Institusi: Universitas Jenderal Soedirman, Jawa Tengah
- Tahun: 2026

## 1) Ringkasan Eksekutif Proyek
Career-Sync Academy adalah platform EdTech berbasis AI untuk membantu mahasiswa tingkat akhir dan fresh graduate IT menutup kesenjangan kompetensi terhadap kebutuhan industri. Sistem menggabungkan analisis CV, data pasar kerja multi-sumber, learning roadmap, capstone, portofolio, serta skor kesiapan kerja agar pengguna memiliki arah belajar yang lebih terstruktur, relevan, dan terukur.

## 2) Fitur Utama yang Sudah Terimplementasi
- Analisis CV dan Skill Gap:
- Upload CV (pdf/doc/docx/txt) dan ekstraksi informasi profil.
- Pemetaan skill pengguna vs standar pasar pada target karir.
- Visualisasi skill gap (radar/chart di frontend).

- Market Intelligence:
- Aggregasi lowongan dari beberapa sumber (JSearch, JobsAPI14, Jooble, Adzuna, Arbeitnow/fallback).
- Prioritas penayangan lowongan Indonesia di urutan atas.
- Trending skills dari data lowongan live, dengan fallback ke data agregasi.

- Roadmap dan Milestone:
- Pembuatan struktur roadmap pembelajaran.
- Detail milestone dan progres penyelesaian milestone.

- Capstone dan Verifikasi GitHub:
- Pengumpulan capstone per milestone.
- Verifikasi repository GitHub otomatis.
- Penilaian completion score berbasis checklist + validasi repo.

- Portofolio, Leaderboard, Badge:
- Manajemen portofolio proyek.
- Leaderboard opt-in.
- Pemberian badge berbasis pencapaian.

- Operasional Data:
- Command jobs:crawl tersedia dan sudah dijadwalkan mingguan.

## 3) Manfaat Proyek
- Bagi Mahasiswa/Fresh Graduate:
- Mendapat arah belajar berbasis data pasar, bukan asumsi.
- Mengetahui prioritas skill yang harus ditingkatkan.
- Memiliki bukti kompetensi lewat capstone dan portofolio.

- Bagi Institusi Pendidikan:
- Menjadi jembatan antara kurikulum dan kebutuhan industri.
- Potensial dipakai sebagai bahan evaluasi outcome lulusan.

- Bagi Industri:
- Mendukung ketersediaan talenta entry-level yang lebih relevan.
- Menurunkan mismatch skill pada proses rekrutmen awal.

- Keterkaitan SDGs:
- SDG 4 (Quality Education)
- SDG 8 (Decent Work and Economic Growth)
- SDG 9 (Industry, Innovation, and Infrastructure)

## 4) Arsitektur Singkat dan Teknologi
- Backend: Laravel 13, PHP 8.3, Inertia Laravel.
- Frontend: React (Inertia), TypeScript, Tailwind CSS v4, Recharts, Lucide, Framer Motion.
- Integrasi AI: Google Gemini API (dengan fallback parser lokal pada parse CV).
- Data Market: RapidAPI/JSearch + sumber alternatif untuk fallback/kelengkapan data.
- Build Tool: Vite.

## 5) Review Proposal: Ketidaksesuaian dengan Implementasi Saat Ini
Berikut poin ketidaksesuaian atau yang perlu diselaraskan agar proposal lebih akurat terhadap kondisi produk saat ini.

### 5.1 Ketidaksesuaian Teknis
- Pernyataan Frontend:
- Proposal menulis React.js (App Router).
- Implementasi saat ini menggunakan React + Inertia.js (bukan Next.js App Router).
- Saran: ubah narasi arsitektur frontend menjadi Inertia SPA architecture.

- Versi Framework:
- Proposal menyebut Laravel 12 (terbaru).
- Implementasi saat ini sudah Laravel 13.
- Saran: sinkronkan seluruh tabel teknologi agar konsisten.

- Recharts versi:
- Proposal menulis Recharts 2.x.
- Implementasi dependency saat ini Recharts 3.x.
- Saran: update tabel versi agar sesuai package aktual.

### 5.2 Ketidaksesuaian Fitur AI
- Beberapa fungsi AI masih stub di service utama:
- generateRoadmapStructure saat ini hanya mengembalikan struktur minimal default.
- generateInsights, batchAnalyzeJobMatches, generateCareerPaths, generateMarketResearch, generateCvOptimization saat ini masih placeholder/hasil kosong.
- Dampak pada proposal:
- Proposal menggambarkan fitur AI generatif lanjutan seolah sudah sepenuhnya aktif.
- Saran:
- Ubah redaksi menjadi in progress/iteratif untuk fitur yang belum full aktif.
- Pisahkan jelas: fitur production-ready vs fitur roadmap pengembangan.

### 5.3 Ketidaksesuaian Data Source Lowongan
- Proposal cenderung menekankan JSearch sebagai sumber utama.
- Implementasi saat ini sudah multi-source dengan fallback bertingkat.
- Saran: jelaskan strategi reliabilitas data (primary + fallback + deduplikasi + prioritas lokasi Indonesia) sebagai nilai tambah.

### 5.4 Ketidaksesuaian Komponen Produk
- Proposal menyebut Community Hub sebagai fitur unggulan.
- Di routing web utama saat ini belum terlihat endpoint community yang aktif untuk user flow utama.
- Saran: jika belum dirilis, pindahkan ke bagian roadmap pengembangan agar tidak over-claim.

### 5.5 Ketidaksesuaian Klaim Operasional
- Proposal menyebut crawling periodik, dan ini sesuai karena jobs:crawl memang ada dan sudah dijadwalkan weekly.
- Saran perbaikan: tambahkan metrik operasional yang terukur (misal jumlah lowongan terolah per minggu, coverage sumber, latency update).

## 6) Review Proposal: Perbaikan Kualitas Naskah

### 6.1 Perbaikan Bahasa dan Konsistensi
- Ada placeholder yang belum selesai, contoh: kalimat berisi nama anggota di tengah paragraf latar belakang.
- Banyak typo, repetisi, dan kalimat terlalu panjang sehingga sulit dibaca.
- Saran:
- Gunakan kalimat lebih pendek, 1 paragraf maksimal 4 sampai 5 kalimat.
- Standarkan istilah: skill gap, learning path, real-time, fresh graduate.
- Rapikan ejaan dan tanda baca sesuai EYD.

### 6.2 Perbaikan Struktur Isi per Bab
- BAB I:
- Tambahkan rumusan masalah yang eksplisit (3 sampai 5 poin) agar Tujuan dan Manfaat lebih terukur.

- BAB II:
- Tambahkan model konseptual sederhana (input-process-output-outcome).
- Jelaskan metode evaluasi (misal uji fungsional, usability test, waktu respons, akurasi rekomendasi).

- BAB III:
- Di bagian fitur, bedakan fitur yang sudah live dan yang masih roadmap.
- Tambahkan indikator keberhasilan tiap fitur (contoh: waktu analisis, completion rate milestone, jumlah portfolio submitted).

- BAB IV:
- Kesimpulan harus merujuk langsung ke tujuan awal.
- Saran harus dibagi jangka pendek (1-2 bulan), menengah (3-6 bulan), panjang (6-12 bulan).

### 6.3 Perbaikan Klaim dan Bukti
- Setiap klaim dampak harus punya indikator dan baseline.
- Contoh indikator yang disarankan:
- Persentase pengguna yang menyelesaikan roadmap minimal 1 milestone.
- Rata-rata kenaikan skor kesiapan kerja per pengguna.
- Waktu yang dibutuhkan dari onboarding ke capstone pertama.
- Jumlah skill gap prioritas yang berhasil ditutup.

## 7) Saran Peningkatan Proposal (Isi Siap Pakai)

### 7.1 Saran untuk Bagian 3.4 Teknologi
Gunakan narasi berikut agar konsisten dengan implementasi:
- Frontend dibangun menggunakan React berbasis Inertia.js dengan TypeScript dan Tailwind CSS v4.
- Backend menggunakan Laravel 13 dan PHP 8.3.
- Visualisasi data menggunakan Recharts 3.x.
- Integrasi AI menggunakan Gemini API untuk parsing CV, dengan fallback parser lokal untuk menjaga ketersediaan layanan.
- Data lowongan menggunakan strategi multi-source dengan fallback untuk meningkatkan kelengkapan dan reliabilitas data.

### 7.2 Saran untuk Bagian Fitur AI
Gunakan status implementasi bertahap:
- Sudah aktif: parsing CV, skill extraction, skill gap calculation, market job aggregation.
- Tahap penguatan: roadmap generation detail, insight generation, market research narrative, CV optimization tips berbasis AI penuh.

### 7.3 Saran untuk Bagian Dampak SDGs
Tambahkan indikator outcome konkret:
- SDG 4: kenaikan kompetensi terukur dari pre/post skill profile.
- SDG 8: peningkatan job readiness score dan jumlah pengguna dengan portfolio siap kirim.
- SDG 9: jumlah data lowongan terolah dan frekuensi pembaruan insight.

## 8) Checklist Final Sebelum Proposal Dikirim
- Sinkronkan semua versi teknologi dengan repository terbaru.
- Hapus placeholder/kalimat belum selesai.
- Rapikan typo dan format sitasi APA.
- Tambahkan screenshot nyata dari halaman: Landing, Analysis, Roadmap, Market, Capstone, Portfolio.
- Tambahkan link hosting aktif dan akses demo.
- Pisahkan fitur live vs fitur roadmap agar kredibel di penilaian juri.

## 9) Kesimpulan Review
Proposal sudah memiliki fondasi masalah yang kuat dan arah solusi yang relevan untuk isu ketenagakerjaan digital. Peningkatan utama yang dibutuhkan adalah akurasi antara klaim proposal dan kondisi implementasi aktual, terutama pada arsitektur frontend, versi stack, serta tingkat kematangan fitur AI lanjutan. Jika sinkronisasi ini dilakukan, kualitas proposal akan naik signifikan karena lebih kredibel, terukur, dan siap dipresentasikan.
