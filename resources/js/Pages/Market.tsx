import React, { useState, useMemo } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Search, 
    MapPin, 
    ArrowUpRight, 
    Building2, 
    CheckCircle2,
    Target,
    TrendingUp,
    Zap,
    Globe,
    AlertCircle,
    Info,
    ArrowRight,
    CircleDashed,
    Sparkles
} from 'lucide-react';

export default function Market({ jobs, trendingSkills, stats, profile, outlook }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterLocation, setFilterLocation] = useState('All');

    // Data filtering
    const filteredJobs = useMemo(() => {
        return (jobs || []).filter((job) => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                 job.company.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLocation = filterLocation === 'All' || job.location === filterLocation;
            return matchesSearch && matchesLocation;
        });
    }, [jobs, searchTerm, filterLocation]);

    const staticLocations = ['All', 'Jakarta', 'Bandung', 'Surabaya', 'Remote', 'Indonesia'];
    const locations = Array.from(new Set([...staticLocations, ...(jobs || []).map(j => j.location)]));

    const handleSetTarget = (targetTitle) => {
        router.post(route('market.set-target'), { target: targetTitle }, {
            onSuccess: () => {
                // Berhasil diset, user akan diredirect oleh controller
            }
        });
    };

    return (
        <AppLayout header="Market Intelligence">
            <Head title="Standar Kompetensi Industri | Kembangin" />

            <div className="max-w-6xl mx-auto pt-4 pb-20 px-4">
                
                {/* 1. Educational Disclaimer Banner */}
                {/* <div className="mb-10 bg-amber-50 border border-amber-100 p-6 rounded-lg flex items-start gap-4 shadow-sm">
                    <div className="bg-amber-100 text-amber-600 p-3 rounded-lg flex-shrink-0">
                        <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-amber-900 tracking-tight mb-1">Dashboard Monitoring Kurikulum</h3>
                        <p className="text-sm font-bold text-amber-800/80 leading-relaxed">
                            Data ini ditarik secara real-time dari industri untuk membantu Anda menentukan target belajar (benchmark kurikulum), bukan untuk dilamar saat ini. Fokuslah pada pemenuhan gap kompetensi.
                        </p>
                    </div>
                </div> */}

                {/* 2. Page Header Section */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-[#1A1A2E] leading-tight mb-3">
                            Standar Kompetensi <br/> Industri <span className="text-indigo-600">Real-Time</span>
                        </h1>
                        <p className="text-base font-bold text-slate-400 max-w-2xl leading-relaxed">
                            Sinkronisasi kurikulum belajar Anda dengan kebutuhan pasar kerja global. Gunakan data ini sebagai parameter target penguasaan keahlian.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-lg border border-slate-100 shadow-sm">
                         <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                            <Globe className="w-5 h-5 text-indigo-600" />
                         </div>
                         <div>
                            <p className="text-[10px] font-black text-slate-400 leading-none mb-1">Total Intel</p>
                            <p className="text-xl font-black text-[#1A1A2E] leading-none">{stats?.total_jobs || 0}</p>
                         </div>
                    </div>
                </div>

                {/* 3. Trending Skills Hero Widget */}
                <div className="mb-12 bg-indigo-900 rounded-lg p-8 md:p-10 shadow-2xl shadow-indigo-900/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-lg blur-3xl -mr-20 -mt-20"></div>
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-4">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white/10 border border-white/20 text-teal-400 text-[10px] font-black mb-6">
                                <Sparkles className="w-3.5 h-3.5" />
                                Trending Minggu Ini
                            </div>
                            <h2 className="text-3xl font-black text-white leading-tight mb-4">
                                Skill Paling <br/> Dibutuhkan
                            </h2>
                            <p className="text-indigo-100/70 font-bold text-sm leading-relaxed mb-8">
                                Keahlian yang paling banyak diminta industri saat ini berdasarkan ribuan titik data lowongan.
                            </p>
                        </div>
                        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                            {trendingSkills?.slice(0, 6).map((skill, i) => (
                                <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-lg hover:bg-white/10 transition-colors">
                                    <div className="flex justify-between items-start mb-3">
                                        <p className="text-[9px] font-black text-teal-400">{skill.trend === 'rising' ? '📈 Rising' : '💎 Core'}</p>
                                        <Zap className="w-3.5 h-3.5 text-indigo-300" />
                                    </div>
                                    <h4 className="text-base font-black text-white mb-4 truncate">{skill.skill}</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[9px] font-black text-indigo-300">
                                            <span>Demand Intensity</span>
                                            <span>{skill.demand}%</span>
                                        </div>
                                        <div className="h-1.5 bg-indigo-950 rounded-lg overflow-hidden">
                                            <div 
                                                className="h-full bg-teal-400 rounded-lg" 
                                                style={{ width: `${skill.demand}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left: Intelligence Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white rounded-lg p-8 border border-slate-100 shadow-sm">
                            <h4 className="text-base font-black text-[#1A1A2E] mb-6 flex items-center gap-2 tracking-tight">
                                <TrendingUp className="w-5 h-5 text-teal-500" />
                                Market Sentiment
                            </h4>
                            <div className="bg-slate-50 p-6 rounded-lg border border-slate-50 italic text-sm font-bold text-slate-500 leading-relaxed mb-6">
                                "{outlook?.summary || 'Gunakan standar ini untuk memvalidasi roadmap belajar Anda agar sesuai dengan kebutuhan pasar kerja saat ini.'}"
                            </div>
                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-slate-400">Future-Proof Targets</p>
                                <div className="flex flex-wrap gap-2">
                                    {outlook?.future_skills?.map(s => (
                                        <span key={s} className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-[10px] font-black tracking-tight border border-indigo-100">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-8 border border-slate-100 shadow-sm">
                             <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-lg bg-indigo-900 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                                    <Target className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-base font-black text-[#1A1A2E] leading-none mb-1">Target Kurikulum</h4>
                                    <p className="text-[10px] font-bold text-slate-400">Benchmark Mode</p>
                                </div>
                             </div>
                             <p className="text-[13px] text-slate-500 font-bold leading-relaxed">
                                Setiap standar di panel kanan ditarik dari kebutuhan perusahaan global secara real-time.
                             </p>
                        </div>
                    </div>

                    {/* Right: Benchmark Cards Feed */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Filter Bar */}
                        <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col md:flex-row gap-3 items-center sticky top-24 z-20">
                            <div className="flex-1 relative w-full">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input 
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Cari target kompetensi..."
                                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-lg text-sm font-bold text-[#1A1A2E] focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
                                />
                            </div>
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <select 
                                    value={filterLocation}
                                    onChange={(e) => setFilterLocation(e.target.value)}
                                    className="flex-1 md:flex-none pl-5 pr-10 py-4 bg-indigo-50/50 border-none rounded-lg text-xs font-black text-indigo-900 cursor-pointer outline-none appearance-none"
                                >
                                    {locations.map(l => <option key={l} value={l}>{l}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Target Standard Cards */}
                        <div className="space-y-4 max-h-[850px] overflow-y-auto pr-2 custom-scrollbar">
                            {filteredJobs.length === 0 ? (
                                <div className="text-center py-24 bg-white rounded-lg border-2 border-dashed border-slate-100">
                                    <div className="w-20 h-20 bg-slate-50 rounded-lg flex items-center justify-center mx-auto mb-6">
                                        <Search className="w-8 h-8 text-slate-200" />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-300 tracking-tight">Data Tidak Ditemukan</h3>
                                </div>
                            ) : (
                                filteredJobs.map((job) => (
                                    <div key={job.id} className="group bg-white p-8 rounded-lg border border-slate-50 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all mb-4 last:mb-0">
                                        
                                        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                                        <Target className="w-5 h-5" />
                                                    </div>
                                                    <h3 className="text-xl font-black text-[#1A1A2E] group-hover:text-indigo-600 transition-colors leading-tight">{job.title}</h3>
                                                </div>
                                                <div className="flex flex-wrap gap-5 items-center">
                                                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 tracking-tight">
                                                        <Building2 className="w-4 h-4 text-indigo-400" /> {job.company}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 tracking-tight">
                                                        <MapPin className="w-4 h-4 text-indigo-400" /> {job.location}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end gap-2">
                                                <p className="text-[10px] font-black text-slate-400">Readiness Level</p>
                                                <div className={`px-5 py-3 rounded-lg text-xl font-black shadow-sm ${
                                                    job.match_score >= 80 ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                                                    job.match_score >= 50 ? 'bg-amber-50 text-amber-600 border border-amber-100' : 
                                                    'bg-slate-50 text-slate-400 border border-slate-100'
                                                }`}>
                                                    {job.match_score}% Match
                                                </div>
                                            </div>
                                        </div>

                                        {/* Skills Comparison */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pt-8 border-t border-slate-50">
                                            <div>
                                                <p className="text-[10px] font-black text-emerald-600 mb-4 flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4" /> Keahlian yang Anda Punya
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {job.skills_required?.filter(skill => 
                                                        profile?.skills?.some(s => s.name.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(s.name.toLowerCase()))
                                                    ).map(skill => (
                                                        <span key={skill} className="bg-indigo-900 text-white px-4 py-1.5 rounded-lg text-[10px] font-bold">
                                                            {skill}
                                                        </span>
                                                    )) || <span className="text-[10px] font-bold text-slate-300">Belum ada kecocokan</span>}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-rose-500 mb-4 flex items-center gap-2">
                                                    <CircleDashed className="w-4 h-4" /> Keahlian Harus Dipelajari
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {job.skills_required?.filter(skill => 
                                                        !profile?.skills?.some(s => s.name.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(s.name.toLowerCase()))
                                                    ).map(skill => (
                                                        <span key={skill} className="bg-rose-50 text-rose-600 px-4 py-1.5 rounded-lg text-[10px] font-bold border border-rose-100">
                                                            {skill}
                                                        </span>
                                                    )) || <span className="text-[10px] font-bold text-slate-300">Sudah memenuhi semua</span>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-6 border-t border-slate-50/50">
                                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400">
                                                <Info className="w-4 h-4 text-indigo-400" /> Dashboard Benchmark v2.0
                                            </div>
                                            <button 
                                                onClick={() => handleSetTarget(job.title)}
                                                className="w-full sm:w-auto bg-indigo-900 text-white px-8 py-4 rounded-lg font-black text-sm flex items-center justify-center gap-3 hover:bg-indigo-800 transition-all shadow-xl shadow-indigo-900/10 active:scale-[0.98]"
                                            >
                                                Jadikan Target Belajar <ArrowRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
