import React, { useState, useRef, useCallback } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, router } from '@inertiajs/react';
import { 
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip,
} from 'recharts';
import { 
    Upload, 
    Sparkles, 
    Info, 
    TrendingUp, 
    AlertTriangle, 
    CheckCircle2, 
    FileText,
    Briefcase,
    X as XIcon,
    Type,
    ChevronRight,
    LayoutDashboard,
    Zap,
    Lightbulb
} from 'lucide-react';
import AiInsightWidget from '@/Components/AiInsightWidget';

export default function Analysis({ profile, marketSkills, trendingSkills, marketStats, flash, analysisProcessing, analysisProcessingError }: any) {
    const [loading, setLoading] = useState(false);

    // AI Error Debugging Logs
    React.useEffect(() => {
        if (flash?.error) {
            console.error("AI Analysis Failed:", flash.error);
            if (flash?.debug_error) console.table({ "Source": "Gemini API", "Details": flash.debug_error });
        }
        if (flash?.success) {
            console.log("AI Analysis Success:", flash.success);
        }
    }, [flash]);

    React.useEffect(() => {
        if (!analysisProcessing) return;

        const intervalId = window.setInterval(() => {
            router.reload({
                only: ['profile', 'marketSkills', 'analysisProcessing', 'analysisProcessingError'],
            });
        }, 5000);

        return () => window.clearInterval(intervalId);
    }, [analysisProcessing]);

    const [cvText, setCvText] = useState(profile?.cv_raw_text || '');
    const [careerTargets, setCareerTargets] = useState<string[]>(Array.isArray(profile?.career_target) ? profile.career_target : [profile?.career_target].filter(Boolean) || []);
    const [activeTarget, setActiveTarget] = useState(careerTargets[0] || 'Frontend Engineer');
    const [showForm, setShowForm] = useState(!profile?.cv_raw_text);
    const [inputMode, setInputMode] = useState<'upload' | 'text'>('upload');
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAnalysis = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        careerTargets.forEach(t => formData.append('career_target[]', t));

        if (inputMode === 'upload' && cvFile) {
            formData.append('cv_file', cvFile);
        } else if (inputMode === 'text' && cvText) {
            formData.append('cv_text', cvText);
        } else {
            setLoading(false);
            return;
        }

        router.post(route('analysis.store'), formData, {
            forceFormData: true,
            onFinish: () => {
                setLoading(false);
                setShowForm(false);
            }
        });
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && isValidFile(file)) setCvFile(file);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && isValidFile(file)) setCvFile(file);
    };

    const isValidFile = (file: File) => {
        const validExtensions = ['.pdf', '.doc', '.docx', '.txt'];
        const ext = '.' + file.name.split('.').pop()?.toLowerCase();
        return validExtensions.includes(ext);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const isSubmitDisabled = loading || (inputMode === 'upload' && !cvFile) || (inputMode === 'text' && !cvText.trim());

    const getUserScore = (skillName: string, userSkills: any[]) => {
        const found = userSkills.find(s => 
            s.name.toLowerCase().includes(skillName.toLowerCase()) || 
            skillName.toLowerCase().includes(s.name.toLowerCase())
        );
        if (!found) return 0;

        const level = String(found.level || '').toLowerCase().trim();
        if (['expert', 'advanced', 'proficient', 'senior'].includes(level)) return 100;
        if (['intermediate', 'menengah', 'medium'].includes(level)) return 70;
        if (['beginner', 'junior', 'pemula', 'basic'].includes(level)) return 40;
        return 0;
    };

    const getSkillStatus = (userScore: number, marketDemand: number) => {
        const gap = marketDemand - userScore;

        if (gap <= 0) {
            return {
                label: 'SIAP INDUSTRI',
                className: 'bg-teal-50 text-teal-700',
            };
        }

        if (gap <= 10) {
            return {
                label: 'HAMPIR STANDAR',
                className: 'bg-amber-50 text-amber-700',
            };
        }

        if (gap <= 25) {
            return {
                label: 'PERLU PENINGKATAN',
                className: 'bg-orange-50 text-orange-700',
            };
        }

        return {
            label: 'PRIORITAS BELAJAR',
            className: 'bg-red-50 text-red-600',
        };
    };

    const getStatusClassName = (label: string) => {
        switch (label) {
            case 'SIAP INDUSTRI':
                return 'bg-teal-50 text-teal-700';
            case 'HAMPIR STANDAR':
                return 'bg-amber-50 text-amber-700';
            case 'PERLU PENINGKATAN':
                return 'bg-orange-50 text-orange-700';
            default:
                return 'bg-red-50 text-red-600';
        }
    };

    const getBackendSkillGap = (skillName: string) => {
        return profile?.skill_gaps?.find((g: any) => g.skill === skillName);
    };

    const chartData = marketSkills.map((ms: any) => {
        const backendGap = getBackendSkillGap(ms.skill);
        const userScore = backendGap?.user_score ?? getUserScore(ms.skill, profile?.skills || []);
        
        return {
            skill: ms.skill.split(' ')[0],
            fullSkill: ms.skill,
            industri: ms.demand,
            saya: userScore
        };
    });

    return (
        <AppLayout header="Analisis Skill Gap">
            <Head title="Skill Analysis | Career-Sync" />

            {analysisProcessing && (
                <div className="mb-6 rounded-2xl border border-teal-200 bg-teal-50 px-5 py-4 text-sm text-teal-800">
                    AI sedang menganalisis CV Anda di background. Halaman akan update otomatis saat hasil sudah siap.
                </div>
            )}

            {analysisProcessingError && (
                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                    {analysisProcessingError}
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Kolom Kiri - Content Utama */}
                <div className="lg:w-2/3 order-2 lg:order-1 space-y-8">
                    {showForm ? (
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                             <div className="text-center mb-10">
                                <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6 text-teal-600">
                                    <Sparkles className="w-10 h-10" />
                                </div>
                                <h2 className="text-3xl font-black text-navy-900 mb-3">Analisis Skill AI</h2>
                                <p className="text-slate-500">Upload file atau paste teks CV Anda.</p>
                            </div>
                            <form onSubmit={handleAnalysis}>
                                <div className="mb-6">
                                    <label className="block text-sm font-bold text-navy-900 mb-3">Target Karir Utama</label>
                                    <select value={activeTarget} onChange={(e) => setActiveTarget(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 font-bold text-navy-900">
                                        {careerTargets.map((t, idx) => <option key={`${t}-${idx}`}>{t}</option>)}
                                    </select>
                                </div>
                                <div className="flex bg-slate-100 rounded-2xl p-1.5 mb-6">
                                    <button type="button" onClick={() => setInputMode('upload')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${inputMode === 'upload' ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-400'}`}>
                                        <Upload className="w-4 h-4" /> Upload
                                    </button>
                                    <button type="button" onClick={() => setInputMode('text')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${inputMode === 'text' ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-400'}`}>
                                        <Type className="w-4 h-4" /> Tulis
                                    </button>
                                </div>
                                {inputMode === 'upload' ? (
                                    <div className="mb-8">
                                        <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileSelect} className="hidden" />
                                        {!cvFile ? (
                                            <div onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onClick={() => fileInputRef.current?.click()} className={`relative cursor-pointer border-2 border-dashed rounded-3xl p-12 text-center transition-all ${isDragging ? 'border-teal-500 bg-teal-50' : 'border-slate-200 bg-slate-50 hover:border-teal-400'}`}>
                                                <Upload className="w-8 h-8 mx-auto mb-4 text-slate-400" />
                                                <p className="font-bold text-navy-900">Klik atau Drag CV ke sini</p>
                                            </div>
                                        ) : (
                                            <div className="bg-teal-50 border-2 border-teal-200 rounded-3xl p-6 flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <FileText className="w-8 h-8 text-teal-600" />
                                                    <div>
                                                        <p className="font-bold text-navy-900 text-sm">{cvFile.name}</p>
                                                        <p className="text-xs text-teal-600">{formatFileSize(cvFile.size)}</p>
                                                    </div>
                                                </div>
                                                <button type="button" onClick={() => setCvFile(null)} className="p-2 text-slate-400 hover:text-red-500"><XIcon className="w-5 h-5" /></button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="mb-8 text-left">
                                        <textarea value={cvText} onChange={(e) => setCvText(e.target.value)} placeholder="Paste teks CV Anda di sini..." className="w-full h-64 p-6 bg-slate-50 border-none rounded-3xl focus:ring-2 focus:ring-teal-500 font-medium"></textarea>
                                    </div>
                                )}
                                {loading && (
                                    <div className="mb-4 p-4 bg-teal-50 text-teal-700 rounded-2xl text-xs font-mono animate-pulse">
                                        DEBUG: Menganalisis {cvText.length} karakter teks CV...
                                    </div>
                                )}
                                <button 
                                    onClick={() => console.log("Submitting CV Text to AI:", cvText)}
                                    disabled={isSubmitDisabled} 
                                    className="w-full p-5 bg-navy-900 text-white rounded-2xl font-black text-lg shadow-xl hover:scale-[1.01] transition-all disabled:opacity-50"
                                >
                                    {loading ? 'Menganalisis...' : 'Analisis Dengan AI'}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="space-y-8 text-left">
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 text-left">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="text-left">
                                        <h2 className="text-2xl font-black text-navy-900">Skill Radar Chart</h2>
                                        <p className="text-sm text-slate-500">Profil Anda vs Standar Industri</p>
                                    </div>
                                    <button onClick={() => setShowForm(true)} className="p-3 bg-slate-100 text-navy-900 rounded-xl font-bold text-xs hover:bg-teal-500 hover:text-white transition-all flex items-center gap-2">
                                        <Upload className="w-4 h-4" /> Analisis Ulang
                                    </button>
                                </div>
                                <div className="h-[400px] w-full min-h-[400px]">
                                    <ResponsiveContainer width="100%" height="100%" minHeight={400}>
                                        <RadarChart data={chartData}>
                                            <PolarGrid />
                                            <PolarAngleAxis dataKey="skill" />
                                            <Radar name="Industri" dataKey="industri" stroke="#0f172a" fill="#0f172a" fillOpacity={0.1} />
                                            <Radar name="Anda" dataKey="saya" stroke="#0d9488" fill="#0d9488" fillOpacity={0.4} />
                                            <Legend />
                                            <Tooltip />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <AiInsightWidget insight={profile.ai_insights} type="strength" />
                                <AiInsightWidget insight={profile.ai_insights} type="gap" />
                            </div>

                            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden text-left">
                                <div className="p-8 border-b border-slate-100">
                                    <h3 className="text-xl font-black text-navy-900">Skill Gap Detail</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 text-xs font-black uppercase tracking-widest text-navy-900">
                                            <tr>
                                                <th className="px-8 py-5">Skill</th>
                                                <th className="px-8 py-5">Level Anda</th>
                                                <th className="px-8 py-5">Standar</th>
                                                <th className="px-8 py-5">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {marketSkills.map((ms: any, i: number) => {
                                                const backendGap = getBackendSkillGap(ms.skill);
                                                const userScore = backendGap?.user_score ?? getUserScore(ms.skill, profile?.skills || []);
                                                const marketDemand = backendGap?.market_demand ?? ms.demand;
                                                const fallbackStatus = getSkillStatus(userScore, marketDemand);
                                                const statusLabel = backendGap?.status_label ?? fallbackStatus.label;
                                                const statusClass = getStatusClassName(statusLabel);
                                                return (
                                                    <tr key={i} className="hover:bg-slate-50/50">
                                                        <td className="px-8 py-6 font-bold text-navy-900">{ms.skill}</td>
                                                        <td className="px-8 py-6 text-sm">{userScore}%</td>
                                                        <td className="px-8 py-6 text-sm text-slate-400">{marketDemand}%</td>
                                                        <td className="px-8 py-6">
                                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black ${statusClass}`}>
                                                                {statusLabel}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* CV Optimization Tips */}
                            {profile?.cv_optimization_tips?.length > 0 && (
                                <div className="bg-amber-50 rounded-[2.5rem] p-8 border border-amber-100 text-left">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-amber-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                                            <Lightbulb className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-amber-900 uppercase tracking-tight">AI CV Optimization Tips</h3>
                                            <p className="text-xs text-amber-700 font-bold">Cara menuliskan skill agar terdeteksi sebagai "Expert" oleh AI & HRD</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {profile.cv_optimization_tips.map((tip: any, i: number) => (
                                            <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-amber-200/50 relative group hover:border-amber-500 transition-all">
                                                <span className="absolute -top-3 -right-3 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-black text-xs shadow-md">
                                                    {i + 1}
                                                </span>
                                                <p className="text-[10px] font-black text-amber-600 uppercase mb-2">{tip.skill}</p>
                                                <p className="text-xs font-black text-navy-900 mb-2 leading-relaxed">"{tip.current_tip}"</p>
                                                <p className="text-[10px] text-slate-500 italic mt-3 pt-3 border-t border-slate-50">{tip.why}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Career Path Alternatives */}
                    {!showForm && profile?.career_paths && (
                        <div className="pt-8 border-t border-slate-200">
                             <div className="flex items-center gap-3 mb-6 text-left">
                                <TrendingUp className="w-5 h-5 text-navy-900" />
                                <h3 className="text-xl font-black text-navy-900">Career Path Alternatives</h3>
                            </div>
                            <div className="grid grid-cols-3 gap-6">
                                {profile.career_paths.map((path: any, i: number) => (
                                    <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm group hover:border-teal-500 transition-all text-left">
                                        <p className="text-[10px] font-black text-teal-600 mb-2 uppercase">{path.compatibility}% Match</p>
                                        <h4 className="font-black text-navy-900 mb-2">{path.title}</h4>
                                        <p className="text-[11px] text-slate-500 italic mb-4 line-clamp-2">"{path.reason}"</p>
                                        <div className="pt-3 border-t border-slate-50">
                                            <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Skill Utama</p>
                                            <span className="text-[10px] font-bold text-amber-600">{path.gap_skill}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Kolom Kanan - Sidebar Info */}
                <div className="lg:w-1/3 order-1 lg:order-2 space-y-8 text-left">
                    <div className="bg-navy-900 text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden text-left border border-white/5">
                         <h3 className="text-xl font-black mb-10 flex items-center gap-3">
                             <div className="w-10 h-10 bg-teal-500/20 rounded-xl flex items-center justify-center">
                                <FileText className="text-teal-400 w-6 h-6" />
                             </div>
                             Analisis Profil
                         </h3>
                         
                         <div className="space-y-10">
                             {/* 1. Gap Prioritas - NOW ON TOP */}
                             <div>
                                 <div className="flex items-center justify-between mb-4">
                                     <p className="text-navy-300 text-[10px] font-black uppercase tracking-widest text-left">Gap Kompetensi Prioritas</p>
                                     <AlertTriangle className="w-3 h-3 text-red-500 animate-pulse" />
                                 </div>
                                 <div className="space-y-3">
                                     {profile?.skill_gaps?.filter((g: any) => g.gap > 30).slice(0, 4).map((g: any, i: number) => (
                                         <div key={i} className="group flex justify-between items-center bg-gradient-to-r from-red-500/10 to-transparent p-4 rounded-2xl border border-red-500/20 hover:border-red-500/40 transition-all text-left">
                                             <span className="text-xs font-black text-red-100 group-hover:text-white">{g.skill}</span>
                                             <div className="flex flex-col items-end">
                                                 <span className="text-[11px] font-black text-red-400">-{g.gap}%</span>
                                                 <span className="text-[7px] font-black uppercase text-red-500/60">{g.status_label || 'PRIORITAS BELAJAR'}</span>
                                             </div>
                                         </div>
                                     ))}
                                     {(!profile?.skill_gaps || profile.skill_gaps.length === 0) && (
                                         <p className="text-xs text-navy-400 italic">Belum ada data gap.</p>
                                     )}
                                 </div>
                             </div>

                             {/* 2. Pengalaman Terdeteksi - FULLY HIDDEN BY DEFAULT */}
                             <div className="relative group/section">
                                 <p className="text-navy-300 text-[10px] font-black uppercase mb-4 tracking-widest text-left">Pengalaman Kerja</p>
                                 <div className="space-y-3 text-left">
                                     {profile?.experiences?.length > 0 ? (
                                         <details className="group/details">
                                             <summary className="list-none cursor-pointer text-[10px] font-black text-teal-600 uppercase tracking-widest hover:text-teal-400 flex items-center gap-2 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                                                 <Briefcase className="w-3 h-3" />
                                                 <span>Show Experiences ({profile.experiences.length})</span>
                                                 <ChevronRight className="w-3 h-3 group-open/details:rotate-90 transition-transform ml-auto" />
                                             </summary>
                                             <div className="space-y-3 mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                                 {profile.experiences.map((exp: any, i: number) => (
                                                     <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                                         <p className="text-xs font-black text-navy-100 mb-1">{exp.role || exp.title}</p>
                                                         <p className="text-[10px] font-bold text-navy-300 uppercase tracking-tighter">{exp.company || exp.location}</p>
                                                     </div>
                                                 ))}
                                             </div>
                                         </details>
                                     ) : (
                                         <p className="text-[10px] text-navy-500 italic">Tidak ada pengalaman terdeteksi.</p>
                                     )}
                                 </div>
                             </div>

                             {/* 3. Pendidikan - FULLY HIDDEN BY DEFAULT */}
                             <div className="text-left">
                                 <p className="text-navy-300 text-[10px] font-black uppercase mb-4 tracking-widest">Pendidikan</p>
                                 <div className="space-y-3">
                                     {profile?.education ? (
                                         <details className="group/edu">
                                             <summary className="list-none cursor-pointer text-[10px] font-black text-navy-400 uppercase tracking-widest hover:text-white flex items-center gap-2 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                                                 <Zap className="w-3 h-3 text-teal-400" />
                                                 <span>Show Education Details</span>
                                                 <ChevronRight className="w-3 h-3 group-open/edu:rotate-90 transition-transform ml-auto" />
                                             </summary>
                                             <div className="mt-3 bg-white/5 rounded-2xl p-4 border border-white/10 animate-in zoom-in-95 duration-200 text-left">
                                                 <p className="text-xs font-black text-navy-100">{profile.education.degree} {profile.education.major}</p>
                                                 <p className="text-[10px] font-bold text-navy-300 mt-1 uppercase tracking-tighter">{profile.education.university || profile.education.school}</p>
                                                 <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                                                     <span className="text-[10px] font-black text-navy-400">GPA</span>
                                                     <span className="text-xs font-black text-teal-400">{profile.education.gpa || 'N/A'}</span>
                                                 </div>
                                             </div>
                                         </details>
                                     ) : (
                                         <p className="text-[10px] text-navy-500 italic">Tidak ada data pendidikan.</p>
                                     )}
                                 </div>
                             </div>
                         </div>
                    </div>
                    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-left">
                        <h4 className="font-black text-navy-900 mb-4 flex items-center gap-2 text-left">
                            <Info className="w-4 h-4" /> Tentang Analisis
                        </h4>
                        <p className="text-xs text-slate-500 italic leading-relaxed">
                            "Data ditarik real-time dari pasar kerja Indonesia & diolah menggunakan Gemini 2.5 Flash untuk akurasi peta skill industri 2026."
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
