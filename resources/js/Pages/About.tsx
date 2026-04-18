import PublicLayout from '@/Layouts/PublicLayout';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <PublicLayout>
            {/* Hero */}
            <section className="pt-20 pb-16 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <p className="text-xs font-black text-teal-600 uppercase tracking-[0.2em] mb-4">Tentang Kami</p>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 text-balance leading-tight">Kami Percaya Akses Karir yang Setara Itu Mungkin</h1>
                        <p className="text-gray-500 text-lg leading-relaxed font-medium">Career-Sync Academy lahir dari satu masalah nyata: ribuan lulusan IT Indonesia yang cerdas dan rajin, tapi gagal dapat kerja karena tidak tahu skill apa yang benar-benar dibutuhkan industri.</p>
                    </motion.div>
                </div>
            </section>

            {/* Problem statement */}
            <section className="bg-gray-50 py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="text-left">
                            <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight">Masalah yang Kita Hadapi Bersama</h2>
                            <div className="space-y-6">
                                {[
                                    { stat: '60%+', desc: 'fresh graduate IT merasa tidak siap memasuki dunia kerja (Survei LinkedIn Indonesia 2025)' },
                                    { stat: '1-2 tahun', desc: 'rata-rata keterlambatan kurikulum kampus dibanding kebutuhan industri yang bergerak cepat' },
                                    { stat: '73%', desc: 'mahasiswa IT tidak tahu skill spesifik apa yang harus diprioritaskan untuk karir target mereka' },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="text-3xl font-black text-teal-600 whitespace-nowrap leading-none">{item.stat}</div>
                                        <p className="text-xs text-gray-600 leading-relaxed font-medium pt-1">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full opacity-50 group-hover:scale-110 transition-transform"></div>
                            <h3 className="font-black text-gray-900 mb-8 uppercase tracking-widest text-xs relative z-10">Solusi Kami</h3>
                            <div className="space-y-6 relative z-10">
                                {[
                                    'Analisis real-time data ribuan lowongan aktif',
                                    'AI yang membandingkan profilmu secara presisi',
                                    'Roadmap adaptif yang update mengikuti tren',
                                    'Readiness Score yang terukur dan actionable',
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 items-center">
                                        <div className="w-6 h-6 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                <path d="M2 6l3 3 5-5" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                        <p className="text-sm text-gray-700 font-bold">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SDG Connection */}
            <section className="py-24 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-gray-900 mb-4">Kontribusi untuk SDG</h2>
                        <p className="text-gray-500 text-sm font-medium">Career-Sync Academy dirancang untuk berkontribusi langsung pada dua SDG utama PBB</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        <div className="border border-teal-100 bg-teal-50/20 rounded-[2.5rem] p-10 hover:bg-teal-50/50 transition-colors">
                            <div className="text-5xl mb-6">📚</div>
                            <div className="inline-block bg-teal-600 text-white text-[10px] font-black px-3 py-1.5 rounded-lg mb-4 uppercase tracking-[0.2em]">SDG 4 — Quality Education</div>
                            <h3 className="font-black text-gray-900 text-xl mb-4">Pendidikan Berkualitas</h3>
                            <p className="text-sm text-gray-600 leading-relaxed mb-6 font-medium">Kami menjembatani kesenjangan antara pendidikan formal dan kebutuhan dunia kerja. Dengan memberikan akses ke informasi pasar kerja yang real-time, kami membantu setiap mahasiswa mendapatkan pendidikan yang relevan.</p>
                            <div className="space-y-3">
                                {['Pembelajaran adaptif berbasis data pasar', 'Akses gratis untuk semua kalangan', 'Resource belajar yang dikurasi dan relevan'].map(p => (
                                    <div key={p} className="flex gap-3 items-center">
                                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                                        <span className="text-xs text-gray-700 font-bold">{p}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="border border-blue-100 bg-blue-50/20 rounded-[2.5rem] p-10 hover:bg-blue-50/50 transition-colors">
                            <div className="text-5xl mb-6">💼</div>
                            <div className="inline-block bg-blue-700 text-white text-[10px] font-black px-3 py-1.5 rounded-lg mb-4 uppercase tracking-[0.2em]">SDG 8 — Decent Work & Growth</div>
                            <h3 className="font-black text-gray-900 text-xl mb-4">Pekerjaan Layak & Pertumbuhan</h3>
                            <p className="text-sm text-gray-600 leading-relaxed mb-6 font-medium">Dengan meningkatkan employability generasi muda Indonesia di sektor digital, kami berkontribusi pada pertumbuhan ekonomi yang inklusif dan pekerjaan yang layak bagi semua orang.</p>
                            <div className="space-y-3">
                                {['Mengurangi skill mismatch di pasar kerja', 'Mempercepat transisi dari kampus ke karir', 'Data-driven untuk keputusan karir'].map(p => (
                                    <div key={p} className="flex gap-3 items-center">
                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                        <span className="text-xs text-gray-700 font-bold">{p}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech stack */}
            <section className="bg-gray-50 py-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-black text-gray-900 mb-10 uppercase tracking-tight">Tech Stack</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {['Laravel 13', 'React 19', 'Inertia.js', 'Tailwind CSS v4', 'Google Gemini AI', 'JSearch API', 'Recharts', 'Framer Motion', 'SQLite'].map(tech => (
                            <span key={tech} className="bg-white border border-slate-100 text-slate-700 text-[10px] font-black px-5 py-2.5 rounded-2xl shadow-sm uppercase tracking-widest">{tech}</span>
                        ))}
                    </div>
                    <p className="text-gray-400 text-[10px] mt-12 font-bold uppercase tracking-widest">
                        Dikembangkan secara open-source
                        <br />
                        <a href="https://github.com/kendikadimas/careersync" className="text-teal-600 hover:text-teal-700 transition-colors underline decoration-2 underline-offset-4">github.com/kendikadimas/careersync</a>
                    </p>
                </div>
            </section>
        </PublicLayout>
    );
}
