import PublicLayout from '@/Layouts/PublicLayout';
import { Link, Head } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { 
    RadialBarChart, 
    RadialBar, 
    PolarAngleAxis, 
    ResponsiveContainer,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis as RadarPolarAngleAxis,
    Legend,
    Tooltip
} from 'recharts';
import { 
    TrendingUp, 
    Target, 
    CheckCircle2, 
    Flame, 
    Zap, 
    Briefcase, 
    ChevronRight,
    MousePointer2,
    Map as MapIcon,
    AlertCircle,
    Info,
    Search,
    Filter
} from 'lucide-react';
import { ReactFlow, Controls, Background, useNodesState, useEdgesState, BackgroundVariant } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface Props {
    profile: any;
    skill_gap: any[];
    roadmap: any;
    work_readiness: any;
    recommended_jobs: any[];
}

export default function Demo({ profile, skill_gap, roadmap, work_readiness, recommended_jobs }: Props) {
    const [activeTab, setActiveTab] = useState('dashboard');

    const chartData = useMemo(() => {
        return skill_gap.map(item => ({
            subject: item.skill,
            demand: item.market_demand,
            score: item.user_score,
            fullMark: 100,
        }));
    }, [skill_gap]);

    // Roadmap Nodes and Edges
    const initialNodes = useMemo(() => {
        return roadmap.milestones.map((ms: any, index: number) => ({
            id: ms.id,
            data: { label: ms.title },
            position: { x: index * 250, y: 150 },
            style: { 
                background: ms.status === 'completed' ? '#0d9488' : ms.status === 'current' ? '#f59e0b' : '#334155',
                color: '#fff',
                borderRadius: '1.25rem',
                padding: '12px',
                width: 190,
                fontSize: '11px',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                border: 'none',
                textAlign: 'center' as const,
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
            }
        }));
    }, [roadmap]);

    const initialEdges = useMemo(() => {
        return roadmap.milestones.slice(0, -1).map((ms: any, i: number) => ({
            id: `e${i}`,
            source: ms.id,
            target: roadmap.milestones[i+1].id,
            animated: roadmap.milestones[i].status === 'completed' && roadmap.milestones[i+1].status === 'current',
            style: { stroke: '#cbd5e1', strokeWidth: 3 }
        }));
    }, [roadmap]);

    const [nodes] = useNodesState(initialNodes);
    const [edges] = useEdgesState(initialEdges);

    return (
        <PublicLayout>
            <Head title="Demo Interaktif | Career-Sync Academy" />
            
            <div className="bg-amber-50 border-b border-amber-100 py-4 px-4 sticky top-16 z-40">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-amber-500 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-amber-500/20">
                            <Info className="w-4 h-4" />
                        </div>
                        <p className="text-xs text-amber-900 font-black uppercase tracking-tight">
                            Interactive Demo Mode — <span className="font-medium text-amber-700 normal-case">Sedang menampilkan simulasi data profil Budi Santoso</span>
                        </p>
                    </div>
                    <Link href="/register" className="bg-navy-900 text-white text-[10px] uppercase tracking-[0.2em] font-black px-6 py-2.5 rounded-xl hover:bg-teal-600 transition-all shadow-xl shadow-navy-900/10">
                        Coba dengan CV Kamu Sekarang
                    </Link>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-12">
                {/* Tabs Tab */}
                <div className="flex overflow-x-auto gap-2 bg-slate-100 p-2 rounded-[2rem] mb-12 no-scrollbar shadow-inner">
                    {[
                        { id: 'dashboard', label: 'Dashboard', icon: Zap },
                        { id: 'analysis', label: 'Skill Analysis', icon: Target },
                        { id: 'roadmap', label: 'Learning Roadmap', icon: MapIcon },
                        { id: 'market', label: 'Job Market', icon: Briefcase },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-8 py-4 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                activeTab === tab.id 
                                    ? 'bg-white text-navy-900 shadow-md transform scale-[1.02]' 
                                    : 'text-slate-500 hover:text-navy-900'
                            }`}
                        >
                            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-teal-500' : ''}`} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-[650px] relative">
                    {activeTab === 'dashboard' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                                {/* Gauge */}
                                <div className="lg:col-span-4 bg-white rounded-4xl p-10 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full opacity-50 group-hover:scale-125 transition-transform duration-1000"></div>
                                    <h3 className="font-black text-navy-900 text-xs uppercase tracking-[0.2em] mb-8 relative z-10">Work Readiness Score</h3>
                                    <div className="relative w-full h-[220px] flex items-center justify-center translate-y-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RadialBarChart innerRadius="74%" outerRadius="100%" startAngle={180} endAngle={0} data={[{ value: work_readiness.score, fill: '#0d9488' }]}>
                                                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                                                <RadialBar background={{ fill: '#f1f5f9' }} dataKey="value" cornerRadius={16} />
                                            </RadialBarChart>
                                        </ResponsiveContainer>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center mt-10">
                                            <span className="text-6xl font-black text-navy-900 leading-none tracking-tighter">{work_readiness.score}%</span>
                                        </div>
                                    </div>
                                    <div className="mt-6 px-6 py-2 bg-teal-50 text-teal-600 text-[10px] font-black rounded-full uppercase tracking-[0.2em] relative z-10">
                                        {work_readiness.category}
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { label: 'Skill Dimiliki', value: '7 Skill', icon: CheckCircle2, bg: 'bg-teal-50', text: 'text-teal-600' },
                                        { label: 'Target Karir', value: profile.career_target, icon: Target, bg: 'bg-navy-50', text: 'text-navy-900' },
                                        { label: 'Progres Roadmap', value: '2 / 5', icon: TrendingUp, bg: 'bg-indigo-50', text: 'text-indigo-600' },
                                        { label: 'Pasar Aktif', value: '1.284', icon: Flame, bg: 'bg-orange-50', text: 'text-orange-600' },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-teal-500/50 transition-all">
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                                                <h4 className="text-3xl font-black text-navy-900 group-hover:text-teal-600 transition-colors">{stat.value}</h4>
                                            </div>
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.text} shadow-sm group-hover:rotate-6 transition-transform`}>
                                                <stat.icon className="w-6 h-6" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                                <div className="lg:col-span-8 bg-white rounded-4xl p-10 border border-slate-100 shadow-sm">
                                    <div className="flex items-center justify-between mb-10">
                                        <h3 className="text-xl font-black text-navy-900 uppercase tracking-tighter">Rekomendasi Karir</h3>
                                        <button onClick={() => setActiveTab('market')} className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-3 transition-all">Intel Pasar Baru <ChevronRight className="w-4 h-4" /></button>
                                    </div>
                                    <div className="space-y-4">
                                        {recommended_jobs.slice(0, 3).map((job, i) => (
                                            <div key={i} className="flex items-center justify-between p-6 rounded-4xl border border-slate-50 hover:border-teal-100 hover:shadow-xl hover:shadow-teal-500/5 transition-all group cursor-pointer">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-navy-900 shadow-inner group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                                                        <Briefcase className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-navy-900 text-lg leading-tight mb-1">{job.title}</p>
                                                        <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                            <span>{job.company}</span>
                                                            <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                                                            <span className="text-teal-500">{job.salary}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <span className="px-4 py-1.5 bg-teal-50 text-teal-600 text-[10px] font-black rounded-xl uppercase tracking-widest">{job.match}% MATCH</span>
                                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">Verified Job</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="lg:col-span-4 bg-navy-900 text-white p-10 rounded-4xl flex flex-col justify-center items-center text-center relative overflow-hidden group">
                                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
                                    <div className="w-20 h-20 bg-teal-500 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-teal-500/30 relative z-10 group-hover:rotate-12 transition-transform">
                                        <Zap className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-black mb-4 leading-tight text-balance relative z-10 tracking-tight">Capai <span className="text-teal-400">Roadmap</span> Berikutnya</h3>
                                    <p className="text-navy-300 text-sm mb-10 leading-relaxed font-medium relative z-10">Selesaikan milestone berikutnya untuk menaikkan skor kesiapan kerjamu sebesar 12%.</p>
                                    <button onClick={() => setActiveTab('roadmap')} className="w-full bg-white text-navy-900 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-50 transition-all relative z-10 active:scale-95">Selidiki Roadmap</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'analysis' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 text-left">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                                <div className="bg-white rounded-4xl p-10 border border-slate-100 shadow-sm h-full relative overflow-hidden">
                                    <h3 className="font-black text-lg text-navy-900 mb-10 uppercase tracking-widest flex items-center gap-3">
                                        <Target className="text-teal-500 w-5 h-5" />
                                        Skill Gap Radar
                                    </h3>
                                    <div className="h-[420px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                                                <PolarGrid stroke="#e2e8f0" strokeDasharray="4 4" />
                                                <RadarPolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                                                <Radar name="Market Demand" dataKey="demand" stroke="#0d9488" strokeWidth={3} fill="#0d9488" fillOpacity={0.05} />
                                                <Radar name="My Skills" dataKey="score" stroke="#f59e0b" strokeWidth={3} fill="#f59e0b" fillOpacity={0.4} />
                                                <Tooltip contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', fontWeight: 'bold' }} />
                                                <Legend wrapperStyle={{ paddingTop: '20px', fontWeight: 'bold', fontSize: '10px', textTransform: 'uppercase' }} />
                                            </RadarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                <div className="bg-white rounded-4xl p-10 border border-slate-100 shadow-sm">
                                    <h3 className="font-black text-lg text-navy-900 mb-8 uppercase tracking-widest">Detil Analisis Per Skill</h3>
                                    <div className="space-y-4">
                                        {skill_gap.map((item, i) => (
                                            <div key={i} className="p-5 rounded-3xl border border-slate-50 flex items-center justify-between group hover:border-teal-100 transition-all">
                                                <div className="flex items-center gap-5">
                                                    <div className={`w-3 h-3 rounded-full shadow-inner ${
                                                        item.status === 'completed' ? 'bg-teal-500 shadow-teal-500/50' : 
                                                        item.status === 'developing' ? 'bg-amber-500 shadow-amber-500/50' : 'bg-rose-500 shadow-rose-500/50'
                                                    }`}></div>
                                                    <div>
                                                        <p className="text-sm font-black text-navy-900 uppercase tracking-tight">{item.skill}</p>
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Demand: {item.market_demand}%</span>
                                                            <span className={`text-[10px] font-black uppercase tracking-widest ${item.trend === 'rising' ? 'text-teal-600' : 'text-slate-400'}`}>
                                                                {item.trend === 'rising' ? '↑ Rising' : '→ Stable'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className={`text-[10px] px-3 py-1.5 rounded-xl font-black uppercase tracking-widest ${
                                                    item.status === 'completed' ? 'bg-teal-50 text-teal-600' : 
                                                    item.status === 'developing' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                                                }`}>
                                                    {item.status.toUpperCase()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'roadmap' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 h-[650px] border border-slate-200 rounded-4xl overflow-hidden bg-slate-50 relative shadow-inner">
                            <ReactFlow nodes={nodes} edges={edges} fitView>
                                <Background color="#cbd5e1" variant={BackgroundVariant.Dots} gap={24} size={1.5} />
                                <Controls style={{ borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                            </ReactFlow>
                            <div className="absolute top-8 left-8 max-w-sm space-y-4 pointer-events-none">
                                <div className="bg-white/95 backdrop-blur-xl p-8 rounded-4xl border border-white shadow-2xl pointer-events-auto text-left relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-2 h-full bg-teal-500 opacity-20 group-hover:opacity-100 transition-opacity"></div>
                                    <p className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em] mb-2">Karir Target</p>
                                    <h4 className="font-black text-navy-900 text-2xl mb-4 leading-none tracking-tight">{profile.career_target}</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed font-medium">Ini adalah learning path yang dibuat AI berdasarkan cv kamu. Tap milestone untuk melihat detail project.</p>
                                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4">
                                        <div className="flex -space-x-2">
                                            {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white shadow-sm"></div>)}
                                        </div>
                                        <span className="text-[10px] font-black text-navy-900 uppercase tracking-widest">12 Mahasiswa mengikuti path ini</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'market' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 text-left">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                <div className="lg:col-span-8 space-y-4">
                                    <div className="flex bg-white p-4 rounded-4xl border border-slate-100 shadow-sm gap-4 mb-6 sticky top-0 z-10 backdrop-blur-xl">
                                        <div className="flex-1 flex items-center gap-4 px-4 bg-slate-50 rounded-2xl border border-slate-50 focus-within:border-teal-500/50 transition-colors group">
                                            <Search className="w-5 h-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                                            <input type="text" placeholder="Cari posisi kerja (misal: React Developer)..." className="flex-1 bg-transparent border-none text-sm font-black uppercase tracking-tight focus:ring-0 placeholder:text-slate-300" disabled />
                                        </div>
                                        <div className="w-px h-8 bg-slate-100 my-auto"></div>
                                        <button className="flex items-center gap-3 px-6 py-3 bg-navy-900 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-teal-600 transition-all shadow-lg shadow-navy-900/10"><Filter className="w-4 h-4" /> Filter</button>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        {recommended_jobs.map((job, i) => (
                                            <div key={i} className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-teal-500 transition-all cursor-pointer relative overflow-hidden">
                                                <div className="absolute top-0 left-0 w-1.5 h-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-all"></div>
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-navy-900 group-hover:bg-teal-50 shadow-inner transition-all transform group-hover:rotate-6 group-hover:scale-110">
                                                        <Briefcase className="w-7 h-7 group-hover:text-teal-600" />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-black text-navy-900 text-xl leading-none mb-2 tracking-tight">{job.title}</h5>
                                                        <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                            <span className="flex items-center gap-1.5"><Info className="w-3.5 h-3.5 text-slate-300" /> {job.company}</span>
                                                            <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                                                            <span className="text-teal-600">Full-Time</span>
                                                            <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                                                            <span>Jakarta Raya</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center md:items-end justify-between md:flex-col gap-3 pt-6 md:pt-0 border-t md:border-t-0 border-slate-50">
                                                    <span className="px-4 py-2 bg-teal-50 text-teal-600 text-[10px] font-black rounded-xl uppercase tracking-widest shadow-sm ring-1 ring-teal-500/10">{job.match}% MATCH</span>
                                                    <span className="text-sm font-black text-navy-900 tracking-tight">{job.salary}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="lg:col-span-4 space-y-6 text-left">
                                    <div className="bg-white rounded-4xl p-10 border border-slate-100 shadow-sm relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-2 h-full bg-amber-500 opacity-20 group-hover:opacity-100 transition-opacity"></div>
                                        <h4 className="text-xs font-black text-navy-900 mb-10 uppercase tracking-[0.2em] flex items-center gap-3">
                                            <Zap className="text-amber-500 w-5 h-5 group-hover:scale-125 transition-transform" />
                                            Market Intelligence
                                        </h4>
                                        <div className="space-y-6">
                                            {[
                                                { skill: 'TypeScript', trend: '↑ 40.2%', desc: 'Standar baku startup tier-1 2026' },
                                                { skill: 'Next.js 16', trend: '↑ 28.5%', desc: 'Adopsi App Router & Server Actions' },
                                                { skill: 'Tailwind CSS v4', trend: '↑ 22.1%', desc: 'Utility-first standar industri' },
                                                { skill: 'Vitest / Jest', trend: '↑ 15.8%', desc: 'Testing menjadi skill wajib' },
                                            ].map((s, i) => (
                                                <div key={i} className="border-b border-slate-50 pb-5 last:border-0 last:pb-0 group/item">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-black text-navy-900 text-sm tracking-tight group-hover/item:text-teal-600 transition-colors lowercase first-letter:uppercase">{s.skill}</span>
                                                        <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md shadow-sm">{s.trend}</span>
                                                    </div>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{s.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-10 pt-8 border-t border-slate-50">
                                            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest leading-relaxed">Intelijen pasar diekstrak dari 2.847 lowongan aktif dalam 24 jam terakhir.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </PublicLayout>
    );
}
