import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface User {
    name: string;
    email: string;
    avatar?: string;
}

interface DashboardProps {
    profile: any;
    score: any;
    marketStats: any;
    trendingSkills: any[];
    recommendedJobs: any[];
    gapCount: number;
}

interface CareerItem {
    title: string;
    company: string;
    salary: string;
    match: number;
}

interface TrendingSkill {
    rank: number;
    name: string;
    growth: string;
    label: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const defaultUser: User = { name: 'Paijo Safitrti', email: 'paijo123@gmail.com' };

const defaultGrowthData = [30, 45, 35, 55, 40, 60, 50, 65, 55, 70, 62, 80];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];

const defaultCareers: CareerItem[] = [
    { title: 'Frontend Developer', company: 'GOJEK TOKOPEDIA', salary: 'IDR 12-18JT', match: 91 },
    { title: 'React Spesialisr', company: 'TRAVELOKA', salary: 'IDR 10-15JT', match: 88 },
    { title: 'Web Interface Engineer', company: 'DANA INDONESIA', salary: 'IDR 9-13JT', match: 84 },
];

const defaultTrending: TrendingSkill[] = [
    { rank: 1, name: 'Generative AI API', growth: '12 %', label: 'RISING' },
    { rank: 2, name: 'Next.js 15', growth: '12 %', label: 'RISING' },
    { rank: 3, name: 'TypeScript 5.8', growth: '12 %', label: 'RISING' },
    { rank: 4, name: 'Tailwind v4', growth: '12 %', label: 'RISING' },
    { rank: 5, name: 'Rust (Backend)', growth: '12 %', label: 'RISING' },
];

// ─── Gauge SVG ────────────────────────────────────────────────────────────────
function GaugeChart({ percent }: { percent: number }) {
    const r = 70;
    const cx = 100;
    const cy = 100;
    const startAngle = -210;
    const sweepAngle = 240;

    function polarToCart(angle: number) {
        const rad = (angle * Math.PI) / 180;
        return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
    }

    function describeArc(startDeg: number, endDeg: number) {
        const s = polarToCart(startDeg);
        const e = polarToCart(endDeg);
        const large = endDeg - startDeg > 180 ? 1 : 0;
        return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
    }

    const fillEnd = startAngle + (sweepAngle * percent) / 100;

    return (
        <svg viewBox="0 0 200 140" className="w-full max-w-[220px] mx-auto">
            <path
                d={describeArc(startAngle, startAngle + sweepAngle)}
                fill="none"
                stroke="#dde4f5"
                strokeWidth="14"
                strokeLinecap="round"
            />
            <path
                d={describeArc(startAngle, fillEnd)}
                fill="none"
                stroke="#2563EB"
                strokeWidth="14"
                strokeLinecap="round"
            />
            <text x="100" y="105" textAnchor="middle" fontSize="30" fontWeight="800" fill="#1e40af" fontFamily="'Plus Jakarta Sans', sans-serif">
                {percent}%
            </text>
        </svg>
    );
}

// ─── Growth Chart ─────────────────────────────────────────────────────────────
function GrowthChart({ data }: { data: number[] }) {
    const w = 440;
    const h = 160;
    const padX = 10;
    const padY = 16;
    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const pts = data.map((v, i) => ({
        x: padX + (i / (data.length - 1)) * (w - padX * 2),
        y: padY + ((maxVal - v) / (maxVal - minVal || 1)) * (h - padY * 2),
    }));

    const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaPath = `${linePath} L ${pts[pts.length - 1].x} ${h} L ${pts[0].x} ${h} Z`;

    const gridLines = [0.25, 0.5, 0.75].map((f) => padY + f * (h - padY * 2));

    const handleMove = (event: React.MouseEvent<SVGSVGElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
        const ratio = rect.width ? x / rect.width : 0;
        const idx = Math.round(ratio * (data.length - 1));
        setActiveIndex(Math.min(Math.max(idx, 0), data.length - 1));
    };

    const handleLeave = () => setActiveIndex(null);

    const activePoint = activeIndex !== null ? pts[activeIndex] : null;
    const activeValue = activeIndex !== null ? data[activeIndex] : null;

    return (
        <svg
            viewBox={`0 0 ${w} ${h + 24}`}
            className="w-full"
            preserveAspectRatio="xMidYMid meet"
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
        >
            {gridLines.map((y, i) => (
                <line key={i} x1={padX} y1={y} x2={w - padX} y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
            ))}
            <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#areaGrad)" />
            <path d={linePath} fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {activePoint && (
                <g>
                    <circle cx={activePoint.x} cy={activePoint.y} r="5" fill="#2563EB" />
                    <circle cx={activePoint.x} cy={activePoint.y} r="9" fill="#2563EB" fillOpacity="0.15" />
                    <rect
                        x={Math.min(Math.max(activePoint.x - 26, 6), w - 58)}
                        y={Math.max(activePoint.y - 30, 4)}
                        rx="6"
                        ry="6"
                        width="52"
                        height="20"
                        fill="#1e293b"
                    />
                    <text
                        x={Math.min(Math.max(activePoint.x, 6 + 26), w - 32)}
                        y={Math.max(activePoint.y - 16, 18)}
                        textAnchor="middle"
                        fontSize="11"
                        fill="#ffffff"
                        fontFamily="'Plus Jakarta Sans', sans-serif"
                    >
                        {activeValue}
                    </text>
                </g>
            )}
            {months.map((m, i) => (
                <text
                    key={m}
                    x={padX + (i / (data.length - 1)) * (w - padX * 2)}
                    y={h + 18}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#94a3b8"
                    fontFamily="'Plus Jakarta Sans', sans-serif"
                >
                    {m}
                </text>
            ))}
        </svg>
    );
}

export default function Dashboard({ profile, score, trendingSkills, recommendedJobs, gapCount }: DashboardProps) {
    const { auth }: any = usePage().props;
    const user: User = auth?.user ? { name: auth.user.name, email: auth.user.email } : defaultUser;

    const workReadinessScore = score?.score ?? 60;
    const skillCount = profile?.skills?.length ?? 24;
    const skillGap = gapCount ?? 3;
    const milestoneReached = 1;
    const milestoneRemaining = 3;

    const careerRecommendations: CareerItem[] = (recommendedJobs || []).slice(0, 3).map((job) => ({
        title: job.title,
        company: job.company,
        salary: job.salary_min && job.salary_max
            ? `IDR ${(job.salary_min / 1000000).toFixed(0)}-${(job.salary_max / 1000000).toFixed(0)}JT`
            : 'IDR 9-13JT',
        match: job.match || 84,
    }));

    const trendingSkillRows: TrendingSkill[] = (trendingSkills || []).slice(0, 5).map((skill, idx) => ({
        rank: idx + 1,
        name: skill.skill,
        growth: `${skill.change || 12} %`,
        label: (skill.trend || 'RISING').toUpperCase(),
    }));

    return (
        <AppLayout header="Dashboard">
            <Head title="Dashboard | CareerSync" />

            <div className="max-w-5xl mx-auto space-y-5 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
                    <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-full">
                        <h3 className="text-[15px] font-bold text-[#2563EB] mb-2">Work Readiness Score</h3>
                        <GaugeChart percent={workReadinessScore} />
                        <div className="flex justify-center mt-2">
                            <Link href={route('analysis')} className="bg-[#2563EB] text-white text-[12px] font-semibold px-5 py-2 rounded-full hover:bg-blue-700 transition-colors shadow-md shadow-blue-200">
                                Tingkatkan Skor
                            </Link>
                        </div>
                    </div>

                    <div className="md:col-span-3 flex flex-col gap-4 h-full">
                        <div className="bg-[#2563EB] rounded-3xl p-6 text-white shadow-md">
                            <p className="text-[11px] text-blue-200 font-medium mb-1">
                                Wow. 4 dari 6 skill persyaratan tercapai!
                            </p>
                            <h3 className="text-[24px] font-black tracking-tight">
                                {Array.isArray(profile?.career_target) ? profile.career_target[0] || 'Fullstack Developer' : profile?.career_target || 'Fullstack Developer'}
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 relative h-full">
                                <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                                    </svg>
                                </div>
                                <p className="text-[12px] text-slate-500 font-semibold">Skill Dimiliki</p>
                                <div className="flex items-baseline justify-start gap-1.5 mt-6">
                                    <span className="text-[42px] font-black text-[#2563EB] leading-none">{skillCount}</span>
                                    <span className="text-[12px] text-slate-400 font-semibold">Skill</span>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 relative h-full">
                                <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                                    </svg>
                                </div>
                                <p className="text-[12px] text-slate-500 font-semibold">Skill Gap</p>
                                <div className="flex items-baseline justify-start gap-1.5 mt-6">
                                    <span className="text-[42px] font-black text-[#2563EB] leading-none">{skillGap}</span>
                                    <span className="text-[12px] text-slate-400 font-semibold">Gap</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
                    <div className="md:col-span-3 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <h3 className="text-[15px] font-bold text-[#2563EB] mb-4">Grafik Pertumbuhan</h3>
                        <GrowthChart data={defaultGrowthData} />
                    </div>

                    <div className="md:col-span-2 bg-[#2563EB] rounded-3xl p-6 text-white shadow-md flex flex-col justify-between">
                        <div className="flex items-end gap-6 mb-4">
                            <div>
                                <p className="text-[52px] font-black leading-none">{milestoneReached}</p>
                                <p className="text-[12px] text-blue-200 font-semibold mt-1">Tercapai</p>
                            </div>
                            <div>
                                <p className="text-[52px] font-black leading-none">{milestoneRemaining}</p>
                                <p className="text-[12px] text-blue-200 font-semibold mt-1">More to go!</p>
                            </div>
                        </div>
                        <p className="text-[12px] text-blue-100 leading-relaxed mb-5">
                            Selesaikan milestone berikutnya di roadmap belajarmu untuk meningkatkan skor kesiapan kerjamu.
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-[15px] font-bold">Learning Roadmap</span>
                            <Link href={route('roadmap')} className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
                    <div className="md:col-span-3 space-y-3">
                        <h3 className="text-[15px] font-bold text-[#2563EB]">Rekomendasi Karir</h3>
                        {(careerRecommendations.length ? careerRecommendations : defaultCareers).map((job) => (
                            <div key={job.title} className="bg-[#2563EB] rounded-2xl px-5 py-4 flex items-center gap-4 shadow-md hover:bg-blue-700 transition-colors cursor-pointer">
                                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[15px] font-black text-white leading-tight">{job.title}</p>
                                    <div className="flex items-center gap-3 mt-0.5">
                                        <span className="text-[11px] text-blue-200 font-semibold uppercase tracking-wide">{job.company}</span>
                                        <span className="text-[11px] font-bold text-green-300">{job.salary}</span>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 bg-white/20 rounded-full px-3 py-1 text-[11px] font-bold text-white">
                                    {job.match}% MATCH
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="md:col-span-2 bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
                        <h3 className="text-[13px] font-bold text-[#1A1A2E] mb-4 text-center">Trending Skill Now</h3>
                        <div className="space-y-3.5">
                            {(trendingSkillRows.length ? trendingSkillRows : defaultTrending).map((skill) => (
                                <div key={skill.rank} className="flex items-center gap-3">
                                    <span className="w-5 text-[13px] font-black text-[#1A1A2E] flex-shrink-0">{skill.rank}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[12px] font-bold text-[#1A1A2E] truncate">{skill.name}</p>
                                        <p className="text-[10px] text-slate-400 font-semibold">{skill.label}</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <div className="flex items-center gap-1 justify-end text-green-500">
                                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                                <polyline points="17 6 23 6 23 12" />
                                            </svg>
                                            <span className="text-[12px] font-bold">{skill.growth}</span>
                                        </div>
                                        <p className="text-[9px] text-slate-400">Vs. Bulan Lalu</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
