import AppLayout from '@/Layouts/AppLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface Faq { q: string; a: string; }
interface Props { faqs: Faq[]; }

function FaqItem({ faq, index }: { faq: Faq; index: number }) {
    const [open, setOpen] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="border border-slate-100 rounded-2xl overflow-hidden bg-white hover:border-blue-100 transition-colors"
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center px-8 py-6 text-left hover:bg-slate-50/50 transition-colors group"
            >
                <span className="font-black text-gray-900 text-sm pr-6 group-hover:text-[#2563EB] transition-colors uppercase tracking-tight">
                    {faq.q}
                </span>
                <span className={`text-slate-300 transition-transform duration-500 flex-shrink-0 ${open ? 'rotate-180 text-[#2563EB]' : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                </span>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="px-8 pb-8 text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-6 bg-slate-50/20 font-medium">
                            {faq.a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function DashboardFaq({ faqs }: Props) {
    return (
        <AppLayout header="FAQ">
            <div className="pt-4 pb-12 px-4">
                <div className="max-w-3xl mx-auto text-center mb-10">
                    <p className="text-xs font-black text-[#2563EB] uppercase tracking-[0.2em] mb-3">Pusat Bantuan</p>
                    <h1 className="text-3xl font-black text-gray-900 mb-4 leading-tight">Pertanyaan yang Sering Ditanyakan</h1>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">
                        Tidak menemukan jawaban yang kamu cari? <a href="mailto:hello@careersync.id" className="text-[#2563EB] font-black underline decoration-2 underline-offset-4">Hubungi tim kami</a>
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, i) => <FaqItem key={i} faq={faq} index={i} />)}
                </div>
            </div>
        </AppLayout>
    );
}
