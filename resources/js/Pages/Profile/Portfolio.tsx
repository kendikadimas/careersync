import AppLayout from '@/Layouts/AppLayout';
import { Head, router, Link, useForm } from '@inertiajs/react';
import { ExternalLink, ShieldCheck, Lock, Trash2, Award, FolderGit2, Code } from 'lucide-react';
import { useState } from 'react';

export default function Portfolio({ projects, user }: any) {
    const { badges, profile, workReadinessScore } = user;
    const [techInput, setTechInput] = useState('');
    
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        github_url: '',
        demo_url: '',
        tech_stack: [] as string[],
        visibility: 'public'
    });

    const handleAddTech = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = techInput.trim();
            if (val && !data.tech_stack.includes(val)) {
                setData('tech_stack', [...data.tech_stack, val]);
            }
            setTechInput('');
        }
    };

    const removeTech = (tech: string) => {
        setData('tech_stack', data.tech_stack.filter(t => t !== tech));
    };

    const submit = (e: any) => {
        e.preventDefault();
        post(route('portfolio.store'), {
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus project ini?')) {
            router.delete(route('portfolio.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Portfolio" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

                {/* PROFILE HERO HEADER */}
                <div className="relative overflow-hidden rounded-lg bg-indigo-900 text-white shadow-2xl">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-20 -mt-20 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400 rounded-full -ml-20 -mb-20 blur-3xl"></div>
                    </div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center p-8 md:p-10 gap-8">
                        <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                            <div className="w-24 h-24 rounded-full bg-white shadow-2xl flex items-center justify-center text-4xl font-black text-indigo-900 border-4 border-white/20">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <h1 className="text-3xl font-black tracking-tight mb-2">{user.name}</h1>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                    <span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-black uppercase tracking-widest text-indigo-100 border border-white/10">
                                        {profile?.career_target || 'Generalist'}
                                    </span>
                                    <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 rounded-lg text-xs font-black uppercase tracking-widest text-amber-400 border border-amber-400/20">
                                        <Award className="w-3 h-3" /> {user.rank}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col items-center md:items-end gap-4">
                            <div className="flex items-center gap-6">
                                <div className="text-center md:text-right border-r border-white/10 pr-6">
                                    <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-1">Total Points</p>
                                    <p className="text-3xl font-black text-white">{user.total_points.toLocaleString()}</p>
                                </div>
                                <Link 
                                    href={route('profile.public', user.id)} 
                                    className="bg-white text-indigo-900 hover:bg-indigo-50 px-6 py-3 rounded-lg font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-xl active:scale-95"
                                >
                                    <ExternalLink className="w-4 h-4" /> Lihat Profil Publik
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BADGES SECTION */}
                <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                            <Award className="w-4 h-4 text-amber-500" /> Pencapaian Badge ({badges.length})
                        </h3>
                    </div>
                    
                    {badges.length === 0 ? (
                        <div className="py-6 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Belum ada badge yang diraih</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {badges.map((b: any) => (
                                <div key={b.id} className="group relative flex flex-col items-center p-4 bg-white border border-slate-100 rounded-lg transition-all hover:shadow-xl hover:border-indigo-200 hover:-translate-y-1 text-center">
                                    <div className="text-4xl mb-3 drop-shadow-sm transition-transform group-hover:scale-110">{b.emoji}</div>
                                    <div className="font-black text-[11px] text-slate-800 uppercase tracking-tight line-clamp-1">{b.name}</div>
                                    <div className={`text-[8px] font-black uppercase tracking-widest mt-1 ${
                                        b.rarity === 'EPIC' ? 'text-purple-500' : b.rarity === 'RARE' ? 'text-amber-600' : 'text-slate-400'
                                    }`}>{b.rarity}</div>
                                    
                                    {/* Tooltip */}
                                    <div className="absolute opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 bg-slate-900 text-[10px] leading-relaxed text-white p-3 rounded-lg shadow-2xl z-20 text-center transition-all">
                                        {b.description}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* SHOWCASE SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* ADD PROJECT FORM */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100 sticky top-8">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <FolderGit2 className="w-4 h-4 text-indigo-600" /> Tambah Project Baru
                            </h3>
                            
                            <form onSubmit={submit} className="space-y-5">
                                <div>
                                    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Nama Project</label>
                                    <input 
                                        type="text" 
                                        value={data.title} 
                                        onChange={e => setData('title', e.target.value)} 
                                        required 
                                        className="w-full bg-slate-50 border-slate-200 rounded-lg text-sm font-bold focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all px-4 py-3" 
                                        placeholder="E-Commerce API"
                                    />
                                    {errors.title && <div className="text-rose-500 text-[10px] font-bold mt-1 uppercase tracking-widest">{errors.title}</div>}
                                </div>
                                
                                <div>
                                    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Deskripsi Singkat</label>
                                    <textarea 
                                        value={data.description} 
                                        onChange={e => setData('description', e.target.value)} 
                                        required 
                                        rows={3} 
                                        className="w-full bg-slate-50 border-slate-200 rounded-lg text-sm font-bold focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all px-4 py-3" 
                                        placeholder="Membangun REST API dengan Laravel dan MySQL..."
                                    />
                                    {errors.description && <div className="text-rose-500 text-[10px] font-bold mt-1 uppercase tracking-widest">{errors.description}</div>}
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1.5">GitHub URL</label>
                                    <div className="relative">
                                        <input 
                                            type="url" 
                                            placeholder="https://github.com/user/repo" 
                                            value={data.github_url} 
                                            onChange={e => setData('github_url', e.target.value)} 
                                            required 
                                            className="w-full bg-slate-50 border-slate-200 rounded-lg text-sm font-bold focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all pl-10 pr-4 py-3" 
                                        />
                                        <Code className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-widest italic">Repo PUBLIC akan diverifikasi otomatis.</p>
                                    {errors.github_url && <div className="text-rose-500 text-[10px] font-bold mt-1 uppercase tracking-widest">{errors.github_url}</div>}
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Demo URL (Opsional)</label>
                                    <input 
                                        type="url" 
                                        value={data.demo_url} 
                                        onChange={e => setData('demo_url', e.target.value)} 
                                        className="w-full bg-slate-50 border-slate-200 rounded-lg text-sm font-bold focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all px-4 py-3" 
                                        placeholder="https://demo.vercel.app"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Tech Stack</label>
                                    <input 
                                        type="text" 
                                        placeholder="Ketik & Enter (e.g: React)" 
                                        value={techInput} 
                                        onChange={e => setTechInput(e.target.value)} 
                                        onKeyDown={handleAddTech}
                                        className="w-full bg-slate-50 border-slate-200 rounded-lg text-sm font-bold focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all px-4 py-3 mb-3" 
                                    />
                                    <div className="flex flex-wrap gap-2">
                                        {data.tech_stack.map(tech => (
                                            <span key={tech} className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-2 py-1 rounded flex items-center gap-1 cursor-pointer hover:bg-rose-50 hover:text-rose-600 transition-colors border border-indigo-100 uppercase tracking-widest" onClick={() => removeTech(tech)}>
                                                {tech} &times;
                                            </span>
                                        ))}
                                    </div>
                                    {errors.tech_stack && <div className="text-rose-500 text-[10px] font-bold mt-1 uppercase tracking-widest">{errors.tech_stack}</div>}
                                </div>

                                <div className="pt-4">
                                    <button 
                                        disabled={processing} 
                                        className="w-full bg-indigo-900 hover:bg-indigo-800 text-white font-black text-xs uppercase tracking-widest py-4 rounded-lg transition-all shadow-lg shadow-indigo-100 active:scale-95 disabled:opacity-50"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan ke Portfolio'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* PROJECTS GRID */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Project Showcase</h3>
                            <div className="px-2.5 py-1 rounded bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                                {projects.length} Projects
                            </div>
                        </div>

                        {projects.length === 0 ? (
                            <div className="bg-white border-2 border-dashed border-slate-100 p-16 rounded-lg text-center flex flex-col items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                                    <FolderGit2 className="w-8 h-8 text-slate-200" />
                                </div>
                                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Belum Ada Project</h4>
                                <p className="text-xs text-slate-400 mt-2 max-w-xs font-medium">Tambahkan hasil karya terbaikmu untuk membangun profil yang dilirik oleh rekruter industri.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {projects.map((proj: any) => (
                                    <div key={proj.id} className="group bg-white rounded-lg border border-slate-100 overflow-hidden flex flex-col hover:shadow-2xl hover:border-indigo-200 transition-all duration-300">
                                        {/* Thumbnail */}
                                        <div className="h-44 bg-slate-50 relative overflow-hidden">
                                            {proj.thumbnail_url ? (
                                                <img src={proj.thumbnail_url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-200 font-black text-2xl uppercase tracking-tighter select-none p-8 text-center leading-none">
                                                    {proj.title}
                                                </div>
                                            )}
                                            
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-2 py-1 rounded text-[10px] font-black text-slate-900 flex items-center gap-1.5 shadow-xl border border-white">
                                                <Code className="w-3 h-3 text-indigo-600" /> {proj.github_stars} Stars
                                            </div>
                                            
                                            {proj.github_verified && (
                                                <div className="absolute top-4 right-4 bg-teal-500 text-white px-2 py-1 rounded text-[10px] font-black flex items-center gap-1.5 shadow-xl shadow-teal-500/20">
                                                    <ShieldCheck className="w-3 h-3" /> VERIFIED
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="p-6 flex flex-col flex-1">
                                            <h4 className="font-black text-base text-slate-900 mb-2 truncate" title={proj.title}>{proj.title}</h4>
                                            <p className="text-slate-500 text-[11px] font-medium mb-5 line-clamp-2 leading-relaxed">{proj.description}</p>
                                            
                                            <div className="flex flex-wrap gap-1.5 mb-6">
                                                {proj.tech_stack.slice(0, 4).map((tech: string, i: number) => (
                                                    <span key={i} className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">{tech}</span>
                                                ))}
                                                {proj.tech_stack.length > 4 && <span className="text-[9px] font-black text-slate-300">+{proj.tech_stack.length - 4}</span>}
                                            </div>
                                            
                                            <div className="mt-auto grid grid-cols-2 gap-3 pt-5 border-t border-slate-50">
                                                <a href={proj.github_url} target="_blank" className="flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest py-2.5 bg-slate-50 hover:bg-slate-100 rounded text-slate-600 transition-all border border-slate-100">
                                                    <Code className="w-3.5 h-3.5" /> Repository
                                                </a>
                                                {proj.demo_url ? (
                                                    <a href={proj.demo_url} target="_blank" className="flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded transition-all border border-indigo-100">
                                                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                                                    </a>
                                                ) : (
                                                    <button onClick={() => handleDelete(proj.id)} className="flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest py-2.5 text-rose-400 hover:bg-rose-50 rounded transition-all">
                                                        <Trash2 className="w-3.5 h-3.5" /> Delete
                                                    </button>
                                                )}
                                                {proj.demo_url && (
                                                    <button onClick={() => handleDelete(proj.id)} className="col-span-2 mt-2 flex items-center justify-center gap-1.5 text-[9px] font-black uppercase tracking-widest py-1 text-slate-300 hover:text-rose-500 transition-all">
                                                        <Trash2 className="w-3 h-3" /> Remove Project
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AppLayout>
            </div>
        </AppLayout>
    );
}
