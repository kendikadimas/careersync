import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import { useState, useRef, useCallback, useEffect } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface User {
    name: string;
    email: string;
}

interface SkillGapItem {
    skill: string;
    user_score: number;
    market_demand: number;
    status: string;
    status_label: string;
    user_level: string;
}

interface CareerPath {
    title: string;
    description: string;
    match_percentage: number;
    required_skills: string[];
}

interface Props {
    profile: any;
    marketSkills: any[];
    trendingSkills: any[];
    marketStats: any;
    analysisProcessing: boolean;
    analysisProcessingError: string | null;
}

// ─── Mock data returned after "analysis" ─────────────────────────────────────
const MOCK_RESULT: AnalysisResult = {
    radarSkills: [
        { label: 'Node.JS', userVal: 0.55, industryVal: 0.85 },
        { label: 'Restful', userVal: 0.7, industryVal: 0.9 },
        { label: 'MySQL', userVal: 0.65, industryVal: 0.8 },
        { label: 'Docker', userVal: 0.4, industryVal: 0.75 },
    ],
    skillGaps: [
        { name: 'React', userScore: 60, industryScore: 87 },
        { name: 'Git', userScore: 60, industryScore: 99 },
        { name: 'REST API', userScore: 60, industryScore: 87 },
        { name: 'Typescript', userScore: 60, industryScore: 87 },
    ],
    aiRecommendation:
        'Berdasarkan analisis dari Curiculum Vitae anda, anda memiliki skill cihuy sehingga awkwok kemudian nantinya bisa dianukan anunya untuk segera menganukan',
    alternativePositions: [
        { title: 'Frontend Developer', skills: 'React.js, Tailwind', match: 90 },
        { title: 'Backend Developer', skills: 'React.js, Tailwind', match: 80 },
        { title: 'UI/UX Designer', skills: 'React.js, Tailwind', match: 70 },
    ],
};

const DEFAULT_CAREER_TARGETS = [
    'Fullstack Developer',
    'Frontend Developer',
    'Backend Developer',
    'Mobile Developer',
    'DevOps Engineer',
    'Data Engineer',
];

// ─── Radar Chart SVG ─────────────────────────────────────────────────────────
function RadarChart({ data }: { data: { label: string; userVal: number; industryVal: number }[] }) {
    const [hoveredPoint, setHoveredPoint] = useState<{ idx: number, type: 'user' | 'industry' } | null>(null);
    const cx = 200;
    const cy = 180;
    const r = 90;
    const n = data.length || 3; 
    const hasData = data.length > 0;

    function point(val: number, idx: number) {
        const angle = (Math.PI * 2 * idx) / n - Math.PI / 2;
        return {
            x: cx + val * r * Math.cos(angle),
            y: cy + val * r * Math.sin(angle),
            angle: angle
        };
    }

    function labelPoint(idx: number) {
        const angle = (Math.PI * 2 * idx) / n - Math.PI / 2;
        const dist = r + 35; // Increased distance to prevent collision
        return {
            x: cx + dist * Math.cos(angle),
            y: cy + dist * Math.sin(angle),
            angle: angle
        };
    }

    function polyPath(vals: number[]) {
        return vals
            .map((v, i) => {
                const p = point(v, i);
                return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
            })
            .join(' ') + ' Z';
    }

    const gridLevels = [0.25, 0.5, 0.75, 1];

    return (
        <svg viewBox="0 0 400 360" className="w-full max-w-[420px] mx-auto overflow-visible">
            {gridLevels.map((lvl) => (
                <polygon
                    key={lvl}
                    points={Array.from({ length: n }, (_, i) => {
                        const p = point(lvl, i);
                        return `${p.x},${p.y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="1"
                />
            ))}
            {data.map((_, i) => {
                const p = point(1, i);
                return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#e2e8f0" strokeWidth="1" />;
            })}
            {hasData && (
                <path
                    d={polyPath(data.map((d) => d.industryVal))}
                    fill="rgba(34,197,94,0.15)"
                    stroke="#22c55e"
                    strokeWidth="2"
                    className="transition-all duration-500"
                />
            )}
            {hasData && (
                <path
                    d={polyPath(data.map((d) => d.userVal))}
                    fill="rgba(37,99,235,0.2)"
                    stroke="#2563EB"
                    strokeWidth="2"
                    className="transition-all duration-500"
                />
            )}
            
            {/* Interactive Points */}
            {hasData && data.map((d, i) => {
                const up = point(d.userVal, i);
                const ip = point(d.industryVal, i);
                const isUserHovered = hoveredPoint?.idx === i && hoveredPoint?.type === 'user';
                const isIndustryHovered = hoveredPoint?.idx === i && hoveredPoint?.type === 'industry';

                // Smart Tooltip Direction: If at top half, show below point. If bottom, show above.
                const uOffset = Math.sin(up.angle) < -0.2 ? 18 : -14;
                const iOffset = Math.sin(ip.angle) < -0.2 ? 18 : -14;

                return (
                    <g key={i}>
                        {/* User Point */}
                        <circle
                            cx={up.x}
                            cy={up.y}
                            r={isUserHovered ? 6 : 4}
                            fill="#2563EB"
                            stroke="white"
                            strokeWidth="2"
                            onMouseEnter={() => setHoveredPoint({ idx: i, type: 'user' })}
                            onMouseLeave={() => setHoveredPoint(null)}
                            className="transition-all duration-200 cursor-pointer"
                        />

                        {/* Industry Point */}
                        <circle
                            cx={ip.x}
                            cy={ip.y}
                            r={isIndustryHovered ? 6 : 4}
                            fill="#22c55e"
                            stroke="white"
                            strokeWidth="2"
                            onMouseEnter={() => setHoveredPoint({ idx: i, type: 'industry' })}
                            onMouseLeave={() => setHoveredPoint(null)}
                            className="transition-all duration-200 cursor-pointer"
                        />

                        {isUserHovered && (
                            <g transform={`translate(${up.x}, ${up.y + uOffset})`}>
                                <rect x="-18" y="-7" width="36" height="14" rx="4" fill="#1e293b" />
                                <text textAnchor="middle" y="3" fontSize="9" fill="white" fontWeight="900">
                                    {Math.round(d.userVal * 100)}%
                                </text>
                            </g>
                        )}
                        {isIndustryHovered && (
                            <g transform={`translate(${ip.x}, ${ip.y + iOffset})`}>
                                <rect x="-18" y="-7" width="36" height="14" rx="4" fill="#065f46" />
                                <text textAnchor="middle" y="3" fontSize="9" fill="white" fontWeight="900">
                                    {Math.round(d.industryVal * 100)}%
                                </text>
                            </g>
                        )}
                    </g>
                );
            })}

            {data.map((d, i) => {
                const lp = labelPoint(i);
                const cos = Math.cos(lp.angle);
                let anchor = "middle";
                if (cos > 0.2) anchor = "start";
                else if (cos < -0.2) anchor = "end";

                const label = d.label;
                let lines = [label];
                if (label.length > 15 || label.includes(' / ') || label.includes(' & ')) {
                    if (label.includes(' / ')) lines = label.split(' / ').map((s, idx, arr) => idx < arr.length - 1 ? s + ' /' : s);
                    else if (label.includes(' & ')) lines = label.split(' & ').map((s, idx, arr) => idx < arr.length - 1 ? s + ' &' : s);
                    else if (label.includes(' ')) {
                        const mid = Math.floor(label.length / 2);
                        const spaceIdx = label.indexOf(' ', mid - 3);
                        if (spaceIdx !== -1) {
                            lines = [label.substring(0, spaceIdx), label.substring(spaceIdx + 1)];
                        }
                    }
                }

                return (
                    <text
                        key={d.label}
                        x={lp.x}
                        y={lp.y - (lines.length - 1) * 6}
                        textAnchor={anchor}
                        dominantBaseline="middle"
                        fontSize="10"
                        fontWeight="700"
                        fill={hoveredPoint?.idx === i ? "#1e293b" : "#475569"}
                        fontFamily="'Plus Jakarta Sans', sans-serif"
                        className="transition-colors duration-200"
                    >
                        {lines.map((line, idx) => (
                            <tspan key={idx} x={lp.x} dy={idx === 0 ? 0 : 12}>{line}</tspan>
                        ))}
                    </text>
                );
            })}
        </svg>
    );
}

const skillBadgeMap: Record<string, { label: string; bg: string; text: string }> = {
    react: { label: 'R', bg: 'bg-indigo-100', text: 'text-indigo-700' },
    'react.js': { label: 'R', bg: 'bg-indigo-100', text: 'text-indigo-700' },
    git: { label: 'G', bg: 'bg-orange-100', text: 'text-orange-600' },
    'rest api': { label: 'API', bg: 'bg-slate-100', text: 'text-slate-600' },
    typescript: { label: 'TS', bg: 'bg-sky-100', text: 'text-sky-700' },
};

function getSkillBadge(skillName: string) {
    const key = skillName.trim().toLowerCase();
    return skillBadgeMap[key] || { label: skillName[0] || '?', bg: 'bg-slate-100', text: 'text-slate-500' };
}

// ─── Skill Gap Bar ────────────────────────────────────────────────────────────
function SkillGapBar({ item }: { item: SkillGapItem }) {
    const userPct = item.user_score;
    const industryPct = item.market_demand;
    const badgeColor = item.status === 'strong' ? 'bg-emerald-500' : 
                      item.status === 'developing' ? 'bg-amber-500' : 'bg-rose-500';

    return (
        <div className="py-4 border-b border-slate-50 last:border-0 group">
            <div className="flex justify-between items-center mb-3">
                <h4 className="text-[16px] font-black text-[#1A1A2E] leading-tight group-hover:text-indigo-900 transition-colors">
                    {item.skill}
                </h4>
                <div className={`w-3 h-3 rounded-lg ${badgeColor} shadow-sm shadow-black/5`} />
            </div>
            
            <div className="flex justify-between items-end mb-2">
                <span className="text-[12px] font-bold text-slate-400">Progress</span>
                <div className="text-[12px] font-black text-slate-600">
                    <span>{item.user_score}</span>
                    <span className="text-slate-300 mx-0.5">/</span>
                    <span className="text-slate-400">{item.market_demand}%</span>
                </div>
            </div>

            <div className="h-2.5 w-full bg-slate-100 rounded-lg overflow-hidden">
                <div
                    className={`h-full rounded-lg transition-all duration-1000 ${
                        item.status === 'strong' ? 'bg-emerald-500' : 'bg-indigo-600'
                    }`}
                    style={{ width: `${userPct}%` }}
                />
            </div>
        </div>
    );
}

// ─── Empty State: Upload Form ─────────────────────────────────────────────────
function UploadForm({
    target,
    setTarget,
    mode,
    setMode,
    pasteText,
    setPasteText,
    dragging,
    onDragOver,
    onDragLeave,
    onDrop,
    onFileChange,
    onAnalyze,
    loading,
    fileInputRef,
    file,
    onRemoveFile,
    previewUrl,
    availableTargets,
}: {
    target: string;
    setTarget: (v: string) => void;
    mode: 'upload' | 'paste';
    setMode: (v: 'upload' | 'paste') => void;
    pasteText: string;
    setPasteText: (v: string) => void;
    dragging: boolean;
    onDragOver: (e: React.DragEvent) => void;
    onDragLeave: () => void;
    onDrop: (e: React.DragEvent) => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAnalyze: () => void;
    loading: boolean;
    fileInputRef: React.RefObject<HTMLInputElement>;
    file: File | null;
    onRemoveFile: () => void;
    previewUrl: string | null;
    availableTargets: string[];
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            <div className="md:col-span-3 bg-white rounded-lg p-7 shadow-sm border border-slate-100">
                <h2 className="text-[18px] font-black text-[#1A1A2E] mb-1">Analisis CV</h2>
                <p className="text-[13px] text-slate-400 mb-6">Upload file atau paste text CV kamu.</p>

                <label className="block text-[12px] font-semibold text-slate-500 mb-1.5">Target Karir</label>
                <div className="relative mb-5">
                    <select
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        className="w-full appearance-none border border-slate-200 rounded-lg px-5 py-3 text-[13px] font-semibold text-[#1A1A2E] bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                    >
                        {availableTargets.map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </div>

                <div className="flex rounded-lg border border-slate-200 overflow-hidden mb-5 p-0.5 bg-slate-50">
                    <button
                        onClick={() => setMode('upload')}
                        className={`flex-1 py-2.5 rounded-lg text-[13px] font-semibold transition-all ${mode === 'upload' ? 'bg-indigo-900 text-white shadow-md' : 'text-slate-500 hover:text-[#2563EB]'}`}
                    >
                        Upload File
                    </button>
                    <button
                        onClick={() => setMode('paste')}
                        className={`flex-1 py-2.5 rounded-lg text-[13px] font-semibold transition-all ${mode === 'paste' ? 'bg-indigo-900 text-white shadow-md' : 'text-slate-500 hover:text-[#2563EB]'}`}
                    >
                        Paste Text
                    </button>
                </div>

                {mode === 'upload' ? (
                    file ? (
                        <div className="border-2 border-slate-100 rounded-lg p-4 bg-slate-50 relative group">
                            <button 
                                onClick={onRemoveFile}
                                className="absolute -top-2 -right-2 w-8 h-8 bg-rose-500 text-white rounded-lg flex items-center justify-center shadow-lg hover:bg-rose-600 transition-colors z-10"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            </button>
                            <div className="flex items-center gap-4 mb-4 p-3 bg-white rounded-lg border border-slate-100">
                                <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[13px] font-bold text-slate-700 truncate">{file.name}</p>
                                    <p className="text-[11px] text-slate-400">{(file.size / 1024).toFixed(1)} KB • PDF Document</p>
                                </div>
                            </div>
                            {file.type === 'application/pdf' && previewUrl ? (
                                <div className="aspect-[4/3] w-full rounded-lg overflow-hidden border border-slate-200 bg-white">
                                    <iframe 
                                        src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
                                        className="w-full h-full border-none"
                                        title="CV Preview"
                                    />
                                </div>
                            ) : (
                                <div className="py-10 flex flex-col items-center justify-center bg-white rounded-lg border border-slate-200 border-dashed">
                                    <p className="text-[12px] text-slate-400 italic">Preview tidak tersedia untuk format ini</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div
                            onDragOver={onDragOver}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-lg flex flex-col items-center justify-center py-10 cursor-pointer transition-all ${
                                dragging ? 'border-[#2563EB] bg-indigo-900' : 'border-slate-200 hover:border-[#2563EB] hover:bg-indigo-900/40'
                            }`}
                        >
                            <svg className={`mb-3 ${dragging ? 'text-white' : 'text-slate-400'}`} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            <p className={`text-[13px] font-semibold ${dragging ? 'text-white' : 'text-slate-600'}`}>Klik atau drag cv ke sini.</p>
                            <p className={`text-[11px] mt-1 ${dragging ? 'text-indigo-100' : 'text-slate-400'}`}>PDF, DOCS, TXT</p>
                            <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.doc,.docx,.txt" onChange={onFileChange} />
                        </div>
                    )
                ) : (
                    <textarea
                        value={pasteText}
                        onChange={(e) => setPasteText(e.target.value)}
                        rows={7}
                        placeholder="Paste isi CV kamu di sini..."
                        className="w-full border border-slate-200 rounded-lg px-5 py-4 text-[13px] text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none placeholder:text-slate-300"
                    />
                )}

                <button
                    onClick={onAnalyze}
                    disabled={loading}
                    className="mt-5 w-full bg-indigo-900 text-white py-3 rounded-lg text-[13px] font-bold hover:bg-indigo-900 transition-colors shadow-md shadow-blue-200 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                            Menganalisis...
                        </>
                    ) : 'Analisis CV'}
                </button>
            </div>

            <div className="md:col-span-2 bg-white rounded-lg p-7 shadow-sm border border-slate-100 flex flex-col">
                <h2 className="text-[18px] font-black text-[#1A1A2E] mb-auto">Hasil Analisis CV</h2>
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-[13px] text-slate-300 text-center leading-relaxed">
                        Upload dan analisa CV<br />untuk mendapatkan hasil
                    </p>
                </div>
            </div>

            <div className="md:col-span-5 bg-white rounded-lg px-8 py-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-[18px] font-black text-[#1A1A2E] mb-1">Rekomendasi dari AI</h2>
                    <p className="text-[13px] text-slate-400">Upload dan analisis CV anda untuk mendapatkan rekomendasi.</p>
                </div>
                <button className="bg-indigo-900 text-white px-6 py-2.5 rounded-lg text-[13px] font-bold shadow-md hover:bg-indigo-900 transition-colors flex-shrink-0">
                    Roadmap
                </button>
            </div>
        </div>
    );
}

// ─── Result State ─────────────────────────────────────────────────────────────
// ─── Roadmap Milestone ──────────────────────────────────────────────────────
function RoadmapMilestone({ 
    title, 
    status, 
    icon, 
    isLocked, 
    details 
}: { 
    title: string; 
    status: string; 
    icon: string; 
    isLocked: boolean;
    details: string[];
}) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div 
            onClick={() => !isLocked && setExpanded(!expanded)}
            className={`relative p-5 rounded-lg border transition-all cursor-pointer overflow-hidden ${
                expanded 
                ? 'border-indigo-300 bg-white shadow-xl scale-[1.02]' 
                : isLocked 
                    ? 'border-slate-50 bg-slate-50/50 opacity-60 grayscale cursor-not-allowed'
                    : status === 'SEDANG DIPELAJARI'
                        ? 'border-indigo-900 bg-indigo-900 text-white shadow-lg shadow-indigo-100'
                        : 'border-slate-100 bg-white hover:border-indigo-200 hover:shadow-md'
            }`}
        >
            <div className="flex justify-between items-start mb-4">
                <div className={`text-2xl ${expanded ? 'scale-110' : ''} transition-transform`}>
                    {icon}
                </div>
                {isLocked ? (
                    <svg className="text-slate-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                ) : (
                    status === 'SEDANG DIPELAJARI' && (
                        <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                            <svg className="text-white" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                        </div>
                    )
                )}
            </div>

            <h3 className={`text-[13px] font-black leading-snug mb-2 ${expanded || status === 'SEDANG DIPELAJARI' ? '' : 'text-slate-700'}`}>
                {title}
            </h3>
            
            <p className={`text-[9px] font-black uppercase tracking-widest ${
                status === 'SEDANG DIPELAJARI' ? 'text-indigo-200' : 'text-slate-400'
            }`}>
                {status}
            </p>

            {expanded && !isLocked && (
                <div className="mt-4 pt-4 border-t border-indigo-100 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-[10px] font-black text-indigo-900 uppercase tracking-widest mb-3">Materi Pembelajaran:</p>
                    <ul className="space-y-2">
                        {details.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-[11px] text-slate-600 font-medium">
                                <div className="w-1.5 h-1.5 rounded-lg bg-indigo-400 mt-1 flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <button className="mt-5 w-full bg-indigo-900 text-white py-2 rounded-lg text-[11px] font-bold hover:bg-indigo-800 transition-colors">
                        Mulai Belajar
                    </button>
                </div>
            )}
        </div>
    );
}

// ─── Career Path Item ─────────────────────────────────────────────────────────
function CareerPathCard({ pos }: { pos: any }) {
    const [expanded, setExpanded] = useState(false);
    
    return (
        <div 
            onClick={() => setExpanded(!expanded)}
            className={`p-5 rounded-lg border transition-all cursor-pointer group ${
                expanded 
                ? 'border-indigo-200 bg-white shadow-xl scale-[1.01] ring-4 ring-indigo-50/50' 
                : 'border-slate-50 bg-slate-50/50 hover:bg-white hover:border-indigo-100 hover:shadow-lg'
            }`}
        >
            <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0 pr-4">
                    <h3 className={`text-[16px] font-black transition-colors truncate ${expanded ? 'text-indigo-900' : 'text-[#1A1A2E]'}`}>
                        {pos.title}
                    </h3>
                    {!expanded && (
                        <div className="flex items-center gap-1.5 mt-1.5">
                            <div className="w-1.5 h-1.5 rounded-lg bg-indigo-400 animate-pulse" />
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Detail Jalur Karir</p>
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className={`text-[18px] font-black transition-colors ${expanded ? 'text-indigo-600' : 'text-indigo-900'}`}>
                        {pos.match_percentage}%
                    </span>
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">Match</span>
                </div>
            </div>
            
            {expanded && (
                <div className="mt-5 pt-5 border-t border-slate-100 animate-in fade-in slide-in-from-top-3 duration-500">
                    <div className="bg-indigo-50/50 p-4 rounded-lg border border-indigo-100/30 mb-5">
                        <p className="text-[12px] text-slate-600 leading-relaxed font-medium italic">
                            "{pos.description}"
                        </p>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Skill yang Diperlukan</p>
                            <span className="text-[9px] font-bold text-indigo-400 bg-indigo-50 px-2 py-0.5 rounded-lg">AI Recommendation</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {(pos.required_skills || []).map((s: string, i: number) => (
                                <span key={i} className="text-[10px] font-bold bg-white px-3 py-1.5 rounded-lg text-indigo-900 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-sm">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Result State ─────────────────────────────────────────────────────────────
function AnalysisResults({
    profile,
    onReset,
}: {
    profile: any;
    onReset: () => void;
}) {
    const radarData = (profile?.skill_gaps || []).slice(0, 6).map((g: any) => ({
        label: g.skill,
        userVal: (g.user_score || 10) / 100,
        industryVal: (g.market_demand || 80) / 100
    }));

    const milestones = [
        { title: 'Mastering Node.js & Advanced TypeScript Backend', status: 'SEDANG DIPELAJARI', icon: '🟢', isLocked: false, details: ['Node.js Event Loop & Architecture', 'TypeScript Advanced Types', 'Design Patterns in Backend', 'Error Handling & Security'] },
        { title: 'Professional RESTful API Design & Documentation', status: 'TERKUNCI', icon: '📡', isLocked: true, details: [] },
        { title: 'Advanced Laravel & PHP Optimization', status: 'TERKUNCI', icon: '🐘', isLocked: true, details: [] },
        { title: 'Database Mastery & Complex Modeling', status: 'TERKUNCI', icon: '🗄️', isLocked: true, details: [] },
        { title: 'Containerization with Docker', status: 'TERKUNCI', icon: '🐳', isLocked: true, details: [] },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
                <div className="md:col-span-3 bg-white rounded-lg p-7 shadow-sm border border-slate-100">
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <h2 className="text-[18px] font-black text-[#1A1A2E]">Analisis Kompetensi</h2>
                            <p className="text-[13px] text-slate-400">Perbandingan skill kamu dengan standar industri.</p>
                        </div>
                        <button
                            onClick={onReset}
                            className="text-[12px] text-indigo-900 font-semibold border border-indigo-900 px-4 py-1.5 rounded-lg hover:bg-indigo-900 hover:text-white transition-colors flex-shrink-0"
                        >
                            Update CV
                        </button>
                    </div>
                    <div className="py-4">
                        <RadarChart data={radarData} />
                    </div>
                    <div className="flex items-center justify-center gap-6 mt-2">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-2.5 rounded-lg bg-indigo-900" />
                            <span className="text-[11px] text-slate-500 font-medium">Skill Kamu</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-2.5 rounded-lg bg-emerald-500" />
                            <span className="text-[11px] text-slate-500 font-medium">Standar Industri</span>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 bg-white rounded-lg p-7 shadow-sm border border-slate-100 flex flex-col">
                    <h2 className="text-[18px] font-black text-[#1A1A2E] mb-1">Skill Gap Analysis</h2>
                    <p className="text-[12px] text-slate-400 font-semibold mb-4 uppercase tracking-wider">Kebutuhan Pasar</p>
                    
                    <div className="space-y-5 flex-1 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                        {(profile?.skill_gaps && profile.skill_gaps.length > 0) ? (
                            profile.skill_gaps.map((item: any, idx: number) => (
                                <SkillGapBar key={idx} item={item} />
                            ))
                        ) : (
                            <div className="py-10 flex flex-col items-center justify-center text-center">
                                <p className="text-[12px] text-slate-400 italic">Belum ada data skill gap.</p>
                            </div>
                        )}
                    </div>
                    <Link href={route('roadmap')} className="mt-6 w-full bg-indigo-900 text-white py-3 rounded-lg text-[13px] font-bold hover:bg-indigo-800 transition-all text-center shadow-lg shadow-indigo-100">
                        Buka Roadmap Belajar
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-[20px] font-black text-[#1A1A2E] mb-1">Learning Roadmap</h2>
                        <p className="text-[13px] text-slate-400">Ikuti kurikulum khusus untuk mencapai target karirmu.</p>
                    </div>
                    <div className="px-4 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-100">
                        Level: Beginner to Expert
                    </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {milestones.map((m, i) => (
                        <RoadmapMilestone key={i} {...m} />
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-lg px-8 py-7 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-lg bg-indigo-900 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-100">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-[18px] font-black text-[#1A1A2E] mb-1">Optimasi CV dari AI</h2>
                    <p className="text-[13px] text-slate-500 leading-relaxed italic">
                        "{profile?.smart_tips || 'AI sedang menyiapkan tips optimasi khusus untuk CV-mu...'}"
                    </p>
                </div>
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                    <Link href={route('profile.edit')} className="bg-white text-indigo-900 border border-slate-200 px-6 py-2.5 rounded-lg text-[13px] font-bold hover:bg-slate-50 transition-all text-center">
                        Edit Profil
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                <div className="md:col-span-12 bg-white rounded-lg p-8 shadow-sm border border-slate-100">
                    <h2 className="text-[20px] font-black text-[#1A1A2E] mb-2">Posisi Alternatif & Karir Path</h2>
                    <p className="text-[13px] text-slate-400 mb-8 max-w-2xl">
                        Berdasarkan kombinasi skill-mu, AI menemukan beberapa jalur karir alternatif yang memiliki kecocokan tinggi dengan profilmu saat ini.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {(profile?.career_paths && profile.career_paths.length > 0) ? (
                            profile.career_paths.map((pos: any, idx: number) => (
                                <CareerPathCard key={idx} pos={pos} />
                            ))
                        ) : (
                            <div className="col-span-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-lg bg-slate-50/30">
                                <div className="w-16 h-16 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                                </div>
                                <p className="text-[13px] font-bold text-slate-400">Belum ada jalur karir alternatif</p>
                                <p className="text-[11px] text-slate-300 mt-1">Coba update CV kamu untuk mendapatkan rekomendasi baru</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SkillGapAnalysis({ 
    profile, 
    analysisProcessing, 
    analysisProcessingError 
}: Props) {
    const availableTargets = (profile?.career_target && profile.career_target.length > 0)
        ? (Array.isArray(profile.career_target) ? profile.career_target : [profile.career_target])
        : DEFAULT_CAREER_TARGETS;

    const { data, setData, post, processing } = useForm({
        cv_text: '',
        cv_file: null as File | null,
        career_target: [availableTargets[0]]
    });

    const [mode, setMode] = useState<'upload' | 'paste'>('upload');
    const [dragging, setDragging] = useState(false);
    const [showUpload, setShowUpload] = useState(!profile?.skill_gaps || profile?.skill_gaps?.length === 0);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (profile?.skill_gaps) {
            // Debug: log analysis output to the browser console.
            console.debug('[Analysis] CV analysis result', {
                skills: profile?.skills,
                skillGaps: profile?.skill_gaps,
                careerPaths: profile?.career_paths,
                smartTips: profile?.smart_tips,
                education: profile?.education,
                experiences: profile?.experiences,
            });
        }
    }, [profile?.skill_gaps]);

    useEffect(() => {
        if (data.cv_file) {
            const url = URL.createObjectURL(data.cv_file);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setPreviewUrl(null);
        }
    }, [data.cv_file]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => setDragging(false), []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files.length > 0) {
            setData('cv_file', e.dataTransfer.files[0]);
        }
    }, []);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setData('cv_file', e.target.files[0]);
        }
    }, []);

    const handleAnalyze = () => {
        post(route('analysis.store'), {
            forceFormData: true,
            onSuccess: () => {
                setShowUpload(false);
            }
        });
    };

    if (analysisProcessing) {
        return (
            <AppLayout header="Skill Gap Analysis">
                <Head title="Menganalisis CV... | CareerSync" />
                <div className="max-w-full mx-auto pt-20 text-center">
                    <div className="relative inline-block mb-8">
                        <div className="w-24 h-24 rounded-lg bg-indigo-900 animate-pulse flex items-center justify-center shadow-xl shadow-indigo-100">
                            <svg className="animate-spin text-white" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center border-4 border-white">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
                        </div>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2">AI Sedang Menganalisis CV-mu</h2>
                    <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
                        Mohon tunggu sebentar, kami sedang memetakan skill kamu dengan standar industri terbaru untuk jalur <span className="text-indigo-900 font-bold">{data.career_target[0]}</span>.
                    </p>
                    <div className="mt-10 flex flex-col gap-4 max-w-xs mx-auto">
                        <div className="h-1 bg-slate-100 rounded-lg overflow-hidden">
                            <div className="h-full bg-indigo-900 w-1/2 animate-shimmer" style={{ backgroundSize: '200% 100%', backgroundImage: 'linear-gradient(90deg, #312e81 25%, #4338ca 50%, #312e81 75%)' }} />
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 tracking-widest">Processing Market Data & Skill Gaps</p>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout header="Skill Gap Analysis">
            <Head title="Skill Gap Analysis | CareerSync" />
            <div className="max-w-full mx-auto pt-4">
                {analysisProcessingError && (
                    <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-lg flex items-center gap-4 text-rose-600">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        <p className="text-[13px] font-bold">{analysisProcessingError}</p>
                    </div>
                )}

                {profile?.skill_gaps?.length > 0 && !showUpload ? (
                    <AnalysisResults profile={profile} onReset={() => setShowUpload(true)} />
                ) : (
                    <UploadForm
                        target={data.career_target[0]}
                        setTarget={(v) => setData('career_target', [v])}
                        mode={mode}
                        setMode={setMode}
                        pasteText={data.cv_text}
                        setPasteText={(v) => setData('cv_text', v)}
                        dragging={dragging}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onFileChange={handleFileChange}
                        onAnalyze={handleAnalyze}
                        loading={processing}
                        fileInputRef={fileInputRef}
                        file={data.cv_file}
                        onRemoveFile={() => setData('cv_file', null)}
                        previewUrl={previewUrl}
                        availableTargets={availableTargets}
                    />
                )}
            </div>
        </AppLayout>
    );
}


