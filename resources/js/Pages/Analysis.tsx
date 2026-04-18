import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { 
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip,
    BarChart, Bar, XAxis, YAxis, Cell 
} from 'recharts';
import { 
    Upload, 
    Sparkles, 
    Info, 
    TrendingUp, 
    ChevronRight, 
    AlertTriangle, 
    CheckCircle2, 
    DollarSign,
    Briefcase
} from 'lucide-react';

export default function Analysis({ profile, marketSkills, trendingSkills, marketStats }: any) {
    const [loading, setLoading] = useState(false);
    const [cvText, setCvText] = useState('');
    const [careerTarget, setCareerTarget] = useState(profile?.career_target || 'Frontend Engineer');

    const handleAnalysis = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        router.post(route('analysis.store'), {
            cv_text: cvText,
            career_target: careerTarget
        }, {
            onFinish: () => setLoading(false)
        });
    };

    const getUserScore = (skillName: string, userSkills: any[]) => {
        const found = userSkills.find(s => 
            s.name.toLowerCase().includes(skillName.toLowerCase()) || 
            skillName.toLowerCase().includes(s.name.toLowerCase())
        );
        if (!found) return 0;
        return found.level === 'expert' ? 100 : found.level === 'intermediate' ? 70 : found.level === 'beginner' ?  40 : 0;
    };

    const chartData = marketSkills.map((ms: any) => ({
        skill: ms.skill.split(' ')[0], // short label
        fullSkill: ms.skill,
        industri: ms.demand,
        saya: getUserScore(ms.skill, profile?.skills || [])
    }));

    return (
        <AppLayout header="Analisis Skill Gap">
            <Head title="Skill Analysis | Career-Sync" />

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Sidebar: Market Insight */}
                <div className="lg:w-1/3 space-y-8">
                    <div className="bg-navy-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                         <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full"></div>
                         
                         <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                             <TrendingUp className="text-teal-400 w-5 h-5" />
                             Market Intelligence
                         </h3>

                         <div className="space-y-6">
                             <div>
                                 <p className="text-navy-300 text-sm font-bold uppercase tracking-wider mb-2">Peluang Kerja</p>
                                 <div className="flex items-baseline gap-2">
                                     <span className="text-4xl font-black">{marketStats.total_jobs.toLocaleString()}</span>
                                     <span className="text-teal-400 text-sm font-bold">Baru di {careerTarget}</span>
                                 </div>
                             </div>

                             <div>
                                 <p className="text-navy-300 text-sm font-bold uppercase tracking-wider mb-2">Estimasi Gaji (IDR)</p>
                                 <div className="flex items-center gap-3">
                                     <div className="p-2 bg-white/10 rounded-lg">
                                         <DollarSign className="w-5 h-5 text-teal-400" />
                                     </div>
                                     <span className="text-xl font-bold">5 - 22 Juta <span className="text-xs text-navy-400 font-medium">/bulan</span></span>
                                 </div>
                             </div>

                             <div className="pt-4 border-t border-white/10">
                                 <p className="text-navy-300 text-sm font-bold uppercase tracking-wider mb-4">Trending Skills (IDR)</p>
                                 <div className="space-y-3">
                                     {trendingSkills.map((ts: any, i: number) => (
                                         <div key={i} className="flex items-center justify-between text-sm">
                                             <span className="font-medium">{ts.skill}</span>
                                             <span className="px-2 py-0.5 bg-teal-500/20 text-teal-400 rounded-md font-bold text-[10px] uppercase">Hot</span>
                                         </div>
                                     ))}
                                 </div>
                             </div>
                         </div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <Info className="text-navy-900 w-5 h-5" />
                            <h4 className="font-bold text-navy-900">Tentang Analisis</h4>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed italic">
                            "Data ini ditarik secara real-time dari portal kerja utama Indonesia dan diolah menggunakan model Gemini 2.5 Flash untuk akurasi pemetaan skill kurikulum industri 2026."
                        </p>
                    </div>
                </div>

                {/* Right: Analysis Result or Form */}
                <div className="lg:w-2/3">
                    {!profile?.cv_raw_text ? (
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                            <div className="text-center mb-10">
                                <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6 text-teal-600">
                                    <Sparkles className="w-10 h-10" />
                                </div>
                                <h2 className="text-3xl font-black text-navy-900 mb-3">Mulai Analisis Skill AI</h2>
                                <p className="text-slate-500">Paste isi CV kamu atau deskripsikan pengalamanmu untuk dipetakan dengan radar industri.</p>
                            </div>

                            <form onSubmit={handleAnalysis}>
                                <div className="mb-6">
                                    <label className="block text-sm font-bold text-navy-900 mb-3">Target Karir</label>
                                    <select 
                                        value={careerTarget}
                                        onChange={(e) => setCareerTarget(e.target.value)}
                                        className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 font-bold text-navy-900"
                                    >
                                        <option>Frontend Engineer</option>
                                        <option>Backend Engineer</option>
                                        <option>Data Scientist</option>
                                        <option>UI/UX Designer</option>
                                        <option>DevOps Engineer</option>
                                        <option>Mobile Developer</option>
                                    </select>
                                </div>

                                <div className="mb-8">
                                    <label className="block text-sm font-bold text-navy-900 mb-3">Isi CV / Deskripsi Skill</label>
                                    <textarea 
                                        required
                                        value={cvText}
                                        onChange={(e) => setCvText(e.target.value)}
                                        placeholder="Saya punya pengalaman 1 tahun sebagai frontend intern menggunakan React and Tailwind..."
                                        className="w-full h-80 p-6 bg-slate-50 border-none rounded-3xl focus:ring-2 focus:ring-teal-500 font-medium leading-relaxed"
                                    ></textarea>
                                </div>

                                <button 
                                    disabled={loading}
                                    className="w-full p-5 bg-navy-900 text-white rounded-2xl font-black text-lg shadow-xl shadow-navy-900/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Menganalisis dengan AI...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-6 h-6" />
                                            Analisis Sekarang
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-in fade-in zoom-in duration-500">
                            {/* Skill Radar Card */}
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h2 className="text-2xl font-black text-navy-900">Skill Radar Chart</h2>
                                        <p className="text-sm text-slate-500">Kemampuanmu vs Standar {careerTarget} Indonesia</p>
                                    </div>
                                    <button 
                                        onClick={() => router.get(route('analysis'))}
                                        className="p-3 bg-slate-50 text-navy-900 rounded-xl hover:bg-slate-100 transition-colors"
                                    >
                                        <Upload className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="h-[400px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                                            <PolarGrid stroke="#e2e8f0" />
                                            <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} />
                                            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} stroke="#e2e8f0" />
                                            <Radar 
                                                name="Standar Industri" 
                                                dataKey="industri" 
                                                stroke="#0f172a" 
                                                fill="#0f172a" 
                                                fillOpacity={0.08} 
                                                strokeWidth={2} 
                                                strokeDasharray="6 3" 
                                            />
                                            <Radar 
                                                name="Kemampuanmu" 
                                                dataKey="saya" 
                                                stroke="#0d9488" 
                                                fill="#0d9488" 
                                                fillOpacity={0.3} 
                                                strokeWidth={2} 
                                            />
                                            <Legend verticalAlign="bottom" />
                                            <Tooltip 
                                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                                formatter={(v: any) => [`${v}%`]} 
                                                labelFormatter={(l, p) => p[0]?.payload?.fullSkill || l} 
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Gap Table */}
                            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                                <div className="p-8 border-b border-slate-100">
                                    <h3 className="text-xl font-black text-navy-900">Skill Gap Detail</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50 text-navy-900 text-xs font-black uppercase tracking-widest">
                                                <th className="px-8 py-5">Skill</th>
                                                <th className="px-8 py-5">Level Kamu</th>
                                                <th className="px-8 py-5">Standar</th>
                                                <th className="px-8 py-5">Gap</th>
                                                <th className="px-8 py-5">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {marketSkills.map((ms: any, i: number) => {
                                                const userScore = getUserScore(ms.skill, profile.skills);
                                                const gap = ms.demand - userScore;
                                                const status = gap <= 0 ? 'strong' : gap < 30 ? 'developing' : 'critical';
                                                
                                                return (
                                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                                        <td className="px-8 py-6">
                                                            <div>
                                                                <p className="font-bold text-navy-900">{ms.skill}</p>
                                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{ms.category}</p>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6 text-sm font-bold text-slate-600">{userScore}%</td>
                                                        <td className="px-8 py-6 text-sm font-bold text-slate-400">{ms.demand}%</td>
                                                        <td className="px-8 py-6 text-sm font-bold text-red-500">{gap > 0 ? `-${gap}%` : 'MATCH'}</td>
                                                        <td className="px-8 py-6">
                                                            {status === 'strong' ? (
                                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-xs font-black">
                                                                    <CheckCircle2 className="w-3.5 h-3.5" /> Kuat
                                                                </span>
                                                            ) : status === 'developing' ? (
                                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-black">
                                                                    <AlertTriangle className="w-3.5 h-3.5" /> Berkembang
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-black">
                                                                    <AlertTriangle className="w-3.5 h-3.5" /> Perlu Belajar
                                                                </span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
