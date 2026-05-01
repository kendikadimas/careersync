import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { Target, Rocket, ShieldCheck } from 'lucide-react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="h-screen overflow-hidden flex dashboard-font selection:bg-primary selection:text-white bg-white text-slate-900">
            {/* Left Box: Visual / Branding Side (Arcana Style) */}
            <div className="hidden lg:flex w-1/2 relative flex-col justify-center items-center overflow-hidden h-full z-10 border-r border-slate-100 bg-gradient-to-br from-slate-950 via-[#0c1236] to-[#0a0f2b]">
                

                {/* Content Container */}
                <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col justify-center h-full p-12 xl:p-16">
                    
                    {/* Top Branding */}
                    <div className="animate-fade-in-up">
                        <Link href="/" className="inline-flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                                <img src="/logo1.svg" alt="Logo" className="w-6 h-6 object-contain invert brightness-0" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white font-[family-name:var(--font-heading)]">Kembangin</span>
                        </Link>
                    </div>
                    
                    {/* Middle Text Block */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        <h1 className="text-5xl xl:text-7xl font-black text-white leading-tight mb-8 mt-6 tracking-tight">
                            Selamat Datang di Kembangin
                        </h1>
                        
                        <p className="text-slate-400 text-xl leading-relaxed max-w-md font-medium">
                            Akselerasi karier digital Anda dengan diagnosis AI yang presisi dan roadmap belajar yang adaptif sesuai standar industri.
                        </p>
                    </div>

                </div>
            </div>

            {/* Right Box: Form Side */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-8 lg:p-12 relative z-10 h-full overflow-y-auto bg-white text-slate-800">
                <div className="w-full max-w-md py-4">
                    {/* Mobile Brand Logo */}
                    <Link href="/" className="lg:hidden inline-flex items-center gap-3 mb-8 group">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                            <img src="/logo1.svg" alt="Logo" className="w-6 h-6 object-contain invert brightness-0" />
                        </div>
                        <span className="text-2xl font-black tracking-tight text-navy-900">Kembangin</span>
                    </Link>

                    {/* Form Container */}
                    <div className="bg-white p-8 sm:p-10 rounded-3xl relative">
                        {/* Decorative glow behind form for elegance */}
                        <div className="absolute -inset-1 bg-gradient-to-br from-primary/10 to-navy-900/5 rounded-3xl blur-xl -z-10"></div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
