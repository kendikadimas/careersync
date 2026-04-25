import React, { useState, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Target, CheckCircle2, AlertCircle, ArrowLeft, Loader2, Code, LayoutTemplate } from 'lucide-react';

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
    }, [data]);

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
            <Head title={`Submit ${milestone.title} | Career-Sync`} />
            
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <Link href={route('roadmap')} className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-navy-900 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali ke Roadmap
                </Link>

                {submission && submission.status === 'completed' && (
                    <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-bold text-emerald-900">Project Selesai! (Score: {submission.completion_score}/100)</h3>
                            <p className="text-sm text-emerald-700 mt-1">Kamu sudah menyelesaikan project ini dengan baik. Milestone berikutnya sudah terbuka.</p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Kolom Kiri: Form & Checklist */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Header Info */}
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-3xl">{milestone.emoji}</span>
                                <h1 className="text-2xl font-black text-navy-900 shrink-0">{milestone.title}</h1>
                            </div>
                            <p className="text-sm font-semibold text-teal-600 mb-4 inline-flex px-3 py-1 bg-teal-50 rounded-full border border-teal-100">
                                Milestone Review
                            </p>
                        </div>

                        {/* Project Brief */}
                        <div className="bg-navy-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl shadow-navy-900/10 border border-navy-800">
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 text-teal-400 mb-3">
                                    <Target className="w-5 h-5" />
                                    <h3 className="font-bold text-sm tracking-widest uppercase">Target Project</h3>
                                </div>
                                <h2 className="text-2xl font-black mb-3">
                                    {milestone.capstone_project?.title || 'Mini Project'}
                                </h2>
                                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                    {milestone.capstone_project?.description || 'Implementasikan apa yang sudah kamu pelajari di milestone ini.'}
                                </p>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-slate-400">
                                        <Code className="w-4 h-4 shrink-0" />
                                        <span>Tech Stack:</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {milestone.skills?.map((tch: string) => (
                                            <span key={tch} className="px-3 py-1 bg-white/10 text-white rounded-full text-xs font-semibold backdrop-blur-sm border border-white/5">
                                                {tch}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submission Form */}
                        <form onSubmit={submitForm} className="space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
                            
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="github_url" className="block text-sm font-bold text-navy-900 mb-1">
                                        Link Repository GitHub <span className="text-rose-500">*</span>
                                    </label>
                                    <p className="text-xs text-slate-500 mb-3">Pastikan repo kamu PUBLIC agar bisa dinilai.</p>
                                    <input 
                                        type="url" 
                                        id="github_url"
                                        value={data.github_url}
                                        onChange={e => setData('github_url', e.target.value)}
                                        onBlur={handleVerifyGithub}
                                        className="w-full rounded-xl border-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                        placeholder="https://github.com/username/nama-project"
                                    />
                                    {verifying && <p className="text-teal-500 text-xs mt-2 font-medium flex items-center"><Loader2 className="w-3 h-3 mr-1 animate-spin"/> Menganalisis repository...</p>}
                                    {errors.github_url && <p className="text-rose-500 text-xs mt-2 font-medium">{errors.github_url}</p>}
                                    
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
                                    <label htmlFor="demo_url" className="block text-sm font-bold text-navy-900 mb-1">
                                        Link Demo / Deploy <span className="text-slate-400 font-normal">(Opsional)</span>
                                    </label>
                                    <p className="text-xs text-slate-500 mb-3">Berani unjuk gigi? Deploy project kamu (+15 Poin!)</p>
                                    <input 
                                        type="url" 
                                        id="demo_url"
                                        value={data.demo_url}
                                        onChange={e => setData('demo_url', e.target.value)}
                                        className="w-full rounded-xl border-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                        placeholder="https://nama-project.vercel.app"
                                    />
                                    {errors.demo_url && <p className="text-rose-500 text-xs mt-2 font-medium">{errors.demo_url}</p>}
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-bold text-navy-900 mb-1">
                                        Ceritakan Project Kamu <span className="text-rose-500">*</span>
                                    </label>
                                    <p className="text-xs text-slate-500 mb-3">Jelaskan fitur utama dan apa yang kamu bangun (min. 50 karakter).</p>
                                    <textarea 
                                        id="description"
                                        rows={4}
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="w-full rounded-xl border-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-sm"
                                        placeholder="Project ini adalah aplikasi..."
                                    ></textarea>
                                    <div className="flex justify-between items-center mt-2">
                                        {errors.description ? (
                                            <p className="text-rose-500 text-xs font-medium">{errors.description}</p>
                                        ) : <span></span>}
                                        <span className={`text-xs font-medium ${data.description.length < 50 ? 'text-amber-500' : 'text-emerald-500'}`}>
                                            {data.description.length} / 50 min
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

                                <div className="space-y-3">
                                    {checklist_items?.map((item: any) => (
                                        <label key={item.key} className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${data.checklist_completed.includes(item.key) ? 'bg-teal-50 border-teal-200' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                                            <div className="flex items-center h-6 shrink-0 pt-0.5">
                                                <input
                                                    type="checkbox"
                                                    checked={data.checklist_completed.includes(item.key)}
                                                    onChange={() => handleCheck(item.key)}
                                                    className="w-5 h-5 rounded border-slate-300 text-teal-600 focus:ring-teal-600 cursor-pointer"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <p className={`text-sm font-semibold leading-relaxed ${data.checklist_completed.includes(item.key) ? 'text-teal-900' : 'text-slate-700'}`}>
                                                    {item.label}
                                                </p>
                                            </div>
                                            <div className="shrink-0 pt-0.5">
                                                <span className={`text-xs font-bold px-2 py-1 flex items-center justify-center rounded-lg ${data.checklist_completed.includes(item.key) ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-500'}`}>
                                                    +{item.points}
                                                </span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {errors.checklist_completed && <p className="text-rose-500 text-xs mt-3 font-medium flex items-center"><AlertCircle className="w-3 h-3 mr-1"/> {errors.checklist_completed}</p>}
                            </div>

                            <button 
                                type="submit" 
                                disabled={processing || !isSubmittable}
                                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-navy-900 text-white rounded-2xl font-black shadow-xl shadow-navy-900/20 hover:bg-navy-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : <LayoutTemplate className="w-5 h-5" />}
                                {submission ? 'Update Submission' : 'Submit Project untuk Evaluasi'}
                            </button>
                        </form>
                    </div>

                    {/* Kolom Kanan: Preview Score Sticky */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                            <h3 className="font-black text-navy-900 mb-6 text-center">Estimasi Score</h3>
                            
                            <div className="flex flex-col items-center mb-8">
                                <div className={`w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-inner relative overflow-hidden ${getScoreColor(previewScore)} transition-colors duration-500`}>
                                    <span className="text-4xl font-black">{previewScore}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Dari 100</span>
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
