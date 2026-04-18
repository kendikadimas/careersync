import PublicLayout from '@/Layouts/PublicLayout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface Post { slug: string; title: string; excerpt: string; category: string; read_time: number; published_at: string; cover_color: string; }
interface Props { posts: Post[]; }

const colorMap: Record<string, string> = {
    teal: 'bg-teal-50 text-teal-700',
    navy: 'bg-slate-900 text-white',
    purple: 'bg-purple-50 text-purple-700',
};
const bgMap: Record<string, string> = {
    teal: 'bg-teal-500',
    navy: 'bg-slate-900',
    purple: 'bg-purple-500',
};

export default function Blog({ posts }: Props) {
    return (
        <PublicLayout>
            <section className="pt-20 pb-12 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-xs font-black text-teal-600 uppercase tracking-[0.2em] mb-4">Insight & Resources</p>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">Insight Karir IT Indonesia</h1>
                    <p className="text-gray-500 text-lg leading-relaxed font-medium">Panduan praktis, tren pasar kerja, dan roadmap belajar dari data nyata pasar Indonesia.</p>
                </div>
            </section>
            
            <section className="pb-28 px-4">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-left">
                    {posts.map((post, i) => (
                        <motion.div key={post.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                            <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:border-teal-500 hover:shadow-2xl hover:shadow-teal-500/5 transition-all">
                                {/* Cover */}
                                <div className={`${bgMap[post.cover_color] || 'bg-gray-200'} h-52 flex items-center justify-center relative overflow-hidden`}>
                                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-size-[15px_15px]"></div>
                                    <span className="text-6xl group-hover:scale-125 transition-transform duration-700 select-none">
                                        {post.cover_color === 'teal' ? '📊' : post.cover_color === 'navy' ? '🔎' : '🗺️'}
                                    </span>
                                </div>
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl ${colorMap[post.cover_color] || 'bg-gray-100 text-gray-600'}`}>{post.category}</span>
                                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{post.read_time} Min Read</span>
                                    </div>
                                    <h2 className="font-black text-gray-900 mb-4 text-xl leading-tight group-hover:text-teal-600 transition-colors tracking-tight">{post.title}</h2>
                                    <p className="text-xs text-slate-500 leading-relaxed mb-8 line-clamp-3 font-medium">{post.excerpt}</p>
                                    <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center text-[10px] text-slate-400 font-black uppercase tracking-widest">
                                        <span>{post.published_at}</span>
                                        <span className="group-hover:text-teal-600 transition-colors">Baca Detail →</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>
        </PublicLayout>
    );
}
