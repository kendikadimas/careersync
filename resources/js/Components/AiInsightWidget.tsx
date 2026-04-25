import React from 'react';
import { Sparkles, TrendingUp, Target, Zap, Lightbulb, MessageSquareQuote } from 'lucide-react';

interface Props {
    insight: any;
    type?: 'summary' | 'strength' | 'gap' | 'progress';
    className?: string;
}

export default function AiInsightWidget({ insight, type = 'summary', className = '' }: Props) {
    if (!insight || (type === 'summary' && !insight.headline_insight)) return null;

    const renderContent = () => {
        switch (type) {
            case 'summary':
                return (
                    <div className={`bg-white border-l-4 border-teal-500 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all flex items-start gap-5 group relative overflow-hidden ${className}`}>
                        <div className="absolute -right-4 -top-4 w-16 h-16 bg-teal-50 rounded-full opacity-50 group-hover:scale-125 transition-transform duration-700"></div>
                        
                        <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                            <Sparkles className="w-6 h-6 animate-pulse" />
                        </div>
                        
                        <div className="flex-1 relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <h4 className="text-[10px] font-black text-navy-900 uppercase tracking-[0.2em]">AI Mentor Feedback</h4>
                                <div className="h-px flex-1 bg-slate-100"></div>
                            </div>
                            <p className="text-sm md:text-base font-semibold leading-relaxed text-navy-800 italic">
                                "{insight.headline_insight}"
                            </p>
                            
                            <div className="mt-3 flex items-center gap-4">
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-full text-[10px] font-bold text-slate-500">
                                    <TrendingUp className="w-3 h-3" />
                                    {insight.market_position || 'Status: Active'}
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-full text-[10px] font-bold text-amber-600">
                                    <Lightbulb className="w-3 h-3" />
                                    {insight.next_milestone_tip ? 'New Tip Available' : 'On Track'}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'strength':
                return (
                    <div className={`bg-teal-50/50 backdrop-blur-sm border border-teal-100 p-5 rounded-2xl flex gap-4 ${className}`}>
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-lg shrink-0 shadow-sm">
                            {insight.strength_insight?.emoji || '💪'}
                        </div>
                        <div>
                            <h4 className="font-black text-teal-900 text-sm mb-1">{insight.strength_insight?.title}</h4>
                            <p className="text-xs text-teal-700 leading-relaxed font-medium">{insight.strength_insight?.message}</p>
                        </div>
                    </div>
                );
            case 'gap':
                return (
                    <div className={`bg-amber-50/50 backdrop-blur-sm border border-amber-100 p-5 rounded-2xl flex gap-4 ${className}`}>
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-lg shrink-0 shadow-sm">
                            {insight.gap_insight?.emoji || '🎯'}
                        </div>
                        <div>
                            <h4 className="font-black text-amber-900 text-sm mb-1">{insight.gap_insight?.title}</h4>
                            <p className="text-xs text-amber-700 leading-relaxed font-medium">{insight.gap_insight?.message}</p>
                            <div className="mt-2 text-[8px] font-black uppercase text-amber-600 px-2 py-0.5 bg-white w-fit rounded-full border border-amber-100">
                                Urgency: {insight.gap_insight?.urgency || 'Medium'}
                            </div>
                        </div>
                    </div>
                );
            case 'progress':
                return (
                    <div className={`bg-navy-50 border border-navy-100 p-5 rounded-2xl flex gap-4 ${className}`}>
                        <div className="text-2xl">{insight.progress_insight?.emoji || '🚀'}</div>
                        <div>
                            <h4 className="font-black text-navy-900 text-sm mb-1">{insight.progress_insight?.title}</h4>
                            <p className="text-xs text-navy-700 leading-relaxed font-medium">{insight.progress_insight?.message}</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return renderContent();
}
