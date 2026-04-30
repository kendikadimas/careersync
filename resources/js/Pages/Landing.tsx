import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FileSearch, Route, TrendingUp, Trophy,
    ArrowRight, CheckCircle2, Upload, BarChart3, Rocket,
    GraduationCap, Building2, Menu, X, Cpu, Briefcase, Camera, Send, Mail, ExternalLink
} from 'lucide-react';
import InteractiveHoverButton from '@/Components/ui/interactive-hover-button';
import CTAWithVerticalMarquee from '@/Components/ui/cta-with-text-marquee';
import Navbar from '@/Components/Navbar';
import { ContainerScroll } from '@/Components/ui/container-scroll-animation';

interface Props {
    stats: { jobs_analyzed: number; accuracy: number; skills_mapped: number; users: number };
}

const fmt = (v: number) => v.toLocaleString('id-ID');

/* ───────────────── HERO ───────────────── */
function Hero() {
    return (
        <section className="relative overflow-hidden bg-[#f6f6f6] pt-4 pb-4 md:pt-6 md:pb-2">
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />
            <div className="flex flex-col overflow-hidden">
                <ContainerScroll
                    titleComponent={
                        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
                            <div className="inline-flex items-center gap-2.5 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 text-[13px] font-semibold text-accent mb-8 hover:bg-accent/15 transition-colors cursor-default">
                                AI-Powered Skill Gap Analysis v2.0
                            </div>
                            <h1 className="text-[60px] font-extrabold text-slate-900 leading-[66px] tracking-tight font-[family-name:var(--font-heading)]">
                                Kembangkan Potensimu.<br />
                                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                    Sinkronkan dengan Industri.
                                </span>
                            </h1>
                            <p className="mt-6 text-slate-600 text-[15px] font-medium sm:text-[18px] max-w-2xl mx-auto leading-relaxed">
                                Platform pembelajaran adaptif yang mempersonalisasi alur belajar Anda melalui identifikasi skill-gap berbasis kecerdasan buatan.
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <InteractiveHoverButton
                                    text="Mulai Analisis CV"
                                    className="rounded-lg shadow-xl shadow-primary/20 text-[16px] px-8 py-3.5 min-w-0"
                                    onClick={() => {
                                        setTimeout(() => {
                                            router.visit('/register');
                                        }, 1000);
                                    }}
                                />
                            </div>
                        </div>
                    }
                >
                    <div className="relative h-full w-full group">
                        <div className="absolute -inset-4 bg-primary/10 rounded-[2rem] blur-3xl opacity-30" />
                        <div className="relative h-full bg-slate-100 rounded-2xl overflow-hidden p-2 md:p-3 shadow-2xl">
                            <img src="/Dashboard View.png" alt="Kembangin Dashboard Preview" className="w-full h-auto rounded-xl shadow-sm" />
                        </div>
                    </div>
                </ContainerScroll>
            </div>
        </section>
    );
}

/* ───────────────── FEATURES ───────────────── */
function Features() {
    return (
        <section id="features" className="bg-[#f6f6f6] pt-10 pb-20 md:pt-16 md:pb-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-semibold mb-5">Fitur Utama</div>
                    <h2 className="text-3xl sm:text-[48px] font-extrabold text-[#1A1A2E] font-[family-name:var(--font-heading)] leading-tight">
                        Empat Pilar Transformasi Karier Digital Anda.
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Card 1 */}
                    <div className="bg-white rounded-[24px] p-2 transition-all duration-300 group">
                        <div className="bg-[#f6f6f6] rounded-[20px] mb-6 h-[280px] overflow-hidden flex flex-col items-center justify-center p-6 relative">
                            <div className="absolute inset-x-8 top-10 bottom-0 bg-white rounded-t-2xl p-6 border-b-0 transition-transform duration-500 group-hover:-translate-y-2">
                                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center ring-4 ring-white ">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    </div>
                                    <div>
                                        <div className="text-[12px] text-slate-500 font-medium mb-0.5 uppercase tracking-wider">Target Karier</div>
                                        <div className="text-base font-bold text-slate-900 leading-tight">Full Stack Developer</div>
                                    </div>
                                    <div className="ml-auto text-right">
                                        <div className="text-[12px] text-slate-500 font-medium mb-0.5 uppercase tracking-wider">Kecocokan</div>
                                        <div className="text-lg font-black text-primary">82%</div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { skill: 'Laravel Framework', status: 'Dikuasai', icon: '✓', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                                        { skill: 'React / Inertia.js', status: 'Dikuasai', icon: '✓', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                                        { skill: 'Docker & CI/CD', status: 'Kesenjangan', icon: '×', color: 'text-rose-500', bg: 'bg-rose-50' }
                                    ].map((s, idx) => (
                                        <div key={idx} className="flex justify-between items-center bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-6 h-6 flex items-center justify-center rounded-md ${s.bg} ${s.color} font-bold text-sm`}>{s.icon}</div>
                                                <span className="font-semibold text-slate-700 text-sm">{s.skill}</span>
                                            </div>
                                            <span className={`text-xs font-bold ${s.color}`}>{s.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="px-6 pb-8 pt-2">
                            <h3 className="text-2xl font-bold text-slate-900 mb-3 font-[family-name:var(--font-heading)]">Diagnostic Assessment & Skill-Gap Profiling</h3>
                            <p className="text-[16px] text-slate-500 leading-relaxed font-medium">
                                Gunakan AI untuk mengekstrak kompetensi dari CV Anda dan bandingkan langsung dengan standar industri terkini untuk mengkalkulasi celah keahlian secara presisi.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-[24px] p-2 transition-all duration-300 group">
                        <div className="bg-[#f6f6f6] rounded-[20px] mb-6 h-[280px] overflow-hidden flex flex-col items-center justify-center p-6 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[280px] transition-transform duration-500 group-hover:scale-105">
                                <div className="bg-white px-5 py-5 rounded-2xl border border-slate-100">
                                    <div className="text-sm font-bold text-slate-800 mb-4 border-b border-slate-100 pb-3 flex items-center justify-between">
                                        Roadmap Belajar <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-md">8/12 Modul</span>
                                    </div>
                                    <div className="relative border-l-2 border-slate-200 ml-2 space-y-5">
                                        <div className="relative">
                                            <div className="absolute -left-[25px] bg-emerald-500 w-5 h-5 rounded-full border-4 border-white flex items-center justify-center">
                                                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                            </div>
                                            <div className="pl-6">
                                                <div className="text-xs font-bold text-slate-800">Modul 8: Backend Laravel</div>
                                                <div className="text-[11px] text-slate-500 font-medium">Selesai • 100 XP</div>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute -left-[25px] bg-primary w-5 h-5 rounded-full border-4 border-white "></div>
                                            <div className="pl-6">
                                                <div className="text-xs font-bold text-primary">Modul 9: API & JWT Auth</div>
                                                <div className="text-[11px] font-medium text-primary bg-primary/10 inline-block px-2 py-0.5 rounded mt-1">Sedang Berjalan</div>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute -left-[25px] bg-slate-200 w-5 h-5 rounded-full border-4 border-white"></div>
                                            <div className="pl-6">
                                                <div className="flex items-center gap-1.5"><span className="text-xs font-bold text-slate-400">Capstone Project</span></div>
                                                <div className="text-[11px] text-slate-400 font-medium">Terkunci</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 pb-8 pt-2">
                            <h3 className="text-2xl font-bold text-slate-900 mb-3 font-[family-name:var(--font-heading)]">Personalized Learning Path</h3>
                            <p className="text-[16px] text-slate-500 leading-relaxed font-medium">
                                Dapatkan alur belajar adaptif yang dipersonalisasi serta kewajiban pengerjaan Capstone Project yang divalidasi otomatis.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-[24px] p-2 transition-all duration-300 group">
                        <div className="bg-[#f6f6f6] rounded-[20px] mb-6 h-[280px] overflow-hidden flex flex-col items-center justify-center p-6 relative">
                            <div className="w-full max-w-[320px] space-y-3 transition-transform duration-500 group-hover:-translate-y-2">
                                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center justify-between">
                                    <span>Market Insights</span>
                                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Live API</span>
                                </div>
                                {[
                                    { name: 'PostgreSQL', val: '12.4k', color: 'text-blue-600', bg: 'bg-blue-100' },
                                    { name: 'TypeScript', val: '9.8k', color: 'text-indigo-600', bg: 'bg-indigo-100' },
                                    { name: 'Tailwind CSS', val: '8.2k', color: 'text-cyan-600', bg: 'bg-cyan-100' },
                                ].map((item, i) => (
                                    <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
                                                <TrendingUp className={`w-4 h-4 ${item.color}`} />
                                            </div>
                                            <div className="text-[14px] font-bold text-slate-800">{item.name}</div>
                                        </div>
                                        <div className="text-[12px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">{item.val} Job</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="px-6 pb-8 pt-2">
                            <h3 className="text-2xl font-bold text-slate-900 mb-3 font-[family-name:var(--font-heading)]">Dynamic Curriculum Synchronization</h3>
                            <p className="text-[16px] text-slate-500 leading-relaxed font-medium">
                                Sistem mengekstraksi data kebutuhan industri secara otomatis sebagai sensor untuk mengidentifikasi Trending Skills secara real-time.
                            </p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white rounded-[24px] p-2 transition-all duration-300 group">
                        <div className="bg-[#f6f6f6] rounded-[20px] mb-6 h-[280px] overflow-hidden flex align-center justify-center p-6 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] transition-transform duration-500 group-hover:scale-105">
                                <div className="bg-white p-8 rounded-[32px] border border-slate-100">
                                    <div className="text-center mb-6">
                                        <div className="text-[13px] text-slate-500 font-medium mb-3 uppercase tracking-wider">Readiness Score</div>
                                        <div className="relative inline-flex items-center justify-center">
                                            <svg className="w-28 h-28 transform -rotate-90">
                                                <circle cx="56" cy="56" r="46" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                                                <circle cx="56" cy="56" r="46" stroke="#3b82f6" strokeWidth="8" fill="transparent" strokeDasharray="289" strokeDashoffset="43" className="text-primary rounded-full transition-all duration-1000" />
                                            </svg>
                                            <div className="absolute flex flex-col items-center">
                                                <div className="text-3xl font-extrabold tracking-tight text-slate-900">85<span className="text-xl text-slate-400 font-normal">%</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-20"><Trophy className="w-5 h-5 text-amber-600"/></div>
                                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10"><CheckCircle2 className="w-5 h-5 text-emerald-600"/></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 pb-8 pt-2">
                            <h3 className="text-2xl font-bold text-slate-900 mb-3 font-[family-name:var(--font-heading)]">Learning Outcomes & Engagement</h3>
                            <p className="text-[16px] text-slate-500 leading-relaxed font-medium">
                                Validasi hasil belajar melalui Job Readiness Score (0-100%) dan portofolio publik yang didukung sistem gamifikasi.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ───────────────── BENEFITS ───────────────── */
function Benefits() {
    const otherTools = [
        "Pembelajaran tidak terarah & generik",
        "Sulit mengetahui skill apa yang sedang dicari HRD",
        "Tidak ada bukti riil penguasaan kompetensi",
        "Kurikulum sering tertinggal",
        "Fokus hanya pada teori"
    ];
    const kembangin = [
        "Roadmap belajar terpersonalisasi oleh AI",
        "Diagnosis skill-gap presisi industri",
        "Portofolio divalidasi via GitHub",
        "Sinkronisasi kurikulum real-time",
        "Job Readiness Score terukur"
    ];
    return (
        <section id="benefits" className="bg-[#f6f6f6] py-20 md:py-28">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 border border-primary/30 text-primary rounded-full px-5 py-1.5 text-sm font-semibold mb-6 bg-white/50 backdrop-blur-sm">Kenapa Kembangin?</div>
                    <h2 className="text-4xl md:text-[46px] font-extrabold text-[#1A1A2E] leading-tight mb-6">Cara Lebih Cerdas Membangun Karier Digital</h2>
                </div>
                <div className="bg-white rounded-[32px] p-2 sm:p-4 shadow-sm border border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-8"><h3 className="text-2xl font-bold mb-6">Platform Lain</h3><ul className="space-y-4">{otherTools.map((t,i)=>(<li key={i} className="flex items-center gap-3 text-slate-500"><X className="w-4 h-4 text-slate-300"/>{t}</li>))}</ul></div>
                        <div className="p-8 rounded-[28px] bg-primary/5 border-2 border-primary/20"><h3 className="text-2xl font-bold mb-6 text-primary">Kembangin</h3><ul className="space-y-4">{kembangin.map((t,i)=>(<li key={i} className="flex items-center gap-3 text-slate-700 font-bold"><CheckCircle2 className="w-4 h-4 text-primary"/>{t}</li>))}</ul></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ───────────────── HOW IT WORKS ───────────────── */
function HowItWorks() {
    const steps = [
        {
            title: "Diagnosis AI & Profiling",
            desc: "AI memindai CV Anda untuk mengekstrak kompetensi dan membandingkannya dengan standar industri.",
            visual: (
                <div className="relative w-full h-48 mt-8 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl" />
                    <div className="relative flex items-center justify-center">
                        <div className="w-32 h-32 bg-white rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center relative z-10">
                            <Upload className="w-12 h-12 text-primary" />
                        </div>
                        <div className="absolute -right-8 -top-4 w-16 h-16 bg-blue-50 rounded-xl shadow-lg border border-blue-100 flex items-center justify-center z-20 rotate-12">
                            <FileSearch className="w-8 h-8 text-blue-500" />
                        </div>
                        <div className="absolute w-48 h-48 border border-primary/10 rounded-full" />
                    </div>
                </div>
            )
        },
        {
            title: "Personalized Roadmap",
            desc: "Dapatkan alur belajar adaptif yang dirancang khusus untuk menutup gap kompetensi Anda.",
            visual: (
                <div className="relative w-full h-48 mt-8 flex items-center justify-center overflow-hidden">
                    <div className="w-full max-w-[200px] bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-inner">
                        <div className="h-2 w-full bg-slate-200 rounded-full mb-4 overflow-hidden">
                            <div className="h-full bg-primary w-2/3" />
                        </div>
                        <div className="space-y-3">
                            <div className="h-8 w-full bg-white rounded-lg border border-slate-100 flex items-center px-2 gap-2">
                                <div className="w-4 h-4 rounded bg-emerald-500 flex items-center justify-center"><CheckCircle2 className="w-2.5 h-2.5 text-white" /></div>
                                <div className="h-2 w-16 bg-slate-100 rounded" />
                            </div>
                            <div className="h-8 w-full bg-white rounded-lg border border-primary/20 flex items-center px-2 gap-2 shadow-sm">
                                <div className="w-4 h-4 rounded bg-primary" />
                                <div className="h-2 w-20 bg-primary/10 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Job Readiness & Karier",
            desc: "Validasi hasil belajar melalui proyek riil dan dapatkan bukti kesiapan kerja yang diakui industri.",
            visual: (
                <div className="relative w-full h-48 mt-8 flex items-center justify-center">
                    <div className="relative w-36 h-36">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="72" cy="72" r="60" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-100" />
                            <circle cx="72" cy="72" r="60" stroke="#3b82f6" strokeWidth="10" fill="transparent" strokeDasharray="377" strokeDashoffset="56" strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-2xl font-black text-slate-900">85%</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ready</div>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <section id="how-it-works" className="bg-[#f6f6 f6] py-24 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 bg-primary/5 text-primary rounded-full px-5 py-1.5 text-xs font-bold mb-6 border border-primary/10">How It Works</div>
                    <h2 className="text-4xl md:text-[56px] font-bold text-slate-950 leading-tight mb-6 tracking-tight">Wujudkan Karier Impian<br />Dalam 3 Langkah Mudah</h2>
                    <p className="text-slate-500 text-lg sm:text-xl font-medium leading-relaxed max-w-2xl mx-auto">Sistem cerdas kami membimbing Anda dari tahap awal hingga siap kerja di industri.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-[#F8FAFC] border border-slate-100 rounded-[32px] p-8 lg:p-10 flex flex-col items-center text-center group hover:bg-white hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500"
                        >
                            <h3 className="text-2xl font-bold text-slate-950 mb-3">{step.title}</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                            {step.visual}
                        </motion.div>
                    ))}
                </div>
                <div className="mt-20 text-center">
                    <Link href="/how-it-works" className="inline-flex items-center gap-2 bg-white border-2 border-slate-200 text-slate-600 hover:border-primary hover:text-primary px-8 py-4 rounded-2xl font-bold transition-all shadow-sm hover:shadow-xl hover:shadow-primary/10">
                        Pelajari Selengkapnya <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

/* ───────────────── FOOTER ───────────────── */
function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-24 pb-12 overflow-hidden relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-20">
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                <img src="/logo1.svg" alt="Logo" className="w-6 h-6 object-contain invert brightness-0" />
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight font-[family-name:var(--font-heading)]">Kembangin</span>
                        </Link>
                        <p className="text-base leading-relaxed mb-8 max-w-sm text-slate-400 font-medium">
                            Solusi cerdas berbasis AI untuk mengakselerasi karier digital Anda dengan menjembatani kesenjangan antara pendidikan dan industri.
                        </p>
                        <div className="flex items-center gap-4">
                            {[
                                { icon: Send, href: "#", label: "Twitter" },
                                { icon: Briefcase, href: "#", label: "LinkedIn" },
                                { icon: Cpu, href: "#", label: "GitHub" },
                                { icon: Camera, href: "#", label: "Instagram" }
                            ].map((social, i) => (
                                <a key={i} href={social.href} className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary/20 hover:border-primary/50 transition-all duration-300">
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-xl mb-8 font-[family-name:var(--font-heading)]">Produk</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Fitur Utama", href: "#features" },
                                { name: "Cara Kerja", href: "#how-it-works" },
                                { name: "Market Insights", href: "/market" },
                                { name: "Skill Assessment", href: "/assessment" }
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link href={link.href} className="text-base hover:text-white transition-colors duration-200 flex items-center group">
                                        <div className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-xl mb-8 font-[family-name:var(--font-heading)]">Sumber</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Blog Karier", href: "/blog" },
                                { name: "Dokumentasi", href: "/docs" },
                                { name: "FAQ", href: "/faq" }
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link href={link.href} className="text-base hover:text-white transition-colors duration-200 flex items-center group">
                                        <div className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-xl mb-8 font-[family-name:var(--font-heading)]">Tetap Terhubung</h4>
                        <p className="text-base mb-6 text-slate-500 font-medium">Dapatkan update terbaru mengenai tren industri.</p>
                        <div className="relative">
                            <input type="email" placeholder="Email Anda" className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-sm focus:border-primary/50 text-white transition-all" />
                            <button className="absolute right-1 top-1 bg-primary text-white p-2 rounded-lg shadow-lg shadow-primary/20"><ArrowRight className="w-4 h-4" /></button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-sm font-medium">&copy; {new Date().getFullYear()} Kembangin. Seluruh hak cipta dilindungi.</div>
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-900 rounded-full border border-slate-800 text-xs font-bold text-slate-500">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        SDG 4 & SDG 8 COMPLIANT
                    </div>
                </div>
            </div>
        </footer>
    );
}

/* ───────────────── MAIN PAGE ───────────────── */
export default function Landing({ stats }: Props) {
    return (
        <div className="min-h-screen bg-[#f6f6f6] text-[#1A1A2E]">
            <Head title="Kembangin — AI-Powered Career Intelligence" />
            <Navbar />
            <Hero />
            <Features />
            <Benefits />
            <HowItWorks />
            <CTAWithVerticalMarquee />
            <Footer />
        </div>
    );
}
