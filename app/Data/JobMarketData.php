<?php

namespace App\Data;

class JobMarketData
{
    public static function getSkillsForRole(array|string|null $role): array
    {
        if (is_array($role)) {
            $all = [];
            foreach ($role as $r) {
                $all = array_merge($all, self::getSkillsForRole($r));
            }
            return $all;
        }

        $data = [
            // Tech
            // Tech
            'Fullstack Developer' => [
                ['skill' => 'React.js / Next.js', 'demand' => 85, 'trend' => 'stable', 'category' => 'framework'],
                ['skill' => 'Node.js / Laravel / PHP', 'demand' => 88, 'trend' => 'stable', 'category' => 'framework'],
                ['skill' => 'TypeScript', 'demand' => 80, 'trend' => 'rising', 'category' => 'language'],
                ['skill' => 'Database (SQL/NoSQL)', 'demand' => 82, 'trend' => 'stable', 'category' => 'database'],
                ['skill' => 'Git & CI/CD', 'demand' => 90, 'trend' => 'stable', 'category' => 'devops'],
            ],
            'Frontend Developer' => [
                ['skill' => 'React.js / Next.js', 'demand' => 89, 'trend' => 'stable', 'category' => 'framework'],
                ['skill' => 'TypeScript', 'demand' => 82, 'trend' => 'rising', 'category' => 'language'],
                ['skill' => 'Tailwind CSS', 'demand' => 74, 'trend' => 'rising', 'category' => 'styling'],
                ['skill' => 'REST & GraphQL API', 'demand' => 68, 'trend' => 'stable', 'category' => 'integration'],
                ['skill' => 'Git & CI/CD', 'demand' => 94, 'trend' => 'stable', 'category' => 'devops'],
            ],
            'Backend Developer' => [
                ['skill' => 'Node.js / Laravel / PHP', 'demand' => 91, 'trend' => 'stable', 'category' => 'framework'],
                ['skill' => 'RESTful API Design', 'demand' => 88, 'trend' => 'stable', 'category' => 'architecture'],
                ['skill' => 'MySQL / PostgreSQL', 'demand' => 85, 'trend' => 'stable', 'category' => 'database'],
                ['skill' => 'Docker & Kubernetes', 'demand' => 67, 'trend' => 'rising', 'category' => 'devops'],
            ],
            'Mobile Developer' => [
                ['skill' => 'React Native / Flutter', 'demand' => 86, 'trend' => 'stable', 'category' => 'framework'],
                ['skill' => 'Native iOS/Android', 'demand' => 75, 'trend' => 'stable', 'category' => 'language'],
                ['skill' => 'Mobile UI/UX', 'demand' => 80, 'trend' => 'stable', 'category' => 'design'],
                ['skill' => 'API Integration', 'demand' => 88, 'trend' => 'stable', 'category' => 'integration'],
            ],
            'DevOps Engineer' => [
                ['skill' => 'Docker & Kubernetes', 'demand' => 92, 'trend' => 'stable', 'category' => 'devops'],
                ['skill' => 'CI/CD Pipelines', 'demand' => 95, 'trend' => 'stable', 'category' => 'devops'],
                ['skill' => 'Cloud (AWS/GCP/Azure)', 'demand' => 88, 'trend' => 'stable', 'category' => 'infrastructure'],
                ['skill' => 'Scripting (Bash/Python)', 'demand' => 84, 'trend' => 'stable', 'category' => 'automation'],
            ],
            'Data Engineer' => [
                ['skill' => 'Python / Scala', 'demand' => 88, 'trend' => 'stable', 'category' => 'language'],
                ['skill' => 'SQL (BigQuery/Postgres)', 'demand' => 94, 'trend' => 'stable', 'category' => 'database'],
                ['skill' => 'Spark / Hadoop / Airflow', 'demand' => 82, 'trend' => 'stable', 'category' => 'data-pipeline'],
                ['skill' => 'Data Warehousing', 'demand' => 85, 'trend' => 'stable', 'category' => 'architecture'],
            ],

            'Frontend Engineer' => [
                ['skill' => 'React.js / Next.js', 'demand' => 89, 'trend' => 'stable', 'category' => 'framework'],
                ['skill' => 'TypeScript', 'demand' => 82, 'trend' => 'rising', 'category' => 'language'],
                ['skill' => 'Tailwind CSS', 'demand' => 74, 'trend' => 'rising', 'category' => 'styling'],
                ['skill' => 'REST & GraphQL API', 'demand' => 68, 'trend' => 'stable', 'category' => 'integration'],
                ['skill' => 'Git & CI/CD', 'demand' => 94, 'trend' => 'stable', 'category' => 'devops'],
            ],
            'Backend Engineer' => [
                ['skill' => 'Node.js / Laravel / PHP', 'demand' => 91, 'trend' => 'stable', 'category' => 'framework'],
                ['skill' => 'RESTful API Design', 'demand' => 88, 'trend' => 'stable', 'category' => 'architecture'],
                ['skill' => 'MySQL / PostgreSQL', 'demand' => 85, 'trend' => 'stable', 'category' => 'database'],
                ['skill' => 'Docker & Kubernetes', 'demand' => 67, 'trend' => 'rising', 'category' => 'devops'],
            ],

            // Creative & Marketing
            'Graphic Designer' => [
                ['skill' => 'Adobe Photoshop/Illustrator', 'demand' => 96, 'trend' => 'stable', 'category' => 'tool'],
                ['skill' => 'Branding & Identity', 'demand' => 88, 'trend' => 'stable', 'category' => 'concept'],
                ['skill' => 'Layout & Composition', 'demand' => 92, 'trend' => 'stable', 'category' => 'design'],
                ['skill' => 'Typography', 'demand' => 84, 'trend' => 'stable', 'category' => 'design'],
                ['skill' => 'Motion Graphics (After Effects)', 'demand' => 65, 'trend' => 'rising', 'category' => 'tool'],
            ],
            'Social Media Specialist' => [
                ['skill' => 'Content Planning / Strategy', 'demand' => 94, 'trend' => 'stable', 'category' => 'strategy'],
                ['skill' => 'Analitik Media Sosial', 'demand' => 82, 'trend' => 'rising', 'category' => 'analysis'],
                ['skill' => 'Copywriting', 'demand' => 88, 'trend' => 'stable', 'category' => 'writing'],
                ['skill' => 'Video Editing (CapCut/Cap),', 'demand' => 91, 'trend' => 'rising', 'category' => 'creative'],
                ['skill' => 'Ads Management (FB/IG/TikTok)', 'demand' => 78, 'trend' => 'stable', 'category' => 'marketing'],
            ],

            // Business & Professional
            'Project Manager' => [
                ['skill' => 'Agile / Scrum Methodology', 'demand' => 92, 'trend' => 'stable', 'category' => 'management'],
                ['skill' => 'Risk Management', 'demand' => 78, 'trend' => 'stable', 'category' => 'planning'],
                ['skill' => 'Stakeholder Communication', 'demand' => 96, 'trend' => 'stable', 'category' => 'soft-skill'],
                ['skill' => 'Jira / Trello / Notion', 'demand' => 85, 'trend' => 'stable', 'category' => 'tool'],
                ['skill' => 'Budgeting & Forecasting', 'demand' => 74, 'trend' => 'stable', 'category' => 'finance'],
            ],
            'HR Specialist' => [
                ['skill' => 'Recruitment & Talent Acquisition', 'demand' => 91, 'trend' => 'stable', 'category' => 'process'],
                ['skill' => 'Employee Relations', 'demand' => 84, 'trend' => 'stable', 'category' => 'soft-skill'],
                ['skill' => 'UU Ketenagakerjaan', 'demand' => 89, 'trend' => 'stable', 'category' => 'legal'],
                ['skill' => 'Payroll Management', 'demand' => 72, 'trend' => 'stable', 'category' => 'finance'],
                ['skill' => 'KPI & Performance Management', 'demand' => 81, 'trend' => 'stable', 'category' => 'process'],
            ],
            'Accountant' => [
                ['skill' => 'Financial Reporting', 'demand' => 95, 'trend' => 'stable', 'category' => 'finance'],
                ['skill' => 'General Ledger', 'demand' => 92, 'trend' => 'stable', 'category' => 'accounting'],
                ['skill' => 'Tax Compliance (PPh/PPN)', 'demand' => 88, 'trend' => 'stable', 'category' => 'legal'],
                ['skill' => 'Excel Expert (VLOOKUP/Pivot)', 'demand' => 94, 'trend' => 'stable', 'category' => 'tool'],
                ['skill' => 'Accounting Software (Xero/Accurate)', 'demand' => 76, 'trend' => 'rising', 'category' => 'tool'],
            ],

            // Education & Service
            'Chef / Cook' => [
                ['skill' => 'Food Safety & Hygiene', 'demand' => 98, 'trend' => 'stable', 'category' => 'standard'],
                ['skill' => 'Menu Engineering', 'demand' => 72, 'trend' => 'stable', 'category' => 'business'],
                ['skill' => 'Kitchen Management', 'demand' => 84, 'trend' => 'stable', 'category' => 'operation'],
                ['skill' => 'Culinarty Techniques', 'demand' => 91, 'trend' => 'stable', 'category' => 'skill'],
                ['skill' => 'Stock & Inventory Control', 'demand' => 75, 'trend' => 'stable', 'category' => 'operation'],
            ],
            'Barista' => [
                ['skill' => 'Espresso Calibration', 'demand' => 92, 'trend' => 'stable', 'category' => 'skill'],
                ['skill' => 'Latte Art', 'demand' => 71, 'trend' => 'stable', 'category' => 'creative'],
                ['skill' => 'Customer Service', 'demand' => 95, 'trend' => 'stable', 'category' => 'soft-skill'],
                ['skill' => 'Coffee Origin Knowledge', 'demand' => 64, 'trend' => 'rising', 'category' => 'theory'],
                ['skill' => 'POS System Operation', 'demand' => 82, 'trend' => 'stable', 'category' => 'tool'],
            ],
        ];

        return $data[$role] ?? [];
    }

    public static function getJobListings(array|string|null $targetRole = null): array
    {
        $companies = ['Gojek', 'Unilever', 'Bank Mandiri', 'Shopee', 'Mayapada Hospital', 'Restaurant Group', 'Digital Agency', 'Hotel Mulia', 'KPMG', 'Pertamina'];
        $locations = ['Jakarta', 'Bandung', 'Surabaya', 'Denpasar', 'Remote'];
        $allRoles = [
            'Frontend Engineer', 'Backend Engineer', 'Graphic Designer', 
            'Social Media Specialist', 'Project Manager', 'HR Specialist', 
            'Accountant', 'Chef / Cook', 'Barista'
        ];

        // Determine which roles to use for generation
        $rolesToGenerate = [];
        if ($targetRole) {
            if (is_array($targetRole)) {
                $rolesToGenerate = $targetRole;
            } else {
                $rolesToGenerate = [$targetRole];
            }
        } else {
            $rolesToGenerate = $allRoles;
        }

        $jobs = [];
        for ($i = 1; $i <= 35; $i++) {
            $role = $rolesToGenerate[array_rand($rolesToGenerate)];
            
            // If the role is not in our predefined data, use a fallback like 'Backend Engineer'
            $skillsData = self::getSkillsForRole($role);
            if (empty($skillsData)) {
                $role = 'Backend Engineer';
                $skillsData = self::getSkillsForRole($role);
            }

            $jobSkills = array_column(array_slice($skillsData, 0, 4), 'skill');
            
            $jobs[] = [
                'id' => $i,
                'title' => $role . ($i % 5 == 0 ? ' (Senior)' : ($i % 8 == 0 ? ' (Supervisor)' : '')),
                'company' => $companies[array_rand($companies)],
                'location' => $locations[array_rand($locations)],
                'salary_min' => rand(5, 12) * 1000000,
                'salary_max' => rand(13, 25) * 1000000,
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
            ['skill' => 'Generative AI Prompting', 'demand' => 94, 'change' => 25, 'trend' => 'rising'],
            ['skill' => 'Short-form Video Editing', 'demand' => 91, 'change' => 30, 'trend' => 'rising'],
            ['skill' => 'Data Privacy & Ethics', 'demand' => 82, 'change' => 12, 'trend' => 'rising'],
            ['skill' => 'Agile Transformation', 'demand' => 78, 'change' => 8, 'trend' => 'rising'],
            ['skill' => 'Sustainability Reporting', 'demand' => 55, 'change' => 15, 'trend' => 'rising'],
            ['skill' => 'Digital Marketing Ads', 'demand' => 89, 'change' => 5, 'trend' => 'stable'],
            ['skill' => 'Cloud Computing (AWS/GCP)', 'demand' => 85, 'change' => 4, 'trend' => 'stable'],
            ['skill' => 'Public Speaking', 'demand' => 76, 'change' => 3, 'trend' => 'stable'],
        ];
    }

    public static function getMarketStats(): array
    {
        return [
            'total_jobs' => 12450,
            'companies_hiring' => 842,
            'avg_salary_junior' => 6500000,
            'avg_salary_senior' => 18000000,
            'growth_month_vs_month' => 8.2,
        ];
    }
}
