import { Link } from '@inertiajs/react';
import { Mail, ArrowRight} from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#0B0F19] text-slate-400 border-t border-slate-800/60 pt-20 pb-10 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                <img src="/logo1.svg" alt="Logo" className="w-6 h-6 object-contain invert brightness-0" />
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight font-[family-name:var(--font-heading)]">Kembang.in</span>
                        </Link>
                        <p className="text-sm leading-relaxed mb-8 max-w-[280px] text-slate-400 font-medium">
                            Platform cerdas berbasis AI yang menjembatani kesenjangan antara kurikulum pendidikan dan kebutuhan industri IT masa kini.
                        </p>
                        {/* <div className="flex items-center gap-3">
                            {[
                                { icon: Twitter, href: "#", label: "Twitter" },
                                { icon: Linkedin, href: "#", label: "LinkedIn" },
                                { icon: Github, href: "#", label: "GitHub" },
                                { icon: Instagram, href: "#", label: "Instagram" }
                            ].map((social, i) => (
                                <a 
                                    key={i} 
                                    href={social.href} 
                                    className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary hover:border-primary transition-all duration-300 shadow-sm"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div> */}
                    </div>

                    {/* Navigation Columns */}
                    <div>
                        <h4 className="text-white font-bold text-base mb-6 tracking-wide">Produk</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Fitur Utama", href: "/features" },
                                { name: "Cara Kerja", href: "/how-it-works" },
                                { name: "Coba Demo", href: "/demo" },
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link href={link.href} className="text-sm hover:text-white transition-colors duration-200">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* <div>
                        <h4 className="text-white font-bold text-base mb-6 tracking-wide">Perusahaan</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Tentang Kami", href: "/about" },
                                { name: "Blog & Artikel", href: "/blog" },
                                { name: "Pusat Bantuan", href: "/faq" },
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link href={link.href} className="text-sm hover:text-white transition-colors duration-200">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div> */}

                    {/* Newsletter */}
                    {/* <div>
                        <h4 className="text-white font-bold text-base mb-6 tracking-wide">Pembaruan</h4>
                        <p className="text-sm mb-4 text-slate-400">Dapatkan insight karier terbaru via email.</p>
                        <div className="relative group">
                            <input 
                                type="email" 
                                placeholder="Alamat email..." 
                                className="w-full bg-slate-900/80 border border-slate-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-white placeholder:text-slate-600 transition-all shadow-inner"
                            />
                            <button className="absolute right-1.5 top-1.5 bg-primary hover:bg-primary-dark text-white p-1.5 rounded-lg transition-colors shadow-sm">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="mt-5 flex items-center gap-2 text-sm text-slate-500 font-medium">
                            <Mail className="w-4 h-4" />
                            <a href="mailto:halo@kembangin.id" className="hover:text-white transition-colors">halo@kembangin.id</a>
                        </div>
                    </div> */}
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-900/50 rounded-full border border-slate-800 text-xs font-semibold text-slate-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Mendukung SDG 4 & SDG 8
                    </div>
                    
                    <div className="text-xs text-slate-500 font-medium">
                        &copy; {new Date().getFullYear()} Kembang.in. Hak cipta dilindungi.
                    </div>
                    
                    {/* <div className="flex items-center gap-6 text-xs font-medium text-slate-500">
                        <Link href="/privacy" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
                    </div> */}
                </div>
            </div>
            
            {/* Subtle Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
        </footer>
    );
}
