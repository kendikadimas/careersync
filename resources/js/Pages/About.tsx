import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Target, Users, Lightbulb, TrendingUp, 
    ArrowRight, CheckCircle2, GraduationCap, 
    Briefcase, Globe, Award, Heart, Mail, Cpu, Monitor,
    Search, Rocket, Zap, ShieldCheck, Layout, ChevronDown, Palette
} from 'lucide-react';
import Navbar from '@/Components/Navbar';

/* ───────────────── PREMIUM FOOTER ───────────────── */
function Footer() {
    return (
        <footer className="bg-[#0A0A0B] text-slate-400 border-t border-slate-900 pt-24 pb-12 overflow-hidden relative">
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
                            <p className="text-sm font-bold text-slate-500 tracking-widest">Follow Our Journey</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-xl mb-8 font-[family-name:var(--font-heading)]">Produk</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Diagnosis AI", href: "/#features" },
                                { name: "Roadmap Adaptif", href: "/how-it-works" },
                                { name: "Market Insights", href: "/market" }
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
                        <h4 className="text-white font-bold text-xl mb-8 font-[family-name:var(--font-heading)]">SDG Compliance</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                                <div className="w-10 h-10 bg-emerald-500 rounded flex items-center justify-center font-black text-white text-lg shrink-0">4</div>
                                <div className="text-xs leading-tight">
                                    <div className="text-white font-bold mb-1 tracking-wide">Quality Education</div>
                                    <p>Menjamin pendidikan inklusif & merata.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                                <div className="w-10 h-10 bg-amber-600 rounded flex items-center justify-center font-black text-white text-lg shrink-0">8</div>
                                <div className="text-xs leading-tight">
                                    <div className="text-white font-bold mb-1 tracking-wide">Decent Work</div>
                                    <p>Pertumbuhan ekonomi & pekerjaan layak.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-sm font-medium">
                        &copy; {new Date().getFullYear()} Kembangin. Seluruh hak cipta dilindungi.
                    </div>
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-900 rounded-full border border-slate-800 text-xs font-bold text-slate-500">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        SDG 4 & SDG 8 Compliant
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default function About() {
    const [activeValue, setActiveValue] = useState<number | null>(0);

    const values = [
        { title: "Industry-First Approach", desc: "Setiap kurikulum yang kami sajikan divalidasi langsung oleh kebutuhan riil industri saat ini. Kami memastikan tidak ada materi yang usang." },
        { title: "Data-Driven Decisions", desc: "Kami menggunakan AI untuk memetakan skill-gap secara presisi berdasarkan ribuan data lowongan kerja dari berbagai platform global." },
        { title: "Lifelong Learning Culture", desc: "Kami percaya bahwa belajar adalah proses berkelanjutan, bukan sekadar tujuan akhir. Sistem kami beradaptasi dengan kecepatan Anda." },
        { title: "Transparent Impact", desc: "Kami mengukur kesiapan kerja Anda melalui angka yang jujur dan dapat diverifikasi, memberikan laporan nyata untuk profil profesional Anda." },
        { title: "Collaborative Ecosystem", desc: "Membangun jembatan yang kokoh antara institusi pendidikan, talenta, dan perusahaan untuk ekosistem kerja yang lebih baik." }
    ];

    const team = [
        { 
            name: "Dimas Kendika Fazrulfalah", 
            role: "Founder & AI Engineer", 
            univ: "Universitas Jenderal Soedirman", 
            avatar: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200&h=200&auto=format&fit=crop" 
        },
        { 
            name: "Sellyjuan Alya Rosalina", 
            role: "UI/UX Designer & Frontend", 
            univ: "Universitas Jenderal Soedirman", 
            avatar: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=200&h=200&auto=format&fit=crop" 
        },
        { 
            name: "Akmal Adhi Nugroho", 
            role: "Business Analyst & Research", 
            univ: "Universitas Jenderal Soedirman", 
            avatar: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=200&h=200&auto=format&fit=crop" 
        },
    ];

    return (
        <div className="min-h-screen bg-white text-slate-900 selection:bg-primary selection:text-white">
            <Head title="Tentang Kami — Kembangin" />
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-20 pb-12 bg-[#f6f6f6]">
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-primary font-bold tracking-wider text-xs mb-4"
                    >
                        About Us
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-[64px] font-black text-slate-950 leading-tight mb-6 tracking-tight font-[family-name:var(--font-heading)]"
                    >
                        Kami Hadir untuk Mengakselerasi <br /> Masa Depan Digital Anda.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-500 font-medium max-w-2xl leading-relaxed"
                    >
                        Kembang.in adalah platform AI-Powered yang menjembatani kesenjangan antara kurikulum akademis dan standar industri teknologi terkini.
                    </motion.p>
                </div>

                {/* Brand Identity Section (Text with Image) */}
                <div className="max-w-7xl mx-auto px-6 mt-12">
                    <div className="bg-white rounded-[48px] p-10 md:p-16 border border-slate-100 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative overflow-hidden shadow-sm">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
                        
                        {/* Image (Logo) */}
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="w-full lg:w-1/3 flex justify-start"
                        >
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <img 
                                    src="/logo1.svg" 
                                    alt="Logo Kembangin" 
                                    className="w-64 h-64 object-contain relative z-10 transition-transform duration-500 group-hover:scale-110" 
                                />
                            </div>
                        </motion.div>

                        {/* Text Content */}
                        <div className="w-full lg:w-2/3">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl md:text-4xl font-black text-slate-950 mb-8 tracking-tight leading-tight">
                                    Simbol Inovasi dan <br /> Pertumbuhan Karir.
                                </h2>
                                <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
                                    <p>
                                        <span className="text-primary font-bold">Kembangin</span> bukan sekadar platform, melainkan filosofi pertumbuhan. Nama "Kembangin" diambil dari kata "Kembangkan", mencerminkan misi kami untuk terus menumbuhkan potensi setiap talenta digital di Indonesia melalui teknologi kecerdasan buatan.
                                    </p>
                                    <p>
                                        Visual kami yang bersih dan dinamis merepresentasikan transparansi, presisi data, dan kesiapan untuk beradaptasi dengan perubahan industri yang sangat cepat. Kami percaya bahwa setiap individu memiliki benih kompetensi yang hanya membutuhkan ekosistem yang tepat untuk mekar dan menjadi profesional yang tangguh.
                                    </p>
                                    <div className="pt-4 flex items-center gap-4">
                                        <div className="w-12 h-1 bg-primary rounded-full" />
                                        <span className="text-slate-900 font-bold tracking-widest text-sm">Empowering Digital Talents</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission, Vision & Values */}
            <section className="py-16 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                        {/* Mission & Vision */}
                        <div className="space-y-16">
                            <div>
                                <h2 className="text-3xl font-black text-slate-950 mb-6 tracking-tight flex items-center gap-3">
                                    <Target className="w-8 h-8 text-primary" /> Misi Kami
                                </h2>
                                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                    Memberdayakan talenta digital Indonesia dengan identifikasi skill-gap berbasis data, 
                                    menyediakan alur belajar yang adaptif, dan memastikan setiap lulusan siap berkontribusi langsung di industri.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-slate-950 mb-6 tracking-tight flex items-center gap-3">
                                    <Lightbulb className="w-8 h-8 text-amber-500" /> Visi Kami
                                </h2>
                                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                    Menjadi standar global dalam sinkronisasi talenta dan industri, menciptakan masa depan di mana 
                                    tidak ada lagi lulusan yang terhambat oleh ketidakrelevanan kurikulum.
                                </p>
                            </div>
                        </div>

                        {/* Values Accordion */}
                        <div>
                            <h2 className="text-3xl font-black text-slate-950 mb-10 tracking-tight">Nilai-Nilai Kami</h2>
                            <div className="space-y-4">
                                {values.map((v, i) => (
                                    <div 
                                        key={i} 
                                        className={`border-b border-slate-100 transition-all duration-300 ${activeValue === i ? 'pb-6' : 'pb-4'}`}
                                    >
                                        <button 
                                            onClick={() => setActiveValue(activeValue === i ? null : i)}
                                            className="w-full flex items-center justify-between group text-left"
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${activeValue === i ? 'bg-primary scale-125' : 'bg-slate-200 group-hover:bg-primary/50'}`} />
                                                <h3 className={`text-xl font-bold transition-colors duration-300 ${activeValue === i ? 'text-slate-950' : 'text-slate-500 group-hover:text-slate-800'}`}>
                                                    {v.title}
                                                </h3>
                                            </div>
                                            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeValue === i ? 'rotate-180 text-primary' : ''}`} />
                                        </button>
                                        <AnimatePresence>
                                            {activeValue === i && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="pl-9 pt-4 text-slate-500 leading-relaxed font-medium">
                                                        {v.desc}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* New Team Section Inspired by the request */}
            <section className="py-16 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-left mb-6">
                        <h2 className="text-4xl font-black text-slate-950 mb-4 tracking-tight">Para Inovator Kami</h2>
                        <p className="text-slate-500 font-medium max-w-2xl">
                            Tim kami berdedikasi tinggi untuk menghadirkan solusi terbaik bagi masa depan karier Anda.
                        </p>
                    </div>

                    <div className="mt-0">
                        <div className="grid grid-cols-2 gap-8 py-4 md:grid-cols-3 lg:grid-cols-4">
                            {team.map((member, index) => (
                                <div key={index} className="group">
                                    <div className="bg-background size-24 rounded-full border p-1 shadow-sm transition-transform duration-500 group-hover:scale-110 border-slate-100">
                                        <img 
                                            className="aspect-square rounded-full object-cover" 
                                            src={member.avatar} 
                                            alt={member.name} 
                                            height="200" 
                                            width="200" 
                                            loading="lazy" 
                                        />
                                    </div>
                                    <span className="mt-6 block text-lg font-bold text-slate-950 tracking-tight leading-tight">{member.name}</span>
                                    <span className="text-primary block text-sm font-bold mt-1">{member.role}</span>
                                    <span className="text-slate-400 block text-xs font-bold mt-0.5">{member.univ}</span>
                                </div>
                            ))}

                            {/* University Profile (Far Right) */}
                            <div className="flex flex-col items-start lg:items-end lg:text-right lg:col-start-4">
                                <div className="bg-white size-24 rounded-2xl border p-4 shadow-sm border-slate-100 flex items-center justify-center mb-6">
                                    <img 
                                        src="/Logo-UNSOED.png" 
                                        alt="Logo Unsoed" 
                                        className="w-full h-full object-contain" 
                                    />
                                </div>
                                <span className="block text-lg font-black text-slate-950 tracking-tight leading-tight">Universitas Jenderal Soedirman</span>
                                <span className="text-slate-400 block text-xs font-bold mt-1 text-right">Purwokerto, Jawa Tengah</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-[48px] p-10 md:p-16 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
                        
                        <div className="relative z-10 max-w-2xl text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold mb-6">
                                Mulai Perjalanan Karier
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                                Kembangkan Skill Digital <br /> Anda ke Level Selanjutnya.
                            </h2>
                            <p className="text-lg text-blue-50 font-medium leading-relaxed mb-8">
                                Bergabunglah dengan ribuan talenta digital lainnya yang telah berhasil mengakselerasi karier mereka melalui diagnosis AI dan roadmap belajar yang personal.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/register" className="bg-white text-primary px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all shadow-lg shadow-black/10">
                                    Daftar Sekarang
                                </Link>
                                <Link href="/how-it-works" className="bg-white/10 border border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold transition-all backdrop-blur-sm">
                                    Lihat Cara Kerja
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
