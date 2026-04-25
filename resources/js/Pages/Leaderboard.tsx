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
        <AppLayout header="Leaderboard & Gamification">
            <Head title="Leaderboard" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                
                {/* HEADER INFO */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                    <div>
                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                            <Trophy className="text-amber-400" />
                            Top Talent Indonesia
                        </h3>
                        <p className="text-slate-400 mt-1">Berdasarkan badge yang diraih dan Work Readiness Score.</p>
                    </div>
                    
                    <div className="mt-6 md:mt-0 flex items-center gap-6">
                        {user_opted_in ? (
                            current_user_rank ? (
                                <div className="text-center">
                                    <div className="text-sm text-slate-400">Posisi Kamu</div>
                                    <div className="text-3xl font-black text-teal-400">#{current_user_rank}</div>
                                </div>
                            ) : (
                                <div className="text-sm text-amber-400">Kamu belum mengumpulkan badge.</div>
                            )
                        ) : (
                            <div className="text-sm text-slate-400">Kamu sedang hidden.</div>
                        )}
                        
                        <label className="flex items-center gap-2 cursor-pointer bg-slate-900 px-4 py-2 rounded-xl">
                            <input 
                                type="checkbox" 
                                checked={!user_opted_in} 
                                onChange={handleToggleOptIn}
                                className="rounded bg-slate-700 border-slate-600 text-teal-500 focus:ring-teal-500"
                            />
                            <span className="text-sm text-slate-300">Incognito Mode</span>
                        </label>
                    </div>
                </div>

                {/* PODIUM TOP 3 */}
                <div className="flex flex-col sm:flex-row justify-center items-end gap-4 mt-12 mb-8 h-64">
                    {[1, 0, 2].map(idx => {
                        const leader = leaders[idx];
                        if (!leader) return null;
                        const isFirst = idx === 0;
                        const isSecond = idx === 1;

                        return (
                            <div key={leader.id} className="flex flex-col items-center w-full sm:w-1/3 max-w-[200px]">
                                <div className="flex gap-1 mb-3">
                                    {leader.top_badges?.map((b: any, i: number) => (
                                        <span key={i} className="text-xl" title={b.name}>{b.emoji}</span>
                                    ))}
                                </div>
                                <div className={`font-bold text-center ${isFirst ? 'text-amber-400 text-xl' : 'text-slate-200'} truncate w-full`}>
                                    {leader.name}
                                </div>
                                <div className={`text-xs font-semibold ${getRankColor(leader.rank)} mb-2`}>{leader.rank}</div>
                                <div className={`w-full rounded-t-xl flex flex-col items-center justify-start pt-4 border-t border-x overflow-hidden relative
                                    ${isFirst ? 'h-48 bg-amber-500/10 border-amber-500/30' : 
                                      isSecond ? 'h-40 bg-slate-300/10 border-slate-300/30' : 
                                      'h-32 bg-amber-700/10 border-amber-700/30'}`}
                                >
                                    <div className={`text-4xl font-black mb-1 opacity-20 ${isFirst ? 'text-amber-500' : isSecond ? 'text-white' : 'text-amber-700'}`}>
                                        #{idx + 1}
                                    </div>
                                    <div className="font-bold text-white text-lg">{leader.total_points}</div>
                                    <div className="text-xs text-slate-400 uppercase tracking-wider">Points</div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* LEADERBOARD TABLE */}
                <div className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-900/50 text-slate-400 text-sm border-b border-slate-700">
                                <th className="p-4 w-16 text-center">Rank</th>
                                <th className="p-4">Talent</th>
                                <th className="p-4 hidden md:table-cell">Target Role</th>
                                <th className="p-4 text-center">Badges</th>
                                <th className="p-4 text-center">Score</th>
                                <th className="p-4 text-right">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaders.map((leader: any, idx: number) => {
                                const isMe = leader.is_current_user;
                                return (
                                    <tr key={leader.id} className={`border-b border-slate-700/50 hover:bg-slate-700/30 transition
                                        ${isMe ? 'bg-teal-900/20 border-l-4 border-l-teal-500' : ''}`}
                                    >
                                        <td className="p-4 text-center font-bold text-slate-400">
                                            #{idx + 1}
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold text-slate-200">{leader.name} {isMe && <span className="text-xs text-teal-400 ml-2">(You)</span>}</div>
                                            <div className={`text-xs font-semibold ${getRankColor(leader.rank)}`}>{leader.rank}</div>
                                        </td>
                                        <td className="p-4 text-sm text-slate-400 hidden md:table-cell truncate max-w-[150px]">
                                            {leader.career_target}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-center gap-1">
                                                {leader.top_badges?.map((b: any, i:number) => (
                                                    <span key={i} className="text-lg bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center border border-slate-600" title={b.name}>{b.emoji}</span>
                                                ))}
                                                {leader.badges_count > 3 && (
                                                    <span className="text-xs bg-slate-800 text-slate-400 w-8 h-8 rounded-full flex items-center justify-center border border-slate-600">+{leader.badges_count - 3}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            {leader.score > 0 ? (
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${leader.score >= 80 ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-300'}`}>
                                                    {leader.score}
                                                </span>
                                            ) : '-'}
                                        </td>
                                        <td className="p-4 text-right font-bold text-slate-200">
                                            {leader.total_points}
                                        </td>
                                    </tr>
                                )
                            })}
                            {leaders.length === 0 && (
                                <tr><td colSpan={6} className="p-8 text-center text-slate-400">Belum ada talenta di leaderboard.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
