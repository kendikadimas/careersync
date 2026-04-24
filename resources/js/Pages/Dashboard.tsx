import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { 
    RadialBarChart, 
    RadialBar, 
    PolarAngleAxis, 
    ResponsiveContainer 
} from 'recharts';
import { 
    TrendingUp, 
    MousePointer2, 
    ChevronRight, 
    Target, 
    CheckCircle2, 
    Flame, 
    AlertCircle, 
    Briefcase,
    Zap
} from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color, badge }: any) => (
    <div className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-teal-500/50 transition-all">
        <div>
            <div className="flex items-center gap-2 mb-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
                {badge && (
                    <span className="px-2 py-0.5 bg-teal-50 text-teal-600 text-[8px] font-black rounded-full animate-bounce">
                        {badge}
                    </span>
                )}
            </div>
            <h4 className="text-2xl font-black text-navy-900 group-hover:text-teal-600 transition-colors">{value}</h4>
        </div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
            <Icon className="w-6 h-6" />
        </div>
    </div>
);

export default function Dashboard({ profile, roadmap, score, marketStats, trendingSkills, gapCount }: any) {
    const { flash }: any = usePage().props;
    const currentScore = score?.score || 0;
    const scoreCategory = score?.category || 'Masih Awal';
    const scoreColor = currentScore >= 80 ? '#0d9488' : currentScore >= 60 ? '#f59e0b' : '#334155';

    const gaugeData = [{ value: currentScore, fill: scoreColor }];

    const handleRecalculate = () => {
        router.post(route('score.calculate'));
    };

    return (
        <AppLayout header="Command Center">
            <Head title="Dashboard | Career-Sync" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                {/* Gauge Section */}
                <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
                     {/* Refresh Button */}
                    <button 
                        onClick={handleRecalculate}
                        className="absolute top-6 right-6 p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-navy-900 hover:text-white transition-all shadow-sm"
                        title="Update Skor"
                    >
                        <MousePointer2 className="w-4 h-4" />
                    </button>

                    <h3 className="font-black text-navy-900 text-sm uppercase tracking-[0.2em] mb-4">Work Readiness Score</h3>
                    
                    <div className="relative w-full h-[200px] flex items-center justify-center translate-y-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart
                                innerRadius="70%" 
                                outerRadius="100%"
                                startAngle={180} 
                                endAngle={0}
                                data={gaugeData}
                            >
                                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                                <RadialBar 
                                    background={{ fill: '#f1f5f9' }} 
                                    dataKey="value" 
                                    cornerRadius={12}
                                />
                            </RadialBarChart>
                        </ResponsiveContainer>
                        
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-8">
                            <span className="text-6xl font-black text-navy-900 leading-none">{currentScore}%</span>
                        </div>
                    </div>

                    <div className={`mt-2 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest ${
                        currentScore >= 80 ? 'bg-teal-50 text-teal-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                        {scoreCategory}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="lg:col-span-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                        <StatCard 
                            label="Skill Dimiliki" 
                            value={profile?.skills?.length || 0} 
                            badge={flash?.new_skill_count ? `+${flash.new_skill_count} DARI CV` : null}
                            icon={CheckCircle2} 
                            color="bg-teal-50 text-teal-600" 
                        />
                        <StatCard 
                            label="Target Karir" 
                            value={Array.isArray(profile?.career_target) ? profile.career_target.join(', ') : (profile?.career_target || 'N/A')} 
                            icon={Target} 
                            color="bg-navy-50 text-navy-600" 
                        />
                        <StatCard 
                            label="Progres Roadmap" 
                            value={`${roadmap?.milestones_completed || 0} / ${roadmap?.total_milestones || 0}`} 
                            icon={TrendingUp} 
                            color="bg-indigo-50 text-indigo-600" 
                        />
                         <StatCard 
                            label="Gap Kompetensi" 
                            value={gapCount || 0} 
                            icon={AlertCircle} 
                            color="bg-red-50 text-red-600" 
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Recommended Jobs */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center justify-between mb-2 px-2">
                        <h3 className="text-xl font-black text-navy-900">Rekomendasi Karir Untukmu</h3>
                        <Link href={route('market')} className="text-xs font-black text-teal-600 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                             Lihat Semua Market Intel <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {[
                            { title: 'Frontend Developer', company: 'Gojek Tokopedia', match: 94, salary: 'IDR 12-18jt', type: 'Full-time' },
                            { title: 'React Specialist', company: 'Traveloka', match: 88, salary: 'IDR 10-15jt', type: 'Contract' },
                            { title: 'Web Interface Engineer', company: 'Dana Indonesia', match: 81, salary: 'IDR 9-13jt', type: 'Remote' },
                        ].map((job, i) => (
                             <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-teal-500 transition-all cursor-pointer">
                                 <div className="flex items-center gap-5">
                                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-navy-900 group-hover:bg-teal-50 transition-colors">
                                          <Briefcase className="w-6 h-6" />
                                      </div>
                                      <div>
                                          <h5 className="font-black text-navy-900 text-lg mb-1">{job.title}</h5>
                                          <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-wide">
                                               <span>{job.company}</span>
                                               <span className="text-teal-500">{job.salary}</span>
                                          </div>
                                      </div>
                                 </div>
                                 <div className="flex flex-col items-end gap-2">
                                     <span className="px-3 py-1 bg-teal-50 text-teal-600 text-[10px] font-black rounded-lg">{job.match}% MATCH</span>
                                     <span className="text-[10px] font-bold text-slate-300">{job.type}</span>
                                 </div>
                             </div>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 pt-4">
                        {[
                            { title: 'Lanjutkan Analisis', href: route('analysis'), icon: MousePointer2, color: 'bg-navy-900 active:scale-95' },
                            { title: 'Lihat Roadmap', href: route('roadmap'), icon: MapIcon, color: 'bg-teal-500 active:scale-95' },
                            { title: 'Eksplorasi Pasar', href: route('market'), icon: TrendingUp, color: 'bg-slate-200 !text-navy-900 active:scale-95' },
                        ].map((btn, i) => (
                             <Link key={i} href={btn.href} className={`p-6 rounded-3xl ${btn.color} text-white font-black flex flex-col items-center justify-center gap-4 shadow-xl transition-all hover:-translate-y-1`}>
                                 <btn.icon className="w-8 h-8" />
                                 <span className="text-sm uppercase tracking-widest leading-none">{btn.title}</span>
                             </Link>
                        ))}
                    </div>
                </div>

                {/* Right: Trending Container */}
                <div className="lg:col-span-4 space-y-8">
                     <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                        <h4 className="text-lg font-black text-navy-900 mb-8 flex items-center gap-2">
                             <Zap className="text-amber-500 w-5 h-5" />
                             Skill Trending Hari Ini
                        </h4>

                        <div className="space-y-6">
                            {trendingSkills.map((skill: any, i: number) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-navy-900">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <p className="font-black text-navy-900 text-sm">{skill.skill}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{skill.trend}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`flex items-center gap-1 font-black ${skill.change > 0 ? 'text-teal-500' : 'text-slate-400'}`}>
                                            <TrendingUp className={`w-3 h-3 ${skill.change < 0 ? 'rotate-180' : ''}`} />
                                            {Math.abs(skill.change)}%
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-300">Vs Bulan Lalu</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                     </div>

                     <div className="bg-navy-900 p-8 rounded-[2.5rem] text-white overflow-hidden relative group">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
                        <h4 className="font-black text-xl mb-4 relative z-10">Tingkatkan Skor Kamu!</h4>
                        <p className="text-navy-300 text-sm leading-relaxed mb-8 relative z-10">Selesaikan milestone berikutnya di roadmap belajarmu untuk meningkatkan skor kesiapan kerjamu sebesar 8%.</p>
                        <Link href={route('roadmap')} className="w-full bg-teal-500 p-4 rounded-2xl font-black text-sm uppercase tracking-widest text-center block shadow-lg shadow-teal-500/20 hover:bg-teal-400 transition-all">
                             Buka Roadmap
                        </Link>
                     </div>
                </div>
            </div>
        </AppLayout>
    );
}

import { Map as MapIcon } from 'lucide-react'; // Fix missing import
