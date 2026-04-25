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
        <AppLayout header="Profil & Portfolio">
            <Head title="Portfolio" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">

                {/* PROFILE HEADER SUMMARY */}
                <div className="bg-gradient-to-r from-navy-800 to-slate-900 border border-slate-700 p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-gradient-to-tr from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-4xl font-bold shadow-lg shadow-teal-500/20">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-2">{user.name}</h3>
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-slate-800 rounded-lg text-sm text-teal-400 font-medium border border-slate-700">
                                    {profile?.career_target || 'Target belum diset'}
                                </span>
                                <span className="flex items-center gap-1 px-3 py-1 bg-slate-800 rounded-lg text-sm text-amber-400 font-medium border border-slate-700">
                                    <Award className="w-4 h-4" /> Rank: {user.rank}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 items-stretch">
                        <div className="bg-slate-800/80 p-4 justify-center flex flex-col rounded-2xl border border-slate-700 text-center min-w-[120px]">
                            <div className="text-xs text-slate-400 mb-1">Total Points</div>
                            <div className="text-3xl font-black text-white">{user.total_points}</div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <Link href={route('profile.public', user.id)} className="bg-teal-500/10 text-teal-400 border border-teal-500/50 hover:bg-teal-500/20 px-6 py-3 rounded-xl font-medium transition flex items-center gap-2">
                                <ExternalLink className="w-4 h-4" /> Lihat Profil Publik
                            </Link>
                        </div>
                    </div>
                </div>

                {/* BADGES SECTION */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                    <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                        <Award className="text-amber-400" /> Pencapaian Badge ({badges.length})
                    </h3>
                    {badges.length === 0 ? (
                        <p className="text-slate-400 text-sm">Belum ada badge yang diraih. Selesaikan milestone untuk mendapatkan badge!</p>
                    ) : (
                        <div className="flex flex-wrap gap-4">
                            {badges.map((b: any) => (
                                <div key={b.id} className="group relative flex items-center gap-3 bg-slate-900 border border-slate-700 p-3 rounded-xl hover:border-teal-500/50 transition">
                                    <div className="text-3xl drop-shadow-md">{b.emoji}</div>
                                    <div>
                                        <div className="font-bold text-sm text-slate-200 group-hover:text-teal-300 transition">{b.name}</div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-widest">{b.rarity}</div>
                                    </div>
                                    {/* Tooltip */}
                                    <div className="absolute hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-800 text-xs text-slate-300 p-2 rounded shadow-xl border border-slate-600 z-10 text-center">
                                        {b.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* SHOWCASE SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* ADD PROJECT FORM */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 sticky top-6">
                            <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                                <FolderGit2 className="text-blue-400" /> Tambah Project
                            </h3>
                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Nama Project</label>
                                    <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} required className="w-full bg-slate-900 border border-slate-700 rounded-lg text-white" />
                                    {errors.title && <div className="text-red-400 text-xs mt-1">{errors.title}</div>}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Deskripsi Singkat</label>
                                    <textarea value={data.description} onChange={e => setData('description', e.target.value)} required rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-lg text-white text-sm" />
                                    {errors.description && <div className="text-red-400 text-xs mt-1">{errors.description}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">GitHub URL</label>
                                    <input type="url" placeholder="https://github.com/user/repo" value={data.github_url} onChange={e => setData('github_url', e.target.value)} required className="w-full bg-slate-900 border border-slate-700 rounded-lg text-white text-sm" />
                                    <p className="text-[10px] text-slate-500 mt-1">Repo PUBLIC akan diverifikasi otomatis.</p>
                                    {errors.github_url && <div className="text-red-400 text-xs mt-1">{errors.github_url}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Demo URL (Opsional)</label>
                                    <input type="url" value={data.demo_url} onChange={e => setData('demo_url', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg text-white text-sm" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Tech Stack</label>
                                    <input 
                                        type="text" 
                                        placeholder="Ketik lalu Enter (misal: React)" 
                                        value={techInput} 
                                        onChange={e => setTechInput(e.target.value)} 
                                        onKeyDown={handleAddTech}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg text-white text-sm mb-2" 
                                    />
                                    <div className="flex flex-wrap gap-2">
                                        {data.tech_stack.map(tech => (
                                            <span key={tech} className="bg-teal-900/40 border border-teal-500/30 text-teal-300 text-xs px-2 py-1 rounded flex items-center gap-1 cursor-pointer hover:bg-teal-900" onClick={() => removeTech(tech)}>
                                                {tech} &times;
                                            </span>
                                        ))}
                                    </div>
                                    {errors.tech_stack && <div className="text-red-400 text-xs mt-1">{errors.tech_stack}</div>}
                                </div>

                                <div className="pt-2">
                                    <button disabled={processing} className="w-full bg-white hover:bg-slate-200 text-navy-900 font-bold py-2 rounded-lg transition disabled:opacity-50">
                                        {processing ? 'Menyimpan...' : 'Simpan Project'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* PROJECTS GRID */}
                    <div className="lg:col-span-2 space-y-6">
                        {projects.length === 0 ? (
                            <div className="bg-slate-800/30 border border-slate-700 p-12 rounded-2xl text-center flex flex-col items-center justify-center">
                                <FolderGit2 className="w-12 h-12 text-slate-500 mb-4" />
                                <h4 className="text-lg font-medium text-slate-300">Belum ada project</h4>
                                <p className="text-sm text-slate-500 mt-2">Tambahkan project terbaik bawaan belajarmu ke showcase agar portfolio semakin kuat.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {projects.map((proj: any) => (
                                    <div key={proj.id} className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden flex flex-col hover:border-slate-500 transition group">
                                        {/* Thumbnail (using og_image or fallback pattern) */}
                                        <div className="h-40 bg-slate-900 relative">
                                            {proj.thumbnail_url ? (
                                                <img src={proj.thumbnail_url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-600 bg-slate-900/50 font-mono opacity-50 text-xl font-bold bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 to-navy-900">
                                                    {proj.title}
                                                </div>
                                            )}
                                            
                                            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-medium text-white flex items-center gap-1 border border-white/10">
                                                <Code className="w-3 h-3" /> {proj.github_stars}
                                            </div>
                                            
                                            {proj.github_verified && (
                                                <div className="absolute top-3 right-3 bg-teal-500/90 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-navy-900 flex items-center gap-1 shadow-lg shadow-teal-500/20">
                                                    <ShieldCheck className="w-3 h-3" /> VERIFIED
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="p-5 flex flex-col flex-1">
                                            <h4 className="font-bold text-lg text-slate-100 mb-2 truncate" title={proj.title}>{proj.title}</h4>
                                            <p className="text-slate-400 text-sm mb-4 line-clamp-2">{proj.description}</p>
                                            
                                            <div className="flex flex-wrap gap-1.5 mb-6">
                                                {proj.tech_stack.slice(0, 4).map((tech: string, i: number) => (
                                                    <span key={i} className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded font-mono border border-slate-600">{tech}</span>
                                                ))}
                                                {proj.tech_stack.length > 4 && <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded">+{proj.tech_stack.length - 4}</span>}
                                            </div>
                                            
                                            <div className="mt-auto grid grid-cols-2 lg:grid-cols-3 gap-2 pt-4 border-t border-slate-700/50">
                                                <a href={proj.github_url} target="_blank" className="flex items-center justify-center gap-1 text-xs py-2 bg-slate-900 hover:bg-slate-700 rounded text-slate-300 transition col-span-1 lg:col-span-1 border border-slate-700">
                                                    <Code className="w-3 h-3" /> Repo
                                                </a>
                                                {proj.demo_url && (
                                                    <a href={proj.demo_url} target="_blank" className="flex items-center justify-center gap-1 text-xs py-2 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 rounded transition col-span-1 lg:col-span-1 border border-teal-500/20">
                                                        <ExternalLink className="w-3 h-3" /> Demo
                                                    </a>
                                                )}
                                                <button onClick={() => handleDelete(proj.id)} className="flex items-center justify-center gap-1 text-xs py-2 text-red-400 hover:bg-red-500/10 rounded transition col-span-2 lg:col-span-1 ml-auto lg:ml-0 w-full lg:w-auto mt-2 lg:mt-0">
                                                    <Trash2 className="w-3 h-3" /> Hapus
                                                </button>
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
    );
}
