import PublicLayout from '@/Layouts/PublicLayout';
import { Link, Head } from '@inertiajs/react';

export default function Error({ status }: { status: number }) {
    return (
        <PublicLayout>
            <Head title={`${status} - Ada Masalah`} />
            <div className="min-h-[75vh] flex items-center justify-center px-4 relative overflow-hidden">
                {/* Background numbers animation */}
                <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-[0.03]">
                    <span className="text-[30rem] font-black leading-none">{status}</span>
                </div>
                
                <div className="text-center max-w-lg relative z-10">
                    <div className="relative inline-block mb-10">
                        <div className="text-8xl md:text-9xl animate-bounce drop-shadow-2xl">
                            {status === 404 ? '🕵️‍♂️' : status === 500 ? '💥' : '🚫'}
                        </div>
                        <div className="absolute -bottom-4 -right-4 bg-rose-500 text-white font-black text-xl px-4 py-2 rounded-2xl shadow-xl transform rotate-12">
                            {status}
                        </div>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-black text-navy-900 mb-6 tracking-tighter uppercase tracking-widest leading-tight">
                        {status === 404 ? 'Halaman Tidak Ditemukan' : 'Server Berada di Luar Kendali'}
                    </h1>
                    
                    <p className="text-slate-500 text-base md:text-lg mb-12 leading-relaxed font-bold uppercase tracking-tight text-balance">
                        {status === 404
                            ? 'Sepertinya kamu mencari halaman yang tidak ada. Mungkin URL-nya salah, atau halaman ini sudah dipindahkan ke dimensi lain.'
                            : 'Terjadi kegagalan sistem terpusat di server kami. Tim mekanik AI kami sedang memperbaikinya secepat mungkin.'}
                    </p>
                    
                    <div className="flex flex-wrap gap-5 justify-center">
                        <Link href="/" className="bg-navy-900 text-white px-10 py-5 rounded-3xl text-xs font-black uppercase tracking-[0.2em] hover:bg-teal-600 transition-all shadow-2xl shadow-navy-900/10 hover:scale-105 active:scale-95">
                            Kembali ke Home
                        </Link>
                        <Link href="/demo" className="border-2 border-slate-100 text-slate-700 px-10 py-5 rounded-3xl text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-50 transition-all hover:border-slate-300">
                            Lihat Demo Interaktif
                        </Link>
                    </div>
                    
                    <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-center gap-6">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Kembangin System v2.5</p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
