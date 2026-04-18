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
    CartesianGrid 
} from 'recharts';
import { 
    Search, 
    MapPin, 
    Clock, 
    Briefcase, 
    ArrowUpRight, 
    Building2, 
    Filter,
    ChevronDown,
    CheckCircle2,
    Target,
    TrendingUp
} from 'lucide-react';

export default function Market({ jobs, trendingSkills, stats, profile, isLiveData, apiDebug }: any) {
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
            <Head title="Market Data | Career-Sync" />

            {/* Debug Console */}
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
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-800">
                        <div>
                            <p className="text-slate-500 mb-1">Data Source</p>
                            <p className={apiDebug.data_source?.includes('Live') ? 'text-teal-400 font-bold' : 'text-amber-400 font-bold'}>
                                {apiDebug.data_source || 'Unknown'}
                            </p>
                        </div>
                        <div>
                            <p className="text-slate-500 mb-1">Jobs Fetched</p>
                            <p className="text-white">{apiDebug.jobs_fetched ?? '---'}</p>
                        </div>
                        <div>
                            <p className="text-slate-500 mb-1">Career Target</p>
                            <p className="text-white">{apiDebug.career_target || '(not set)'}</p>
                        </div>
                    </div>
                    {apiDebug.error_message && (
                        <div className="mt-4 p-3 bg-red-900/20 border border-red-900/50 rounded-xl text-red-400">
                            Error: {apiDebug.error_message}
                        </div>
                    )}
                </div>
            )}

            {/* Section A: Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[
                    { label: 'Total Lowongan', value: stats.total_jobs.toLocaleString(), detail: '+14% bulan ini', icon: Briefcase, color: 'navy' },
                    { label: 'Perusahaan Hiring', value: stats.companies_hiring, detail: 'Start-up & Corporate', icon: Building2, color: 'teal' },
                    { label: 'Avg Gaji Junior', value: `IDR ${(stats.avg_salary_junior / 1000000).toFixed(1)}jt`, detail: 'Market Standard', icon: Target, color: 'navy' },
                ].map((stat, i) => (
                    <div key={i} className={`p-8 rounded-[2.5rem] shadow-sm border border-slate-100 ${stat.color === 'navy' ? 'bg-navy-900 text-white' : 'bg-white text-navy-900'}`}>
                        <div className="flex items-center justify-between mb-6">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color === 'navy' ? 'bg-white/10 text-white' : 'bg-teal-50 text-teal-600'}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${stat.color === 'navy' ? 'bg-white/10' : 'bg-slate-100'}`}>
                                {isLiveData ? '🟢 Live API' : '📋 Static'}
                            </span>
                        </div>
                        <p className={`text-xs font-black uppercase tracking-widest mb-1 ${stat.color === 'navy' ? 'text-navy-300' : 'text-slate-400'}`}>{stat.label}</p>
                        <h4 className="text-3xl font-black mb-1">{stat.value}</h4>
                        <p className={`text-[10px] font-bold ${stat.color === 'navy' ? 'text-teal-400' : 'text-slate-400'}`}>{stat.detail}</p>
                    </div>
                ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Section B: Trending Skills */}
                <div className="lg:w-1/3">
                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm sticky top-24">
                        <h4 className="text-xl font-black text-navy-900 mb-8 flex items-center gap-2">
                             <TrendingUp className="text-teal-500 w-5 h-5" />
                             Top Skills Demand
                        </h4>

                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={trendingSkills} layout="vertical" margin={{ left: 0, right: 30 }}>
                                    <XAxis type="number" hide />
                                    <YAxis 
                                        type="category" 
                                        dataKey="skill" 
                                        width={100} 
                                        tick={{ fontSize: 10, fontWeight: 700, fill: '#1e293b' }} 
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip 
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                        formatter={(v: any) => [`${v}%`, 'Demand']} 
                                    />
                                    <Bar dataKey="demand" radius={[0, 8, 8, 0]} barSize={20}>
                                        {trendingSkills.map((entry: any, index: number) => (
                                            <Cell 
                                                key={`cell-${index}`} 
                                                fill={entry.trend === 'rising' ? '#0d9488' : entry.trend === 'falling' ? '#94a3b8' : '#0f172a'} 
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-4 pt-6 border-t border-slate-100">
                             <div className="flex items-center gap-2">
                                 <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                                 <span className="text-[10px] font-black text-slate-500 uppercase">Rising</span>
                             </div>
                             <div className="flex items-center gap-2">
                                 <div className="w-3 h-3 bg-navy-900 rounded-full"></div>
                                 <span className="text-[10px] font-black text-slate-500 uppercase">Stable</span>
                             </div>
                             <div className="flex items-center gap-2">
                                 <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                                 <span className="text-[10px] font-black text-slate-500 uppercase">Falling</span>
                             </div>
                        </div>
                    </div>
                </div>

                {/* Section C: Job Listings */}
                <div className="lg:w-2/3 space-y-6">
                    {/* Filters */}
                    <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input 
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Cari posisi atau perusahaan..."
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 text-sm font-medium"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <select 
                                value={filterLocation}
                                onChange={(e) => setFilterLocation(e.target.value)}
                                className="px-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 text-sm font-bold text-navy-900"
                            >
                                {locations.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>

                            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-4 py-3 rounded-2xl">
                                <input 
                                    type="checkbox" 
                                    checked={showMatchedOnly}
                                    onChange={(e) => setShowMatchedOnly(e.target.checked)}
                                    className="w-4 h-4 text-teal-500 rounded border-slate-300 focus:ring-teal-500" 
                                />
                                <span className="text-xs font-bold text-navy-800 uppercase tracking-tight">Cocok Untukku</span>
                            </label>
                        </div>
                    </div>

                    {/* Job Cards */}
                    <div className="grid gap-4">
                        {filteredJobs.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                                <Search className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">Tidak ada lowongan yang sesuai</p>
                            </div>
                        )}
                        {filteredJobs.map((job: any) => (
                           <div key={job.id} className="group bg-white p-6 rounded-[2rem] border border-slate-100 hover:border-teal-500 transition-all hover:shadow-xl hover:shadow-teal-500/5 cursor-pointer">
                               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                   <div className="flex items-start gap-5">
                                       <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-navy-900 text-xl font-black group-hover:bg-teal-50 transform transition-transform group-hover:scale-110">
                                           {job.company.charAt(0)}
                                       </div>
                                       <div>
                                           <h5 className="text-lg font-black text-navy-900 group-hover:text-teal-600 transition-colors">{job.title}</h5>
                                           <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                                               <span className="text-sm font-bold text-slate-600 flex items-center gap-1.5">
                                                   <Building2 className="w-4 h-4 text-slate-400" />
                                                   {job.company}
                                               </span>
                                               <span className="text-sm font-bold text-slate-400 flex items-center gap-1.5">
                                                   <MapPin className="w-4 h-4" />
                                                   {job.location}
                                               </span>
                                               <span className="text-xs font-black text-teal-600 uppercase tracking-widest flex items-center gap-1">
                                                   <Target className="w-3.5 h-3.5" />
                                                   IDR {(job.salary_min / 1000000).toFixed(0)}-{(job.salary_max / 1000000).toFixed(0)}jt
                                               </span>
                                           </div>
                                       </div>
                                   </div>

                                   <div className="flex items-center gap-4">
                                       {job.match_score > 0 && (
                                            <div className="flex flex-col items-end">
                                                <div className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 ${
                                                    job.match_score >= 80 ? 'bg-teal-50 text-teal-600' : 
                                                    job.match_score >= 50 ? 'bg-amber-50 text-amber-600' : 
                                                    'bg-slate-50 text-slate-400'
                                                }`}>
                                                    {job.match_score}% Match
                                                </div>
                                            </div>
                                       )}
                                       <a href={job.apply_url || '#'} target="_blank" rel="noopener noreferrer" className="p-3 bg-navy-900 text-white rounded-xl hover:bg-teal-500 transition-all shadow-lg overflow-hidden group/btn inline-flex">
                                            <ArrowUpRight className="w-5 h-5 group-hover/btn:scale-125 transition-transform" />
                                       </a>
                                   </div>
                               </div>

                               <div className="mt-6 flex flex-wrap gap-2">
                                   {job.skills_required?.map((skill: string) => {
                                       const hasSkill = profile?.skills?.some((s: any) => 
                                           s.name.toLowerCase().includes(skill.toLowerCase()) || 
                                           skill.toLowerCase().includes(s.name.toLowerCase())
                                       );
                                       return (
                                           <span 
                                                key={skill} 
                                                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${
                                                    hasSkill 
                                                    ? 'bg-teal-50 text-teal-600 border border-teal-100' 
                                                    : 'bg-slate-50 text-slate-400 border border-slate-100'
                                                }`}
                                           >
                                               {hasSkill && <CheckCircle2 className="w-3 h-3" />}
                                               {skill}
                                           </span>
                                       );
                                   })}
                               </div>
                           </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
