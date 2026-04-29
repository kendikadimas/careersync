import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { useState, useRef } from 'react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    Cell,
    LabelList,
    AreaChart,
    Area
} from 'recharts';
import { 
    LayoutDashboard, 
    BarChart3, 
    Map as MapIcon, 
    TrendingUp, 
    LogOut, 
    Menu, 
    X, 
    Bell,
    CheckCircle2,
    Settings,
    ChevronDown,
    CircleHelp,
    Trophy,
    Briefcase,
    Eye,
    ChevronRight,
    Target
} from 'lucide-react';

interface DashboardProps {
    user: {
        id: number;
        name: string;
        rank: string;
        points: number;
    };
    badges: any[];
    profile: any;
    score: any;
    scoreHistory?: Array<{ score: number; label: string }>;
    marketStats: any;
    trendingSkills: any[];
    recommendedJobs: any[];
    gapCount: number;
    skillStats?: {
        mastered: number;
        total: number;
    };
    roadmap?: any;
    roadmapStats?: {
        completed: number;
        remaining: number;
        total: number;
    };
    scoreMeta?: {
        isStale?: boolean;
        lastCalculatedAt?: string | null;
    };
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

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
const emptyGrowthData = Array(12).fill(0);

function GaugeChart({ percent, dark = false }: { percent: number; dark?: boolean }) {
    const r = 75;
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
        <svg viewBox="0 0 200 150" className="w-full max-w-[220px] mx-auto">
            <defs>
                <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#818CF8" />
                </linearGradient>
            </defs>
            <path d={describeArc(startAngle, startAngle + sweepAngle)} fill="none" stroke="#F1F5F9" strokeWidth="12" strokeLinecap="round" />
            <path d={describeArc(startAngle, fillEnd)} fill="none" stroke="url(#gaugeGrad)" strokeWidth="12" strokeLinecap="round" strokeDasharray="0" />
            <text x="100" y="105" textAnchor="middle" className={`text-3xl font-black ${dark ? 'fill-white' : 'fill-slate-800'}`} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {percent}%
            </text>
            <text x="100" y="130" textAnchor="middle" className={`text-[10px] font-bold ${dark ? 'fill-indigo-200' : 'fill-slate-400'} tracking-widest`}>
                Readiness
            </text>
        </svg>
    );
}

function GrowthChart({ data, labels }: { data: number[]; labels: string[] }) {
    const w = 440;
    const h = 180;
    const padX = 20;
    const padY = 30;
    const maxVal = Math.max(...data, 100);
    const minVal = 0;
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const pts = data.map((v, i) => ({
        x: padX + (i / (data.length - 1 || 1)) * (w - padX * 2),
        y: h - padY - ((v - minVal) / (maxVal - minVal)) * (h - padY * 2),
    }));

    const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaPath = `${linePath} L ${pts[pts.length - 1].x} ${h - padY} L ${pts[0].x} ${h - padY} Z`;

    const handleMove = (event: React.MouseEvent<SVGSVGElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
        const ratio = x / rect.width;
        const idx = Math.round(ratio * (data.length - 1));
        setActiveIndex(Math.min(Math.max(idx, 0), data.length - 1));
    };

    return (
        <svg
            viewBox={`0 0 ${w} ${h}`}
            className="w-full h-auto"
            onMouseMove={handleMove}
            onMouseLeave={() => setActiveIndex(null)}
        >
            <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Grid lines */}
            {[0, 0.5, 1].map((f) => {
                const y = h - padY - f * (h - padY * 2);
                return <line key={f} x1={padX} y1={y} x2={w - padX} y2={y} stroke="#F1F5F9" strokeWidth="1" />;
            })}

            <path d={areaPath} fill="url(#chartGrad)" />
            <path d={linePath} fill="none" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

            {activeIndex !== null && (
                <g>
                    <line x1={pts[activeIndex].x} y1={padY} x2={pts[activeIndex].x} y2={h - padY} stroke="#4F46E5" strokeWidth="1" strokeDasharray="4 4" />
                    <rect x={pts[activeIndex].x - 18} y={pts[activeIndex].y - 32} width="36" height="20" rx="6" fill="#1e293b" />
                    <text x={pts[activeIndex].x} y={pts[activeIndex].y - 18} textAnchor="middle" className="text-[11px] font-black fill-white">
                        {data[activeIndex]}
                    </text>
                    <circle cx={pts[activeIndex].x} cy={pts[activeIndex].y} r="6" fill="#4F46E5" stroke="white" strokeWidth="2" />
                </g>
            )}

            {labels.map((m, i) => (
                <text
                    key={i}
                    x={padX + (i / (data.length - 1 || 1)) * (w - padX * 2)}
                    y={h - 5}
                    textAnchor="middle"
                    className="text-[10px] font-medium fill-slate-400"
                >
                    {m}
                </text>
            ))}
        </svg>
    );
}

function TrendingSkillsChart({ data }: { data: any[] }) {
    const chartData = [...data]
        .sort((a, b) => (b.change || 0) - (a.change || 0))
        .slice(0, 5)
        .map((s, i) => ({
            rank: i + 1,
            name: s.skill || s.name,
            growth: s.change || 0,
            full: 100 // for background bars if needed, but growth is small
        }));

    // Find max growth to scale the chart nicely
    const maxGrowth = Math.max(...chartData.map(d => d.growth), 10);

    return (
        <div className="h-[300px] w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    layout="vertical"
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                    barSize={12}
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis type="number" hide domain={[0, maxGrowth + 2]} />
                    <YAxis 
                        dataKey="name" 
                        type="category" 
                        axisLine={false} 
                        tickLine={false}
                        width={100}
                        tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                    />
                    <Tooltip 
                        cursor={{ fill: '#f8fafc' }}
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="bg-white p-3 rounded-lg shadow-xl border border-slate-100">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Rank #{payload[0].payload.rank}</p>
                                        <p className="text-sm font-black text-slate-900 mb-1">{payload[0].payload.name}</p>
                                        <p className="text-sm font-black text-indigo-600">+{payload[0].value}% Growth</p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Bar 
                        dataKey="growth" 
                        radius={[0, 10, 10, 0]}
                        fill="#4F46E5"
                        background={{ fill: '#f1f5f9', radius: 10 }}
                        animationBegin={200}
                        animationDuration={1200}
                    >
                        <LabelList 
                            dataKey="growth" 
                            position="right" 
                            formatter={(val: number) => `+${val}%`}
                            style={{ fill: '#6366f1', fontSize: 11, fontWeight: 900 }} 
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

function ScoreHistoryChart({ data }: { data: any[] }) {
    if (!data || data.length === 0) return null;

    const formattedData = data.map(d => ({
        score: Number(d.score),
        label: d.label
    }));

    return (
        <div className="w-full h-24 mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={formattedData}>
                    <defs>
                        <linearGradient id="scoreColor" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Area 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#6366f1" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#scoreColor)" 
                        animationDuration={1500}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default function Dashboard({
    user,
    badges = [],
    profile,
    score,
    scoreHistory = [],
    trendingSkills = [],
    recommendedJobs = [],
    gapCount,
    skillStats,
    roadmap,
    roadmapStats,
    scoreMeta,
}: DashboardProps) {
    const historyScores = scoreHistory.map((s) => Number(s.score)).filter((v) => Number.isFinite(v));
    const historyLabels = scoreHistory.map((s) => s.label);

    const workReadinessScore = score?.score ?? historyScores[historyScores.length - 1] ?? 0;
    const skillCount = profile?.skills?.length ?? 0;
    const skillGap = gapCount ?? 0;
    const milestoneReached = roadmapStats?.completed ?? roadmap?.milestones_completed ?? 0;
    const milestoneRemaining = roadmapStats?.remaining ?? Math.max((roadmap?.total_milestones ?? 0) - (roadmap?.milestones_completed ?? 0), 0);
    const totalMilestones = roadmapStats?.total ?? roadmap?.total_milestones ?? 0;

    const growthData = historyScores.length >= 2 ? historyScores : [0, 0, 0, 0, 0];
    const growthLabels = historyScores.length >= 2 ? historyLabels : ['-', '-', '-', '-', '-'];

    const careerTarget = Array.isArray(profile?.career_target)
        ? profile.career_target[0] || 'Unset'
        : profile?.career_target || 'Unset';

    const hardSkills = (profile?.skills || []).filter((skill: any) => {
        const name = (typeof skill === 'object' ? skill.name : skill).toLowerCase();
        return !['communication', 'leadership', 'teamwork', 'public speaking', 'problem solving', 'time management', 'analytical thinking', 'presentation'].some(s => name.includes(s));
    });

    const softSkills = (profile?.skills || []).filter((skill: any) => {
        const name = (typeof skill === 'object' ? skill.name : skill).toLowerCase();
        return ['communication', 'leadership', 'teamwork', 'public speaking', 'problem solving', 'time management', 'analytical thinking', 'presentation'].some(s => name.includes(s));
    });

    const hardScrollRef = useRef<HTMLDivElement>(null);
    const softScrollRef = useRef<HTMLDivElement>(null);

    const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
        if (ref.current) {
            const scrollAmount = 200;
            ref.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <AppLayout>
            <Head title="Dashboard | CareerSync" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Selamat Datang, {user.name}! 👋</h1>
                        <div className="flex items-center gap-3 mt-1">
                            <p className="text-slate-500 text-sm">Pantau perkembangan karirmu dan raih target kerjamu hari ini.</p>
                            <Link 
                                href={route('profile.public', user.rank === 'admin' ? 1 : user.id)} 
                                className="flex items-center gap-1.5 text-[11px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-700 transition-colors bg-indigo-50 px-2.5 py-1 rounded-lg"
                            >
                                <Eye className="w-3 h-3" />
                                Lihat Profil Publik
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-2 pr-4 rounded-lg shadow-sm border border-slate-100">
                        <div className="w-10 h-10 rounded-lg bg-indigo-900 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">
                            {user.rank.charAt(0)}
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 tracking-widest">Rank</p>
                            <p className="text-sm font-bold text-slate-800">{user.rank}</p>
                        </div>
                        <div className="h-8 w-px bg-slate-100 mx-2" />
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 tracking-widest">Points</p>
                            <p className="text-sm font-black text-indigo-900">{user.points.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* Top Row: Readiness & Focus */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    {/* Readiness Gauge */}
                    <div className="lg:col-span-4 bg-white rounded-lg p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center h-full">
                        <div className="w-full flex items-center justify-between mb-6">
                            <h3 className="text-lg font-black text-slate-900">Work Readiness</h3>
                            <div className="flex items-center gap-1 bg-indigo-50 px-2 py-1 rounded-lg">
                                <Target className="w-3 h-3 text-indigo-600" />
                                <span className="text-[9px] font-black text-indigo-700 uppercase tracking-widest">OBE Target</span>
                            </div>
                        </div>
                        
                        <GaugeChart percent={workReadinessScore} />
                        
                        <div className="mt-6 flex flex-col items-center w-full">
                            <div className="flex flex-col items-center gap-1 mb-4">
                                <span className={`inline-block px-4 py-1.5 rounded-lg text-[11px] font-black tracking-widest uppercase ${
                                    workReadinessScore >= 80 ? 'bg-emerald-100 text-emerald-700' : 
                                    workReadinessScore >= 60 ? 'bg-indigo-100 text-indigo-700' :
                                    workReadinessScore >= 40 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'
                                }`}>
                                    {workReadinessScore >= 80 ? 'Industry Ready' : 
                                     workReadinessScore >= 60 ? 'Competent' : 
                                     workReadinessScore >= 40 ? 'Developing' : 'Apprentice'}
                                </span>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">100 = Standar Industri</p>
                            </div>

                            {/* Score Growth Chart */}
                            <div className="w-full border-t border-slate-50 pt-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth Trend</span>
                                    <span className="text-[10px] font-black text-indigo-600">+{growthData[growthData.length-1] - (growthData[0] || 0)}%</span>
                                </div>
                                <ScoreHistoryChart data={scoreHistory} />
                            </div>
                            
                            {scoreMeta?.isStale && (
                                <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest italic mt-4 animate-pulse text-center">Progress terbaru terdeteksi. Update skor?</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-3 w-full mt-8">
                            <Link href={route('analysis')} className="bg-slate-900 text-white text-xs font-bold py-3 rounded-lg hover:bg-slate-800 transition-all shadow-md active:scale-95 text-center">
                                Re-Analyze
                            </Link>
                            <Link href={route('score.calculate')} method="post" as="button" className="bg-white text-slate-600 text-xs font-bold py-3 rounded-lg hover:bg-slate-50 transition-all border border-slate-200 active:scale-95">
                                Refresh
                            </Link>
                        </div>
                    </div>

                    {/* Career Focus & Stats */}
                    <div className="lg:col-span-8 flex flex-col gap-6 h-full">
                        {/* Target Banner */}
                        <div className="bg-indigo-900 rounded-lg py-8 px-10 text-white relative overflow-hidden shadow-xl shadow-indigo-100 flex-1 flex flex-col justify-end min-h-[180px]">
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start">
                                    <p className="text-white text-[14px] font-normal mb-2">Target Karir Utama</p>
                                    <Link href={route('profile.edit')} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white" title="Edit Target">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                                    </Link>
                                </div>
                                <div className="mt-auto">
                                    <h2 className="text-3xl font-black tracking-tight mb-4">{careerTarget}</h2>
                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                                            <div className="flex gap-1">
                                                {Array.from({ length: Math.min(skillStats?.total || 0, 5) }).map((_, i) => (
                                                    <div key={i} className={`w-2 h-2 rounded-lg ${i < (skillStats?.mastered || 0) ? 'bg-emerald-400' : 'bg-white/30'}`} />
                                                ))}
                                                {(skillStats?.total || 0) > 5 && <span className="text-[8px] text-white/50">...</span>}
                                            </div>
                                            <span className="text-[13px] font-bold text-white">
                                                {skillStats?.mastered || 0} dari {skillStats?.total || 0} skill dikuasai
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1 min-h-[180px]">
                            <div className="bg-white rounded-lg p-6 border border-slate-100 shadow-sm flex flex-col justify-between h-full relative overflow-hidden group">
                                <div className="relative z-10">
                                    <p className="text-black text-[18px] font-bold ">Total Skills</p>
                                </div>
                                <div className="relative z-10 mt-auto">
                                    <p className="text-5xl font-black text-slate-900 tracking-tighter">{skillCount}</p>
                                    <p className="text-[10px] font-bold text-black mt-1 italic">Terdata di sistem</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 border border-slate-100 shadow-sm flex flex-col justify-between h-full relative overflow-hidden group">
                                <div className="relative z-10">
                                    <p className="text-black text-[18px] font-bold ">Skill Gap</p>
                                </div>
                                <div className="relative z-10 mt-auto">
                                    <p className="text-5xl font-black text-slate-900 tracking-tighter">{skillGap}</p>
                                    <p className="text-[10px] font-bold text-black mt-1 italic">Perlu dipelajari</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 border border-slate-100 shadow-sm flex flex-col justify-between text-white overflow-hidden relative h-full group">
                                <div className="relative z-10">
                                    <p className="text-black text-[18px] font-bold ">Milestones</p>
                                </div>
                                <div className="relative z-10 mt-auto">
                                    <p className="text-5xl font-black text-slate-900 tracking-tighter">{milestoneReached}</p>
                                    <p className="text-[10px] font-bold text-black mt-1 italic">Telah dicapai</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Row: Progress & Badges */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Growth Chart */}
                    <div className="lg:col-span-8 bg-white rounded-lg p-8 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-lg font-bold text-slate-900">Perkembangan Skor</h3>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-lg bg-indigo-500" />
                                <span className="text-[11px] font-bold text-slate-500 tracking-widest">Daily Progress</span>
                            </div>
                        </div>
                        <GrowthChart data={growthData} labels={growthLabels} />
                    </div>

                    {/* Mastered Skills Row Carousel */}
                    <div className="lg:col-span-4 bg-white rounded-lg p-8 shadow-sm border border-slate-100 flex flex-col h-full justify-between overflow-hidden">
                        <div>
                            <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight">Skill Dikuasai</h3>
                            
                            {/* Hard Skills Section */}
                            <div className="mb-10">
                                <div className="flex items-center justify-between mb-4 px-1">
                                    <h4 className="text-[14px] font-[600] text-slate-800">Hard Skill</h4>
                                    <div className="flex gap-1.5">
                                        <button onClick={() => scroll(hardScrollRef, 'left')} className="p-1 rounded-lg bg-slate-50 text-slate-400 hover:bg-indigo-900 hover:text-white transition-all"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>
                                        <button onClick={() => scroll(hardScrollRef, 'right')} className="p-1 rounded-lg bg-slate-50 text-slate-400 hover:bg-indigo-900 hover:text-white transition-all"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>
                                    </div>
                                </div>
                                <div 
                                    ref={hardScrollRef}
                                    className="flex gap-2 overflow-x-auto custom-scrollbar-hide snap-x pb-2"
                                >
                                    {hardSkills.length > 0 ? hardSkills.map((skill: any, i: number) => (
                                        <div key={i} className="snap-start shrink-0 px-4 py-2.5 bg-slate-50 border border-slate-100 text-[13px] font-bold text-slate-700 rounded-lg hover:border-indigo-200 hover:text-indigo-900 hover:bg-white transition-all shadow-sm">
                                            {typeof skill === 'object' ? skill.name : skill}
                                        </div>
                                    )) : (
                                        <p className="text-xs text-slate-400 italic px-1">Belum ada hard skill terdeteksi.</p>
                                    )}
                                </div>
                            </div>

                            {/* Soft Skills Section */}
                            <div>
                                <div className="flex items-center justify-between mb-4 px-1">
                                    <h4 className="text-[14px] font-[600] text-slate-700">Soft Skill</h4>
                                    <div className="flex gap-1.5">
                                        <button onClick={() => scroll(softScrollRef, 'left')} className="p-1 rounded-lg bg-slate-50 text-slate-400 hover:bg-indigo-900 hover:text-white transition-all"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>
                                        <button onClick={() => scroll(softScrollRef, 'right')} className="p-1 rounded-lg bg-slate-50 text-slate-400 hover:bg-indigo-900 hover:text-white transition-all"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>
                                    </div>
                                </div>
                                <div 
                                    ref={softScrollRef}
                                    className="flex gap-2 overflow-x-auto custom-scrollbar-hide snap-x pb-2"
                                >
                                    {softSkills.length > 0 ? softSkills.map((skill: any, i: number) => (
                                        <div key={i} className="snap-start shrink-0 px-4 py-2.5 bg-indigo-50/50 border border-indigo-100 text-[13px] font-bold text-indigo-900 rounded-lg hover:border-indigo-300 hover:bg-white transition-all shadow-sm">
                                            {typeof skill === 'object' ? skill.name : skill}
                                        </div>
                                    )) : (
                                        <p className="text-xs text-slate-400 italic px-1">Belum ada soft skill terdeteksi.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-slate-50">
                            {/* <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Geser untuk melihat lebih banyak keahlian</p> */}
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Jobs & Trending */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Job Recommendations */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="flex items-center justify-between px-2 mb-2">
                            <h3 className="text-lg font-bold text-slate-900">Peluang Karir Untukmu</h3>
                            {/* <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-tlg">LIVE JOBS</span> */}
                        </div>
                        <div className="space-y-4">
                            {recommendedJobs.slice(0, 4).map((job, i) => (
                                <div key={i} className="group bg-white p-5 rounded-lg border border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer flex items-center gap-4">
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-[15px] font-bold text-slate-900 truncate">{job.title}</h4>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[11px] font-bold text-slate-400 tracking-tight">{job.company}</span>
                                            <span className="w-1 h-1 rounded-lg bg-slate-200" />
                                            <span className="text-[11px] font-bold text-indigo-900">IDR {(job.salary_min / 1000000).toFixed(0)}JT+</span>
                                        </div>
                                    </div>
                                    <div className="shrink-0 text-right">
                                        <div className="text-[11px] font-black text-emerald-600  px-3 py-1 rounded-lg">
                                            {job.match}% Match
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {recommendedJobs.length === 0 && (
                                <div className="p-12 text-center border-2 border-dashed border-slate-100 rounded-lg text-slate-400 text-sm">
                                    Belum ada rekomendasi pekerjaan.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Trending Skills Professional List */}
                    <div className="lg:col-span-5 bg-white rounded-lg p-8 shadow-sm border border-slate-100 flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-black text-slate-900 tracking-tight">Trending Skills</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Kenaikan demand dibanding bulan lalu</p>
                            </div>
                        </div>
                        
                        <div className="flex-1 min-h-[300px] flex flex-col justify-center">
                            {(() => {
                                const sortedSkills = [...trendingSkills].sort((a, b) => (b.change || 0) - (a.change || 0));
                                return (
                                    <>
                                        <TrendingSkillsChart data={sortedSkills} />
                                        
                                        <div className="mt-auto pt-6 grid grid-cols-2 gap-4">
                                            {/* <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100/50">
                                                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Pertumbuhan Tertinggi</p>
                                                <p className="text-lg font-black text-emerald-700 truncate">
                                                    {sortedSkills[0]?.skill || sortedSkills[0]?.name || '-'}
                                                </p>
                                            </div> */}
                                            {/* <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-100/50">
                                                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Rata-rata Demand</p>
                                                <p className="text-lg font-black text-indigo-700">
                                                    {Math.round(sortedSkills.reduce((acc, curr) => acc + (curr.demand || 0), 0) / (sortedSkills.length || 1))}%
                                                </p>
                                            </div> */}
                                        </div>
                                    </>
                                );
                            })()}
                        </div>

                        {/* <div className="mt-8 pt-6 border-t border-slate-50">
                            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                                <span>Diperbarui berdasarkan tren lowongan kerja regional.</span>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
