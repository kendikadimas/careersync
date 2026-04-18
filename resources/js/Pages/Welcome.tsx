import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    ArrowRight, 
    Rocket, 
    Target, 
    Map, 
    TrendingUp, 
    Search, 
    Sparkles, 
    CheckCircle2,
    Database,
    BarChart2,
    Shield
} from 'lucide-react';

const FloatingCard = ({ children, className, delay = 0 }: any) => {
    return (
        <div className={`absolute p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl animate-bounce-slow ${className}`} style={{ animationDelay: `${delay}s` }}>
            {children}
        </div>
    );
};

const StatCounter = ({ end, duration = 1500, label }: { end: number, duration?: number, label: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [end, duration]);

    return (
        <div className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold text-navy-900 mb-2">{count.toLocaleString()}+</div>
            <div className="text-slate-500 font-medium text-sm tracking-wide uppercase">{label}</div>
        </div>
    );
};

export default function Welcome({ auth }: any) {
    return (
        <div className="bg-white selection:bg-teal-100 selection:text-teal-900 overflow-hidden">
            <Head title="Selamat Datang di Career-Sync Academy" />

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-tr from-navy-900 to-navy-700 rounded-xl flex items-center justify-center p-2 shadow-lg">
                           <TrendingUp className="text-teal-400" />
                        </div>
                        <span className="text-2xl font-black text-navy-900 tracking-tighter">CareerSync</span>
                    </div>

                    <div className="hidden md:flex items-center gap-10">
                        <a href="#features" className="text-sm font-semibold text-slate-600 hover:text-navy-900 transition-colors">Fitur</a>
                        <a href="#how-it-works" className="text-sm font-semibold text-slate-600 hover:text-navy-900 transition-colors">Cara Kerja</a>
                        <Link href={route('demo')} className="text-sm font-semibold text-slate-600 hover:text-navy-900 transition-colors">Demo</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="px-6 py-2.5 bg-navy-900 text-white rounded-xl font-bold text-sm shadow-xl shadow-navy-900/20 hover:scale-105 transition-transform active:scale-95">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="hidden sm:block text-sm font-bold text-navy-900">Login</Link>
                                <Link href={route('register')} className="px-6 py-2.5 bg-navy-900 text-white rounded-xl font-bold text-sm shadow-xl shadow-navy-900/20 hover:scale-105 transition-transform active:scale-95">
                                    Mulai Gratis
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 px-4 overflow-visible">
                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 bg-[radial-gradient(circle_at_top,var(--color-teal-100)_0%,transparent_50%)] opacity-40"></div>
                <div className="absolute top-40 right-10 w-64 h-64 bg-teal-300/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
                <div className="absolute bottom-20 left-10 w-80 h-80 bg-navy-400/10 rounded-full blur-3xl -z-10"></div>

                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-100 rounded-full text-teal-700 text-xs font-bold tracking-widest uppercase mb-8 animate-in fade-in slide-in-from-bottom duration-500">
                        <Sparkles className="w-3.5 h-3.5" />
                        AI-Powered Career Intelligence 2026
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-extrabold text-navy-900 tracking-tight leading-[1.1] mb-8 animate-in fade-in slide-in-from-bottom duration-700">
                        Karir Impianmu, <br />
                        <span className="bg-linear-to-r from-navy-800 to-teal-500 bg-clip-text text-transparent italic">Dibangun dari Data Nyata</span>
                    </h1>

                    <p className="max-w-2xl text-slate-500 text-lg md:text-xl leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom duration-1000">
                        Aura jenuh belajar apa saja tapi tidak dipanggil interview? <br className="hidden md:block" />
                        Kami menganalisis skill gap kamu vs pasar kerja IT Indonesia secara real-time.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-20">
                        <Link href={route('register')} className="group px-8 py-4 bg-navy-900 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-2xl shadow-navy-900/40 hover:scale-105 hover:-translate-y-1 transition-all">
                            Analisis CV Saya
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href={route('demo')} className="px-8 py-4 bg-white text-navy-900 border-2 border-slate-100 rounded-2xl font-bold text-lg hover:border-navy-900 transition-colors">
                            Coba Demo
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
                        <StatCounter end={2847} label="Lowongan Aktif" />
                        <StatCounter end={94} label="Relevansi Data" duration={2000} />
                        <StatCounter end={500} label="Top Skills" />
                        <StatCounter end={120} label="Kota Tercover" />
                    </div>
                </div>

                {/* Floating Cards (Desktop only) */}
                <div className="hidden lg:block">
                     <FloatingCard className="top-48 left-20 -rotate-6" delay={0.2}>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-teal-500 rounded-lg text-white">
                                <Search className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-black">Crawler Active</p>
                                <p className="text-black text-sm">300+ Jobs/Day</p>
                            </div>
                        </div>
                    </FloatingCard>

                    <FloatingCard className="top-80 right-20 rotate-12" delay={0.5}>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg text-navy-900">
                                <Target className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-black">Market Fit</p>
                                <p className="text-black text-sm">87% Success Rate</p>
                            </div>
                        </div>
                    </FloatingCard>

                    <FloatingCard className="bottom-40 left-40 rotate-3" delay={0.8}>
                         <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-500 rounded-lg text-white">
                                <Rocket className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-bold text-black">Level Up</p>
                                <p className="text-black text-sm">Adaptive Path</p>
                            </div>
                        </div>
                    </FloatingCard>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-32 bg-slate-50 relative">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-sm font-black text-teal-600 tracking-[0.2em] uppercase mb-4">Features</h2>
                        <h3 className="text-4xl md:text-5xl font-extrabold text-navy-900">Lebih Dari Sekadar AI CV Generator</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: 'Industry Data Crawler', desc: 'Sistem kami terus memantau portal kerja utama di Indonesia untuk tren terbaru.', icon: Database, color: 'navy' },
                            { title: 'Skill Gap Radar', desc: 'Bandingkan visualisasi kemampuanmu vs standar industri saat ini lewat Radar Chart.', icon: BarChart2, color: 'teal' },
                            { title: 'Dynamic Roadmap', desc: 'Learning path yang bisa berubah jika ada teknologi baru yang meledak di pasar.', icon: Map, color: 'navy' },
                            { title: 'Work Readiness Score', desc: 'Dapatkan skor kesiapan kerjamu lengkap dengan saran perbaikan yang konkret.', icon: Shield, color: 'teal' },
                        ].map((feature, i) => (
                             <div key={i} className="group p-8 bg-white rounded-3xl border border-slate-100 hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300">
                                <div className={`w-14 h-14 rounded-2xl mb-8 flex items-center justify-center transition-transform group-hover:scale-110 duration-300 ${feature.color === 'teal' ? 'bg-teal-50 text-teal-600' : 'bg-navy-50 text-navy-700'}`}>
                                    <feature.icon className="w-7 h-7" />
                                </div>
                                <h4 className="text-xl font-bold text-navy-900 mb-4">{feature.title}</h4>
                                <p className="text-slate-500 leading-relaxed text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                     <div className="text-center mb-20">
                        <h2 className="text-sm font-black text-teal-600 tracking-[0.2em] uppercase mb-4">Process</h2>
                        <h3 className="text-4xl md:text-5xl font-extrabold text-navy-900">Dari Mahasiswa Jadi Pro</h3>
                    </div>

                    <div className="relative flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-0">
                        {/* Connecting Line (Desktop) */}
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-full -z-10 hidden lg:block"></div>

                        {[
                            { step: '01', title: 'Upload CV', desc: 'Paste teks CV atau tulis manual target karirmu.', emoji: '📄' },
                            { step: '02', title: 'Analisis AI', desc: 'AI mendeteksi gap antara skillmu vs lowongan terbanyak.', emoji: '🚀' },
                            { step: '03', title: 'Start Learning', desc: 'Ikuti roadmap custom & raih skor siap kerja terbaik.', emoji: '🎓' },
                        ].map((item, i) => (
                            <div key={i} className="flex-1 max-w-sm flex flex-col items-center text-center px-10">
                                <div className="w-20 h-20 bg-white rounded-full border-4 border-slate-50 shadow-xl flex items-center justify-center text-4xl mb-8 relative">
                                    <span className="absolute -top-2 -right-2 bg-navy-900 text-white text-xs font-black w-8 h-8 rounded-full flex items-center justify-center border-4 border-white">
                                        {item.step}
                                    </span>
                                    {item.emoji}
                                </div>
                                <h4 className="text-2xl font-black text-navy-900 mb-4">{item.title}</h4>
                                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto bg-navy-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-3xl">
                     {/* Decor */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 blur-3xl z-0"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-500/20 blur-3xl z-0"></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-8">Siap Bersaing di Industri IT 2026?</h2>
                        <p className="text-white text-lg md:text-xl mb-12 max-w-2xl mx-auto">
                            Tutup gap sekarang, apply dengan percaya diri besok. Ribuan data lowongan sedang menunggumu.
                        </p>
                        <Link href={route('register')} className="inline-flex items-center gap-3 px-10 py-5 bg-teal-500 text-white rounded-2xl font-black text-xl hover:bg-teal-400 hover:scale-105 transition-all shadow-xl shadow-teal-500/30">
                            Mulai Perjalananmu
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
                     <div className="flex items-center gap-3">
                        <TrendingUp className="text-navy-900 w-6 h-6" />
                        <span className="font-black text-xl text-navy-900 tracking-tighter">CareerSync</span>
                    </div>
                    
                    <div className="text-slate-400 text-sm font-medium">
                        &copy; 2026 Career-Sync Academy. Built for Future Indonesian Talents.
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="#" className="text-slate-400 hover:text-navy-900"><TrendingUp className="w-5 h-5" /></a>
                    </div>
                </div>
            </footer>

            <style>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 4s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
}
