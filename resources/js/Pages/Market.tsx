import React, { useState, useMemo } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    Tooltip, 
    Cell, 
    ResponsiveContainer,
} from 'recharts';
import { 
    Search, 
    MapPin, 
    Briefcase, 
    ArrowUpRight, 
    Building2, 
    CheckCircle2,
    Target,
    TrendingUp,
    Sparkles,
    Zap,
    Globe,
    Building
} from 'lucide-react';

export default function Market({ jobs, trendingSkills, stats, profile, isLiveData, apiDebug, outlook, topCompanies }: any) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterLocation, setFilterLocation] = useState('All');
    const [showMatchedOnly, setShowMatchedOnly] = useState(false);
    const [showDebug, setShowDebug] = useState(!!apiDebug);

    const filteredJobs = useMemo(() => {
        return jobs.filter((job: any) => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                 job.company.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLocation = filterLocation === 'All' || job.location === filterLocation;
            const matchesMatched = !showMatchedOnly || (job.match_score || 0) >= 60;
            
            return matchesSearch && matchesLocation && matchesMatched;
        });
    }, [jobs, searchTerm, filterLocation, showMatchedOnly]);

    const staticLocations = ['All', 'Jakarta', 'Bandung', 'Surabaya', 'Remote', 'Indonesia'];
    const locations = Array.from(new Set([...staticLocations, ...jobs.map((j: any) => j.location)]));

    return (
        <AppLayout header="Market Intelligence">
            <Head title="Market Intelligence | CareerSync" />

            {/* --- Hero: AI Career Outlook --- */}
            <div className="relative mb-10 overflow-hidden rounded-[2.5rem] bg-indigo-900 text-white p-8 md:p-12 border border-indigo-800 shadow-2xl shadow-indigo-900/20">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-indigo-500/10 to-transparent pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-teal-400 text-[10px] font-black uppercase tracking-widest mb-6">
                            <Sparkles className="w-3.5 h-3.5" />
                            AI Market Sentiment: {outlook?.sentiment || 'Stable'}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                            Market Insight for <br/>
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-indigo-200 uppercase">
                                {isLiveData ? (is_array(profile?.career_target) ? profile.career_target[0] : profile?.career_target) : 'Modern Tech Roles'}
                            </span>
                        </h2>
                        <p className="text-indigo-100/80 text-lg font-medium leading-relaxed max-w-2xl">
                            {outlook?.summary || 'Kami menganalisis ribuan lowongan kerja secara real-time untuk memberikan gambaran akurat mengenai kebutuhan industri saat ini.'}
                        </p>
                        
                        <div className="mt-8 flex flex-wrap gap-3">
                            {outlook?.future_skills?.map((skill: string) => (
                                <span key={skill} className="px-4 py-2 rounded-xl bg-indigo-800/50 border border-indigo-700 text-indigo-200 text-xs font-bold flex items-center gap-2">
                                    <Zap className="w-3.5 h-3.5 text-teal-400" />
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    <div className="lg:col-span-5 flex justify-center lg:justify-end">
                        <div className="w-full max-w-[320px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl">
                            <h5 className="text-xs font-black text-indigo-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Globe className="w-4 h-4" /> Market Live Stats
                            </h5>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-[10px] font-bold text-indigo-400 uppercase mb-1">
                                        <span>Growth Potential</span>
                                        <span>High</span>
                                    </div>
                                    <div className="h-2 bg-indigo-950 rounded-full overflow-hidden">
                                        <div className="h-full bg-linear-to-r from-teal-500 to-indigo-400 w-[85%] rounded-full shadow-[0_0_10px_rgba(20,184,166,0.5)]"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[10px] font-bold text-indigo-400 uppercase mb-1">
                                        <span>Candidate Competition</span>
                                        <span>Moderate</span>
                                    </div>
                                    <div className="h-2 bg-indigo-950 rounded-full overflow-hidden">
                                        <div className="h-full bg-linear-to-r from-teal-500 to-indigo-400 w-[60%] rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[20px] font-black text-white leading-none">{stats.total_jobs}</p>
                                    <p className="text-[9px] font-bold text-indigo-400 uppercase mt-1">Openings</p>
                                </div>
                                <div>
                                    <p className="text-[20px] font-black text-teal-400 leading-none">+{stats.companies_hiring}</p>
                                    <p className="text-[9px] font-bold text-indigo-400 uppercase mt-1">New Companies</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Debug Console --- */}
            {apiDebug && showDebug && (
                <div className="mb-8 p-6 bg-slate-900 rounded-3xl text-xs font-mono text-teal-400 border border-teal-900/50 relative overflow-hidden">
                    <button onClick={() => setShowDebug(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white">✕</button>
                    <h5 className="text-teal-500 font-bold mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                        API DEBUG CONSOLE
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <p className="text-slate-500 mb-1">API Endpoint</p>
                            <p className="text-white truncate">{apiDebug.base_url}</p>
                        </div>
                        <div>
                            <p className="text-slate-500 mb-1">API Key Status</p>
                            <p className={apiDebug.has_api_key ? 'text-teal-400' : 'text-red-400'}>
                                {apiDebug.has_api_key ? `Active (${apiDebug.api_key_masked})` : 'Missing'}
                            </p>
                        </div>
                        <div>
                            <p className="text-slate-500 mb-1">HTTP Status</p>
                            <p className={apiDebug.last_http_code === 200 ? 'text-teal-400' : 'text-amber-400'}>
                                {apiDebug.last_http_code || '---'}
                            </p>
                        </div>
                        <div>
                            <p className="text-slate-500 mb-1">Fetch Status</p>
                            <p className={apiDebug.is_success ? 'text-teal-400' : 'text-red-400'}>
                                {apiDebug.is_success ? 'SUCCESS' : 'FAILED'}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* --- Left Column: Intelligence Panels --- */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Top Hiring Companies */}
                    <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                        <h4 className="text-lg font-black text-indigo-900 mb-6 flex items-center gap-2 uppercase tracking-tight">
                            <Building className="w-5 h-5 text-indigo-600" />
                            Active Recruiters
                        </h4>
                        <div className="space-y-4">
                            {topCompanies?.map((comp: any, i: number) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 p-2 shadow-xs group-hover:scale-110 transition-transform">
                                        <img src={comp.logo} alt={comp.name} className="w-full h-full object-contain rounded-lg" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-indigo-900 truncate uppercase tracking-tight">{comp.name}</p>
                                        <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest">{comp.count} active roles</p>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skill Demand Chart */}
                    <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                        <h4 className="text-lg font-black text-indigo-900 mb-8 flex items-center gap-2 uppercase tracking-tight">
                             <TrendingUp className="text-teal-500 w-5 h-5" />
                             Skill Intensity
                        </h4>

                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={trendingSkills} layout="vertical" margin={{ left: -20, right: 20 }}>
                                    <XAxis type="number" hide />
                                    <YAxis 
                                        type="category" 
                                        dataKey="skill" 
                                        width={80} 
                                        tick={{ fontSize: 9, fontWeight: 800, fill: '#64748b' }} 
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip 
                                        cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                        itemStyle={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}
                                        formatter={(v: any) => [`${v}%`, 'Demand']} 
                                    />
                                    <Bar dataKey="demand" radius={[0, 10, 10, 0]} barSize={16}>
                                        {trendingSkills.map((entry: any, index: number) => (
                                            <Cell 
                                                key={`cell-${index}`} 
                                                fill={entry.trend === 'rising' ? '#14b8a6' : '#1e1b4b'} 
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        
                        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 pt-6 border-t border-slate-100 justify-center">
                             <div className="flex items-center gap-2">
                                 <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                                 <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Growing</span>
                             </div>
                             <div className="flex items-center gap-2">
                                 <div className="w-2 h-2 bg-indigo-950 rounded-full"></div>
                                 <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Core</span>
                             </div>
                        </div>
                    </div>
                </div>

                {/* --- Right Column: Job Market Feed --- */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Filter Bar */}
                    <div className="sticky top-20 z-20 bg-white/80 backdrop-blur-xl p-4 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col md:flex-row gap-4 items-center">
                        <div className="w-full md:flex-1 relative">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input 
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Cari posisi, perusahaan, atau skill..."
                                className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 text-sm font-bold text-indigo-950 placeholder:text-slate-400"
                            />
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative group w-full md:w-48">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-600 w-4 h-4 z-10" />
                                <select 
                                    value={filterLocation}
                                    onChange={(e) => setFilterLocation(e.target.value)}
                                    className="w-full pl-10 pr-4 py-4 bg-indigo-50/50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 text-xs font-black text-indigo-900 uppercase tracking-widest appearance-none cursor-pointer"
                                >
                                    {locations.map(l => <option key={l} value={l}>{l}</option>)}
                                </select>
                            </div>

                            <button 
                                onClick={() => setShowMatchedOnly(!showMatchedOnly)}
                                className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all flex items-center gap-2 ${
                                    showMatchedOnly 
                                    ? 'bg-indigo-900 text-white shadow-lg shadow-indigo-900/20' 
                                    : 'bg-white text-indigo-900 border border-slate-100'
                                }`}
                            >
                                <Target className={`w-4 h-4 ${showMatchedOnly ? 'text-teal-400' : 'text-indigo-400'}`} />
                                Smart Match
                            </button>
                        </div>
                    </div>

                    {/* Listings */}
                    <div className="space-y-4">
                        {filteredJobs.length === 0 ? (
                            <div className="text-center py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100 flex flex-col items-center">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                    <Search className="w-8 h-8 text-slate-300" />
                                </div>
                                <h3 className="text-xl font-black text-indigo-900 mb-2">No Matching Intel Found</h3>
                                <p className="text-slate-400 text-sm font-medium">Coba sesuaikan pencarian atau filter lokasi Anda.</p>
                            </div>
                        ) : (
                            filteredJobs.map((job: any) => (
                                <div key={job.id} className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-indigo-200 transition-all hover:shadow-2xl hover:shadow-indigo-500/5 cursor-pointer relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-teal-500/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                                        <div className="flex items-start gap-6">
                                            <div className="w-20 h-20 bg-indigo-50/50 rounded-[1.5rem] border border-indigo-100 flex items-center justify-center transform transition-transform group-hover:scale-105 group-hover:bg-indigo-100 shadow-sm overflow-hidden">
                                                <img src={`https://ui-avatars.com/api/?name=${urlencode(job.company)}&background=random`} alt={job.company} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h5 className="text-xl font-black text-indigo-950 group-hover:text-indigo-600 transition-colors leading-tight">{job.title}</h5>
                                                    <span className="px-3 py-1 rounded-full bg-slate-100 text-[9px] font-black text-slate-500 uppercase tracking-widest">{job.type || 'Fulltime'}</span>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                                                    <span className="text-sm font-bold text-slate-600 flex items-center gap-1.5 uppercase tracking-tight">
                                                        <Building2 className="w-4 h-4 text-indigo-400" />
                                                        {job.company}
                                                    </span>
                                                    <span className="text-sm font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-tight">
                                                        <MapPin className="w-4 h-4 text-indigo-400" />
                                                        {job.location}
                                                    </span>
                                                    <span className="text-xs font-black text-teal-600 uppercase tracking-widest flex items-center gap-1.5 bg-teal-50 px-3 py-1 rounded-lg">
                                                        <Zap className="w-3.5 h-3.5" />
                                                        IDR {(job.salary_min / 1000000).toFixed(0)}-{(job.salary_max / 1000000).toFixed(0)}jt
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 self-end md:self-start">
                                            <div className="flex flex-col items-end">
                                                <div className={`px-4 py-2 rounded-2xl text-[10px] font-black flex items-center gap-2 border-2 ${
                                                    job.match_score >= 80 ? 'bg-teal-50 text-teal-600 border-teal-100' : 
                                                    job.match_score >= 50 ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                                                    'bg-slate-50 text-slate-400 border-slate-100'
                                                }`}>
                                                    <Target className="w-3.5 h-3.5" />
                                                    {job.match_score}% MATCH
                                                </div>
                                            </div>
                                            <a href={job.apply_url || '#'} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-indigo-900 text-white rounded-2xl flex items-center justify-center hover:bg-teal-500 transition-all shadow-xl shadow-indigo-900/10 active:scale-95 group/btn">
                                                 <ArrowUpRight className="w-6 h-6 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex flex-wrap gap-2">
                                        {job.skills_required?.map((skill: string) => {
                                            const hasSkill = profile?.skills?.some((s: any) => 
                                                s.name.toLowerCase().includes(skill.toLowerCase()) || 
                                                skill.toLowerCase().includes(s.name.toLowerCase())
                                            );
                                            return (
                                                <span 
                                                     key={skill} 
                                                     className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider flex items-center gap-2 transition-colors ${
                                                         hasSkill 
                                                         ? 'bg-indigo-900 text-white' 
                                                         : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                                                     }`}
                                                >
                                                    {hasSkill && <CheckCircle2 className="w-3 h-3 text-teal-400" />}
                                                    {skill}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function urlencode(str: string) {
    return encodeURIComponent(str).replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16));
}

function is_array(val: any) {
    return Array.isArray(val);
}
