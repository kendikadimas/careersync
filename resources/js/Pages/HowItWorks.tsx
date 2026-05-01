import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Cpu, Briefcase, Camera, Send, 
    Upload, CheckCircle2, X, Trophy, 
    ArrowRight, Mail
} from 'lucide-react';
import Navbar from '@/Components/Navbar'; // Adjust path if needed
import Footer from '@/Pages/Landing'; // I will extract the Footer or just redefine it here for simplicity, but better to import if exported.

// Note: In Landing.tsx, Footer is a local function. I'll define a reusable Footer or just copy it here.
// For now, I'll copy the premium footer logic here to ensure it looks consistent.

function PremiumFooter() {
    return (
        <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-24 pb-12 overflow-hidden relative">
            {/* Subtle Glow Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-20">
                    {/* Brand Section */}
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
                                <a 
                                    key={i} 
                                    href={social.href} 
                                    className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links - Column 1 */}
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

                    {/* Links - Column 2 */}
                    <div>
                        <h4 className="text-white font-bold text-xl mb-8 font-[family-name:var(--font-heading)]">Sumber</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Blog Karier", href: "/blog" },
                                { name: "Dokumentasi", href: "/docs" },
                                { name: "FAQ", href: "/faq" },
                                { name: "Bantuan", href: "/support" }
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

                    {/* Newsletter / Contact */}
                    <div>
                        <h4 className="text-white font-bold text-xl mb-8 font-[family-name:var(--font-heading)]">Tetap Terhubung</h4>
                        <p className="text-base mb-6 text-slate-500 font-medium">Dapatkan update terbaru mengenai tren industri dan tips karier digital.</p>
                        <div className="relative">
                            <input 
                                type="email" 
                                placeholder="Email Anda" 
                                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3.5 px-4 text-base focus:outline-none focus:border-primary/50 text-white placeholder:text-slate-600 transition-all"
                            />
                            <button className="absolute right-1.5 top-1.5 bg-primary hover:bg-primary-dark text-white p-1.5 rounded-lg transition-colors shadow-lg shadow-primary/20">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="mt-6 flex items-center gap-3 text-sm text-slate-500 font-medium">
                            <Mail className="w-5 h-5" />
                            <span>halo@kembangin.id</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-sm font-medium">
                        &copy; {new Date().getFullYear()} Kembangin. Seluruh hak cipta dilindungi.
                    </div>
                    
                    <div className="flex items-center gap-8 text-sm font-medium">
                        <Link href="/privacy" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-900 rounded-full border border-slate-800 text-xs font-bold text-slate-500">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        SDG 4 & SDG 8 COMPLIANT
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default function HowItWorks() {

    const steps = [
        {
            num: "Step 1",
            title: "Upload Profil & CV Anda",
            desc: "Mulailah dengan mengunggah resume Anda. Teknologi Artificial Intelligence akan langsung memindai, mengekstrak pengalaman, serta daftar keahlian komprehensif Anda dalam hitungan detik.",
            visual: (
                <div className="border-2 border-dashed border-slate-300 rounded-[32px] p-8 text-center bg-[#fcfcfc] flex flex-col justify-center h-[340px] shadow-[inset_0_4px_20px_-10px_rgba(0,0,0,0.05)]">
                    <Upload className="w-14 h-14 text-slate-300 mx-auto mb-5" />
                    <div className="text-lg font-bold text-slate-800 mb-1 font-[family-name:var(--font-heading)]">Tarik & Lepas CV di sini</div>
                    <div className="text-sm text-slate-500 mb-8 font-medium">Mendukung PDF, DOCX (Maks. 5MB)</div>
                    <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 flex items-center gap-4 text-left max-w-sm mx-auto w-full">
                        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center font-black text-sm border border-red-100 shrink-0">PDF</div>
                        <div className="flex-1">
                            <div className="text-[15px] font-bold text-slate-800 tracking-tight">cv_profil_terbaru.pdf</div>
                            <div className="w-full bg-slate-100 h-2 rounded-full mt-2.5 overflow-hidden flex">
                                <div className="bg-primary w-[75%] h-full rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            num: "Step 2",
            title: "Diagnosis Kesenjangan Skill",
            desc: "AI secara otomatis mencocokkan profil Anda dengan kualifikasi dari lowongan kerja riil di industri. Lihat persentase kecocokan dan temukan skill spesifik apa yang harus Anda kejar saat ini juga.",
            visual: (
                <div className="bg-white border border-slate-200/60 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] rounded-[32px] p-8 sm:p-10 h-[340px] flex flex-col justify-center">
                    <div className="flex justify-between items-center pb-6 border-b border-slate-100 mb-8">
                        <div>
                            <div className="text-[11px] text-slate-400 font-black uppercase tracking-widest mb-1">Target Posisi</div>
                            <div className="text-xl font-extrabold text-[#1A1A2E] tracking-tight font-[family-name:var(--font-heading)]">Software Engineer</div>
                        </div>
                        <div className="text-right">
                            <div className="text-[11px] text-slate-400 font-black uppercase tracking-widest mb-1 font-bold">Match</div>
                            <div className="text-3xl font-black text-emerald-500">65%</div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <div className="text-[13px] font-bold text-slate-700 mb-3 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Keahlian Terpenuhi</div>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-4 py-2 bg-slate-100 text-slate-700 cursor-default rounded-xl text-[13px] font-bold border border-slate-200">PHP Native</span>
                                <span className="px-4 py-2 bg-slate-100 text-slate-700 cursor-default rounded-xl text-[13px] font-bold border border-slate-200">MySQL</span>
                            </div>
                        </div>
                        <div>
                            <div className="text-[13px] font-bold text-slate-700 mb-3 flex items-center gap-2"><X className="w-4 h-4 text-rose-500"/> Peta Kesenjangan (Gap)</div>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-[13px] hover:bg-rose-100 transition-colors font-bold border border-rose-100">React.js</span>
                                <span className="px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-[13px] hover:bg-rose-100 transition-colors font-bold border border-rose-100">Docker Content</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            num: "Step 3",
            title: "Roadmap Belajar Terinci",
            desc: "Tidak ada lagi pembelajaran generik yang membuang waktu. Dapatkan silabus dan rekomendasi materi yang hanya berfokus pada menutup kesenjangan (skill-gap) yang Anda butuhkan secara presisi.",
            visual: (
                <div className="bg-white border border-slate-200/60 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] rounded-[32px] p-8 sm:p-10 h-[340px] flex items-center justify-center relative overflow-hidden">
                    <div className="relative pl-10 border-l-2 border-slate-100 space-y-10 w-full max-w-sm text-left">
                        <div className="relative">
                            <div className="absolute -left-[51px] top-1 bg-emerald-500 w-5 h-5 rounded-full border-4 border-white flex items-center justify-center">
                                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <div className="text-[11px] font-black text-emerald-600 mb-1.5 uppercase tracking-widest font-bold">Modul Dasar</div>
                            <div className="text-[17px] font-bold text-slate-800 tracking-tight font-[family-name:var(--font-heading)]">Pengenalan Ekosistem React</div>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[51px] top-1 bg-primary w-5 h-5 rounded-full border-4 border-white shadow-[0_0_0_4px_rgba(59,130,246,0.2)]"></div>
                            <div className="text-[11px] font-black text-primary mb-2.5 uppercase tracking-widest font-bold">Sedang Berjalan</div>
                            <div className="text-[17px] font-bold text-slate-800 bg-primary/5 p-5 rounded-2xl border border-primary/20 tracking-tight relative cursor-pointer hover:bg-primary/10 transition-colors font-[family-name:var(--font-heading)]">
                                Containerization dengan Docker
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            num: "Step 4",
            title: "Pengerjaan Projek Valid",
            desc: "Terapkan apa yang Anda pelajari melalui pembuatan Capstone Project riil. Sistem kami terintegrasi dengan GitHub API untuk memverifikasi struktur kodingan dan progres commit Anda.",
            visual: (
                <div className="bg-[#0d1117] rounded-[32px] p-8 h-[340px] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute top-[-40%] right-[-10%] w-64 h-64 bg-blue-500/20 rounded-full blur-[60px] pointer-events-none"></div>
                    <div className="w-full max-w-[340px] bg-[#161b22] border border-[#30363d] rounded-3xl p-7 shadow-2xl relative z-10 text-left">
                        <div className="flex items-center gap-4 mb-7">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-[3px] border-[#30363d] shrink-0">
                                <Cpu className="w-7 h-7 text-slate-900" />
                            </div>
                            <div className="overflow-hidden">
                                <div className="text-[15px] font-bold text-white truncate tracking-tight font-[family-name:var(--font-heading)]">johndoe/docker-capstone</div>
                                <div className="text-[13px] text-[#8b949e] font-medium">Public repository</div>
                            </div>
                        </div>
                        <div className="bg-[#000000] border border-[#30363d] rounded-2xl p-5 mb-5">
                            <div className="flex items-center justify-between mb-4 border-b border-[#30363d] pb-4">
                                <span className="text-[11px] text-[#8b949e] font-mono tracking-widest uppercase font-bold">Sync Status</span>
                                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-md flex items-center gap-1 border border-emerald-400/20"><CheckCircle2 className="w-3.5 h-3.5"/> Verified</span>
                            </div>
                            <div className="flex justify-between px-2">
                                <div className="text-center">
                                    <div className="text-2xl font-black text-white leading-none">42</div>
                                    <div className="text-[10px] text-[#8b949e] uppercase tracking-wider font-bold mt-2">Commits</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-black text-white leading-none">3</div>
                                    <div className="text-[10px] text-[#8b949e] uppercase tracking-wider font-bold mt-2">Branches</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            num: "Step 5",
            title: "Readiness Score & Karier",
            desc: "Pantau kesiapan kerja Anda melalui Readiness Score yang dinamis. Buktikan kualifikasi kuat Anda kepada ratusan jaringan kemitraan institusi dan HRD ternama.",
            visual: (
                <div className="bg-white border border-slate-200/60 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] rounded-[32px] p-8 h-[340px] flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="relative inline-flex items-center justify-center mb-8">
                        <svg className="w-[200px] h-[200px] transform -rotate-90">
                            <circle cx="100" cy="100" r="84" stroke="currentColor" strokeWidth="20" fill="transparent" className="text-slate-50" />
                            <circle cx="100" cy="100" r="84" stroke="url(#gradient-score-works-page)" strokeWidth="20" fill="transparent" strokeDasharray="527.7" strokeDashoffset="79.1" strokeLinecap="round" className="text-primary" />
                            <defs>
                                <linearGradient id="gradient-score-works-page" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#8b5cf6" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <div className="text-[72px] leading-none font-black tracking-tight text-[#1A1A2E]">85<span className="text-[34px] text-slate-300 font-bold ml-1 font-[family-name:var(--font-heading)]">%</span></div>
                        </div>
                    </div>
                    <div className="px-8 py-3.5 bg-[#FFF9EA] border border-[#FDE4A9] text-[#C47000] rounded-full text-[15px] font-extrabold flex items-center justify-center gap-3 w-full max-w-[260px] shadow-sm">
                        <Trophy className="w-[22px] h-[22px] text-[#F59E0B]" /> Profil Ready to Hire
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Head title="Cara Kerja — Kembangin" />
            <Navbar />

            <main className="relative pt-20 pb-32 overflow-hidden bg-white">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-full max-w-[1400px] pointer-events-none hidden lg:block z-0">
                    <svg className="w-full h-full" viewBox="0 0 1400 4800" fill="none" preserveAspectRatio="none">
                        <motion.path 
                            d="M1200,300 C1100,500 350,600 350,1100 C350,1300 100,1500 350,1900 C600,2300 350,2300 350,2700 C350,3100 100,3100 350,3500 C600,3900 350,3900 350,4300 C350,4700 100,4700 350,4900" 
                            stroke="#F1F5F9" 
                            strokeWidth="32" 
                            strokeLinecap="round" 
                        />
                        <path 
                            d="M1200,300 C1100,500 350,600 350,1100 C350,1300 100,1500 350,1900 C600,2300 350,2300 350,2700 C350,3100 100,3100 350,3500 C600,3900 350,3900 350,4300 C350,4700 100,4700 350,4900" 
                            stroke="url(#line-gradient-blue)" 
                            strokeWidth="32" 
                            strokeLinecap="round" 
                        />
                        <defs>
                            <linearGradient id="line-gradient-blue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#60A5FA" />
                                <stop offset="50%" stopColor="#3B82F6" />
                                <stop offset="100%" stopColor="#1D4ED8" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    
                    {/* Header (Hero) */}
                    <div className="flex flex-col lg:flex-row items-center gap-16 mb-64 pt-20">
                        <div className="w-full lg:w-1/2 text-center lg:text-left">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 border border-primary/20 text-primary rounded-full px-5 py-1.5 text-sm font-bold mb-8 bg-primary/5"
                            >
                                AI-Powered Analysis
                            </motion.div>
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl lg:text-7xl font-black text-[#1A1A2E] font-[family-name:var(--font-heading)] mb-8 tracking-tighter"
                            >
                                Jalan Pintas <br /> Menuju<br /> <span className="text-primary">Karir Impian.</span>
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-slate-500 text-xl font-medium leading-relaxed max-w-lg"
                            >
                                Kami membuat proses pengembangan skill menjadi mudah, terukur, dan terarah — semuanya dilakukan secara otomatis.
                            </motion.p>
                        </div>
                        <div className="w-full lg:w-1/2 relative flex justify-center">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-blue-50 p-8 rounded-3xl animate-bounce" style={{ animationDuration: '3s' }}><Upload className="w-12 h-12 text-blue-500"/></div>
                                <div className="bg-yellow-50 p-8 rounded-3xl animate-bounce" style={{ animationDuration: '4s' }}><Trophy className="w-12 h-12 text-yellow-500"/></div>
                                <div className="bg-emerald-50 p-8 rounded-3xl animate-bounce" style={{ animationDuration: '3.5s' }}><CheckCircle2 className="w-12 h-12 text-emerald-500"/></div>
                                <div className="bg-purple-50 p-8 rounded-3xl animate-bounce" style={{ animationDuration: '4.5s' }}><Cpu className="w-12 h-12 text-purple-500"/></div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline Steps - All Images Left */}
                    <div className="space-y-[40vh] pb-[20vh]">
                        {steps.map((step, idx) => (
                            <motion.div 
                                key={idx} 
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32"
                            >
                                {/* Graphic Mockup Side (Always Left) */}
                                <div className="w-full lg:w-1/2 flex justify-center order-2 lg:order-1">
                                    <div className="relative w-full max-w-lg">
                                        <div className="absolute -inset-10 bg-slate-50 rounded-full blur-[80px] opacity-40 pointer-events-none"></div>
                                        <div className="relative">
                                            {step.visual}
                                        </div>
                                    </div>
                                </div>

                                {/* Text Side (Always Right) */}
                                <div className="w-full lg:w-1/2 text-center lg:text-left order-1 lg:order-2">
                                    <div className="text-5xl font-black text-slate-900 mb-6 font-[family-name:var(--font-heading)] opacity-20">
                                        {step.num.replace('Step ', '')}
                                    </div>
                                    <h3 className="text-3xl lg:text-5xl font-black text-slate-950 mb-6 font-[family-name:var(--font-heading)] leading-tight tracking-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-lg lg:text-xl text-slate-500 leading-relaxed font-medium max-w-md">
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>



            <PremiumFooter />
        </div>
    );
}
