import React, { useState, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { 
    Target, 
    CheckCircle2, 
    AlertCircle, 
    ArrowLeft, 
    Loader2, 
    Code, 
    LayoutTemplate,
    Link as LinkIcon
} from 'lucide-react';

export default function Submit({ roadmap, milestone, submission, checklist_items }: any) {
    const { data, setData, post, processing, errors } = useForm({
        github_url: submission?.github_url || '',
        demo_url: submission?.demo_url || '',
        description: submission?.description || '',
        checklist_completed: submission?.checklist_completed || [],
    });

    const [previewScore, setPreviewScore] = useState(0);
    const [githubVerification, setGithubVerification] = useState<any>(null);
    const [verifying, setVerifying] = useState(false);

    const handleVerifyGithub = async () => {
        if (!data.github_url || !data.github_url.startsWith('https://github.com')) {
            setGithubVerification(null);
            return;
        }
        setVerifying(true);
        try {
            const response = await fetch(`/capstone/verify-github?url=${encodeURIComponent(data.github_url)}`);
            const json = await response.json();
            setGithubVerification(json);
        } catch (e) {
            console.error(e);
        }
        setVerifying(false);
    };

    const calculatePreviewScore = () => {
        let score = 0;
        
        if (githubVerification) {
            if (data.github_url && data.github_url.startsWith('https://github.com')) score += 20;
            if (githubVerification.has_readme) score += 20;
            if (githubVerification.has_commits) score += 10;
            if (githubVerification.file_count >= 3) score += 5;
        } else {
            if (data.github_url && data.github_url.startsWith('https://github.com')) score += 20;
        }
        
        if (data.demo_url) score += 10;
        if (data.description && data.description.length >= 50) score += 5;
        
        let selfScore = 0;
        const selfReportItems = ['uses_milestone_tech', 'has_screenshot'];
        data.checklist_completed.forEach((key: string) => {
            if (selfReportItems.includes(key)) selfScore += 15;
            else selfScore += 10;
        });
        score += Math.min(30, selfScore);
        
        return Math.min(100, score);
    };

    useEffect(() => {
        setPreviewScore(calculatePreviewScore());
    }, [data, githubVerification]);

    const handleCheck = (key: string) => {
        if (data.checklist_completed.includes(key)) {
            setData('checklist_completed', data.checklist_completed.filter((k: string) => k !== key));
        } else {
            setData('checklist_completed', [...data.checklist_completed, key]);
        }
    };

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('capstone.submit', [roadmap.id, milestone.id]));
    };

    const isSubmittable = data.github_url && data.github_url.startsWith('https://github.com') && data.description.length >= 50;

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'bg-emerald-500 text-white';
        if (score >= 60) return 'bg-teal-500 text-white';
        if (score >= 40) return 'bg-amber-500 text-white';
        return 'bg-rose-500 text-white';
    };

    const getScoreProgressBarColor = (score: number) => {
        if (score >= 80) return 'bg-emerald-500';
        if (score >= 60) return 'bg-teal-500';
        if (score >= 40) return 'bg-amber-500';
        return 'bg-rose-500';
    };

    return (
        <AppLayout header="Submit Capstone Project">
            <Head title={`Submit ${milestone.title} | Kembangin`} />
            
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <Link href={route('roadmap')} className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-navy-900 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali ke Roadmap
                </Link>

                {submission && submission.status === 'completed' && (
                    <div className="mb-8 p-5 bg-emerald-50 border border-emerald-100 rounded-lg flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-emerald-900">Project Selesai! (Score: {submission.completion_score}/100)</h3>
                            <p className="text-[13px] text-emerald-700 mt-1 font-medium">Kamu sudah menyelesaikan project ini dengan baik. Milestone berikutnya sudah terbuka.</p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Kolom Kiri: Form & Checklist */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Header Info */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 bg-white border border-slate-100 shadow-sm rounded-lg flex items-center justify-center text-3xl">
                                    {milestone.emoji}
                                </div>
                                <div>
                                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">{milestone.title}</h1>
                                    <p className="text-[13px] font-bold text-indigo-500 uppercase tracking-widest">
                                        Milestone Capstone
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Project Brief */}
                        <div className="bg-indigo-950 text-white rounded-lg p-8 relative overflow-hidden shadow-xl border border-indigo-900">
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 text-indigo-400 mb-4">
                                    <Target className="w-5 h-5" />
                                    <h3 className="font-black text-[11px] tracking-widest uppercase">Project Brief</h3>
                                </div>
                                <h2 className="text-2xl font-black mb-4">
                                    {milestone.capstone_project?.title || 'Mini Project'}
                                </h2>
                                <p className="text-indigo-100/70 text-sm leading-relaxed mb-8 max-w-2xl font-medium">
                                    {milestone.capstone_project?.description || 'Implementasikan apa yang sudah kamu pelajari di milestone ini.'}
                                </p>

                                <div className="flex flex-wrap gap-4 items-center">
                                    <div className="flex items-center gap-2">
                                        <Code className="w-4 h-4 text-indigo-400" />
                                        <span className="text-[12px] font-bold text-indigo-300 uppercase tracking-wider">Stack:</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {milestone.skills?.map((tch: string) => (
                                            <span key={tch} className="px-3 py-1 bg-white/10 text-white rounded-lg text-[11px] font-bold border border-white/5">
                                                {tch}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submission Form */}
                        <form onSubmit={submitForm} className="space-y-8 bg-white p-6 sm:p-8 rounded-lg border border-slate-100 shadow-sm">
                            
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="github_url" className="flex items-center gap-2 text-[13px] font-bold text-slate-700 mb-2">
                                        <Code className="w-4 h-4 text-slate-400" />
                                        Repository GitHub <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative group">
                                        <input 
                                            type="url" 
                                            id="github_url"
                                            value={data.github_url}
                                            onChange={e => setData('github_url', e.target.value)}
                                            onBlur={handleVerifyGithub}
                                            className="w-full pl-12 pr-5 py-4 rounded-lg border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-sm"
                                            placeholder="https://github.com/username/project"
                                        />
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                                            <Code className="w-5 h-5" />
                                        </div>
                                    </div>
                                    {verifying && <p className="text-indigo-600 text-[11px] mt-2 font-bold flex items-center uppercase tracking-widest"><Loader2 className="w-3 h-3 mr-1.5 animate-spin"/> Menganalisis repository...</p>}
                                    {errors.github_url && <p className="text-rose-500 text-xs mt-2 font-bold">{errors.github_url}</p>}
                                    
                                    {githubVerification && !verifying && (
                                        <div className={`mt-2 p-3 rounded-lg text-xs ${
                                            githubVerification.verified
                                                ? 'bg-teal-50 border border-teal-200 text-teal-700'
                                                : 'bg-amber-50 border border-amber-200 text-amber-700'
                                        }`}>
                                            <div className="font-bold mb-1 flex items-center gap-1">
                                                {githubVerification.verified ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                                {githubVerification.verified ? 'Repository terverifikasi!' : 'Repository belum terverifikasi'}
                                            </div>
                                            <div className="space-y-0.5">
                                                {githubVerification.has_readme && <p>✓ README.md ditemukan</p>}
                                                {githubVerification.has_commits && <p>✓ Repository punya commits</p>}
                                                {githubVerification.file_count > 0 && <p>✓ {(githubVerification.file_count || 0)} files ditemukan</p>}
                                                {!githubVerification.verified && githubVerification.fail_reason && (
                                                    <p className="text-rose-500 mt-1">✗ {githubVerification.fail_reason}</p>
                                                )}
                                            </div>
                                            {githubVerification.verified && (
                                                <p className="mt-2 font-semibold">+{githubVerification.verified_score} verified points otomatis</p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="demo_url" className="flex items-center gap-2 text-[13px] font-bold text-slate-700 mb-2">
                                        <LinkIcon className="w-4 h-4 text-slate-400" />
                                        Link Demo / Deploy <span className="text-slate-400 font-normal ml-auto text-[11px]">(Opsional)</span>
                                    </label>
                                    <div className="relative group">
                                        <input 
                                            type="url" 
                                            id="demo_url"
                                            value={data.demo_url}
                                            onChange={e => setData('demo_url', e.target.value)}
                                            className="w-full pl-12 pr-5 py-4 rounded-lg border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-sm"
                                            placeholder="https://project.vercel.app"
                                        />
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                                            <LinkIcon className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-slate-400 mt-2 font-bold uppercase tracking-widest">Deploy project kamu untuk mendapatkan +15 Poin!</p>
                                    {errors.demo_url && <p className="text-rose-500 text-xs mt-2 font-bold">{errors.demo_url}</p>}
                                </div>

                                <div>
                                    <label htmlFor="description" className="flex items-center gap-2 text-[13px] font-bold text-slate-700 mb-2">
                                        <Code className="w-4 h-4 text-slate-400" />
                                        Deskripsi Project <span className="text-rose-500">*</span>
                                    </label>
                                    <textarea 
                                        id="description"
                                        rows={5}
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="w-full px-5 py-4 rounded-lg border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-sm resize-none"
                                        placeholder="Jelaskan fitur utama dan apa yang kamu bangun..."
                                    ></textarea>
                                    <div className="flex justify-between items-center mt-2">
                                        {errors.description ? (
                                            <p className="text-rose-500 text-[11px] font-bold">{errors.description}</p>
                                        ) : <span></span>}
                                        <span className={`text-[11px] font-black uppercase tracking-widest ${data.description.length < 50 ? 'text-amber-500' : 'text-emerald-500'}`}>
                                            {data.description.length} / 50 characters min
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <hr className="border-slate-100" />

                            {/* Checklist */}
                            <div>
                                <div className="mb-6">
                                    <h3 className="text-lg font-black text-navy-900">Checklist Evaluasi Mandiri</h3>
                                    <p className="text-sm text-slate-500 mt-1">Centang kriteria yang sudah kamu penuhi. Kumpulkan poin sebanyak-banyaknya!</p>
                                </div>

                                <div className="space-y-4">
                                    {checklist_items?.map((item: any) => (
                                        <label key={item.key} className={`flex items-start gap-4 p-5 rounded-lg border transition-all cursor-pointer ${data.checklist_completed.includes(item.key) ? 'bg-indigo-50/50 border-indigo-200 ring-4 ring-indigo-50/20' : 'bg-slate-50/30 border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-md'}`}>
                                            <div className="flex items-center h-6 shrink-0 pt-0.5">
                                                <input
                                                    type="checkbox"
                                                    checked={data.checklist_completed.includes(item.key)}
                                                    onChange={() => handleCheck(item.key)}
                                                    className="w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <p className={`text-[14px] font-bold leading-relaxed ${data.checklist_completed.includes(item.key) ? 'text-indigo-900' : 'text-slate-600'}`}>
                                                    {item.label}
                                                </p>
                                            </div>
                                            <div className="shrink-0 pt-0.5">
                                                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-black text-[10px] uppercase tracking-widest ${data.checklist_completed.includes(item.key) ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-400'}`}>
                                                    <Target className="w-3 h-3" />
                                                    +{item.points} pts
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {errors.checklist_completed && <p className="text-rose-500 text-xs mt-4 font-bold flex items-center gap-1.5 uppercase tracking-widest"><AlertCircle className="w-4 h-4"/> {errors.checklist_completed}</p>}
                            </div>

                            <button 
                                type="submit" 
                                disabled={processing || !isSubmittable}
                                className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-indigo-950 text-white rounded-lg font-black text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-900 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : <LayoutTemplate className="w-5 h-5" />}
                                {submission ? 'Perbarui Submission' : 'Submit Project & Klaim Sertifikat'}
                            </button>
                        </form>
                    </div>

                    {/* Kolom Kanan: Preview Score Sticky */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 bg-white rounded-lg p-8 border border-slate-100 shadow-sm">
                            <h3 className="font-black text-slate-900 mb-8 text-center uppercase tracking-widest text-xs">Estimasi Score</h3>
                            
                            <div className="flex flex-col items-center mb-10">
                                <div className={`w-36 h-36 rounded-full flex flex-col items-center justify-center shadow-inner relative overflow-hidden ${getScoreColor(previewScore)} transition-all duration-700 ring-8 ring-slate-50`}>
                                    <span className="text-5xl font-black tracking-tighter">{previewScore}</span>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">SCORE</span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                                    <span>Progress Poin</span>
                                    <span>Min. 60 untuk Lulus</span>
                                </div>
                                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                                     <div 
                                        className={`h-full transition-all duration-700 ease-out ${getScoreProgressBarColor(previewScore)}`}
                                        style={{ width: `${previewScore}%` }}
                                     ></div>
                                </div>
                            </div>
                            
                            <div className="space-y-4 pt-6 border-t border-slate-100">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${data.github_url.startsWith('https://github.com') ? 'bg-teal-500' : 'bg-slate-300'}`}></div>
                                        GitHub URL
                                    </span>
                                    <span className="font-bold text-navy-900 border border-slate-100 px-2 rounded bg-slate-50">{data.github_url.startsWith('https://github.com') ? '+20' : '0'}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${data.demo_url ? 'bg-teal-500' : 'bg-slate-300'}`}></div>
                                        Demo URL
                                    </span>
                                    <span className="font-bold text-navy-900 border border-slate-100 px-2 rounded bg-slate-50">{data.demo_url ? '+10' : '0'}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${data.description.length >= 50 ? 'bg-teal-500' : 'bg-slate-300'}`}></div>
                                        Deskripsi
                                    </span>
                                    <span className="font-bold text-navy-900 border border-slate-100 px-2 rounded bg-slate-50">{data.description.length >= 50 ? '+5' : '0'}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${data.checklist_completed.length > 0 ? 'bg-teal-500' : 'bg-slate-300'}`}></div>
                                        Checklist User
                                    </span>
                                    <span className="font-bold text-navy-900 border border-slate-100 px-2 rounded bg-slate-50">
                                        +{previewScore - (
                                            (data.github_url.startsWith('https://github.com') ? 20 : 0) +
                                            (data.demo_url ? 10 : 0) +
                                            (data.description.length >= 50 ? 5 : 0)
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
