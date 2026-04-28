import AppLayout from '@/Layouts/AppLayout';
import { Head, router } from '@inertiajs/react';
import { RefreshCw, Target, TrendingUp, Zap, ArrowRight, Lightbulb } from 'lucide-react';
import { useState } from 'react';

export default function Insights({ insights, smart_tips, score, generated_at, profile }: any) {
    const [isRegenerating, setIsRegenerating] = useState(false);

    const handleRegenerate = () => {
        setIsRegenerating(true);
        router.post(route('insights.regenerate'), {}, {
            preserveScroll: true,
            onFinish: () => setIsRegenerating(false)
        });
    };

    if (!insights) {
        return (
            <AppLayout header="AI Insights">
                <Head title="AI Insights" />
                <div className="py-12 flex justify-center text-slate-400">Belum ada insight. Silakan analisis CV terlebih dahulu.</div>
            </AppLayout>
        );
    }

    const { headline_insight, strength_insight, gap_insight, progress_insight, market_position, next_milestone_tip } = insights;

    return (
        <AppLayout header="AI Career Insights">
            <Head title="AI Insights" />
            
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                
                {/* HEADLINE */}
                <div className="bg-gradient-to-r from-navy-800 to-teal-900/40 rounded-3xl p-8 border border-teal-500/20 relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold text-white mb-4 leading-tight">{headline_insight}</h3>
                        <div className="flex items-center gap-4 text-sm">
                            <span className="text-teal-200/60">Diperbarui {generated_at}</span>
                            <button 
                                onClick={handleRegenerate}
                                disabled={isRegenerating}
                                className="flex items-center gap-2 text-teal-300 hover:text-white transition bg-teal-500/10 px-3 py-1.5 rounded-full"
                            >
                                <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
                                {isRegenerating ? 'Memperbarui...' : 'Perbarui AI Insights'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* 3 INSIGHT CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-teal-500/20">
                        <div className="text-4xl mb-4">{strength_insight?.emoji || '💪'}</div>
                        <h4 className="font-bold text-teal-300 mb-2">{strength_insight?.title}</h4>
                        <p className="text-slate-300 text-sm">{strength_insight?.message}</p>
                    </div>

                    <div className={`bg-slate-800/50 rounded-2xl p-6 border ${gap_insight?.urgency === 'high' ? 'border-amber-500/30' : 'border-slate-700'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="text-4xl">{gap_insight?.emoji || '🎯'}</div>
                            {gap_insight?.urgency && (
                                <span className={`text-xs px-2 py-1 rounded-md font-medium ${gap_insight.urgency === 'high' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-slate-300'}`}>
                                    {gap_insight.urgency.toUpperCase()}
                                </span>
                            )}
                        </div>
                        <h4 className={`font-bold mb-2 ${gap_insight?.urgency === 'high' ? 'text-amber-400' : 'text-slate-200'}`}>{gap_insight?.title}</h4>
                        <p className="text-slate-300 text-sm">{gap_insight?.message}</p>
                    </div>

                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-blue-500/20">
                        <div className="text-4xl mb-4">{progress_insight?.emoji || '🚀'}</div>
                        <h4 className="font-bold text-blue-300 mb-2">{progress_insight?.title}</h4>
                        <p className="text-slate-300 text-sm">{progress_insight?.message}</p>
                    </div>
                </div>

                {/* MARKET POSITION */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 flex items-center gap-6">
                    <div className="p-4 bg-slate-700/50 rounded-xl text-indigo-400 shrink-0">
                        <Target className="w-8 h-8" />
                    </div>
                    <div>
                        <h4 className="text-sm text-slate-400 font-medium mb-1">Posisimu di Pasar</h4>
                        <p className="text-lg text-slate-200 font-medium">{market_position}</p>
                    </div>
                </div>

                {/* SMART TIPS */}
                <div className="mt-12">
                    <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                        <Lightbulb className="text-amber-400" />
                        Langkah Konkret Minggu Ini
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {smart_tips.map((tip: any, idx: number) => (
                            <div key={idx} className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 hover:border-teal-500/30 transition">
                                <div className="flex gap-4">
                                    <div className="text-4xl shrink-0">{tip.emoji}</div>
                                    <div>
                                        <div className="flex gap-2 mb-2">
                                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                                                Prioritas {tip.priority}
                                            </span>
                                            <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                                                tip.category === 'skill' ? 'bg-indigo-900/20 text-indigo-300' :
                                                tip.category === 'project' ? 'bg-purple-500/20 text-purple-400' :
                                                tip.category === 'mindset' ? 'bg-amber-500/20 text-amber-400' :
                                                'bg-teal-500/20 text-teal-400'
                                            }`}>
                                                {tip.category.toUpperCase()}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-slate-100 mb-2">{tip.title}</h4>
                                        <p className="text-sm text-slate-400 mb-3">{tip.description}</p>
                                        <div className="text-xs text-slate-500 flex items-center gap-1">
                                            ⏱ {tip.time_estimate}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* NEXT MILESTONE */}
                <div className="bg-navy-800 rounded-2xl p-6 border border-slate-700 mt-8 text-center flex flex-col items-center">
                    <Zap className="w-8 h-8 text-amber-400 mb-4" />
                    <p className="text-lg text-slate-200 mb-6 max-w-2xl">{next_milestone_tip}</p>
                    <button 
                        onClick={() => router.get(route('roadmap'))}
                        className="bg-teal-500 hover:bg-teal-400 text-navy-900 font-bold px-6 py-3 rounded-xl transition flex items-center gap-2"
                    >
                        Buka Roadmap <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}


