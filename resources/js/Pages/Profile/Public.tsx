import { Head, Link } from '@inertiajs/react';
import { Code, ExternalLink, ShieldCheck, Award, Briefcase, Share2 } from 'lucide-react';
import { useState } from 'react';

export default function PublicProfile({ profile_user, projects, badges }: any) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-navy-900 text-slate-300 font-sans selection:bg-teal-500/30 selection:text-white">
            <Head title={`Portfolio | ${profile_user.name}`} />

            {/* NAVBAR SIMPLE */}
            <nav className="border-b border-slate-800 bg-navy-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="font-bold text-xl tracking-tighter text-white">Career<span className="text-teal-500">-Sync</span></Link>
                    <button onClick={handleCopy} className="flex items-center gap-2 text-sm bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition">
                        <Share2 className="w-4 h-4" /> {copied ? 'Tersalin!' : 'Bagikan Profil'}
                    </button>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-4 py-12 space-y-12">
                {/* HERO HEADER */}
                <div className="bg-gradient-to-br from-slate-900 to-navy-800 border border-slate-700 p-8 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10 blur-xl">
                        <div className="w-48 h-48 bg-teal-500 rounded-full"></div>
                    </div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-8 text-center md:text-left">
                        <div className="w-32 h-32 bg-gradient-to-tr from-teal-500 to-blue-600 rounded-full flex justify-center items-center text-6xl shadow-xl shadow-teal-500/20 font-bold text-white border-4 border-navy-900">
                            {profile_user.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">{profile_user.name}</h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
                                <span className="bg-teal-500/10 border border-teal-500/30 text-teal-300 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                                    <Briefcase className="w-4 h-4" /> {profile_user.career_target || 'Software Developer'}
                                </span>
                                <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                                    <Award className="w-4 h-4" /> {profile_user.rank} ({profile_user.total_points} Pts)
                                </span>
                            </div>
                        </div>
                        {profile_user.score >= 80 && (
                            <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-2xl flex flex-col items-center">
                                <div className="text-xs uppercase tracking-wider font-bold mb-1">Status</div>
                                <div className="font-black text-xl flex items-center gap-1"><ShieldCheck className="w-5 h-5"/> Market Ready</div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* LEFT COLUMN - BADGES */}
                    <div className="md:col-span-1 space-y-6">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-700 pb-2">
                                <Award className="w-5 h-5 text-amber-400" /> Pencapaian ({badges.length})
                            </h3>
                            {badges.length === 0 ? (
                                <p className="text-sm text-slate-500 italic">Belum ada badge.</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3">
                                    {badges.map((b: any) => (
                                        <div key={b.id} className="flex flex-col gap-1 bg-slate-800/50 p-3 rounded-xl border border-slate-700 hover:border-slate-500 transition">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">{b.emoji}</div>
                                                <div className="font-bold text-sm text-slate-200">{b.name}</div>
                                            </div>
                                            <div className="text-xs text-slate-400 pl-[44px]">{b.description}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN - PORTFOLIO */}
                    <div className="md:col-span-2 space-y-6">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-700 pb-2">
                            <Code className="w-5 h-5 text-slate-300" /> Project Showcase
                        </h3>
                        
                        {projects.length === 0 ? (
                            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 text-center">
                                <p className="text-slate-400">Belum ada project public.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {projects.map((proj: any) => (
                                    <div key={proj.id} className="bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden flex flex-col sm:flex-row hover:border-slate-500 transition">
                                        <div className="w-full sm:w-1/3 bg-slate-900 border-b sm:border-b-0 sm:border-r border-slate-700 relative h-48 sm:h-auto">
                                             {proj.thumbnail_url ? (
                                                <img src={proj.thumbnail_url} className="w-full h-full object-cover opacity-80" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 to-navy-900 font-bold text-slate-600">
                                                    {proj.title}
                                                </div>
                                            )}
                                        </div>
                                        <div className="w-full sm:w-2/3 p-6 flex flex-col">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-xl text-white leading-tight">{proj.title}</h4>
                                                {proj.github_verified && (
                                                    <span title="Terverifikasi oleh GitHub Data" className="text-teal-400 bg-teal-500/10 p-1 rounded border border-teal-500/20 shrink-0">
                                                        <ShieldCheck className="w-4 h-4" />
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-slate-400 mb-4">{proj.description}</p>
                                            
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {proj.tech_stack.map((tech: string, i: number) => (
                                                    <span key={i} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-md font-mono">{tech}</span>
                                                ))}
                                            </div>
                                            
                                            <div className="mt-auto flex gap-3 pt-4 border-t border-slate-700/50">
                                                <a href={proj.github_url} target="_blank" className="text-sm font-medium text-white bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg flex items-center gap-2 transition">
                                                    <Code className="w-4 h-4" /> Source
                                                </a>
                                                {proj.demo_url && (
                                                    <a href={proj.demo_url} target="_blank" className="text-sm font-medium text-navy-900 bg-teal-400 hover:bg-teal-300 px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-lg shadow-teal-500/20">
                                                        <ExternalLink className="w-4 h-4" /> Kunjungi App
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
