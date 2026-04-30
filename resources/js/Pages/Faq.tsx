import PublicLayout from '@/Layouts/PublicLayout';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Faq { q: string; a: string; }
interface Props { faqs: Faq[]; }

function FaqItem({ faq, index }: { faq: Faq; index: number }) {
    const [open, setOpen] = useState(false);
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="border border-slate-100 rounded-2xl overflow-hidden bg-white hover:border-teal-100 transition-colors">
            <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center px-8 py-6 text-left hover:bg-slate-50/50 transition-colors group">
                <span className="font-black text-gray-900 text-sm pr-6 group-hover:text-teal-600 transition-colors uppercase tracking-tight">{faq.q}</span>
                <span className={`text-slate-300 transition-transform duration-500 flex-shrink-0 ${open ? 'rotate-180 text-teal-500' : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                </span>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }} className="overflow-hidden">
                        <div className="px-8 pb-8 text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-6 bg-slate-50/20 font-medium">
                            {faq.a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function Faq({ faqs }: Props) {
    return (
        <PublicLayout>
            <section className="pt-20 pb-12 px-4 text-center">
                <div className="max-w-2xl mx-auto">
                    <p className="text-xs font-black text-teal-600 uppercase tracking-[0.2em] mb-4">Pusat Bantuan</p>
                    <h1 className="text-4xl font-black text-gray-900 mb-6 leading-tight">Pertanyaan yang Sering Ditanyakan</h1>
                    <p className="text-gray-500 text-lg leading-relaxed font-medium">Tidak menemukan jawaban yang kamu cari? <br className="sm:hidden" /> <a href="mailto:hello@kembangin.id" className="text-teal-600 hover:text-teal-700 transition-colors font-black underline decoration-2 underline-offset-4">Hubungi tim kami</a></p>
                </div>
            </section>
            
            <section className="pb-28 px-4">
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, i) => <FaqItem key={i} faq={faq} index={i} />)}
                </div>

                <div className="max-w-3xl mx-auto mt-24 bg-navy-900 rounded-[3rem] p-12 text-center border border-slate-800 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.1),transparent_50%)]"></div>
                    <div className="relative z-10">
                        <h2 className="font-black text-white text-2xl mb-3 tracking-tight">Masih punya pertanyaan?</h2>
                        <p className="text-sm text-navy-300 mb-10 font-medium uppercase tracking-widest">Kami di sini untuk membantu kamu mencapai target karirmu.</p>
                        <a href="mailto:hello@kembangin.id" className="inline-block bg-teal-500 text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/20 hover:scale-105">Kirim Pesan</a>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
