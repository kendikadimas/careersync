import AppLayout from '@/Layouts/AppLayout';
import { Head, router } from '@inertiajs/react';
import { Trophy, Shield, ChevronUp } from 'lucide-react';

export default function Leaderboard({ leaders, current_user_rank, user_opted_in }: any) {
    
    const handleToggleOptIn = () => {
        router.post(route('leaderboard.opt-in'), {}, { preserveScroll: true });
    };

    const getRankColor = (rank: string) => {
        switch(rank) {
            case 'Elite': return 'text-purple-400';
            case 'Expert': return 'text-amber-400';
            case 'Practitioner': return 'text-blue-400';
            case 'Developer': return 'text-teal-400';
            default: return 'text-slate-400';
        }
    };

    return (
        <AppLayout>
            <Head title="Leaderboard" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
                
                {/* HERO HEADER CARD */}
                <div className="relative overflow-hidden rounded-lg bg-indigo-900 text-white shadow-2xl">
                    {/* Background Patterns */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-20 -mt-20 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400 rounded-full -ml-20 -mb-20 blur-3xl"></div>
                    </div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center p-8 md:p-10 gap-8">
                        <div className="text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest mb-4">
                                <Trophy className="w-3 h-3 text-amber-400" />
                                Talent Competition
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Top Talent Indonesia</h1>
                            <p className="text-indigo-100/70 text-sm max-w-md font-medium">Peringkat talenta terbaik berdasarkan pengumpulan badge dan Work Readiness Score standar industri.</p>
                        </div>
                        
                        <div className="flex flex-col items-center md:items-end gap-4">
                            <div className="flex items-center gap-8">
                                {user_opted_in && current_user_rank && (
                                    <div className="text-center md:text-right border-r border-white/10 pr-8">
                                        <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-1">Peringkat Kamu</p>
                                        <p className="text-4xl font-black text-white">#{current_user_rank}</p>
                                    </div>
                                )}
                                <div className="text-center md:text-right">
                                    <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-1">Status Visibilitas</p>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={!user_opted_in} 
                                            onChange={handleToggleOptIn}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-indigo-800 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                                        <span className="ml-3 text-xs font-black uppercase tracking-widest text-indigo-100">
                                            {user_opted_in ? 'Public' : 'Incognito'}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PODIUM TOP 3 */}
                <div className="flex flex-col sm:flex-row justify-center items-end gap-0 sm:gap-4 md:gap-8 pt-10 pb-4 px-4 overflow-x-auto sm:overflow-x-visible no-scrollbar">
                    {[1, 0, 2].map(idx => {
                        const leader = leaders[idx];
                        if (!leader) return null;
                        const isFirst = idx === 0;
                        const isSecond = idx === 1;
                        const isThird = idx === 2;

                        return (
                            <div key={leader.id} className={`flex flex-col items-center flex-shrink-0 sm:flex-shrink w-64 sm:w-1/3 max-w-[260px] group transition-all duration-500 ${isFirst ? 'z-10 -mb-2' : 'z-0'}`}>
                                {/* Avatar & Top Badges */}
                                <div className="relative mb-6">
                                    <div className={`w-20 h-20 rounded-full p-1 bg-white shadow-2xl flex items-center justify-center text-2xl font-black relative z-10 border-4 ${
                                        isFirst ? 'border-amber-400 w-24 h-24 text-3xl' : 
                                        isSecond ? 'border-slate-300' : 'border-amber-700'
                                    }`}>
                                        <span className="text-slate-800">{leader.name.charAt(0)}</span>
                                        
                                        {/* Badge Overlay */}
                                        <div className="absolute -bottom-2 -right-2 flex -space-x-2">
                                            {leader.top_badges?.slice(0, 2).map((b: any, i: number) => (
                                                <div key={i} className="w-8 h-8 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-sm" title={b.name}>
                                                    {b.emoji}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {isFirst && (
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-amber-400 drop-shadow-lg animate-bounce">
                                            <Trophy className="w-8 h-8 fill-amber-400" />
                                        </div>
                                    )}
                                </div>

                                <div className="text-center mb-4">
                                    <h4 className={`font-black tracking-tight ${isFirst ? 'text-xl' : 'text-lg'} text-slate-900 line-clamp-1`}>{leader.name}</h4>
                                    <p className={`text-[10px] font-black uppercase tracking-widest ${getRankColor(leader.rank)}`}>{leader.rank}</p>
                                </div>

                                {/* Base */}
                                <div className={`w-full rounded-lg shadow-xl transition-all duration-500 group-hover:-translate-y-2 flex flex-col items-center justify-start pt-8 pb-10 border-b-8
                                    ${isFirst ? 'h-64 bg-white border-amber-400' : 
                                      isSecond ? 'h-52 bg-white/80 border-slate-300' : 
                                      'h-44 bg-white/60 border-amber-700'}`}
                                >
                                    <div className={`text-6xl font-black mb-4 opacity-5 ${
                                        isFirst ? 'text-amber-500' : isSecond ? 'text-slate-500' : 'text-amber-900'
                                    }`}>
                                        {idx + 1}
                                    </div>
                                    <div className="text-3xl font-black text-slate-900 leading-none">{leader.total_points.toLocaleString()}</div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Points Total</div>
                                    
                                    <div className={`mt-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                        leader.score >= 80 ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-600'
                                    }`}>
                                        Score: {leader.score || 0}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* LEADERBOARD TABLE */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Ranking List</h3>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{leaders.length} Talenta Terdaftar</span>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                    <th className="px-6 py-4 w-20 text-center">Rank</th>
                                    <th className="px-6 py-4">Talent Profile</th>
                                    <th className="px-6 py-4 hidden md:table-cell">Target Karir</th>
                                    <th className="px-6 py-4 text-center">Achievements</th>
                                    <th className="px-6 py-4 text-center">Readiness</th>
                                    <th className="px-6 py-4 text-right">Points</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {leaders.map((leader: any, idx: number) => {
                                    const isMe = leader.is_current_user;
                                    const rank = idx + 1;
                                    
                                    return (
                                        <tr key={leader.id} className={`group transition-all hover:bg-slate-50/50 ${isMe ? 'bg-indigo-50/30' : ''}`}>
                                            <td className="px-6 py-5">
                                                <div className="flex justify-center">
                                                    {rank === 1 ? (
                                                        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-black text-xs border border-amber-200">1</div>
                                                    ) : rank === 2 ? (
                                                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-black text-xs border border-slate-200">2</div>
                                                    ) : rank === 3 ? (
                                                        <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center font-black text-xs border border-amber-100">3</div>
                                                    ) : (
                                                        <span className="font-bold text-slate-400 text-sm">#{rank}</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center font-black text-slate-700 text-sm group-hover:scale-110 transition-transform">
                                                        {leader.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-black text-slate-900 text-sm">{leader.name}</span>
                                                            {isMe && <span className="px-1.5 py-0.5 rounded bg-indigo-900 text-white text-[8px] font-black uppercase tracking-widest">You</span>}
                                                        </div>
                                                        <p className={`text-[9px] font-black uppercase tracking-widest ${getRankColor(leader.rank)}`}>{leader.rank}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 hidden md:table-cell">
                                                <span className="text-[11px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded uppercase tracking-tight border border-slate-100">
                                                    {leader.career_target || 'Generalist'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex justify-center -space-x-2">
                                                    {leader.top_badges?.map((b: any, i:number) => (
                                                        <div key={i} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sm shadow-sm border border-slate-100 hover:z-10 transition-all hover:-translate-y-1 cursor-default" title={b.name}>{b.emoji}</div>
                                                    ))}
                                                    {leader.badges_count > 3 && (
                                                        <div className="w-8 h-8 rounded-full bg-slate-800 text-white text-[9px] font-black flex items-center justify-center border border-white">+{leader.badges_count - 3}</div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <div className="inline-flex items-center gap-1.5">
                                                    <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                                        <div 
                                                            className={`h-full rounded-full ${leader.score >= 80 ? 'bg-emerald-500' : leader.score >= 60 ? 'bg-indigo-500' : 'bg-amber-500'}`}
                                                            style={{ width: `${leader.score}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-[11px] font-black text-slate-900 w-6">{leader.score}%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <span className="text-sm font-black text-indigo-600">{leader.total_points.toLocaleString()}</span>
                                            </td>
                                        </tr>
                                    )
                                })}
                                {leaders.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                                                    <Trophy className="w-8 h-8 text-slate-200" />
                                                </div>
                                                <p className="text-sm font-bold text-slate-400">Belum ada talenta di leaderboard.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
        </AppLayout>
    );
}
