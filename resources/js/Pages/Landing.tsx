import { Link } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    stats: { jobs_analyzed: number; accuracy: number; skills_mapped: number; users: number };
}

const formatNumber = (value: number) => value.toLocaleString('id-ID');

function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-16 flex items-center justify-between">
                    <Link href="#hero" className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
                            CP
                        </div>
                        <div className="leading-tight">
                            <p className="text-sm font-semibold text-[#1A1A2E]">CareerPath AI</p>
                            <p className="text-[10px] text-slate-500">AI Career Platform</p>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
                        <Link href="#hero" className="hover:text-[#1A1A2E] transition-colors">Home</Link>
                        <Link href="#features" className="hover:text-[#1A1A2E] transition-colors">Fitur</Link>
                        <Link href="#how-it-works" className="hover:text-[#1A1A2E] transition-colors">Cara Kerja</Link>
                        <Link href="/blog" className="hover:text-[#1A1A2E] transition-colors">Blog</Link>
                    </div>

                    <div className="hidden md:flex items-center">
                        <Link
                            href="/login"
                            className="bg-primary text-white px-6 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg hover:bg-[#23307B] transition-all"
                        >
                            Login
                        </Link>
                    </div>

                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden p-2 text-slate-600 hover:text-[#1A1A2E]"
                        aria-label="Toggle navigation"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            {open ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
                {open && (
                    <div className="md:hidden pb-4 flex flex-col gap-3 text-sm text-slate-600">
                        <Link href="#hero" className="hover:text-[#1A1A2E]">Home</Link>
                        <Link href="#features" className="hover:text-[#1A1A2E]">Fitur</Link>
                        <Link href="#how-it-works" className="hover:text-[#1A1A2E]">Cara Kerja</Link>
                        <Link href="/blog" className="hover:text-[#1A1A2E]">Blog</Link>
                        <Link href="/login" className="bg-primary text-white px-6 py-2 rounded-full text-center">Login</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

function Hero() {
    return (
        <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-[#2D3A8C] to-[#1A2460] pt-20 pb-32">
            <div className="absolute inset-0 opacity-40">
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#4F6FE8] blur-3xl rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#23307B] blur-3xl rounded-full"></div>
            </div>
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <div className="inline-flex items-center gap-2 border border-white/30 rounded-full px-4 py-1.5 text-[11px]">
                    SDG 4 • Education & SDG 8 • Decent Work
                </div>
                <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight font-[family:var(--font-heading)]">
                    Build Your Dream Career
                    <span className="block">Based on Real Data</span>
                </h1>
                <div className="mt-7 flex items-center justify-center">
                    <Link
                        href="/register"
                        className="px-6 py-2.5 rounded-full border border-white/60 text-sm font-semibold hover:bg-white/10 transition-all"
                    >
                        Get Started
                    </Link>
                </div>

                <div className="relative mt-14 flex items-center justify-center">
                    <div className="hidden md:block absolute left-0 top-10 bg-white/10 border border-white/30 rounded-xl px-4 py-3 w-56 text-left backdrop-blur">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-[11px] font-semibold">Skill Gap Detected!</p>
                            <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-amber-300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 9v4"></path>
                                    <path d="M12 17h.01"></path>
                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                </svg>
                            </div>
                        </div>
                        <ul className="text-[11px] text-white/80 space-y-1">
                            <li>Docker</li>
                            <li>TypeScript</li>
                            <li>Testing</li>
                        </ul>
                    </div>

                    <div className="relative bg-white rounded-2xl shadow-lg px-8 pt-6 pb-10 w-64 text-[#1A1A2E]">
                        <p className="text-[10px] text-slate-500">Work Readiness Score</p>
                        <div className="mt-2 text-4xl font-extrabold text-[#4F6FE8]">
                            72<span className="text-base text-slate-400">/100</span>
                        </div>
                        <div className="mt-1 text-[11px] text-emerald-600 font-semibold flex items-center justify-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 19V5" />
                                <path d="m5 12 7-7 7 7" />
                            </svg>
                            Naik 10 poin minggu ini
                        </div>
                        <div className="mt-4 h-2 w-full bg-slate-100 rounded-full">
                            <div className="h-2 bg-[#4F6FE8] rounded-full" style={{ width: '72%' }}></div>
                        </div>
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/80 text-xs flex items-center gap-2">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                            Scroll
                        </div>
                    </div>

                    <div className="hidden md:block absolute right-0 top-10 bg-white/10 border border-white/30 rounded-xl px-4 py-3 w-52 text-left backdrop-blur">
                        <p className="text-[11px] text-white/70">Trending Minggu Ini</p>
                        <p className="mt-1 font-semibold">TypeScript</p>
                        <div className="mt-2 inline-flex items-center gap-2 text-[10px] text-white/80 bg-white/10 px-2 py-1 rounded-full">
                            40% demand naik
                        </div>
                        <div className="mt-3 w-8 h-8 rounded-full border border-white/60 text-white flex items-center justify-center hover:bg-white/10 transition-colors">
                            →
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function StatsBar({ stats }: Props) {
    return (
        <section className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 text-center">
                    {[
                        { label: 'Lowongan Dianalisa', value: `${formatNumber(stats.jobs_analyzed)}+` },
                        { label: 'Akurasi Analisis', value: `${stats.accuracy}%` },
                        { label: 'Skill Terpetakan', value: `${formatNumber(stats.skills_mapped)}+` },
                        { label: 'Pengguna Aktif', value: `${formatNumber(stats.users)}+` },
                    ].map((item) => (
                        <div key={item.label} className="py-6">
                            <div className="text-2xl sm:text-3xl font-extrabold text-primary">{item.value}</div>
                            <p className="text-xs text-slate-500 mt-1">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Features() {
    return (
        <section id="features" className="bg-[#F8F9FA] py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    {/* <span className="text-xs font-semibold text-[#4F6FE8] uppercase">Fitur Utama</span> */}
                    <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#2D3A8C] font-[family:var(--font-heading)]">Fitur Utama</h2>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        {
                            icon: '📊',
                            title: 'Industry Data Crawler',
                            desc: 'Analisis ribuan lowongan kerja IT Indonesia secara real-time untuk menentukan skill yang paling dicari',
                        },
                        {
                            icon: '🎯',
                            title: 'Skill Gap Radar',
                            desc: 'Visualisasi radar chart yang menunjukkan jarak antara kemampuan dan standar industri saat ini',
                        },
                        {
                            icon: '🗺️',
                            title: 'Dynamic Roadmap',
                            desc: 'Learning path interaktif yang berubah mengikuti tren pasar — bukan template statis',
                        },
                        {
                            icon: '⭐',
                            title: 'Work Readiness Score',
                            desc: 'Skor 0-100 yang mengukur kesiapan kerjamu berdasarkan skill, pengalaman dan progres belajar',
                        },
                    ].map((feature) => (
                        <div
                            key={feature.title}
                            className="bg-[#1A2460] text-white rounded-2xl p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
                        >
                            <div className="text-3xl mb-4">{feature.icon}</div>
                            <h3 className="text-lg font-bold mb-2 font-[family:var(--font-heading)]">{feature.title}</h3>
                            <p className="text-sm text-slate-300">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function HowItWorks() {
    return (
        <section id="how-it-works" className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto">
                    <span className="text-xs font-semibold text-[#4F6FE8] uppercase">CARA KERJA</span>
                    <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] font-[family:var(--font-heading)]">
                        Dari CV ke Karir dalam 3 Langkah
                    </h2>
                    <p className="mt-3 text-sm text-slate-500">
                        Tidak perlu riset manual berjam-jam. AI kami analisis pasar kerja dan profilmu secara bersamaan.
                    </p>
                </div>

                <div className="mt-14 space-y-12">
                    {[
                        {
                            step: 'Step 1',
                            title: 'Upload CV Kamu',
                            desc: 'Upload CV kamu ke dashboard dan AI kami akan mengekstrak semua skill dan pengalaman kamu secara otomatis',
                            reverse: false,
                        },
                        {
                            step: 'Step 2',
                            title: 'Analisis AI',
                            desc: 'Sistem membandingkan profilmu dengan ribuan lowongan aktif dan mengidentifikasi gap secara presisi.',
                            reverse: true,
                        },
                        {
                            step: 'Step 3',
                            title: 'Dapatkan Dynamic Learning Path',
                            desc: 'Terima learning path yang dipersonalisasi — dengan resource gratis dan project portofolio yang konkret.',
                            reverse: false,
                        },
                    ].map((item) => (
                        <div
                            key={item.step}
                            className={`flex flex-col ${item.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}
                        >
                            <div className="flex-1">
                                <div className="h-56 w-full rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-lg"></div>
                            </div>
                            <div className="flex-1">
                                <p className="text-xs font-semibold text-[#4F6FE8]">{item.step}</p>
                                <h3 className="mt-2 text-2xl font-bold text-[#1A1A2E] font-[family:var(--font-heading)]">
                                    {item.title}
                                </h3>
                                <p className="mt-3 text-sm text-slate-500">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CTABanner() {
    return (
        <section className="bg-[#F8F9FA] py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[#2D3A8C] rounded-2xl px-6 sm:px-10 py-12 text-center text-white shadow-lg">
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-[family:var(--font-heading)]">
                        Tunggu Apa Lagi? Mulai Sekarang!
                    </h2>
                    <p className="mt-3 text-sm text-white/80">Analisis CV, Ketahui Skill Gap, Raih Mimpi Besarmu</p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/register"
                            className="bg-white text-[#2D3A8C] px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
                        >
                            Buat Akun
                        </Link>
                        <Link
                            href="/contact"
                            className="border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-all"
                        >
                            Hubungi Kami
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="bg-[#2D3A8C] text-white/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <p className="text-xs font-semibold text-white mb-4">*Name APSS</p>
                        <p className="text-xs leading-relaxed text-white/70 max-w-xs">
                            Platform AI untuk bridging skill gap antara kurikulum kampus dan kebutuhan industri IT Indonesia.
                        </p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-white mb-4">PRODUK</p>
                        <div className="flex flex-col gap-2 text-xs">
                            <Link href="#features" className="hover:text-white transition-colors">Fitur</Link>
                            <Link href="#how-it-works" className="hover:text-white transition-colors">Cara Kerja</Link>
                            <Link href="/demo" className="hover:text-white transition-colors">Demo Langsung</Link>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-white mb-4">SUMBER</p>
                        <div className="flex flex-col gap-2 text-xs">
                            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                            <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
                            <Link href="/about" className="hover:text-white transition-colors">Tentang Kami</Link>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-white mb-4">SUMBER</p>
                        <div className="flex flex-col gap-2 text-xs">
                            <Link href="/login" className="hover:text-white transition-colors">Masuk</Link>
                            <Link href="/register" className="hover:text-white transition-colors">Daftar Gratis</Link>
                        </div>
                    </div>
                </div>

                <div className="mt-10 border-t border-white/10 pt-4 text-xs text-white/60">
                    © 2026 Career Sync Academy. Dibuat untuk SDG 4 & SDG 8.
                </div>
            </div>
        </footer>
    );
}

export default function Landing({ stats }: Props) {
    return (
        <div className="min-h-screen bg-white text-[#1A1A2E]">
            <Navbar />
            <Hero />
            {/* <StatsBar stats={stats} /> */}
            <Features />
            <HowItWorks />
            <CTABanner />
            <Footer />
        </div>
    );
}
