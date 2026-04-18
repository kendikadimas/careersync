<?php

namespace App\Data;

class JobMarketData
{
    public static function getSkillsForRole(string $role): array
    {
        $data = [
            'Frontend Engineer' => [
                ['skill' => 'React.js / Next.js', 'demand' => 89, 'trend' => 'stable', 'category' => 'framework'],
                ['skill' => 'TypeScript', 'demand' => 82, 'trend' => 'rising', 'category' => 'language'],
                ['skill' => 'Tailwind CSS', 'demand' => 74, 'trend' => 'rising', 'category' => 'styling'],
                ['skill' => 'REST & GraphQL API', 'demand' => 68, 'trend' => 'stable', 'category' => 'integration'],
                ['skill' => 'Git & CI/CD', 'demand' => 94, 'trend' => 'stable', 'category' => 'devops'],
                ['skill' => 'Testing (Jest/Vitest)', 'demand' => 51, 'trend' => 'rising', 'category' => 'testing'],
                ['skill' => 'Figma Handoff', 'demand' => 46, 'trend' => 'stable', 'category' => 'design'],
                ['skill' => 'Docker basic', 'demand' => 38, 'trend' => 'rising', 'category' => 'devops'],
            ],
            'Backend Engineer' => [
                ['skill' => 'Node.js / Laravel / Spring', 'demand' => 91, 'trend' => 'stable', 'category' => 'framework'],
                ['skill' => 'RESTful API Design', 'demand' => 88, 'trend' => 'stable', 'category' => 'architecture'],
                ['skill' => 'MySQL / PostgreSQL', 'demand' => 85, 'trend' => 'stable', 'category' => 'database'],
                ['skill' => 'Docker & Kubernetes', 'demand' => 67, 'trend' => 'rising', 'category' => 'devops'],
                ['skill' => 'Redis / Caching', 'demand' => 58, 'trend' => 'rising', 'category' => 'performance'],
                ['skill' => 'Unit Testing', 'demand' => 62, 'trend' => 'rising', 'category' => 'testing'],
                ['skill' => 'Message Queue (RabbitMQ)', 'demand' => 44, 'trend' => 'rising', 'category' => 'architecture'],
                ['skill' => 'AWS / GCP basics', 'demand' => 55, 'trend' => 'rising', 'category' => 'cloud'],
            ],
            'Data Scientist' => [
                ['skill' => 'Python (Pandas/NumPy)', 'demand' => 96, 'trend' => 'stable', 'category' => 'language'],
                ['skill' => 'Machine Learning (sklearn)', 'demand' => 84, 'trend' => 'stable', 'category' => 'ml'],
                ['skill' => 'SQL & Data Wrangling', 'demand' => 89, 'trend' => 'stable', 'category' => 'data'],
                ['skill' => 'Data Visualization', 'demand' => 76, 'trend' => 'stable', 'category' => 'visualization'],
                ['skill' => 'Deep Learning (PyTorch)', 'demand' => 61, 'trend' => 'rising', 'category' => 'ml'],
                ['skill' => 'Statistics & Probability', 'demand' => 72, 'trend' => 'stable', 'category' => 'math'],
                ['skill' => 'LLM Fine-tuning', 'demand' => 48, 'trend' => 'rising', 'category' => 'ai'],
                ['skill' => 'Spark / Big Data', 'demand' => 41, 'trend' => 'stable', 'category' => 'data'],
            ],
            'UI/UX Designer' => [
                ['skill' => 'Figma / Adobe XD', 'demand' => 95, 'trend' => 'stable', 'category' => 'tool'],
                ['skill' => 'Design Systems', 'demand' => 88, 'trend' => 'rising', 'category' => 'process'],
                ['skill' => 'User Research', 'demand' => 72, 'trend' => 'stable', 'category' => 'process'],
                ['skill' => 'Prototyping', 'demand' => 84, 'trend' => 'stable', 'category' => 'tool'],
                ['skill' => 'Visual Design', 'demand' => 91, 'trend' => 'stable', 'category' => 'design'],
                ['skill' => 'UX Writing', 'demand' => 45, 'trend' => 'rising', 'category' => 'skill'],
                ['skill' => 'Accessibility', 'demand' => 58, 'trend' => 'rising', 'category' => 'standard'],
                ['skill' => 'Interaction Design', 'demand' => 77, 'trend' => 'stable', 'category' => 'design'],
            ],
            'DevOps Engineer' => [
                ['skill' => 'Linux / Shell scripting', 'demand' => 94, 'trend' => 'stable', 'category' => 'basic'],
                ['skill' => 'Docker & Kubernetes', 'demand' => 91, 'trend' => 'stable', 'category' => 'containerization'],
                ['skill' => 'CI/CD Pipelines (Github Actions)', 'demand' => 88, 'trend' => 'stable', 'category' => 'automation'],
                ['skill' => 'Terraform / IaC', 'demand' => 82, 'trend' => 'rising', 'category' => 'automation'],
                ['skill' => 'Monitoring (Prometheus/Grafana)', 'demand' => 76, 'trend' => 'stable', 'category' => 'observability'],
                ['skill' => 'AWS / Azure / GCP', 'demand' => 89, 'trend' => 'stable', 'category' => 'cloud'],
                ['skill' => 'Security / DevSecOps', 'demand' => 71, 'trend' => 'rising', 'category' => 'security'],
                ['skill' => 'Ansible / Configuration Management', 'demand' => 65, 'trend' => 'stable', 'category' => 'automation'],
            ],
            'Mobile Developer' => [
                ['skill' => 'Flutter / React Native', 'demand' => 92, 'trend' => 'stable', 'category' => 'framework'],
                ['skill' => 'Kotlin / Swift', 'demand' => 85, 'trend' => 'stable', 'category' => 'language'],
                ['skill' => 'Mobile UI Design', 'demand' => 74, 'trend' => 'stable', 'category' => 'design'],
                ['skill' => 'API Integration', 'demand' => 89, 'trend' => 'stable', 'category' => 'integration'],
                ['skill' => 'State Management', 'demand' => 81, 'trend' => 'stable', 'category' => 'development'],
                ['skill' => 'Push Notifications', 'demand' => 68, 'trend' => 'stable', 'category' => 'integration'],
                ['skill' => 'Firebase / AppWrite', 'demand' => 75, 'trend' => 'stable', 'category' => 'backend'],
                ['skill' => 'App Store / Play Store Deployment', 'demand' => 79, 'trend' => 'stable', 'category' => 'devops'],
            ],
        ];

        return $data[$role] ?? [];
    }

    public static function getJobListings(): array
    {
        $companies = ['Gojek', 'Tokopedia', 'Traveloka', 'Bukalapak', 'Blibli', 'Dana', 'OVO', 'Bank Mandiri', 'BCA', 'Telkom Indonesia', 'Start-up Unicorn', 'Agency Creative'];
        $locations = ['Jakarta', 'Bandung', 'Yogyakarta', 'Surabaya', 'Remote'];
        $roles = ['Frontend Engineer', 'Backend Engineer', 'Data Scientist', 'UI/UX Designer', 'DevOps Engineer', 'Mobile Developer'];

        $jobs = [];
        for ($i = 1; $i <= 35; $i++) {
            $role = $roles[array_rand($roles)];
            $jobSkills = array_column(array_slice(self::getSkillsForRole($role), 0, 4), 'skill');
            
            $jobs[] = [
                'id' => $i,
                'title' => $role . ($i % 3 == 0 ? ' (Senior)' : ($i % 5 == 0 ? ' (Junior)' : '')),
                'company' => $companies[array_rand($companies)],
                'location' => $locations[array_rand($locations)],
                'salary_min' => rand(8, 15) * 1000000,
                'salary_max' => rand(16, 35) * 1000000,
                'skills_required' => $jobSkills,
                'posted_days_ago' => rand(1, 14),
                'type' => rand(0, 1) ? 'Full-time' : 'Contract'
            ];
        }

        return $jobs;
    }

    public static function getTrendingSkills(): array
    {
        return [
            ['skill' => 'Generative AI API', 'demand' => 94, 'change' => 12, 'trend' => 'rising'],
            ['skill' => 'Next.js 15', 'demand' => 88, 'change' => 8, 'trend' => 'rising'],
            ['skill' => 'TypeScript 5.8', 'demand' => 82, 'change' => 5, 'trend' => 'rising'],
            ['skill' => 'Tailwind v4', 'demand' => 76, 'change' => 15, 'trend' => 'rising'],
            ['skill' => 'Rust (Backend)', 'demand' => 45, 'change' => 7, 'trend' => 'rising'],
            ['skill' => 'Docker/K8s', 'demand' => 91, 'change' => 2, 'trend' => 'stable'],
            ['skill' => 'PHP 8.4', 'demand' => 68, 'change' => 4, 'trend' => 'rising'],
            ['skill' => 'Python/Pandas', 'demand' => 93, 'change' => -2, 'trend' => 'stable'],
            ['skill' => 'Manual Testing', 'demand' => 31, 'change' => -10, 'trend' => 'falling'],
            ['skill' => 'jQuery', 'demand' => 12, 'change' => -25, 'trend' => 'falling'],
        ];
    }

    public static function getMarketStats(): array
    {
        return [
            'total_jobs' => 2847,
            'companies_hiring' => 156,
            'avg_salary_junior' => 8500000,
            'avg_salary_senior' => 22000000,
            'growth_month_vs_month' => 14.5,
        ];
    }
}
