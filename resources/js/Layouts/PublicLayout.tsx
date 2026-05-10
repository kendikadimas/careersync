import { Link } from '@inertiajs/react';
import { useState } from 'react';
import Footer from '@/Components/Footer';

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

            <Footer />
        </div>
    );
}
