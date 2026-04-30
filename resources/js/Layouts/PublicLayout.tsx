import { Link } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    children: React.ReactNode;
    title?: string;
}

export default function PublicLayout({ children, title }: Props) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white text-[#1A1A2E]">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z" fill="white" />
                                </svg>
                            </div>
                            <span className="font-semibold text-[#1A1A2E] text-lg text-left">Kembangin</span>
                            <span className="text-xs bg-navy-50 text-navy-600 px-2 py-0.5 rounded-full font-medium">Academy</span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8">
                            <Link href="/features" className="text-sm text-slate-600 hover:text-[#1A1A2E] transition-colors">Fitur</Link>
                            <Link href="/how-it-works" className="text-sm text-slate-600 hover:text-[#1A1A2E] transition-colors">Cara Kerja</Link>
                            <Link href="/blog" className="text-sm text-slate-600 hover:text-[#1A1A2E] transition-colors">Blog</Link>
                            <Link href="/about" className="text-sm text-slate-600 hover:text-[#1A1A2E] transition-colors">Tentang</Link>
                        </div>

                        {/* CTA */}
                        <div className="hidden md:flex items-center gap-3">
                            <Link href="/demo" className="text-sm text-accent font-medium hover:text-primary transition-colors">
                                Coba Demo
                            </Link>
                            <Link href="/login" className="text-sm text-slate-600 hover:text-[#1A1A2E] transition-colors">
                                Masuk
                            </Link>
                            <Link href="/register" className="bg-primary text-white text-sm px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium">
                                Mulai Gratis
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-slate-600">
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {menuOpen
                                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                }
                            </svg>
                        </button>
                    </div>

                    {/* Mobile menu */}
                    {menuOpen && (
                        <div className="md:hidden py-4 border-t border-slate-200 flex flex-col gap-3">
                            <Link href="/features" className="text-sm text-slate-600 py-1">Fitur</Link>
                            <Link href="/how-it-works" className="text-sm text-slate-600 py-1">Cara Kerja</Link>
                            <Link href="/blog" className="text-sm text-slate-600 py-1">Blog</Link>
                            <Link href="/about" className="text-sm text-slate-600 py-1">Tentang</Link>
                            <Link href="/demo" className="text-sm text-accent font-medium py-1">Coba Demo</Link>
                            <Link href="/register" className="bg-primary text-white text-sm px-4 py-2 rounded-lg text-center font-medium mt-2">Mulai Gratis</Link>
                        </div>
                    )}
                </div>
            </nav>

            {/* Page content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-primary text-white/70 py-12 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 text-left">
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-7 h-7 bg-accent rounded-md flex items-center justify-center">
                                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                        <path d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z" fill="white" />
                                    </svg>
                                </div>
                                <span className="font-semibold text-white text-sm">Kembangin</span>
                            </div>
                            <p className="text-xs leading-relaxed text-white/70">Platform AI untuk bridging skill gap antara kurikulum kampus dan kebutuhan industri IT Indonesia.</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-white mb-3 uppercase tracking-wider">Produk</p>
                            <div className="flex flex-col gap-2">
                                <Link href="/features" className="text-xs hover:text-white transition-colors">Fitur</Link>
                                <Link href="/how-it-works" className="text-xs hover:text-white transition-colors">Cara Kerja</Link>
                                <Link href="/demo" className="text-xs hover:text-white transition-colors">Demo Langsung</Link>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-white mb-3 uppercase tracking-wider">Sumber</p>
                            <div className="flex flex-col gap-2">
                                <Link href="/blog" className="text-xs hover:text-white transition-colors">Blog</Link>
                                <Link href="/faq" className="text-xs hover:text-white transition-colors">FAQ</Link>
                                <Link href="/about" className="text-xs hover:text-white transition-colors">Tentang Kami</Link>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-white mb-3 uppercase tracking-wider">Akun</p>
                            <div className="flex flex-col gap-2">
                                <Link href="/login" className="text-xs hover:text-white transition-colors">Masuk</Link>
                                <Link href="/register" className="text-xs hover:text-white transition-colors">Daftar Gratis</Link>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
                        <p className="text-xs">© 2026 Kembangin. Dibuat untuk SDG 4 & SDG 8.</p>
                        <div className="flex gap-4">
                            <Link href="https://github.com/kendikadimas/careersync" className="text-xs hover:text-white transition-colors">GitHub</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
