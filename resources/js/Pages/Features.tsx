import PublicLayout from '@/Layouts/PublicLayout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Zap, Target, Map as MapIcon, Flame, CheckCircle2, Search, TrendingUp, Cpu } from 'lucide-react';

const mainFeatures = [
    {
        id: 'crawler',
        icon: Search,
        title: 'Industry Data Crawler',
        badge: 'Harian & Real-time',
        desc: 'Kami tidak menggunakan data statis tahun lalu. AI kami terus mendata ribuan lowongan kerja IT aktif di Indonesia setiap hari untuk memetakan skill apa yang benar-benar dibutuhkan pasar saat ini.',
        bullets: [
            'Update harian via JSearch API',
            'Fokus pada pasar tech lokal (Indonesia)',
            'Identifikasi tren naik dan turun per skill',
            'Data meliputi estimasi gaji & preferensi teknologi'
        ],
        visualIcon: '🌐',
        color: 'teal'
    },
    {
        id: 'radar',
        icon: Target,
        title: 'Skill Gap Radar',
        badge: 'Powered by Gemini AI',
        desc: 'Visualisasi radar chart instan yang membandingkan profilmu dengan market demand. Kamu bisa melihat gap secara visual tanpa perlu membaca puluhan deskripsi pekerjaan manual.',
        bullets: [
            'Ekstraksi skill otomatis dari CV (PDF/Teks)',
            'Mapping kategori (Frontend, Backend, dll)',
            'Skor akurasi mapping mencapai 94%',
            'Insight tentang skill mana yang paling mendesak'
        ],
        visualIcon: '🎯',
        color: 'amber'
    },
    {
        id: 'roadmap',
        icon: MapIcon,
        title: 'Dynamic Roadmap',
        badge: 'Personalized Path',
        desc: 'Learning path yang digenerate khusus untuk profilmu. Jika kamu sudah tahu React tapi belum tahu TypeScript, roadmap akan fokus mengisi kekosongan tersebut dengan kurikulum yang relevan.',
        bullets: [
            'Milestone berbasis project konkret',
            'Link resource belajar gratis yang dikurasi',
            'Estimasi waktu belajar yang realistis',
            'Sistem progress tracking yang interaktif'
        ],
        visualIcon: '🗺️',
        color: 'blue'
    },
    {
        id: 'score',
        icon: TrendingUp,
        title: 'Work Readiness Score',
        badge: 'Measurable Success',
        desc: 'Satu skor tunggal untuk mengukur seberapa siap kamu memasuki dunia kerja. Skor ini dihitung dari kombinasi skill, pengalaman navigasi, pendidikan, dan penyelesaian roadmap.',
        bullets: [
            'Feedback per kategori (Skill vs Experience)',
            'Rekomendasi tindakan nyata untuk naik skor',
            'Benchmark terhadap data pelamar industri',
            'Integrasi otomatis dengan progress roadmap'
        ],
        visualIcon: '⭐',
        color: 'purple'
    }
];

export default function Features() {
    return (
        <PublicLayout>
            {/* Hero */}
            <section className="pt-24 pb-16 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <p className="text-[10px] font-black text-teal-600 uppercase tracking-[0.3em] mb-4 bg-teal-50 inline-block px-4 py-1.5 rounded-full shadow-sm">Fitur Masa Depan</p>
                        <h1 className="text-4xl md:text-6xl font-black text-navy-900 mb-8 leading-tight tracking-tighter">Teknologi yang Menutup Celah Karirmu</h1>
                        <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium">Kami menggabungkan data pasar kerja real-time dengan Generative AI untuk memberikan panduan karir paling presisi di Indonesia.</p>
                    </motion.div>
                </div>
            </section>

            {/* Alternating Features */}
            <section className="pb-32 px-4">
                <div className="max-w-7xl mx-auto space-y-40">
                    {mainFeatures.map((f, i) => (
                        <div key={f.id} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-24`}>
                            {/* Text content */}
                            <motion.div initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-1 text-left">
                                <span className={`inline-block px-4 py-1.5 rounded-xl bg-${f.color}-50 text-${f.color}-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm`}>
                                    {f.badge}
                                </span>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-navy-900 shadow-xl shadow-slate-200/50`}>
                                        <f.icon className="w-7 h-7" />
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-black text-navy-900 tracking-tight">{f.title}</h2>
                                </div>
                                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-10 font-medium">{f.desc}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 mb-4">
                                    {f.bullets.map((b, bi) => (
                                        <div key={bi} className="flex gap-4">
                                            <div className="w-5 h-5 bg-teal-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                                                <CheckCircle2 className="w-3 h-3 text-teal-500" />
                                            </div>
                                            <p className="text-xs text-slate-500 font-black uppercase tracking-tight leading-snug">{b}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Visual Placeholder/Mockup */}
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex-1 w-full max-w-xl">
                                <div className="aspect-square bg-slate-50 rounded-4xl border border-slate-100 shadow-inner flex items-center justify-center relative overflow-hidden group">
                                    {/* Animated grid background */}
                                    <div className="absolute inset-0 opacity-10 bg-grid-slate-200 mask-radial-fade"></div>
                                    
                                    <div className="text-[12rem] opacity-5 group-hover:scale-150 group-hover:rotate-12 transition-transform duration-1000 select-none grayscale">{f.visualIcon}</div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                         <div className="bg-white/80 backdrop-blur-xl p-10 rounded-4xl border border-white shadow-2xl flex flex-col items-center gap-6 transform -rotate-3 transition-all duration-700 group-hover:rotate-0 group-hover:scale-105">
                                              <div className={`w-20 h-20 rounded-3xl bg-${f.color}-500 flex items-center justify-center text-white shadow-xl shadow-${f.color}-500/20`}>
                                                  <f.icon className="w-10 h-10" />
                                              </div>
                                              <div className="text-center">
                                                  <p className="text-xs font-black text-navy-900 uppercase tracking-[0.3em] mb-1">Live Interface</p>
                                                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Powered by Google Gemini 2.5</p>
                                              </div>
                                         </div>
                                    </div>
                                    
                                    {/* Floating chips */}
                                    <div className="absolute top-10 right-10 bg-white px-4 py-2 rounded-xl shadow-lg border border-slate-50 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 font-black text-[10px] text-teal-600 uppercase tracking-widest">
                                        +42% Growth
                                    </div>
                                    <div className="absolute bottom-10 left-10 bg-navy-900 px-4 py-2 rounded-xl shadow-lg transform -translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 delay-100 font-black text-[10px] text-white uppercase tracking-widest">
                                        Data Verified
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Comparison Table */}
            <section className="bg-navy-900 border-y border-slate-800 py-32 px-4 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(20,184,166,0.05),transparent_50%)]"></div>
                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="text-center mb-20 text-balance">
                        <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tighter uppercase tracking-widest">Kenapa Memilih Career-Sync?</h2>
                        <p className="text-navy-300 text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed">Perbandingan nyata antara metode belajar konvensional yang lambat vs platform kami yang berbasis data.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800 border border-slate-800 rounded-4xl overflow-hidden text-left shadow-2xl">
                        <div className="bg-navy-900 p-12 md:p-16">
                            <h3 className="text-rose-400 font-black text-xs uppercase tracking-[0.3em] mb-12 flex items-center gap-3"><div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div> Cara Konvensional</h3>
                            <div className="space-y-8">
                                {[
                                    { t: 'Riset Manual Melelahkan', d: 'Membaca puluhan lowongan kerja satu per satu di LinkedIn tanpa standarisasi.' },
                                    { t: 'Roadmap Statis & Kuno', d: 'Mengikuti panduan belajar yang sudah tertinggal 1-2 tahun dari tren industri.' },
                                    { t: 'Fokus Teori Berlebihan', d: 'Belajar tanpa tahu implementasi project apa yang sebenarnya dicari oleh HR.' },
                                    { t: 'Feedback Subjektif', d: 'Hanya menebak-nebak apakah kamu sudah siap melamar tanpa data pembanding.' },
                                ].map((item, i) => (
                                    <div key={i} className="opacity-60 grayscale hover:opacity-100 transition-opacity">
                                        <p className="font-black text-sm mb-2 line-through decoration-rose-500/50 uppercase tracking-tighter underline-offset-4">{item.t}</p>
                                        <p className="text-[11px] text-navy-400 leading-relaxed font-bold uppercase tracking-widest">{item.d}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-navy-950 p-12 md:p-16 relative overflow-hidden">
                            <div className="absolute inset-0 bg-teal-500/5 pulse-slow"></div>
                            <h3 className="text-teal-400 font-black text-xs uppercase tracking-[0.3em] mb-12 flex items-center gap-3 relative z-10"><div className="w-2 h-2 bg-teal-400 rounded-full shadow-lg shadow-teal-500"></div> Career-Sync Academy</h3>
                            <div className="space-y-8 relative z-10">
                                {[
                                    { t: 'Otomatisasi Data AI', d: 'AI kami yang meriset dan merangkum pasar kerja untukmu setiap 24 jam.' },
                                    { t: 'Adaptive Learning Path', d: 'Roadmap berubah secara dinamis mengikuti pergerakan teknologi terkini.' },
                                    { t: 'Project-First Approach', d: 'Fokus pada pembangunan portofolio yang terverifikasi standar industri.' },
                                    { t: 'Skor Kesiapan Akurat', d: 'Pantau progressmu dengan angka yang pasti berdasarkan algoritma data.' },
                                ].map((item, i) => (
                                    <div key={i} className="transform hover:translate-x-2 transition-transform duration-500">
                                        <p className="font-black text-sm text-white mb-2 flex items-center gap-3 uppercase tracking-tighter underline decoration-teal-500 decoration-2 underline-offset-8">✨ {item.t}</p>
                                        <p className="text-[11px] text-navy-300 leading-relaxed font-black tracking-widest uppercase">{item.d}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 px-4 text-center">
                <div className="max-w-2xl mx-auto">
                    <div className="w-20 h-20 bg-teal-500 rounded-4xl flex items-center justify-center text-white mx-auto mb-10 shadow-2xl shadow-teal-500/30 transform hover:rotate-12 transition-transform">
                        <Cpu className="w-10 h-10" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-navy-900 mb-8 leading-tight tracking-tighter uppercase tracking-widest">Siap Mengambil Kendali Karirmu?</h2>
                    <p className="text-slate-500 text-lg mb-12 max-w-sm mx-auto leading-relaxed font-medium">Bergabunglah dengan 1.200+ mahasiswa lainnya yang telah membangun karir IT mereka berbasis data.</p>
                    <div className="flex flex-wrap gap-5 justify-center">
                        <Link href="/register" className="bg-navy-900 text-white px-10 py-5 rounded-3xl text-xs font-black uppercase tracking-[0.2em] hover:bg-teal-600 transition-all shadow-2xl shadow-navy-900/20 hover:scale-105 active:scale-95">Buat Akun Sekarang</Link>
                        <Link href="/demo" className="border-2 border-slate-100 text-slate-600 px-10 py-5 rounded-3xl text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-50 transition-all hover:border-slate-300">Lihat Demo</Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
