import PublicLayout from '@/Layouts/PublicLayout';
import { Link, Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface Section { heading: string; body: string; }
interface Post { 
    slug: string; 
    title: string; 
    category: string; 
    read_time: number; 
    published_at: string; 
    cover_color: string; 
    content_sections: Section[];
    related_slugs: string[];
}
interface Props { post: Post; all_posts: any[]; }

const bgMap: Record<string, string> = {
    teal: 'bg-teal-500',
    navy: 'bg-slate-900',
    purple: 'bg-purple-500',
};

export default function BlogPost({ post, all_posts }: Props) {
    const related = all_posts.filter(p => post.related_slugs.includes(p.slug));

    return (
        <PublicLayout>
            <Head title={post.title} />
            
            <article className="pb-28">
                {/* Header */}
                <header className={`${bgMap[post.cover_color]} pt-24 pb-40 text-white relative overflow-hidden text-center`}>
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-size-[20px_20px]"></div>
                    <div className="max-w-4xl mx-auto px-4 relative">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="inline-block bg-white/20 backdrop-blur-xl px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-white/20">
                                {post.category}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight text-balance tracking-tighter">{post.title}</h1>
                            <div className="flex justify-center items-center gap-6 text-[10px] font-black uppercase tracking-[0.1em] text-white/70">
                                <span>{post.published_at}</span>
                                <div className="w-1.5 h-1.5 bg-white/30 rounded-full"></div>
                                <span>{post.read_time} Menit Baca</span>
                            </div>
                        </motion.div>
                    </div>
                </header>

                {/* Content */}
                <div className="max-w-4xl mx-auto px-4 -mt-24 relative">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-[3rem] p-10 md:p-20 shadow-2xl shadow-slate-200/50 border border-slate-100 text-left">
                        {post.content_sections.map((section, i) => (
                            <div key={i} className="mb-14 last:mb-0">
                                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 tracking-tight">{section.heading}</h2>
                                <p className="text-slate-600 leading-relaxed text-base md:text-lg font-medium whitespace-pre-wrap">{section.body}</p>
                            </div>
                        ))}

                        <div className="mt-20 pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                            <Link href="/blog" className="text-teal-600 font-black text-xs uppercase tracking-widest hover:text-teal-700 transition-colors flex items-center gap-2 group">
                                <span className="group-hover:-translate-x-1 transition-transform">←</span> Kembali ke List Blog
                            </Link>
                            <div className="flex gap-3">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pt-0.5">Share:</p>
                                {['T', 'L', 'F'].map(s => (
                                    <div key={s} className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400 hover:bg-navy-900 hover:text-white transition-all cursor-pointer">{s}</div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Related */}
                {related.length > 0 && (
                    <section className="max-w-5xl mx-auto px-4 mt-32">
                        <div className="text-center mb-12">
                             <p className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em] mb-3">Baca Juga</p>
                             <h3 className="font-black text-gray-900 text-2xl tracking-tight">Artikel Terkait</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 text-left">
                            {related.map(p => (
                                <Link key={p.slug} href={`/blog/${p.slug}`} className="bg-white border border-slate-100 rounded-[2rem] p-8 hover:border-teal-500 hover:shadow-xl hover:shadow-teal-500/5 transition-all flex items-center gap-6 group">
                                    <div className={`w-16 h-16 rounded-2xl shrink-0 ${bgMap[p.cover_color]} flex items-center justify-center text-3xl shadow-lg shadow-black/5 group-hover:rotate-6 transition-transform`}>
                                        {p.cover_color === 'teal' ? '📊' : p.cover_color === 'navy' ? '🔎' : '🗺️'}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest mb-1">{p.category}</p>
                                        <h4 className="font-black text-gray-900 text-base group-hover:text-teal-600 transition-colors line-clamp-1 tracking-tight">{p.title}</h4>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">{p.read_time} Min Read</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </article>
        </PublicLayout>
    );
}
