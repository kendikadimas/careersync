    import { Link } from '@inertiajs/react';
import { Send, Briefcase, Cpu, Camera, ArrowRight } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-24 pb-12 overflow-hidden relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-48 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-20">
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                <img src="/logo1.svg" alt="Logo" className="w-6 h-6 object-contain invert brightness-0" />
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight font-[family-name:var(--font-heading)]">Kembangin</span>
                        </Link>
                        <p className="text-base leading-relaxed max-w-sm text-slate-400 font-medium">
                            Solusi cerdas berbasis AI untuk mengakselerasi karier digital Anda dengan menjembatani kesenjangan antara pendidikan dan industri.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-xl mb-8 font-[family-name:var(--font-heading)]">Produk</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Fitur Utama", href: "/#features" },
                                { name: "Cara Kerja", href: "/how-it-works" }
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
                                { name: "Tentang Kami", href: "/about" },
                                { name: "Blog Karier", href: "/blog" },
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
                            <button className="absolute right-1 top-1 bg-primary text-white p-2 rounded-lg shadow-lg shadow-primary/20" aria-label="Subscribe"><ArrowRight className="w-4 h-4" /></button>
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
