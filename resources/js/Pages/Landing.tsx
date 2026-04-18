import PublicLayout from '@/Layouts/PublicLayout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface Props {
    stats: { jobs_analyzed: number; accuracy: number; skills_mapped: number; users: number; };
}

// Komponen number counter dengan animasi
function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true;
                const duration = 1500;
                const steps = 50;
                const increment = target / steps;
                let current = 0;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) { setCount(target); clearInterval(timer); }
                    else setCount(Math.floor(current));
                }, duration / steps);
            }
        }, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target]);

    return <span ref={ref}>{count.toLocaleString('id-ID')}{suffix}</span>;
}

export default function Landing({ stats }: Props) {
    return (
        <PublicLayout>
            {/* HERO SECTION */}
            <section className="relative overflow-hidden pt-20 pb-28 px-4">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(20,184,166,0.06),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(15,23,42,0.04),transparent_60%)]" />

                <div className="max-w-7xl mx-auto relative">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left: text */}
                        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-left">
                            {/* Badge SDG */}
                            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
                                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                                SDG 4 · Education & SDG 8 · Decent Work
                            </div>

                            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
                                Karir Impianmu,
                                <span className="block text-teal-600">Dibangun dari</span>
                                <span className="block">Data Nyata.</span>
                            </h1>

                            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
                                Platform AI yang menganalisis skill gap kamu vs kebutuhan pasar kerja IT Indonesia secara real-time. Dapat learning path presisi, bukan roadmap generik.
                            </p>

                            <div className="flex flex-wrap gap-3 mb-12">
                                <Link href="/register" className="bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all hover:scale-105 text-sm">
                                    Analisis CV Saya — Gratis
                                </Link>
                                <Link href="/demo" className="border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all text-sm flex items-center gap-2">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-teal-500"><path d="M8 5v14l11-7z"/></svg>
                                    Lihat Demo
                                </Link>
                            </div>

                            {/* Social proof kecil */}
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <div className="flex -space-x-2">
                                    {['B', 'D', 'A', 'R'].map((l, i) => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-linear-to-br from-teal-400 to-teal-600 border-2 border-white flex items-center justify-center text-white text-xs font-medium">{l}</div>
                                    ))}
                                </div>
                                <span><strong className="text-gray-900">1.200+</strong> mahasiswa sudah bergabung</span>
                            </div>
                        </motion.div>

                        {/* Right: stat cards floating */}
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative hidden lg:block">
                            <div className="relative h-96">
                                {/* Card utama */}
                                <div className="absolute top-0 right-0 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm w-64 text-left">
                                    <p className="text-xs text-gray-500 mb-1">Work Readiness Score</p>
                                    <div className="flex items-end gap-2">
                                        <span className="text-4xl font-bold text-teal-600">72</span>
                                        <span className="text-sm text-gray-400 mb-1">/100</span>
                                    </div>
                                    <p className="text-xs text-teal-600 font-medium mt-1">↑ Naik 18 poin minggu ini</p>
                                    <div className="mt-3 bg-gray-100 rounded-full h-2">
                                        <div className="bg-teal-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                                    </div>
                                </div>
                                {/* Card skill gap */}
                                <div className="absolute top-36 left-0 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm w-56 text-left">
                                    <p className="text-xs text-gray-500 mb-2">Skill gap terdeteksi</p>
                                    {['TypeScript', 'Docker', 'Testing'].map(s => (
                                        <div key={s} className="flex items-center gap-2 mb-1.5">
                                            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                                            <span className="text-xs text-gray-700">{s}</span>
                                        </div>
                                    ))}
                                    <p className="text-xs text-gray-400 mt-2">+3 skill lainnya</p>
                                </div>
                                {/* Card trending */}
                                <div className="absolute bottom-4 right-8 bg-gray-900 text-white rounded-2xl p-5 shadow-sm w-52 text-left">
                                    <p className="text-xs text-gray-400 mb-2">🔥 Trending minggu ini</p>
                                    <p className="font-semibold text-sm">TypeScript</p>
                                    <p className="text-xs text-teal-400 mt-0.5">↑ 40% demand naik</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* STATS SECTION */}
            <section className="bg-gray-50 py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { label: 'Lowongan Dianalisis', value: stats.jobs_analyzed, suffix: '+' },
                            { label: 'Akurasi Analisis', value: stats.accuracy, suffix: '%' },
                            { label: 'Skill Terpetakan', value: stats.skills_mapped, suffix: '+' },
                            { label: 'Pengguna Aktif', value: stats.users, suffix: '+' },
                        ].map((s) => (
                            <div key={s.label}>
                                <div className="text-3xl font-black text-gray-900 mb-1">
                                    <AnimatedNumber target={s.value} suffix={s.suffix} />
                                </div>
                                <p className="text-sm text-gray-500">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS — singkat */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-2">Cara Kerja</p>
                        <h2 className="text-3xl font-bold text-gray-900">Dari CV ke Karir dalam 3 Langkah</h2>
                        <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm text-balance">Tidak perlu riset manual berjam-jam. AI kami analisis pasar kerja dan profilmu secara bersamaan.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connector line */}
                        <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-gray-200 z-0"></div>
                        {[
                            { step: '01', icon: '📄', title: 'Upload CV', desc: 'Paste teks CV atau upload file. AI kami ekstrak semua skill dan pengalaman kamu secara otomatis.' },
                            { step: '02', icon: '🔍', title: 'Analisis AI', desc: 'Sistem membandingkan profilmu dengan ribuan lowongan aktif dan mengidentifikasi gap secara presisi.' },
                            { step: '03', icon: '🗺️', title: 'Dapat Roadmap', desc: 'Terima learning path yang dipersonalisasi — dengan resource gratis dan project portofolio yang konkret.' },
                        ].map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative z-10 text-center">
                                <div className="w-20 h-20 bg-white border border-gray-100 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-5 shadow-sm">
                                    {item.icon}
                                </div>
                                <p className="text-xs font-bold text-teal-500 mb-1">{item.step}</p>
                                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto text-pretty">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <Link href="/how-it-works" className="text-sm text-teal-600 font-bold hover:underline">Pelajari lebih lanjut →</Link>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="bg-gray-50 py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-2">Fitur Utama</p>
                        <h2 className="text-3xl font-black text-gray-900">Lebih dari Sekadar Saran Karir</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            { icon: '📊', title: 'Industry Data Crawler', desc: 'Analisis ribuan lowongan kerja IT Indonesia secara real-time untuk menentukan skill yang paling dicari.' },
                            { icon: '🎯', title: 'Skill Gap Radar', desc: 'Visualisasi radar chart yang menunjukkan jarak antara kemampuanmu dan standar industri saat ini.' },
                            { icon: '🗺️', title: 'Dynamic Roadmap', desc: 'Learning path interaktif yang berubah mengikuti tren pasar — bukan template statis.' },
                            { icon: '⭐', title: 'Work Readiness Score', desc: 'Skor 0-100 yang mengukur kesiapan kerjamu berdasarkan skill, pengalaman, dan progress belajar.' },
                        ].map((f, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white border border-gray-100 rounded-3xl p-6 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-500/5 transition-all text-left">
                                <div className="text-3xl mb-4">{f.icon}</div>
                                <h3 className="font-bold text-gray-900 mb-2 text-sm">{f.title}</h3>
                                <p className="text-[11px] text-gray-500 leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link href="/features" className="text-sm text-teal-600 font-bold hover:underline">Lihat semua fitur →</Link>
                    </div>
                </div>
            </section>

            {/* TESTIMONIAL */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-2">Success Stories</p>
                        <h2 className="text-3xl font-bold text-gray-900">Mereka Sudah Membuktikannya</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        {[
                            { name: 'Rizky Fadillah', role: 'Kini: Frontend Engineer di Gojek', avatar: 'R', quote: 'Sebelum pakai CareerSync, saya bingung skill apa yang harus diprioritaskan. Setelah analisis, saya fokus ke TypeScript dan testing — 4 bulan kemudian dapat offer dari Gojek.' },
                            { name: 'Sinta Dewi', role: 'Kini: Data Analyst di Telkom Indonesia', avatar: 'S', quote: 'Roadmap yang digenerate sangat spesifik. Bukan cuma "pelajari Python" — tapi library apa, project apa, dan resource gratis mana. Ini yang saya butuhkan.' },
                            { name: 'Andi Prasetyo', role: 'Kini: Backend Dev di Tokopedia', avatar: 'A', quote: 'Work Readiness Score saya awalnya 38. Setelah ikuti roadmap 3 bulan, naik ke 76. Satu minggu kemudian saya dapat kerja pertama saya.' },
                        ].map((t, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm relative overflow-hidden">
                                <span className="absolute -top-4 -right-2 text-8xl text-slate-50 opacity-10 font-serif">“</span>
                                <p className="text-sm text-gray-600 leading-relaxed mb-6 italic relative z-10">"{t.quote}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-sm tracking-tighter">{t.avatar}</div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm tracking-tight">{t.name}</p>
                                        <p className="text-[10px] text-teal-600 font-bold uppercase tracking-wider">{t.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA FINAL */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto bg-gray-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-teal-500/20 transition-all duration-1000"></div>
                    <h2 className="text-3xl md:text-4xl font-black mb-4 relative z-10">Mulai Sekarang — 100% Gratis</h2>
                    <p className="text-gray-400 mb-10 text-xs md:text-sm max-w-sm mx-auto relative z-10 leading-relaxed">Tidak perlu kartu kredit. Tidak perlu setup ribet. Daftar dan analisis CV dalam 2 menit.</p>
                    <div className="flex flex-wrap gap-4 justify-center relative z-10">
                        <Link href="/register" className="bg-teal-500 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-teal-400 transition-all hover:scale-105 shadow-xl shadow-teal-500/20">
                            Buat Akun Gratis
                        </Link>
                        <Link href="/demo" className="border border-gray-700 text-gray-300 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-800 transition-all">
                            Lihat Demo Dulu
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
