import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { Target, Rocket, ShieldCheck } from 'lucide-react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex text-slate-800 font-sans selection:bg-teal-500 selection:text-white bg-slate-50">
            {/* Left Box: Form Side */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-24 relative z-10">
                <div className="w-full max-w-md">
                    {/* Brand Logo */}
                    <Link href="/" className="inline-flex items-center gap-3 mb-12 group">
                        <img src="/logo1.svg" alt="Logo" className="w-10 h-10 object-contain" />
                        <span className="text-2xl font-black tracking-tight text-navy-900">Kembangin</span>
                    </Link>

                    {/* Form Container */}
                    <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative">
                        {/* Decorative glow behind form */}
                        <div className="absolute -inset-1 bg-gradient-to-br from-teal-400/20 to-navy-900/5 rounded-3xl blur-xl -z-10"></div>
                        {children}
                    </div>
                </div>
            </div>

            {/* Right Box: Branding / Visual Side */}
            <div className="hidden lg:flex w-1/2 bg-navy-900 relative items-center justify-center overflow-hidden">
                {/* Abstract Background Elements */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[120px] transform translate-x-1/3 -translate-y-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[150px] transform -translate-x-1/3 translate-y-1/3"></div>
                    
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU5LjUgMGguNXY2MEg2MHYtLjVIMHYuNWg2MFYweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] bg-repeat opacity-50 block"></div>
                </div>

                <div className="relative z-10 max-w-lg p-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-teal-300 font-bold text-sm mb-6">
                        <Rocket className="w-4 h-4" />
                        Platform #1 Untuk Akselerasi Karir IT
                    </div>
                    
                    <h1 className="text-5xl font-black text-white leading-tight mb-6">
                        Tinggalkan cara lama <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">dalam belajar coding.</span>
                    </h1>
                    
                    <p className="text-slate-400 text-lg leading-relaxed mb-10">
                        Evaluasi skill-mu dengan AI, dapatkan roadmap terkurasi, kumpulkan capstone project nyata, dan buktikan kamu pantas direkrut oleh top tech companies.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                            <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center text-teal-400 shrink-0">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white mb-1">Kurikulum Standar Industri</h4>
                                <p className="text-sm text-slate-400">Dirancang khusus menjawab data gap lowongan kerja.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
