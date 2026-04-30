# Draf Materi Proposal: Kembangin (CareerSync)
*AI-Powered Skill Gap Analysis & Adaptive Learning Platform*

---

## 1. Gambaran Umum Sistem
**Kembangin (CareerSync)** adalah platform *Educational Technology* (EdTech) berbasis kecerdasan buatan (AI) yang bertujuan untuk menjembatani kesenjangan keahlian (*skill gap*) antara talenta digital (pencari kerja/mahasiswa) dengan kebutuhan riil industri. Platform ini menganalisis CV pengguna, memetakan keahlian saat ini, membandingkannya dengan tren pasar kerja, dan menghasilkan *roadmap* pembelajaran yang adaptif. Pengguna kemudian akan belajar melalui metode *Project-Based Learning* yang tervalidasi secara otomatis menggunakan integrasi GitHub.

---

## 2. Fitur Utama Sistem (Fase Pasca-Login)
Berdasarkan struktur sistem yang telah dibangun, berikut adalah fitur-fitur utama yang tersedia setelah pengguna melakukan login:

1. **Dashboard & Work Readiness Score**
   Menampilkan ringkasan kesiapan kerja pengguna (*Work Readiness Score*), statistik keahlian, progres *roadmap* belajar, serta notifikasi aktivitas atau pencapaian (Badges).
2. **CV Parsing & Skill Gap Analysis**
   Fitur unggulan di mana pengguna mengunggah CV, kemudian AI akan mengekstrak data keahlian (*skills*), pengalaman, dan pendidikan, lalu membandingkannya dengan target karier atau tren industri untuk menemukan "celah" keahlian yang harus dipelajari.
3. **Adaptive Learning Roadmap**
   Sistem men-generate jalur pembelajaran (*roadmap*) yang dipersonalisasi secara unik untuk setiap pengguna berdasarkan hasil analisis *skill gap*. Pengguna tidak mempelajari semua hal dari nol, melainkan fokus pada *skill* yang belum mereka kuasai.
4. **Job Market Insights & Trending Skills**
   Halaman yang menyajikan data tren pasar kerja secara *real-time*. Pengguna dapat melihat keahlian apa saja yang sedang banyak dicari beserta agregasi data lowongan kerja.
5. **Capstone Project & Validasi Portofolio (GitHub Integration)**
   Alih-alih hanya belajar teori, pengguna diberikan studi kasus proyek (*Capstone*). Pekerjaan kodingan mereka disinkronisasikan dan divalidasi langsung secara otomatis menggunakan GitHub API (mengecek struktur *repository*, *commit*, dan bahasa pemrograman).
6. **Peer Discussion (Komunitas)**
   Forum diskusi antar pengguna untuk tanya jawab teknis, berkolaborasi, dan berbagi *insight* pembelajaran atau portofolio.
7. **Gamifikasi (User Badges & Achievements)**
   Pemberian *badge* atau lencana berdasarkan pencapaian (*milestones*) tertentu (misalnya: menyelesaikan modul spesifik, skor kesiapan kerja tinggi, dsb) untuk meningkatkan retensi dan motivasi belajar.

---

## 3. Alur Penggunaan Sistem (User Flow)
1. **Onboarding & Profiling:** Pengguna mendaftar, mengisi target profesi (misal: *Backend Developer*), dan mengunggah CV atau menghubungkan profil LinkedIn.
2. **AI Analysis:** *Service* AI mengekstrak CV dan memformulasikan *Skill Gap*.
3. **Roadmap Generation:** Sistem menyajikan modul-modul apa saja yang perlu diambil pengguna.
4. **Learning & Executing:** Pengguna mengikuti materi pada *roadmap*.
5. **Project Submission:** Untuk membuktikan *skill*, pengguna mengerjakan *Capstone Project* dan mengumpulkan tautan *repository* GitHub.
6. **System Verification:** *GitHub Verification Service* memvalidasi *repository* (apakah *commit* aktif, teknologi sesuai, bukan repositori hasil *fork* kosong).
7. **Scoring & Job Matching:** Sistem memperbarui *Work Readiness Score* pengguna dan menyajikan rekomendasi lowongan pekerjaan yang cocok (*matching*) dengan profil baru pengguna dari *Job Market Insights*.

---

## 4. Teknologi yang Digunakan
*   **Frontend Technologies:**
    *   **React.js (dengan TypeScript):** *Library* utama untuk membangun antarmuka pengguna interaktif (SPA).
    *   **Inertia.js:** *Adapter* yang menghubungkan frontend React dengan backend Laravel tanpa memerlukan pembuatan REST API yang kompleks.
    *   **Tailwind CSS & Framer Motion:** *Framework styling* dan *library* animasi untuk UI/UX yang modern (*Shadcn UI*, *Interactive Buttons*).
*   **Backend Technologies:**
    *   **Laravel 11.x (PHP 8.2+):** *Framework* utama untuk logika bisnis, manajemen *database/ORM* (Eloquent), *routing*, dan *authentication* (Laravel Breeze/Sanctum).
    *   **MySQL / PostgreSQL:** Basis data relasional.
*   **Integrasi Kecerdasan Buatan (AI):**
    *   **Google Gemini API:** Berperan sebagai otak utama dalam fitur *CV Parsing*, *Skill Mapping*, dan penyusunan *Adaptive Roadmap*.
*   **Integrasi Pihak Ketiga & Tools:**
    *   **GitHub REST API:** Digunakan untuk validasi portofolio otomatis.
    *   **Job Portal API / Data Scraping Tool:** Digunakan untuk menarik data lowongan kerja secara massal (*JobApiService*).
    *   **Vite:** *Build tool* untuk *frontend assets*.

---

## 5. Landasan Teori (Kajian Pustaka)
Berikut adalah evaluasi terhadap 5 landasan teori yang diajukan. Keseluruhannya **sangat tepat dan sudah sesuai** dengan fitur yang dibangun di Kembangin (CareerSync). Berikut narasinya untuk dicantumkan di proposal:

1. **Platform Educational Technology (EdTech)**
   *   *Kesesuaian:* **Sangat Sesuai**. 
   *   *Penjelasan:* EdTech menjadi payung utama sistem ini. Kembangin bukan sekadar sistem informasi, melainkan platform yang memfasilitasi proses edukasi, pelatihan, dan evaluasi berbasis teknologi digital untuk meningkatkan kualitas SDM.
2. **Skill Gap Analysis**
   *   *Kesesuaian:* **Sangat Sesuai**. 
   *   *Penjelasan:* Teori ini mengkaji kesenjangan antara kemampuan tenaga kerja dengan tuntutan industri. Dalam sistem, teori ini diwujudkan melalui algoritma pembandingan (*matching*) antara profil CV pengguna dengan agregasi persyaratan lowongan (*scraped jobs*).
3. **Adaptive Learning System**
   *   *Kesesuaian:* **Sangat Sesuai**. 
   *   *Penjelasan:* Pembelajaran adaptif adalah metode edukasi yang memodifikasi penyajian materi sesuai kebutuhan peserta didik. Implementasinya ada pada *User Roadmap* yang digenerasi secara dinamis oleh AI (berbeda-beda bagi tiap individu yang *skill gap*-nya berbeda).
4. **Web Scraping dan Data Crawling**
   *   *Kesesuaian:* **Sesuai**.
   *   *Penjelasan:* Untuk mengetahui *skill* apa yang sedang tren secara akurat (tidak sekadar asumsi), sistem membutuhkan pasokan data industri yang aktual. Teori ekstraksi data otomatis (*scraping/crawling*) mendasari fitur *Trending Skills* dan *Job Market Data*.
5. **Project-Based Learning (PBL)**
   *   *Kesesuaian:* **Sangat Sesuai**.
   *   *Penjelasan:* PBL adalah pendekatan pedagogis yang memberikan mahasiswa kesempatan belajar melalui pemecahan masalah dunia nyata. Pada sistem, teori ini melandasi fitur *Capstone Submission* dan *GitHub Integration*, memastikan pengguna memiliki kemampuan praktis (*hands-on*), bukan hanya teoritis.

---

## 6. Detail Sistem Tambahan untuk Proposal
*   **Batasan Sistem (Scope & Limitations):**
    *   Sistem difokuskan pada talenta di bidang Teknologi Informasi (IT) dan *Software Engineering* agar analisis *skill gap* (seperti bahasa pemrograman, *framework*) dari GitHub API bekerja optimal.
    *   Sistem tidak bertindak sebagai medium rekrutmen langsung, melainkan platform penyiapan dan rekomendasi.
*   **Keunggulan Komparatif (Unique Value Proposition):**
    *   Tidak seperti MOC (seperti Coursera/Udemy) yang mengharuskan *user* memilah materi sendiri, sistem ini *opinionated* berkat AI (Anda hanya perlu memasukkan target profesi, dan sistem menyaring apa yang relevan).
    *   Validasi praktikal yang kebal manipulasi (*anti-cheat*) berkat pengecekan metadata *commit* GitHub, bukan sistem sertifikat berdasarkan kelulusan menonton video.
*   **Metode Pengembangan Perangkat Lunak:**
    *   Proyek ini cocok menggunakan pendekatan iteratif seperti *Agile/Scrum*, mengingat integrasi AI (Gemini) dan integrasi pihak ketiga (GitHub, Job Scraping) membutuhkan penyesuaian (*prompt engineering*) yang berulang berdasarkan hasil *testing*.
