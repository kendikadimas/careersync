import PublicLayout from '@/Layouts/PublicLayout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

const steps = [
    {
        number: '01', icon: '👤', title: 'Buat Akun & Pilih Target Karir',
        desc: 'Daftar dalam 30 detik. Pilih role yang kamu inginkan dari berbagai pilihan: Frontend, Backend, Data Scientist, UI/UX, DevOps, atau Mobile Developer.',
        detail: 'Tidak perlu mengisi formulir panjang. Cukup email dan password, lalu tentukan target karir impianmu.',
    },
    {
        number: '02', icon: '📄', title: 'Upload atau Paste CV Kamu',
        desc: 'Paste teks CV kamu atau upload file (PDF/DOCX). AI kami akan mengekstrak semua skill teknis, pengalaman, dan pendidikanmu secara otomatis.',
        detail: 'Mendukung format teks bebas. AI kami cukup pintar untuk memahami berbagai struktur CV tanpa perlu template khusus.',
    },
    {
        number: '03', icon: '🔍', title: 'AI Menganalisis Pasar Kerja',
        desc: 'Sistem kami mengambil data ratusan lowongan kerja aktif untuk role targetmu, lalu membandingkan skill yang diminta dengan skill yang kamu miliki.',
        detail: 'Data lowongan diperbarui secara real-time via JSearch API. Kamu selalu mendapat gambaran pasar yang paling aktual.',
    },
    {
        number: '04', icon: '🎯', title: 'Lihat Skill Gap di Radar Chart',
        desc: 'Visualisasi radar chart yang jelas menunjukkan: skill apa yang sudah kamu kuasai dan skill apa yang masih perlu ditingkatkan.',
        detail: 'Setiap skill dikategorikan sebagai Kuat, Berkembang, atau Perlu Belajar — lengkap dengan bobot urgensinya di pasar.',
    },
    {
        number: '05', icon: '🗺️', title: 'Dapatkan Learning Roadmap Personal',
        desc: 'AI generate learning path yang dipersonalisasi berdasarkan gap kamu. Setiap milestone punya capstone project konkret untuk portfolio.',
        detail: 'Roadmap berisi resource gratis yang terkurasi, estimasi waktu penyelesaian, dan urutan belajar yang paling optimal.',
    },
];

export default function HowItWorks() {
    return (
        <PublicLayout>
            <section className="pt-20 pb-12 px-4 text-center">
                <div className="max-w-2xl mx-auto">
                    <p className="text-xs font-black text-teal-600 uppercase tracking-[0.2em] mb-4">Metodologi</p>
                    <h1 className="text-4xl font-black text-navy-900 mb-6 leading-tight">Dari CV ke Karir dalam 5 Langkah</h1>
                    <p className="text-gray-500 text-lg leading-relaxed font-medium">Platform kami otomatis analisis profilmu vs pasar kerja dan berikan jalur belajar yang presisi.</p>
                </div>
            </section>

            <section className="pb-28 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-8 top-0 bottom-0 w-1 bg-slate-50 hidden md:block rounded-full"></div>

                        <div className="space-y-12">
                            {steps.map((step, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative flex gap-8">
                                    {/* Step icon */}
                                    <div className="hidden md:flex flex-col items-center">
                                        <div className="w-16 h-16 bg-white border border-slate-100 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-sm z-10 relative">
                                            {step.icon}
                                        </div>
                                    </div>
                                    {/* Content */}
                                    <div className="flex-1 bg-white border border-slate-100 rounded-[2rem] p-8 hover:border-teal-500 hover:shadow-xl hover:shadow-teal-500/5 transition-all text-left group">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-xs font-black text-teal-500 bg-teal-50 px-2 py-1 rounded-lg">{step.number}</span>
                                            <h3 className="font-black text-gray-900 text-xl tracking-tight leading-none group-hover:text-teal-600 transition-colors">{step.title}</h3>
                                        </div>
                                        <p className="text-sm text-gray-700 leading-relaxed font-bold mb-3">{step.desc}</p>
                                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                                            <p className="text-[11px] text-gray-400 leading-relaxed font-bold uppercase tracking-wider">{step.detail}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-20 bg-teal-50 rounded-[3rem] p-12 md:p-16 relative overflow-hidden group">
                         <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full opacity-50 group-hover:scale-150 transition-transform duration-1000"></div>
                        <h2 className="text-3xl font-black text-gray-900 mb-4 relative z-10">Siap Mencoba Sendiri?</h2>
                        <p className="text-sm text-gray-600 mb-10 relative z-10 font-bold max-w-sm mx-auto uppercase tracking-wide">Gratis selamanya. Tidak perlu kartu kredit atau komitmen apapun.</p>
                        <div className="flex flex-wrap gap-4 justify-center relative z-10">
                            <Link href="/register" className="bg-gray-900 text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl hover:scale-105">Mulai Gratis</Link>
                            <Link href="/demo" className="border-2 border-slate-200 text-gray-700 bg-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Lihat Demo</Link>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
