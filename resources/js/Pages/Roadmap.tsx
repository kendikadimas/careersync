import React, { useState, useMemo, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, router } from '@inertiajs/react';
import { 
    Map as MapIcon, 
    Sparkles, 
    CheckCircle2, 
    Lock, 
    PlayCircle, 
    ArrowRight, 
    X,
    ExternalLink,
    Clock,
    BookOpen,
    ArrowLeftRight,
    ChevronRight,
    ChevronLeft,
    Loader2,
    Target as TargetIcon
} from 'lucide-react';
import axios from 'axios';

export default function Roadmap({ roadmap, profile }: any) {
    const [selectedMilestone, setSelectedMilestone] = useState<any>(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
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
        if (selectedMilestone && roadmap?.roadmap_data?.milestones) {
            const updated = roadmap.roadmap_data.milestones.find((m: any) => m.id === selectedMilestone.id);
            if (updated) setSelectedMilestone(updated);
        }
    }, [roadmap]);

    const handleSelect = async (ms: any) => {
        setSelectedMilestone(ms);
        setIsPanelOpen(true);

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

    const handleComplete = (id: string) => {
        router.patch(route('roadmap.complete', id), {}, {
            onSuccess: () => {
                const updated = roadmap.roadmap_data.milestones.find((m: any) => m.id === id);
                if (updated) setSelectedMilestone(updated);
            }
        });
    };

    const milestones = useMemo(() => roadmap?.roadmap_data?.milestones || [], [roadmap]);

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
                <div className="space-y-6">
                    {/* Header Progress */}
                    <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-navy-900 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-navy-900/10">
                                 <TargetIcon className="w-6 h-6" />
                             </div>
                             <div>
                                 <h3 className="font-black text-navy-900 text-lg uppercase tracking-tight">Roadmap: {roadmap.career_target}</h3>
                                 <div className="flex items-center gap-3 text-xs font-bold text-slate-400 mt-0.5">
                                    <span className="flex items-center gap-1 text-teal-600">Terfokus pada penutupan skill gap</span>
                                 </div>
                             </div>
                        </div>

                        <div className="flex-1 w-full max-w-md mx-0 md:mx-10 text-center">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Progress Belajar</span>
                            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-teal-500 transition-all duration-700 ease-out" 
                                    style={{ width: `${(roadmap.milestones_completed / roadmap.total_milestones) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <button 
                            onClick={handleGenerate}
                            disabled={loading}
                            className="relative overflow-hidden flex items-center gap-2 px-6 py-3 bg-navy-50 text-navy-900 rounded-2xl text-sm font-black hover:bg-navy-900 hover:text-white transition-all disabled:opacity-50 border border-navy-100"
                        >
                            {loading && (
                                <div 
                                    className="absolute bottom-0 left-0 h-1 bg-teal-500 transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            )}
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                            {loading ? `Updating... ${progress}%` : 'Update Roadmap'}
                        </button>
                    </div>

                    {/* Horizontal Timeline */}
                    <div className="relative group">
                        <div className="overflow-x-auto pb-10 pt-4 px-4 scrollbar-hide flex gap-6 items-start">
                            {milestones.map((ms: any, i: number) => {
                                const status = ms.status as string || 'locked';
                                const isCurrent = status === 'current';
                                const isCompleted = status === 'completed';
                                
                                return (
                                    <div key={ms.id} className="flex items-center">
                                        <div 
                                            onClick={() => handleSelect(ms)}
                                            className={`flex-shrink-0 w-72 p-6 rounded-[2rem] border-2 transition-all duration-300 cursor-pointer relative group/card ${
                                                isCompleted 
                                                ? 'bg-teal-50 border-teal-500 shadow-lg shadow-teal-500/5' 
                                                : isCurrent
                                                ? 'bg-white border-navy-600 shadow-xl shadow-navy-900/10 scale-105 z-10 ring-4 ring-navy-50'
                                                : 'bg-white border-slate-100 opacity-60 hover:opacity-100 hover:border-slate-200'
                                            }`}
                                        >
                                            <div className="flex flex-col items-center text-center">
                                                <div className="text-5xl mb-4 transform transition-transform group-hover/card:scale-110 duration-500">{ms.emoji}</div>
                                                <h4 className="font-black text-sm text-navy-900 leading-tight mb-2 uppercase tracking-wide h-10 flex items-center">{ms.title}</h4>
                                                
                                                {ms.skill_gaps_addressed && ms.skill_gaps_addressed.length > 0 && (
                                                    <div className="mb-4 flex flex-wrap justify-center gap-1">
                                                        {ms.skill_gaps_addressed.map((gap: string) => (
                                                            <span key={gap} className="px-2 py-0.5 bg-teal-50 text-teal-700 text-[9px] font-black rounded-md border border-teal-100">
                                                                🎯 {gap}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="w-full">
                                                    {isCompleted && (
                                                        <div className="py-2 px-4 bg-teal-500 text-white text-[10px] font-black rounded-xl flex items-center justify-center gap-2">
                                                            <CheckCircle2 className="w-3 h-3" /> SELESAI
                                                        </div>
                                                    )}
                                                    {isCurrent && (
                                                        <div className="py-2 px-4 bg-navy-900 text-white text-[10px] font-black rounded-xl flex items-center justify-center gap-2 animate-pulse">
                                                            <PlayCircle className="w-3 h-3" /> SEDANG DIPELAJARI
                                                        </div>
                                                    )}
                                                    {status === 'locked' && (
                                                        <div className="py-2 px-4 bg-slate-100 text-slate-400 text-[10px] font-black rounded-xl flex items-center justify-center gap-2">
                                                            <Lock className="w-3 h-3" /> TERKUNCI
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {i < milestones.length - 1 && (
                                            <div className="flex-shrink-0 w-12 flex flex-col items-center">
                                                <div className={`h-1 w-full ${isCompleted ? 'bg-teal-500' : 'bg-slate-100'}`}></div>
                                                <ChevronRight className={`w-4 h-4 -mt-2.5 ${isCompleted ? 'text-teal-500' : 'text-slate-200'}`} />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Detail Panel */}
                    <div 
                        className={`fixed top-0 right-0 bottom-0 w-full md:w-[500px] bg-white z-[60] shadow-2xl transform transition-transform duration-500 ease-out flex flex-col ${
                            isPanelOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    >
                        {selectedMilestone && (
                            <>
                                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                                    <h3 className="text-xl font-black text-navy-900">Detail Pembelajaran</h3>
                                    <button onClick={() => setIsPanelOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                                    {loadingDetails ? (
                                        <div className="flex flex-col items-center justify-center py-20 text-center">
                                            <div className="w-20 h-20 bg-teal-50 rounded-3xl flex items-center justify-center text-teal-600 mb-6 relative">
                                                <Loader2 className="w-10 h-10 animate-spin" />
                                                <div className="absolute inset-0 border-4 border-teal-500 border-t-transparent rounded-3xl animate-pulse"></div>
                                            </div>
                                            <h4 className="font-black text-navy-900 text-lg mb-2">AI sedang menyusun materi...</h4>
                                            <p className="text-sm text-slate-400 mb-8 px-10">Mempersiapkan jalur belajar terbaik untuk menutup gap <b>{selectedMilestone.skill_gaps_addressed?.join(', ') || 'kompetensi'}</b></p>
                                            
                                            <div className="w-full max-w-xs bg-slate-100 h-2.5 rounded-full overflow-hidden shadow-inner">
                                                <div 
                                                    className="h-full bg-teal-500 transition-all duration-300 ease-out shadow-[0_0_15px_rgba(20,184,166,0.5)]"
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-[10px] font-black text-teal-600 mt-3 uppercase tracking-widest">{progress}% SELESAI</span>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-6">
                                                <div className="text-6xl">{selectedMilestone.emoji}</div>
                                                <div className="flex-1">
                                                    <h4 className="text-2xl font-black text-navy-900 mb-2">{selectedMilestone.title}</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedMilestone.skill_gaps_addressed?.map((gap: string) => (
                                                            <span key={gap} className="px-3 py-1 bg-navy-900 text-white text-[10px] font-black rounded-lg inline-flex items-center gap-2">
                                                                <TargetIcon className="w-3 h-3" /> Gap: {gap}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-teal-500">
                                                <h5 className="font-black text-navy-900 text-xs uppercase tracking-widest mb-3">Tujuan Milestone</h5>
                                                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                                    Kurikulum ini dirancang khusus untuk menutup gap <b>{selectedMilestone.skill_gaps_addressed?.join(', ')}</b>. 
                                                    {selectedMilestone.why_important}
                                                </p>
                                            </div>

                                            <div>
                                                <h5 className="font-black text-navy-900 text-xs uppercase tracking-widest mb-4 flex items-center gap-2 font-bold underline">
                                                    <BookOpen className="w-4 h-4" />
                                                    Daftar Materi Terkurasi
                                                </h5>
                                                <div className="space-y-3">
                                                    {selectedMilestone.resources?.map((res: any, i: number) => (
                                                        <a 
                                                            key={i} 
                                                            href={res.url} 
                                                            target="_blank" 
                                                            className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-teal-500 group transition-all"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 group-hover:bg-teal-50 group-hover:text-teal-600">
                                                                    {res.type === 'youtube' ? '▶' : '📄'}
                                                                </div>
                                                                <span className="text-sm font-bold text-navy-800">{res.title}</span>
                                                            </div>
                                                            <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-teal-500" />
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>

                                            {selectedMilestone.capstone_project && (
                                                <div className="p-6 border-2 border-slate-100 rounded-3xl bg-teal-50/30">
                                                    <div className="flex items-center justify-between mb-4">
                                                         <h5 className="font-black text-navy-900 text-xs uppercase tracking-widest">🛠 Capstone Project</h5>
                                                         <span className="text-[10px] bg-teal-500 text-white px-2 py-0.5 rounded-full font-black">UJIAN SKILL</span>
                                                    </div>
                                                    <h6 className="font-black text-navy-800 mb-2">{selectedMilestone.capstone_project.title}</h6>
                                                    <p className="text-xs text-slate-500 leading-relaxed mb-4">{selectedMilestone.capstone_project.description}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedMilestone.capstone_project.tech_used?.map((tech: string) => (
                                                            <span key={tech} className="px-2 py-1 bg-white border border-slate-200 text-[10px] font-bold rounded-md uppercase">{tech}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                <div className="p-8 border-t border-slate-100">
                                    <button 
                                        disabled={loadingDetails || selectedMilestone.status === 'completed' || selectedMilestone.status === 'locked'}
                                        onClick={() => handleComplete(selectedMilestone.id)}
                                        className={`w-full p-4 rounded-xl font-black flex items-center justify-center gap-3 transition-all ${
                                            selectedMilestone.status === 'completed' 
                                            ? 'bg-teal-100 text-teal-600 cursor-default' 
                                            : selectedMilestone.status === 'locked'
                                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                            : 'bg-teal-500 text-white shadow-xl shadow-teal-500/20 hover:scale-[1.02] active:scale-95'
                                        }`}
                                    >
                                        {selectedMilestone.status === 'completed' ? (
                                            <>
                                                <CheckCircle2 className="w-6 h-6" />
                                                Sudah Selesai
                                            </>
                                        ) : (
                                            <>
                                                Tandai Selesai & Lulus
                                                <ArrowRight className="w-6 h-6" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
