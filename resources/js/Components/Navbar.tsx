import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import InteractiveHoverButton from '@/Components/ui/interactive-hover-button';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    return (
        <nav className="sticky top-0 z-50 bg-[#f6f6f6] border-b border-slate-200">
            <div className="max-w-6xl mx-auto px-2 sm:px-2 lg:px-2">
                <div className="h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2.5">
                        <img src="/logo1.svg" alt="Logo" className="w-9 h-9 object-contain" />
                        <span className="text-xl font-bold text-primary tracking-tight font-[family-name:var(--font-heading)]">Kembangin</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8 text-[14px] font-medium text-slate-600">
                        <a href="/#features" className="hover:text-primary transition-colors">Fitur</a>
                        <a href="/#benefits" className="hover:text-primary transition-colors">Manfaat</a>
                        <a href="/how-it-works" className="hover:text-primary transition-colors">Cara Kerja</a>
                        <Link href="/about" className="hover:text-primary transition-colors">Tentang Kami</Link>
                        <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/login" className="text-[14px] font-semibold text-slate-600 hover:text-primary transition-colors px-4 py-2">Masuk</Link>
                        <InteractiveHoverButton
                            text="Mulai Gratis"
                            loadingText=""
                            successText=""
                            className="rounded-lg shadow-lg shadow-primary/20 text-[14px] px-6 py-2.5 min-w-0"
                            onClick={() => {
                                setTimeout(() => {
                                    router.visit('/register');
                                }, 1000);
                            }}
                        />
                    </div>
                    <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-slate-600" aria-label="Menu">
                        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
                {open && (
                    <div className="md:hidden pb-4 flex flex-col gap-2 text-sm">
                        <a href="/#features" className="py-4 text-slate-600 font-medium border-t border-slate-50">Fitur</a>
                        <a href="/#benefits" className="py-4 text-slate-600 font-medium border-t border-slate-50">Manfaat</a>
                        <a href="/how-it-works" className="py-4 text-slate-600 font-medium border-t border-slate-50">Cara Kerja</a>
                        <Link href="/about" className="py-4 text-slate-600 font-medium border-t border-slate-50">Tentang Kami</Link>
                        <Link href="/login" className="py-4 text-slate-600 font-medium border-t border-slate-50">Masuk</Link>
                        <InteractiveHoverButton
                            text="Mulai Gratis"
                            loadingText=""
                            successText=""
                            className="rounded-lg mt-2 min-w-0"
                            onClick={() => {
                                setTimeout(() => {
                                    router.visit('/register');
                                }, 1000);
                            }}
                        />
                    </div>
                )}
            </div>
        </nav>
    );
}
