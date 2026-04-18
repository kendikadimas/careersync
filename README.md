# 🚀 Career-Sync Academy

**Career-Sync Academy** is a modern, AI-powered EdTech platform designed to help web developers bridge the gap between their current skills and job market requirements. 

Built with the latest technology stack, it provides real-time job intelligence, automated CV analysis, and personalized learning roadmaps.

---

## ✨ Key Features

- **📊 AI CV Analysis**: Instant skill extraction and evaluation using Google Gemini 1.5 Flash.
- **📁 Multi-format Support**: Upload your CV in PDF, DOCX, or TXT format with an intuitive drag-and-drop interface.
- **📡 Live Job Intelligence**: Real-time job listings from Indonesia (via JSearch API) with automated skill matching.
- **🛤️ Dynamic Roadmaps**: Automatically generated interactive learning milestones based on your career goals.
- **🛠️ Skill Gap Analysis**: Visual radar charts showing the distance between your current skills and target role requirements.
- **🎨 Premium UI/UX**: Ultra-modern design using Tailwind CSS v4, Framer Motion animations, and a sleek dark-mode aesthetic.

---

## 🛠️ Tech Stack

- **Backend**: Laravel 11 (PHP 8.2+)
- **Frontend**: React 18, Inertia.js
- **Styling**: Tailwind CSS v4
- **AI Engine**: Google Gemini API
- **Job API**: JSearch (RapidAPI)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animations**: Framer Motion

---

## 🚀 Installation Guide

Follow these steps to set up the project on a new device:

### 1. Prerequisites
Ensure you have the following installed:
- [PHP 8.2+](https://www.php.net/downloads)
- [Composer](https://getcomposer.org/)
- [Node.js & NPM](https://nodejs.org/)
- [SQLite](https://www.sqlite.org/index.html) (or any supported database)

### 2. Clone the Repository
```bash
git clone <repository-url>
cd jkbfest
```

### 3. Backend Setup
```bash
# Install PHP dependencies
composer install

# Prepare environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 4. Database Setup
```bash
# Create SQLite database (if using sqlite)
touch database/database.sqlite

# Run migrations and seeders
php artisan migrate --seed
```

### 5. Frontend Setup
```bash
# Install NPM dependencies
npm install

# Build assets
npm run build
```

### 6. Configuration
Open your `.env` file and add your API keys:
```env
GEMINI_API_KEY=your_gemini_api_key_here
RAPIDAPI_KEY=your_rapidapi_key_here
```

### 7. Run Locally
```bash
# Start Laravel server
php artisan serve

# Start Vite dev server (in a separate terminal)
npm run dev
```
Visit `http://localhost:8000` to see the application.

---

## 🧪 Testing API
To verify your API connection, you can access the debug mode:
`http://localhost:8000/market?debug=1`

---

## 📝 License
This project is open-sourced software licensed under the [MIT license](LICENSE).
