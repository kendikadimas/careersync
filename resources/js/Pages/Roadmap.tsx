import React, { useState, useMemo, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, router, Link } from '@inertiajs/react';
import {
    Map as MapIcon,
    Sparkles,
    CheckCircle2,
    Lock,
    PlayCircle,
    ExternalLink,
    BookOpen,
    Loader2,
    Target as TargetIcon
} from 'lucide-react';
import axios from 'axios';

export default function Roadmap({ roadmap, profile }: any) {
    const [selectedMilestone, setSelectedMilestone] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [progress, setProgress] = useState(0);

    // Simulated progress increment
    useEffect(() => {
        let interval: any;
        if (loading || loadingDetails) {
            setProgress(0);
            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) return prev;
                    return prev + (prev < 50 ? 5 : 2);
                });
            }, 300);
        } else {
            setProgress(100);
            setTimeout(() => setProgress(0), 500);
        }
        return () => clearInterval(interval);
    }, [loading, loadingDetails]);

    useEffect(() => {
        if (!roadmap?.roadmap_data?.milestones) {
            return;
        }

        if (!selectedMilestone) {
            const current = roadmap.roadmap_data.milestones.find((m: any) => m.status === 'current');
            setSelectedMilestone(current || roadmap.roadmap_data.milestones[0] || null);
            return;
        }

        const updated = roadmap.roadmap_data.milestones.find((m: any) => m.id === selectedMilestone.id);
        if (updated) {
            setSelectedMilestone(updated);
        }
    }, [roadmap]);

    const handleSelect = async (ms: any) => {
        setSelectedMilestone(ms);

        if (!ms.resources || ms.resources.length === 0 || !ms.why_important) {
            setLoadingDetails(true);
            try {
                const response = await axios.get(route('roadmap.milestone.details', {
                    roadmapId: roadmap.id,
                    milestoneId: ms.id
                }));
                setSelectedMilestone(response.data);
                router.reload({ only: ['roadmap'] });
            } catch (error) {
                console.error("Gagal mengambil detail milestone:", error);
            } finally {
                setLoadingDetails(false);
            }
        }
    };

    const handleGenerate = () => {
        setLoading(true);
        router.post(route('roadmap.generate'), {}, {
            onFinish: () => setLoading(false)
        });
    };

    const milestones = useMemo(() => roadmap?.roadmap_data?.milestones || [], [roadmap]);
    const completion = roadmap?.total_milestones
        ? Math.round((roadmap.milestones_completed / roadmap.total_milestones) * 100)
        : 0;

    return (
        <AppLayout header="Learning Roadmap">
            <Head title="Roadmap | Kembangin" />

            {!roadmap ? (
                <div className="flex flex-col items-center justify-center py-12 md:py-20 bg-white rounded-lg md:rounded-lg border border-slate-100 shadow-sm text-center px-4 md:px-6">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900 mb-6 md:mb-8">
                        <MapIcon className="w-10 h-10 md:w-12 md:h-12" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-navy-900 mb-4 px-2">Gunakan AI untuk Memandu Karirmu</h2>
                    <p className="max-w-md text-slate-500 mb-8 md:mb-10 text-sm md:text-base">AI akan menganalisis <b>skill gap</b> kamu dan membuatkan rencana belajar untuk menutupinya.</p>

                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="relative overflow-hidden w-full sm:w-auto px-8 py-4 bg-navy-900 text-white rounded-lg font-black flex items-center justify-center gap-3 shadow-xl shadow-navy-900/20 hover:scale-105 transition-all disabled:opacity-50"
                    >
                        {loading && (
                            <div
                                className="absolute bottom-0 left-0 h-1.5 bg-teal-400 transition-all duration-300 shadow-[0_0_10px_rgba(45,212,191,0.5)]"
                                style={{ width: `${progress}%` }}
                            ></div>
                        )}
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                        {loading ? `Menganalisis... ${progress}%` : 'Generate Target Roadmap'}
                    </button>
                </div>
            ) : (
                <div className="rounded-lg md:rounded-lg bg-slate-200/50 p-2 md:p-4 border border-slate-200 max-w-full overflow-hidden">
                    <div className="rounded-lg md:rounded-lg bg-white/80 p-3 md:p-4 space-y-3 md:space-y-4">
                        <div className="rounded-lg bg-white p-3 md:p-4 border border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div className="flex-1">
                                <h3 className="text-xl font-black text-slate-900 leading-tight">Adaptive Learning Roadmap</h3>
                                <div className="flex flex-wrap items-center gap-2 mt-1">
                                    <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg">
                                        <TargetIcon className="w-3 h-3 text-blue-600" />
                                        Target: {roadmap.career_target}
                                    </div>
                                    <span className="text-[11px] text-slate-400 font-medium">Ciptakan jalur belajar sesuai skill gap kamu.</span>
                                </div>
                            </div>

                            <button
                                onClick={handleGenerate}
                                disabled={loading}
                                className="relative overflow-hidden px-5 py-2.5 bg-indigo-900 text-white rounded-lg font-bold text-xs hover:bg-indigo-800 transition-colors disabled:opacity-60 shrink-0"
                            >
                                {loading && (
                                    <div
                                        className="absolute left-0 bottom-0 h-1 bg-cyan-300 transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                )}
                                <span className="inline-flex items-center gap-2">
                                    {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                                    {loading ? `Updating ${progress}%` : 'Regenerate'}
                                </span>
                            </button>
                        </div>

                        <div className="rounded-lg bg-white p-3 border border-slate-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold text-slate-400">Overall Progress</span>
                                <span className="text-xs font-black text-indigo-900">{completion}%</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-lg overflow-hidden">
                                <div className="h-full bg-indigo-900 transition-all duration-700" style={{ width: `${completion}%` }}></div>
                            </div>
                        </div>

                        <div className="overflow-x-auto pb-2 scrollbar-hide">
                            <div className="flex gap-3 min-w-max px-1">
                                {milestones.map((ms: any) => {
                                    const status = (ms.status as string) || 'locked';
                                    const isCurrent = status === 'current';
                                    const isCompleted = status === 'completed';
                                    const isActive = selectedMilestone?.id === ms.id;

                                    return (
                                        <button
                                            key={ms.id}
                                            type="button"
                                            onClick={() => handleSelect(ms)}
                                            className={`w-48 md:w-56 min-h-[100px] rounded-lg p-3 text-left transition-all border shrink-0 ${isActive
                                                    ? 'bg-indigo-900 border-indigo-300 text-white shadow-lg ring-2 ring-indigo-200'
                                                    : isCompleted
                                                        ? 'bg-indigo-900/90 border-indigo-400 text-white'
                                                        : isCurrent
                                                            ? 'bg-indigo-900 border-indigo-500 text-white'
                                                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <span className="text-2xl leading-none">{ms.emoji || '•'}</span>
                                                <div className="p-1 rounded-md bg-white/10">
                                                    {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                                                    {isCurrent && <PlayCircle className="w-3.5 h-3.5" />}
                                                    {status === 'locked' && <Lock className="w-3.5 h-3.5" />}
                                                </div>
                                            </div>
                                            <p className="mt-2 font-black text-[12px] leading-tight line-clamp-2">{ms.title}</p>
                                            <p className={`mt-1 text-[9px] font-bold ${isActive || isCurrent || isCompleted ? 'text-white/60' : 'text-slate-400'}`}>
                                                {isCompleted ? 'Selesai' : isCurrent ? 'Sedang dipelajari' : 'Terkunci'}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {selectedMilestone && (
                            <div className="rounded-lg bg-white p-4 md:p-5 border border-slate-100 max-h-[500px] overflow-y-auto custom-scrollbar">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5 pb-5 border-b border-slate-100">
                                    <div>
                                        <h4 className="text-xl font-black text-slate-900 leading-tight">{selectedMilestone.title}</h4>
                                        <div className="flex flex-wrap items-center gap-2 mt-2">
                                            <span className="text-[10px] font-bold text-slate-400">Skill Focus:</span>
                                            {selectedMilestone.skill_gaps_addressed?.map((s: string) => (
                                                <span key={s} className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold">{s}</span>
                                            )) || <span className="text-[10px] text-slate-500 italic">Umum</span>}
                                        </div>
                                    </div>

                                    {(selectedMilestone.status === 'current' || selectedMilestone.status === 'completed') && (
                                        <div className="flex flex-col items-end gap-1">
                                            <Link
                                                href={route('roadmap.complete', selectedMilestone.id)}
                                                method="patch"
                                                as="button"
                                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0 ${selectedMilestone.status === 'completed'
                                                        ? 'bg-emerald-500 text-white'
                                                        : 'bg-indigo-900 text-white hover:bg-indigo-800'
                                                    }`}
                                            >
                                                {selectedMilestone.status === 'completed' ? 'Sudah Selesai' : 'Selesaikan Milestone'}
                                            </Link>
                                            {selectedMilestone.status === 'current' && selectedMilestone.capstone_project && (
                                                <span className="text-[9px] text-slate-400 font-bold italic">*Butuh Capstone Project</span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {loadingDetails ? (
                                    <div className="py-12 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin text-indigo-900 mx-auto mb-3" />
                                        <p className="text-sm font-bold text-slate-600">Menyusun strategi belajar terbaik...</p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="rounded-lg bg-indigo-900/5 p-4 border border-indigo-100">
                                            <h5 className="text-[11px] font-black text-indigo-900 mb-2 flex items-center gap-2">
                                                <Sparkles className="w-3.5 h-3.5" />
                                                Strategi Belajar
                                            </h5>
                                            <p className="text-[13px] text-slate-700 leading-relaxed font-medium">
                                                {selectedMilestone.why_important || 'Milestone ini membantu kamu memperkuat kompetensi inti secara bertahap.'}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {(selectedMilestone.resources || []).map((res: any, i: number) => {
                                                const isYoutube = res.type === 'youtube';
                                                
                                                return (
                                                    <a
                                                        key={i}
                                                        href={res.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="group flex flex-col bg-white border border-slate-100 rounded-lg overflow-hidden transition-all hover:shadow-xl hover:border-indigo-200 hover:-translate-y-1"
                                                    >
                                                        {isYoutube && res.thumbnail && (
                                                            <div className="relative aspect-video overflow-hidden bg-slate-100">
                                                                <img 
                                                                    src={res.thumbnail} 
                                                                    alt={res.title}
                                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                                />
                                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                                                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 transform transition-transform group-hover:scale-110">
                                                                        <PlayCircle className="w-6 h-6 fill-white" />
                                                                    </div>
                                                                </div>
                                                                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-bold">
                                                                    Video
                                                                </div>
                                                            </div>
                                                        )}
                                                        
                                                        <div className="p-4 flex flex-col flex-1">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                {isYoutube ? (
                                                                    <div className="px-2 py-0.5 rounded-lg bg-rose-50 text-rose-600 text-[9px] font-black border border-rose-100">YouTube</div>
                                                                ) : (
                                                                    <div className="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-600 text-[9px] font-black border border-indigo-100">Article</div>
                                                                )}
                                                                {res.channel && (
                                                                    <span className="text-[10px] font-bold text-slate-400 truncate flex-1 tracking-tight">
                                                                        {res.channel}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            
                                                            <h6 className="text-[13px] font-black text-slate-900 line-clamp-2 leading-snug group-hover:text-indigo-900 transition-colors">
                                                                {res.title}
                                                            </h6>
                                                            
                                                            <div className="mt-auto pt-4 flex items-center justify-between">
                                                                <span className="text-[10px] font-bold text-indigo-500 flex items-center gap-1 group-hover:gap-2 transition-all">
                                                                    {isYoutube ? 'Tonton Materi' : 'Baca Materi'}
                                                                    <ExternalLink className="w-3 h-3" />
                                                                </span>
                                                                {res.verified && (
                                                                    <div className="px-1.5 py-0.5 rounded-full bg-teal-50 text-teal-600 text-[8px] font-black">Verified</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </a>
                                                );
                                            })}
                                        </div>

                                        {selectedMilestone.capstone_project && (
                                            <div className="rounded-lg bg-linear-to-br from-indigo-900 to-navy-900 text-white p-5 shadow-xl">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="p-1.5 rounded-lg bg-white/10">
                                                        <TargetIcon className="w-4 h-4 text-cyan-300" />
                                                    </div>
                                                    <h5 className="text-[11px] font-black text-cyan-300">Capstone Project</h5>
                                                </div>
                                                <h6 className="text-lg font-black leading-tight mb-2">{selectedMilestone.capstone_project.title}</h6>
                                                <p className="text-[13px] text-indigo-100/80 leading-relaxed mb-4">{selectedMilestone.capstone_project.description}</p>

                                                <div className="flex flex-wrap gap-2 mb-5">
                                                    {selectedMilestone.capstone_project.tech_used?.map((tech: string) => (
                                                        <span key={tech} className="px-2 py-0.5 rounded bg-white/10 border border-white/10 text-[9px] font-bold text-white/90">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="pt-4 border-t border-white/10">
                                                    <Link
                                                        href={`/roadmap/${roadmap.id}/capstone/${selectedMilestone.id}`}
                                                        className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-black transition-all ${selectedMilestone.status === 'completed'
                                                                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                                                : 'bg-white text-indigo-900 hover:bg-cyan-50'
                                                            }`}
                                                    >
                                                        {selectedMilestone.status === 'completed' ? 'View Submission' : 'Start Project'}
                                                        <ExternalLink className="w-3 h-3" />
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                        {selectedMilestone.status === 'locked' && (
                                            <p className="text-xs font-bold text-slate-400 italic">Selesaikan milestone sebelumnya untuk membuka proyek ini.</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </AppLayout>
    );
}

