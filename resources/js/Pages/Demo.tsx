import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer,
    Radar, RadarChart, PolarGrid, PolarAngleAxis as RadarAngleAxis, Legend, Tooltip
} from 'recharts';
import { 
    TrendingUp, LayoutDashboard, BarChart3, Map as MapIcon, 
    TrendingUp as MarketIcon, User, LogIn, Sparkles, Target, 
    CheckCircle2, Briefcase, Zap, AlertTriangle, ArrowRight, X, Info
} from 'lucide-react';

const SidebarItem = ({ name, icon: Icon, active, onClick }: any) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full ${
            active 
            ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20' 
            : 'text-navy-100 hover:bg-navy-800 hover:text-white'
        }`}
    >
        <Icon className="w-5 h-5" />
        <span className="font-medium text-sm">{name}</span>
    </button>
);

export default function Demo({ profile, score, marketStats, jobs, trendingSkills }: any) {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const chartData = [
        { skill: 'React', industri: 89, saya: 40 },
        { skill: 'TS', industri: 82, saya: 30 },
        { skill: 'Tailwind', industri: 74, saya: 60 },
        { skill: 'API', industri: 68, saya: 50 },
        { skill: 'Git', industri: 94, saya: 70 },
        { skill: 'Testing', industri: 51, saya: 20 },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <Head title="Mode Demo | Career-Sync Academy" />

            {/* Sidebar Desktop */}
            <aside className="hidden md:flex flex-col w-64 bg-navy-900 text-white fixed h-full z-20">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                        <TrendingUp className="text-white w-6 h-6" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">CareerSync</span>
                </div>

                <nav className="flex-1 px-4 mt-6 space-y-2">
                    <SidebarItem name="Dashboard" icon={LayoutDashboard} active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
                    <SidebarItem name="Analisis Skill" icon={BarChart3} active={activeTab === 'analysis'} onClick={() => setActiveTab('analysis')} />
                    <SidebarItem name="Market Intel" icon={MarketIcon} active={activeTab === 'market'} onClick={() => setActiveTab('market')} />
                </nav>

                <div className="p-4 mt-auto border-t border-navy-800">
                    <div className="bg-navy-800/50 p-4 rounded-2xl mb-4 text-center">
                        <p className="text-[10px] uppercase font-black text-navy-400 mb-2">Login untuk hasil nyata</p>
                        <Link href={route('register')} className="block w-full py-2 bg-teal-500 rounded-xl text-xs font-black shadow-lg shadow-teal-500/20">DAFTAR SEKARANG</Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col md:pl-64">
                {/* Banner Mode Demo */}
                <div className="bg-navy-900 text-white px-8 py-3 flex items-center justify-between z-30 sticky top-0 md:relative">
                    <div className="flex items-center gap-2">
                         <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                         <span className="text-xs font-black uppercase tracking-widest">Mode Demo</span>
                    </div>
                    <Link href={route('register')} className="text-xs font-bold text-teal-400 hover:text-white flex items-center gap-1">
                        Analisis CV Kamu Sekarang <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>

                {/* Header Desktop */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 max-md:hidden">
                    <h2 className="text-2xl font-black text-navy-900 capitalize">{activeTab} Demo</h2>
                    <div className="flex items-center gap-3">
                         <span className="text-slate-400 text-sm font-bold">Halo, {profile.name}!</span>
                         <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                             <User className="w-5 h-5 text-navy-800" />
                         </div>
                    </div>
                </header>

                <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
                    {activeTab === 'dashboard' && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col items-center justify-center overflow-hidden">
                                     <h3 className="font-black text-navy-900 text-sm uppercase tracking-[0.2em] mb-4">Work Readiness</h3>
                                     <div className="relative w-full h-[180px] flex items-center justify-center">
                                         <ResponsiveContainer width="100%" height="100%">
                                             <RadialBarChart innerRadius="70%" outerRadius="100%" startAngle={180} endAngle={0} data={[{ value: score.score, fill: '#0d9488' }]}>
                                                 <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                                                 <RadialBar background={{ fill: '#f1f5f9' }} dataKey="value" cornerRadius={12} />
                                             </RadialBarChart>
                                         </ResponsiveContainer>
                                         <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-8">
                                             <span className="text-6xl font-black text-navy-900">{score.score}%</span>
                                         </div>
                                     </div>
                                     <div className="mt-2 px-6 py-2 bg-teal-50 text-teal-600 rounded-full font-black text-[10px] uppercase tracking-widest">{score.category}</div>
                                </div>
                                <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                                     <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-col justify-center">
                                         <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Target</p>
                                         <h4 className="text-xl font-black text-navy-900">{profile.career_target}</h4>
                                     </div>
                                     <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-col justify-center">
                                         <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Skills</p>
                                         <h4 className="text-xl font-black text-navy-900">{profile.skills.length} Dimiliki</h4>
                                     </div>
                                     <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-col justify-center max-md:col-span-2">
                                         <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Pasar</p>
                                         <h4 className="text-xl font-black text-navy-900">{marketStats.total_jobs} Lowongan</h4>
                                     </div>
                                </div>
                             </div>

                             <div className="grid lg:grid-cols-2 gap-8">
                                 <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100">
                                     <h4 className="text-xl font-black text-navy-900 mb-6 px-2">Rekomendasi Karir</h4>
                                     <div className="space-y-4">
                                         {jobs.map((job: any, i: number) => (
                                             <div key={i} className="p-5 border border-slate-100 rounded-2xl flex items-center justify-between hover:border-teal-500 transition-all cursor-pointer group">
                                                 <div className="flex items-center gap-4">
                                                     <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-navy-900 font-black group-hover:bg-teal-50 transition-colors uppercase">
                                                         {job.company.charAt(0)}
                                                     </div>
                                                     <div>
                                                         <h6 className="font-black text-navy-900 text-sm">{job.title}</h6>
                                                         <p className="text-xs font-bold text-slate-400">{job.company}</p>
                                                     </div>
                                                 </div>
                                                 <span className="text-[10px] font-black p-2 bg-teal-50 text-teal-600 rounded-lg">89% Match</span>
                                             </div>
                                         ))}
                                     </div>
                                 </div>
                                 <div className="bg-navy-900 text-white rounded-[2.5rem] p-8">
                                     <h4 className="text-xl font-black mb-8">Trending Skills</h4>
                                     <div className="space-y-6">
                                         {trendingSkills.slice(0, 5).map((s: any, i: number) => (
                                             <div key={i} className="flex items-center justify-between">
                                                 <div className="flex items-center gap-3">
                                                     <span className="text-navy-400 font-black">0{i+1}</span>
                                                     <span className="font-bold text-sm">{s.skill}</span>
                                                 </div>
                                                 <div className="flex items-center gap-2 text-teal-400">
                                                      <TrendingUp className="w-4 h-4" />
                                                      <span className="text-xs font-black">{s.change}%</span>
                                                 </div>
                                             </div>
                                         ))}
                                     </div>
                                 </div>
                             </div>
                        </div>
                    )}

                    {activeTab === 'analysis' && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                             <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm overflow-hidden text-center max-w-2xl mx-auto">
                                <h3 className="text-2xl font-black text-navy-900 mb-2">Visualisasi Analisis Skill</h3>
                                <p className="text-slate-500 text-sm mb-10">Bandingkan kemampuan {profile.name} vs Standar Industri</p>
                                
                                <div className="h-[350px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart data={chartData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                                            <PolarGrid />
                                            <RadarAngleAxis dataKey="skill" tick={{ fontSize: 10, fontWeight: 700 }} />
                                            <Radar name="Industri" dataKey="industri" stroke="#0f172a" fill="#0f172a" fillOpacity={0.05} strokeWidth={2} strokeDasharray="5 5" />
                                            <Radar name="Budi" dataKey="saya" stroke="#0d9488" fill="#0d9488" fillOpacity={0.3} strokeWidth={2} />
                                            <Legend verticalAlign="bottom" />
                                            <Tooltip />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                             </div>

                             <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                                 <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                                      <h4 className="text-xl font-black text-navy-900">Skill Gap Profile</h4>
                                      <span className="px-4 py-1.5 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest">3 Gap Terdeteksi</span>
                                 </div>
                                 <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                            <tr>
                                                <th className="px-8 py-5">Skill</th>
                                                <th className="px-8 py-5">Level</th>
                                                <th className="px-8 py-5">Pasar</th>
                                                <th className="px-8 py-5">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {[
                                                { name: 'React.js', user: 40, market: 89, status: 'Critical' },
                                                { name: 'TypeScript', user: 30, market: 82, status: 'Developing' },
                                                { name: 'Tailwind CSS', user: 60, market: 74, status: 'Good' },
                                                { name: 'REST API', user: 50, market: 68, status: 'Developing' },
                                            ].map((s, i) => (
                                                <tr key={i} className="text-sm">
                                                    <td className="px-8 py-5 font-black text-navy-900">{s.name}</td>
                                                    <td className="px-8 py-5 font-bold text-slate-400">{s.user}%</td>
                                                    <td className="px-8 py-5 font-bold text-slate-400">{s.market}%</td>
                                                    <td className="px-8 py-5">
                                                        <span className={`px-3 py-1 rounded-lg font-black text-[10px] uppercase ${
                                                            s.status === 'Critical' ? 'bg-red-50 text-red-600' : 
                                                            s.status === 'Developing' ? 'bg-amber-50 text-amber-600' : 
                                                            'bg-teal-50 text-teal-600'
                                                        }`}>
                                                            {s.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                 </div>
                             </div>
                        </div>
                    )}

                    {activeTab === 'market' && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-wrap gap-4">
                                {['Jakarta', 'Bandung', 'Remote', 'Surabaya'].map(l => (
                                    <span key={l} className="px-5 py-2.5 bg-slate-50 rounded-xl text-xs font-black text-navy-900 border border-slate-100 cursor-pointer hover:border-teal-500 transition-all">{l}</span>
                                ))}
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {jobs.map((job: any, i: number) => (
                                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-teal-500 transition-all group">
                                        <div className="flex items-center justify-between mb-6">
                                             <div className="w-12 h-12 bg-navy-900 text-white rounded-2xl flex items-center justify-center font-black">{job.company.charAt(0)}</div>
                                             <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-3 py-1 rounded-full">{job.posted_days_ago} hari lalu</span>
                                        </div>
                                        <h5 className="font-black text-navy-900 text-xl leading-tight mb-2">{job.title}</h5>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">{job.company} • {job.location}</p>
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {job.skills_required.slice(0, 3).map((s: string) => (
                                                <span key={s} className="px-2 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold rounded-lg text-slate-500">{s}</span>
                                            ))}
                                        </div>
                                        <button className="w-full py-4 bg-slate-50 text-navy-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] group-hover:bg-navy-900 group-hover:text-white transition-all">
                                            Detail Lowongan
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
