# 🚀 Career-Sync Academy: AI-Driven Workforce Readiness

**Career-Sync Academy** adalah platform EdTech mutakhir berbasis AI yang dirancang untuk membantu pengembang web (Web Developers) menjembatani kesenjangan antara *skill* saat ini dengan kebutuhan pasar kerja yang dinamis. 

Platform ini tidak hanya menganalisis CV, tetapi juga memantau tren pasar kerja secara *real-time* dan menyusun jalur belajar khusus untuk memastikan pengguna menjadi tenaga kerja yang **siap pakai (Industry-Ready)**.

---

## ✨ Fitur Unggulan

- **📊 Intelligent CV Parsing**: Ekstraksi skill, pendidikan, dan pengalaman secara instan menggunakan **Google Gemini 2.5 Flash**.
- **📡 Multi-Source Market Analytics**: Crawler data industri yang mengumpulkan tren skill dari **LinkedIn, JSearch, Arbeitnow, dan JobsAPI**.
- **🛤️ Phased AI Roadmap (Lazy-Loading)**:
  - Generasi jalur belajar instan tanpa *timeout*.
  - Materi belajar terkurasi yang memprioritaskan konten **Bahasa Indonesia** (Sandhika Galih, Eko Kurniawan, dsb).
  - Link YouTube 100% valid dengan sistem *Search-Engine fallback*.
- **📈 Skill Gap & Readiness Score**: Visualisasi *Radar Chart* yang membandingkan kemampuan pengguna dengan standar industri saat ini.

- **🏆 Capstone Project & GitHub Validation**: Evaluasi keahlian berbasis *Project-Based Learning* di mana pengguna mengerjakan studi kasus dan divalidasi langsung melalui metadata *commit* GitHub secara otomatis.
- **💬 Peer Discussion & Community**: Forum tanya jawab dan kolaborasi teknis antarpengguna.
- **🎯 Gamifikasi & Badges**: Sistem pencapaian (*badge*) untuk meningkatkan retensi dan motivasi pengguna dalam menyelesaikan *roadmap*.

---

## 🏗️ Alur Penggunaan (User Flow)
1. **Onboarding**: Pengguna mendaftar, mengatur target profesi, dan mengunggah CV.
2. **AI Analysis**: Fitur "Intelligent CV Parsing" mengekstraksi data *skill* dan memetakannya dengan tren industri terkini secara *real-time*.
3. **Adaptive Roadmap**: Sistem menyusun jalur belajar personal dan efisien yang hanya berfokus pada keahlian yang belum dikuasai (*Skill Gap*).
4. **Learning & Capstone**: Pengguna mempelajari materi terkurasi, lalu mengerjakan proyek nyata.
5. **Validation**: Sistem memverifikasi tautan repositori GitHub pengguna untuk memastikan keaslian *coding* dan keaktifan pekerjaan.
6. **Career Readiness**: Setelah tervalidasi, skor kesiapan kerja meningkat dan sistem memberikan rekomendasi lowongan pekerjaan yang cocok (*job matching*).

---

## 📚 Landasan Teori (Theoretical Foundation)
Platform ini dibangun dengan fondasi yang kuat, menerapkan 5 pilar utama keilmuan teknologi dan edukasi:
1. **Educational Technology (EdTech)**: Menerapkan solusi teknologi untuk memfasilitasi proses pendidikan interaktif dan terukur.
2. **Skill Gap Analysis**: Membandingkan profil kandidat dengan agregasi data lowongan (*scraped jobs*) untuk menemukan kesenjangan kompetensi.
3. **Adaptive Learning System**: Menyajikan materi (*roadmap*) yang dipersonalisasi secara unik untuk masing-masing pengguna berdasarkan tingkat kebutuhannya.
4. **Web Scraping & Data Crawling**: Mengambil tren pasar kerja aktual dari portal seperti LinkedIn atau JSearch untuk rujukan keterampilan baru yang permintaannya sedang tinggi.
5. **Project-Based Learning (PBL)**: Menerapkan skema validasi kemampuan secara praktikal (*hands-on*), menghilangkan asumsi teoritis dengan integrasi validasi API GitHub.

---

- **🤝 Community Hub**: Ruang kolaborasi untuk berdiskusi dengan rekan seperjuangan (Peer Discussion).
- **🎨 Premium UI Experience**: Antarmuka modern menggunakan **Tailwind CSS v4** dengan animasi mikro dan indikator progres yang interaktif.

---

## 🛠️ Tech Stack

- **Backend**: Laravel 13 (PHP 8.4+)
- **Frontend**: React 18, Inertia.js (V3)
- **Styling**: Tailwind CSS v4 (Sleek Aesthetic)
- **AI Engine**: Google Gemini API (Model: gemini-2.5-flash)
- **Market Data**: LinkedIn API, JSearch, RapidAPI
- **Visuals**: Lucide React, Recharts, Framer Motion

---

## 🚀 Panduan Instalasi Lokal

### 1. Prasyarat
- PHP 8.4+
- Composer
- Node.js & NPM
- MySQL / PostgreSQL / SQLite

### 2. Kloning Repositori
```bash
git clone https://github.com/kendikadimas/careersync.git
cd careersync
```

### 3. Konfigurasi Backend
```bash
# Install dependencies
composer install

# Environment file
cp .env.example .env

# Generate key
php artisan key:generate
```

### 4. Konfigurasi Database & Seeding
```bash
# Migrasi tabel dan data awal
php artisan migrate --seed
```

### 5. Konfigurasi Frontend
```bash
# Install Node modules
npm install

# Build asset (Production) atau dev mode
npm run dev
```

### 6. Integrasi API
Tambahkan API Key di `.env` agar fitur AI dan Market Intelligence berfungsi:
```env
GEMINI_API_KEY=AIzaSy...
RAPIDAPI_KEY=your_rapidapi_key
```

### 7. Menjalankan Server
```bash
# Terminal 1: Laravel Server
php artisan serve

# Terminal 2: Vite Server
npm run dev
```

---

## 🔧 Perintah Penting (Admin/Developer)

Untuk memperbarui data tren pasar kerja secara manual:
```bash
# Menjalankan AI crawler untuk memindai pasar kerja terbaru
php artisan jobs:crawl
```

---

## 📝 Lisensi
Proyek ini dikembangkan untuk keperluan kompetisi dan berlisensi di bawah [MIT License](LICENSE).

---
*Built with ❤️ by Team Career-Sync*
