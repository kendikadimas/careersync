import React, { useState, useMemo, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, router } from '@inertiajs/react';
import { 
    ReactFlow, 
    MiniMap, 
    Controls, 
    Background, 
    Handle, 
    Position,
    NodeProps
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
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
    BookOpen
} from 'lucide-react';

// Custom Milestone Node
const MilestoneNode = ({ data }: NodeProps | any) => {
    const status = data.status as string || 'locked';
    const colors = {
        completed: 'bg-teal-50 border-teal-500 border-2',
        current: 'bg-navy-50 border-navy-600 border-2 ring-4 ring-navy-200',
        locked: 'bg-slate-50 border-slate-200 border-2 opacity-60'
    } as any;

    return (
        <div 
            className={`p-4 rounded-2xl w-56 transition-all duration-300 group cursor-pointer ${colors[status]}`}
            onClick={() => data.onSelect(data)}
        >
            <Handle type="target" position={Position.Top} className="bg-slate-300!" />
            <div className="flex flex-col items-center text-center">
                <div className="text-4xl mb-3 transform transition-transform group-hover:scale-110 duration-300">{data.emoji as string}</div>
                <div className="font-black text-xs text-navy-900 leading-tight mb-2 uppercase tracking-wide">{data.title as string}</div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                    <Clock className="w-3 h-3" />
                    {data.duration_weeks as number} Minggu
                </div>
                
                <div className="mt-3 w-full">
                    {status === 'completed' && (
                        <div className="text-[10px] font-black text-teal-600 bg-teal-100/50 py-1 rounded-lg flex items-center justify-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> SELESAI
                        </div>
                    )}
                    {status === 'current' && (
                        <div className="text-[10px] font-black text-navy-700 bg-navy-200/50 py-1 rounded-lg flex items-center justify-center gap-1">
                            <PlayCircle className="w-3 h-3" /> SEDANG DIPELAJARI
                        </div>
                    )}
                    {status === 'locked' && (
                        <div className="text-[10px] font-black text-slate-400 py-1 rounded-lg flex items-center justify-center gap-1">
                            <Lock className="w-3 h-3" /> TERKUNCI
                        </div>
                    )}
                </div>
            </div>
            <Handle type="source" position={Position.Bottom} className="bg-slate-300!" />
        </div>
    );
};

const nodeTypes = {
    milestone: MilestoneNode,
};

export default function Roadmap({ roadmap, profile }: any) {
    const [selectedMilestone, setSelectedMilestone] = useState<any>(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSelect = (data: any) => {
        setSelectedMilestone(data);
        setIsPanelOpen(true);
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
                setSelectedMilestone({ ...selectedMilestone, status: 'completed' });
            }
        });
    };

    const { nodes, edges } = useMemo(() => {
        if (!roadmap || !roadmap.roadmap_data?.milestones) return { nodes: [], edges: [] };

        const milestones = roadmap.roadmap_data.milestones;
        const initialNodes = milestones.map((ms: any, i: number) => ({
            id: ms.id,
            type: 'milestone',
            position: { x: 200, y: i * 250 },
            data: { ...ms, onSelect: handleSelect }
        }));

        const initialEdges = milestones.slice(0, -1).map((ms: any, i: number) => ({
            id: `e${i}`,
            source: ms.id,
            target: milestones[i+1].id,
            type: 'smoothstep',
            animated: milestones[i].status === 'current' || milestones[i].status === 'completed',
            style: { 
                stroke: milestones[i].status === 'completed' ? '#0d9488' : '#e2e8f0', 
                strokeWidth: 3 
            }
        }));

        return { nodes: initialNodes, edges: initialEdges };
    }, [roadmap]);

    return (
        <AppLayout header="Learning Roadmap">
            <Head title="Roadmap | Career-Sync" />

            {!roadmap ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-sm text-center px-6">
                    <div className="w-24 h-24 bg-navy-50 rounded-3xl flex items-center justify-center text-navy-900 mb-8">
                        <MapIcon className="w-12 h-12" />
                    </div>
                    <h2 className="text-3xl font-black text-navy-900 mb-4">Gunakan AI untuk Memandu Karirmu</h2>
                    <p className="max-w-md text-slate-500 mb-10">Kami akan membuatkan learning path khusus berdasarkan CV dan gap skill yang kamu miliki saat ini.</p>
                    
                    <button 
                        onClick={handleGenerate}
                        disabled={loading}
                        className="px-8 py-4 bg-navy-900 text-white rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-navy-900/20 hover:scale-105 transition-all disabled:opacity-50"
                    >
                        {loading ? (
                             <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : <Sparkles className="w-6 h-6" />}
                        {loading ? 'Menghasilkan Roadmap...' : 'Generate AI Roadmap'}
                    </button>
                    {!profile && (
                        <p className="mt-6 text-sm text-amber-600 font-bold flex items-center gap-2">
                             Silakan selesaikan analisis profile/CV terlebih dahulu di menu "Analisis Skill".
                        </p>
                    )}
                </div>
            ) : (
                <div className="h-[75vh] bg-white rounded-[3rem] border border-slate-200 shadow-inner relative overflow-hidden">
                    {/* Header Progress */}
                    <div className="absolute top-6 left-6 right-6 z-10 bg-white/80 backdrop-blur-md p-4 px-6 rounded-2xl border border-slate-100 flex items-center justify-between shadow-lg shadow-slate-200/50">
                        <div className="flex items-center gap-4">
                             <div className="w-10 h-10 bg-navy-900 rounded-xl flex items-center justify-center text-white">
                                 <MapIcon className="w-5 h-5" />
                             </div>
                             <div>
                                 <h3 className="font-black text-navy-900 text-sm uppercase tracking-wide">{roadmap.career_target}</h3>
                                 <p className="text-xs text-slate-400 font-bold">{roadmap.milestones_completed} dari {roadmap.total_milestones} Selesai</p>
                             </div>
                        </div>

                        <div className="flex-1 max-w-xs mx-10">
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-teal-500 transition-all duration-500" 
                                    style={{ width: `${(roadmap.milestones_completed / roadmap.total_milestones) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-navy-600">
                             <Clock className="w-4 h-4" />
                             <span className="text-sm font-black italic">{roadmap.roadmap_data.total_duration_weeks} Minggu</span>
                        </div>
                    </div>

                    <ReactFlow 
                        nodes={nodes} 
                        edges={edges} 
                        nodeTypes={nodeTypes}
                        fitView
                        className="bg-slate-50"
                    >
                        <Background color="#cbd5e1" gap={20} />
                        <Controls />
                        <MiniMap />
                    </ReactFlow>

                    {/* Detail Panel */}
                    <div 
                        className={`absolute top-0 right-0 bottom-0 w-full md:w-[450px] bg-white z-20 shadow-[-20px_0_40px_rgba(0,0,0,0.05)] transform transition-transform duration-500 ease-out flex flex-col ${
                            isPanelOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    >
                        {selectedMilestone && (
                            <>
                                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                                    <h3 className="text-xl font-black text-navy-900">Detail Milestone</h3>
                                    <button onClick={() => setIsPanelOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                                    <div className="flex items-center gap-6">
                                        <div className="text-6xl">{selectedMilestone.emoji}</div>
                                        <div>
                                            <h4 className="text-2xl font-black text-navy-900 mb-1">{selectedMilestone.title}</h4>
                                            <p className="text-teal-600 font-bold flex items-center gap-1.5">
                                                <Clock className="w-4 h-4" />
                                                {selectedMilestone.duration_weeks} Minggu
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-slate-50 rounded-2xl">
                                        <h5 className="font-black text-navy-900 text-xs uppercase tracking-widest mb-3">Kenapa Penting?</h5>
                                        <p className="text-sm text-slate-600 leading-relaxed font-medium">"{selectedMilestone.why_important}"</p>
                                    </div>

                                    <div>
                                        <h5 className="font-black text-navy-900 text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <BookOpen className="w-4 h-4" />
                                            Resources
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

                                    <div className="p-6 border-2 border-dashed border-slate-200 rounded-3xl">
                                        <h5 className="font-black text-navy-900 text-xs uppercase tracking-widest mb-3">🛠 Capstone Project</h5>
                                        <h6 className="font-black text-navy-800 mb-2">{selectedMilestone.capstone_project?.title}</h6>
                                        <p className="text-xs text-slate-500 leading-relaxed mb-4">{selectedMilestone.capstone_project?.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedMilestone.capstone_project?.tech_used?.map((tech: string) => (
                                                <span key={tech} className="px-2 py-1 bg-slate-100 text-[10px] font-bold rounded-md uppercase">{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 border-t border-slate-100">
                                    <button 
                                        disabled={selectedMilestone.status === 'completed' || selectedMilestone.status === 'locked'}
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
                                                Tandai Selesai
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
