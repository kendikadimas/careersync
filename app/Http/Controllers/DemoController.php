<?php
namespace App\Http\Controllers;

use Inertia\Inertia;

class DemoController extends Controller
{
    public function index()
    {
        // Data dummy yang sudah dikurasi untuk demo yang menarik
        $demoProfile = [
            'name' => 'Budi Santoso',
            'career_target' => 'Frontend Engineer',
            'education' => [
                'degree' => 'S1',
                'major' => 'Teknik Informatika',
                'university' => 'Universitas Diponegoro',
                'gpa' => 3.42,
            ],
            'skills' => [
                ['name' => 'HTML/CSS', 'level' => 'expert', 'category' => 'frontend'],
                ['name' => 'JavaScript', 'level' => 'intermediate', 'category' => 'frontend'],
                ['name' => 'React.js', 'level' => 'beginner', 'category' => 'frontend'],
                ['name' => 'Git', 'level' => 'intermediate', 'category' => 'devops'],
                ['name' => 'PHP/Laravel', 'level' => 'intermediate', 'category' => 'backend'],
                ['name' => 'MySQL', 'level' => 'beginner', 'category' => 'database'],
                ['name' => 'Figma', 'level' => 'beginner', 'category' => 'design'],
            ],
            'experiences' => [
                ['type' => 'internship', 'title' => 'Frontend Intern', 'company' => 'PT Tokopedia', 'duration_months' => 3, 'skills_used' => ['React', 'HTML', 'CSS']],
                ['type' => 'project', 'title' => 'Website Kampus UNDIP', 'company' => null, 'duration_months' => 2, 'skills_used' => ['HTML', 'CSS', 'JavaScript']],
                ['type' => 'organization', 'title' => 'Ketua Divisi IT — Himpunan Mahasiswa', 'company' => null, 'duration_months' => 12, 'skills_used' => ['Leadership', 'Web Management']],
            ],
        ];

        $demoSkillGap = [
            ['skill' => 'React.js / Next.js', 'market_demand' => 89, 'user_score' => 30, 'status' => 'developing', 'trend' => 'stable'],
            ['skill' => 'TypeScript', 'market_demand' => 82, 'user_score' => 0, 'status' => 'missing', 'trend' => 'rising'],
            ['skill' => 'Tailwind CSS', 'market_demand' => 74, 'user_score' => 20, 'status' => 'missing', 'trend' => 'rising'],
            ['skill' => 'REST & GraphQL API', 'market_demand' => 68, 'user_score' => 50, 'status' => 'developing', 'trend' => 'stable'],
            ['skill' => 'Git & CI/CD', 'market_demand' => 94, 'user_score' => 60, 'status' => 'developing', 'trend' => 'stable'],
            ['skill' => 'Testing (Jest/Vitest)', 'market_demand' => 51, 'user_score' => 0, 'status' => 'missing', 'trend' => 'rising'],
            ['skill' => 'Figma Handoff', 'market_demand' => 46, 'user_score' => 30, 'status' => 'developing', 'trend' => 'stable'],
            ['skill' => 'Docker basic', 'market_demand' => 38, 'user_score' => 0, 'status' => 'missing', 'trend' => 'rising'],
        ];

        $demoRoadmap = [
            'total_duration_weeks' => 16,
            'milestones' => [
                ['id' => 'ms-1', 'title' => 'Kuasai TypeScript', 'emoji' => '⚡', 'duration_weeks' => 3, 'status' => 'completed', 'skills' => ['TypeScript', 'Type Safety', 'Interfaces'], 'why_important' => '82% lowongan Frontend Engineer di Indonesia mensyaratkan TypeScript.', 'capstone_project' => ['title' => 'Todo App dengan TypeScript', 'description' => 'Rebuild aplikasi todo sederhana menggunakan TypeScript strict mode.', 'tech_used' => ['TypeScript', 'React', 'Vite']]],
                ['id' => 'ms-2', 'title' => 'React Intermediate', 'emoji' => '⚛️', 'duration_weeks' => 4, 'status' => 'current', 'skills' => ['React Hooks', 'State Management', 'React Query'], 'why_important' => 'React adalah skill yang paling banyak dicari, ada di 89% lowongan frontend.', 'capstone_project' => ['title' => 'Dashboard Analytics', 'description' => 'Buat dashboard dengan data fetching, state management, dan charts.', 'tech_used' => ['React', 'TypeScript', 'Recharts']]],
                ['id' => 'ms-3', 'title' => 'Styling & Design System', 'emoji' => '🎨', 'duration_weeks' => 3, 'status' => 'locked', 'skills' => ['Tailwind CSS', 'shadcn/ui', 'Responsive Design'], 'why_important' => 'Tailwind dipakai di 74% startup tech Indonesia.', 'capstone_project' => ['title' => 'Landing Page Startup', 'description' => 'Buat landing page modern yang fully responsive dengan Tailwind.', 'tech_used' => ['Tailwind CSS', 'React', 'TypeScript']]],
                ['id' => 'ms-4', 'title' => 'API Integration & Testing', 'emoji' => '🔗', 'duration_weeks' => 3, 'status' => 'locked', 'skills' => ['REST API', 'Axios/Fetch', 'Jest/Vitest'], 'why_important' => 'Kemampuan integrasi API adalah skill wajib di semua lowongan frontend.', 'capstone_project' => ['title' => 'GitHub User Explorer', 'description' => 'Aplikasi yang fetch data dari GitHub API dengan error handling dan unit tests.', 'tech_used' => ['React', 'TypeScript', 'Vitest']]],
                ['id' => 'ms-5', 'title' => 'Portfolio & Apply', 'emoji' => '🚀', 'duration_weeks' => 3, 'status' => 'locked', 'skills' => ['Portfolio Building', 'GitHub Profile', 'Interview Prep'], 'why_important' => 'Portfolio yang kuat 3x lebih besar kemungkinan lolos screening awal.', 'capstone_project' => ['title' => 'Personal Portfolio Website', 'description' => 'Bangun portfolio profesional yang menampilkan semua project dari milestone sebelumnya.', 'tech_used' => ['Next.js', 'TypeScript', 'Tailwind CSS']]],
            ],
        ];

        $demoWorkReadiness = [
            'score' => 52,
            'category' => 'Sedang Berkembang',
            'message' => 'Kamu sudah di jalur yang benar! Ikuti roadmap secara konsisten dan kamu akan siap dalam 16 minggu.',
            'color' => '#f59e0b',
            'breakdown' => [
                'skill_match' => ['score' => 19, 'max' => 40, 'label' => 'Skill Match'],
                'experience' => ['score' => 20, 'max' => 30, 'label' => 'Pengalaman'],
                'education' => ['score' => 10, 'max' => 20, 'label' => 'Pendidikan'],
                'progress' => ['score' => 2, 'max' => 10, 'label' => 'Progress Roadmap'],
            ],
        ];

        $demoJobs = [
            ['title' => 'Frontend Engineer', 'company' => 'Gojek', 'location' => 'Jakarta', 'salary' => 'Rp 8-15jt', 'match' => 65, 'skills_required' => ['React.js', 'TypeScript', 'REST API', 'Git']],
            ['title' => 'React Developer', 'company' => 'Tokopedia', 'location' => 'Jakarta', 'salary' => 'Rp 7-12jt', 'match' => 58, 'skills_required' => ['React.js', 'JavaScript', 'CSS', 'Git']],
            ['title' => 'Junior Frontend Dev', 'company' => 'Startup Surabaya', 'location' => 'Remote', 'salary' => 'Rp 5-8jt', 'match' => 72, 'skills_required' => ['HTML/CSS', 'JavaScript', 'React.js']],
            ['title' => 'UI Developer', 'company' => 'Agency Digital', 'location' => 'Bandung', 'salary' => 'Rp 6-10jt', 'match' => 61, 'skills_required' => ['HTML/CSS', 'JavaScript', 'Figma', 'React.js']],
            ['title' => 'Frontend Dev (Intern)', 'company' => 'DANA Indonesia', 'location' => 'Jakarta', 'salary' => 'Rp 3-5jt', 'match' => 80, 'skills_required' => ['React.js', 'HTML/CSS', 'Git']],
        ];

        return Inertia::render('Demo', [
            'profile' => $demoProfile,
            'skill_gap' => $demoSkillGap,
            'roadmap' => $demoRoadmap,
            'work_readiness' => $demoWorkReadiness,
            'recommended_jobs' => $demoJobs,
        ]);
    }
}
