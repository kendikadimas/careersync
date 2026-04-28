import React, { useState, useMemo, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, router } from '@inertiajs/react';
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
            <Head title="Roadmap | Career-Sync" />

            {!roadmap ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-sm text-center px-6">
                    <div className="w-24 h-24 bg-navy-50 rounded-3xl flex items-center justify-center text-navy-900 mb-8">
                        <MapIcon className="w-12 h-12" />
                    </div>
                    <h2 className="text-3xl font-black text-navy-900 mb-4">Gunakan AI untuk Memandu Karirmu</h2>
                    <p className="max-w-md text-slate-500 mb-10">AI akan menganalisis <b>skill gap</b> kamu dan membuatkan rencana belajar untuk menutupinya.</p>
                    
                    <button 
                        onClick={handleGenerate}
                        disabled={loading}
                        className="relative overflow-hidden px-8 py-4 bg-navy-900 text-white rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-navy-900/20 hover:scale-105 transition-all disabled:opacity-50"
                    >
                        {loading && (
                            <div 
                                className="absolute bottom-0 left-0 h-1.5 bg-teal-400 transition-all duration-300 shadow-[0_0_10px_rgba(45,212,191,0.5)]"
                                style={{ width: `${progress}%` }}
                            ></div>
                        )}
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                        {loading ? `Menganalisis Skill Gap... ${progress}%` : 'Generate Target Roadmap'}
                    </button>
                </div>
            ) : (
                <div className="rounded-[2.25rem] bg-slate-200 p-4 md:p-6 border border-slate-300/80">
                    <div className="rounded-[1.75rem] bg-white/70 p-4 md:p-6 space-y-5">
                        <div className="rounded-3xl bg-white p-5 md:p-6 border border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h3 className="text-2xl font-extrabold text-slate-900">Adaptive Learning Roadmap</h3>
                                <p className="text-sm text-slate-500 mt-1">Menciptakan learning roadmap sesuai skill gap kamu.</p>
                                <div className="mt-3 inline-flex items-center gap-2 text-[11px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                                    <TargetIcon className="w-3.5 h-3.5 text-blue-600" />
                                    Target: {roadmap.career_target}
                                </div>
                            </div>

                            <button
                                onClick={handleGenerate}
                                disabled={loading}
                                className="relative overflow-hidden min-w-40 px-6 py-3 bg-indigo-900 text-white rounded-2xl font-bold text-sm hover:bg-indigo-800 transition-colors disabled:opacity-60"
                            >
                                {loading && (
                                    <div
                                        className="absolute left-0 bottom-0 h-1 bg-cyan-300 transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                )}
                                <span className="inline-flex items-center gap-2">
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                                    {loading ? `Updating ${progress}%` : 'Ciptakan!'}
                                </span>
                            </button>
                        </div>

                        <div className="rounded-3xl bg-white p-5 border border-slate-200">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[11px] font-bold tracking-wide uppercase text-slate-500">Progress Belajar</span>
                                <span className="text-sm font-bold text-slate-700">{completion}%</span>
                            </div>
                            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-900 transition-all duration-700" style={{ width: `${completion}%` }}></div>
                            </div>
                        </div>

                        <div className="overflow-x-auto pb-2">
                            <div className="flex gap-3 min-w-max">
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
                                            className={`w-55 min-h-35 rounded-2xl p-4 text-left transition-all border ${
                                                isActive
                                                    ? 'bg-indigo-900 border-indigo-300 text-white shadow-lg'
                                                    : isCompleted
                                                    ? 'bg-indigo-900 border-indigo-400 text-white'
                                                    : isCurrent
                                                    ? 'bg-indigo-900 border-indigo-500 text-white'
                                                    : 'bg-slate-100 border-slate-200 text-slate-600'
                                            }`}
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <span className="text-3xl leading-none">{ms.emoji || '•'}</span>
                                                {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                                                {isCurrent && <PlayCircle className="w-4 h-4" />}
                                                {status === 'locked' && <Lock className="w-4 h-4" />}
                                            </div>
                                            <p className="mt-3 font-bold text-sm leading-snug">{ms.title}</p>
                                            <p className={`mt-2 text-[11px] font-semibold ${isActive || isCurrent || isCompleted ? 'text-white/80' : 'text-slate-500'}`}>
                                                {isCompleted ? 'Selesai' : isCurrent ? 'Sedang dipelajari' : 'Terkunci'}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {selectedMilestone && (
                            <div className="rounded-3xl bg-white p-5 md:p-6 border border-slate-200">
                                <h4 className="text-2xl font-extrabold text-slate-900">Detail Milestone: {selectedMilestone.title}</h4>
                                <p className="text-sm text-slate-500 mt-1">
                                    Melengkapi skill gap: {selectedMilestone.skill_gaps_addressed?.join(', ') || 'kompetensi inti'}
                                </p>

                                {loadingDetails ? (
                                    <div className="mt-6 rounded-2xl bg-slate-100 p-6 text-center">
                                        <div className="inline-flex w-16 h-16 items-center justify-center rounded-2xl bg-indigo-900 text-white mb-4">
                                            <Loader2 className="w-8 h-8 animate-spin" />
                                        </div>
                                        <p className="text-sm font-semibold text-slate-700">AI sedang menyusun materi pembelajaran...</p>
                                        <div className="mt-4 h-2 w-full max-w-sm mx-auto rounded-full bg-slate-200 overflow-hidden">
                                            <div className="h-full bg-indigo-900 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-6 space-y-6">
                                        <div className="rounded-xl bg-indigo-900 text-white p-5">
                                            <p className="text-sm leading-relaxed">{selectedMilestone.why_important || 'Milestone ini membantu kamu memperkuat kompetensi inti secara bertahap.'}</p>
                                        </div>

                                        <div>
                                            <h5 className="text-xl font-extrabold text-slate-900 mb-3">Materi Pilihan</h5>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                {(selectedMilestone.resources || []).map((res: any, i: number) => (
                                                    <a
                                                        key={i}
                                                        href={res.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="rounded-xl bg-slate-200 hover:bg-slate-300 transition-colors p-4 min-h-22 flex items-center justify-between gap-3"
                                                    >
                                                        <div>
                                                            <p className="text-xs font-semibold uppercase text-slate-500">{res.type || 'resource'}</p>
                                                            <p className="text-sm font-bold text-slate-800 mt-1 line-clamp-2">{res.title}</p>
                                                        </div>
                                                        <ExternalLink className="w-4 h-4 text-slate-500 shrink-0" />
                                                    </a>
                                                ))}
                                                {(!selectedMilestone.resources || selectedMilestone.resources.length === 0) && (
                                                    <div className="col-span-full rounded-xl bg-slate-100 p-4 text-sm text-slate-500">
                                                        Materi belum tersedia untuk milestone ini.
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {selectedMilestone.capstone_project && (
                                            <div className="rounded-xl bg-indigo-900 text-white p-6">
                                                <h5 className="text-2xl font-extrabold">Capstone Project</h5>
                                                <h6 className="text-lg font-bold mt-2">{selectedMilestone.capstone_project.title}</h6>
                                                <p className="text-sm text-indigo-100 mt-2 max-w-3xl">{selectedMilestone.capstone_project.description}</p>
                                                <div className="flex flex-wrap gap-2 mt-4">
                                                    {selectedMilestone.capstone_project.tech_used?.map((tech: string) => (
                                                        <span key={tech} className="px-2.5 py-1 rounded-lg bg-white/15 border border-white/20 text-[11px] font-semibold uppercase">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="mt-6">
                                                    {(selectedMilestone.status === 'current' || selectedMilestone.status === 'completed') && (
                                                        <a
                                                            href={`/roadmap/${roadmap.id}/capstone/${selectedMilestone.id}`}
                                                            className={`inline-flex min-w-55 justify-center rounded-xl px-5 py-3 text-sm font-bold transition-colors ${
                                                                selectedMilestone.status === 'completed'
                                                                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                                                    : 'bg-white text-indigo-900 hover:bg-indigo-100'
                                                            }`}
                                                        >
                                                            {selectedMilestone.status === 'completed'
                                                                ? 'View Submission Score'
                                                                : 'Submit Project'}
                                                        </a>
                                                    )}
                                                    {selectedMilestone.status === 'locked' && (
                                                        <p className="text-sm text-indigo-100">Selesaikan milestone sebelumnya untuk membuka capstone.</p>
                                                    )}
                                                </div>
                                            </div>
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

