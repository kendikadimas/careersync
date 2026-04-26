import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useRef, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface User {
    name: string;
    email: string;
}

interface SkillGapItem {
    name: string;
    userScore: number;
    industryScore: number;
}

interface AlternativePosition {
    title: string;
    skills: string;
    match: number;
}

interface AnalysisResult {
    radarSkills: { label: string; userVal: number; industryVal: number }[];
    skillGaps: SkillGapItem[];
    aiRecommendation: string;
    alternativePositions: AlternativePosition[];
}

interface Props {
    user?: User;
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

const CAREER_TARGETS = [
    'Fullstack Developer',
    'Frontend Developer',
    'Backend Developer',
    'Mobile Developer',
    'DevOps Engineer',
    'Data Engineer',
];

// ─── Radar Chart SVG ─────────────────────────────────────────────────────────
function RadarChart({ data }: { data: AnalysisResult['radarSkills'] }) {
    const cx = 160;
    const cy = 160;
    const r = 110;
    const n = data.length;

    function point(val: number, idx: number) {
        const angle = (Math.PI * 2 * idx) / n - Math.PI / 2;
        return {
            x: cx + val * r * Math.cos(angle),
            y: cy + val * r * Math.sin(angle),
        };
    }

    function labelPoint(idx: number) {
        const angle = (Math.PI * 2 * idx) / n - Math.PI / 2;
        return {
            x: cx + (r + 22) * Math.cos(angle),
            y: cy + (r + 22) * Math.sin(angle),
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
        <svg viewBox="0 0 320 320" className="w-full max-w-[300px] mx-auto">
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
            <path
                d={polyPath(data.map((d) => d.industryVal))}
                fill="rgba(34,197,94,0.15)"
                stroke="#22c55e"
                strokeWidth="2.5"
            />
            <path
                d={polyPath(data.map((d) => d.userVal))}
                fill="rgba(37,99,235,0.2)"
                stroke="#2563EB"
                strokeWidth="2.5"
            />
            {data.map((d, i) => {
                const lp = labelPoint(i);
                return (
                    <text
                        key={d.label}
                        x={lp.x}
                        y={lp.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="11"
                        fontWeight="600"
                        fill="#475569"
                        fontFamily="'Plus Jakarta Sans', sans-serif"
                    >
                        {d.label}
                    </text>
                );
            })}
        </svg>
    );
}

const skillBadgeMap: Record<string, { label: string; bg: string; text: string }> = {
    react: { label: 'R', bg: 'bg-blue-100', text: 'text-blue-600' },
    'react.js': { label: 'R', bg: 'bg-blue-100', text: 'text-blue-600' },
    git: { label: 'G', bg: 'bg-orange-100', text: 'text-orange-600' },
    'rest api': { label: 'API', bg: 'bg-slate-100', text: 'text-slate-600' },
    typescript: { label: 'TS', bg: 'bg-sky-100', text: 'text-sky-700' },
};

function getSkillBadge(skillName: string) {
    const key = skillName.trim().toLowerCase();
    return skillBadgeMap[key] || { label: skillName[0]?.toUpperCase() || '?', bg: 'bg-slate-100', text: 'text-slate-500' };
}

// ─── Skill Gap Bar ────────────────────────────────────────────────────────────
function SkillGapBar({ item }: { item: SkillGapItem }) {
    const userPct = (item.userScore / 100) * 100;
    const industryPct = (item.industryScore / 100) * 100;
    const badge = getSkillBadge(item.name);

    return (
        <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-[11px] font-bold ${badge.bg} ${badge.text}`}>
                {badge.label}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-[12px] font-semibold text-[#1A1A2E]">{item.name}</span>
                    <span className="text-[11px] text-slate-400 font-medium">
                        {item.userScore}/{item.industryScore}
                        <span className="text-[9px]">pts</span>
                    </span>
                </div>
                <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="absolute top-0 left-0 h-full bg-[#2563EB] rounded-full"
                        style={{ width: `${userPct}%` }}
                    />
                    <div
                        className="absolute top-0 left-0 h-full bg-slate-300 rounded-full"
                        style={{ width: `${industryPct}%`, opacity: 0.3 }}
                    />
                </div>
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
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            <div className="md:col-span-3 bg-white rounded-3xl p-7 shadow-sm border border-slate-100">
                <h2 className="text-[18px] font-black text-[#1A1A2E] mb-1">Analisis CV</h2>
                <p className="text-[13px] text-slate-400 mb-6">Upload file atau paste text CV kamu.</p>

                <label className="block text-[12px] font-semibold text-slate-500 mb-1.5">Target Karir</label>
                <div className="relative mb-5">
                    <select
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        className="w-full appearance-none border border-slate-200 rounded-full px-5 py-3 text-[13px] font-semibold text-[#1A1A2E] bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                    >
                        {CAREER_TARGETS.map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </div>

                <div className="flex rounded-full border border-slate-200 overflow-hidden mb-5 p-0.5 bg-slate-50">
                    <button
                        onClick={() => setMode('upload')}
                        className={`flex-1 py-2.5 rounded-full text-[13px] font-semibold transition-all ${mode === 'upload' ? 'bg-[#2563EB] text-white shadow-md' : 'text-slate-500 hover:text-[#2563EB]'}`}
                    >
                        Upload File
                    </button>
                    <button
                        onClick={() => setMode('paste')}
                        className={`flex-1 py-2.5 rounded-full text-[13px] font-semibold transition-all ${mode === 'paste' ? 'bg-[#2563EB] text-white shadow-md' : 'text-slate-500 hover:text-[#2563EB]'}`}
                    >
                        Paste Text
                    </button>
                </div>

                {mode === 'upload' ? (
                    <div
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center py-10 cursor-pointer transition-all ${
                            dragging ? 'border-[#2563EB] bg-blue-50' : 'border-slate-200 hover:border-[#2563EB] hover:bg-blue-50/40'
                        }`}
                    >
                        <svg className="text-slate-400 mb-3" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        <p className="text-[13px] font-semibold text-slate-600">Klik atau drag cv ke sini.</p>
                        <p className="text-[11px] text-slate-400 mt-1">PDF, DOCS, TXT</p>
                        <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.doc,.docx,.txt" onChange={onFileChange} />
                    </div>
                ) : (
                    <textarea
                        value={pasteText}
                        onChange={(e) => setPasteText(e.target.value)}
                        rows={7}
                        placeholder="Paste isi CV kamu di sini..."
                        className="w-full border border-slate-200 rounded-2xl px-5 py-4 text-[13px] text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none placeholder:text-slate-300"
                    />
                )}

                <button
                    onClick={onAnalyze}
                    disabled={loading}
                    className="mt-5 w-full bg-[#2563EB] text-white py-3 rounded-full text-[13px] font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                            Menganalisis...
                        </>
                    ) : 'Analisis CV'}
                </button>
            </div>

            <div className="md:col-span-2 bg-white rounded-3xl p-7 shadow-sm border border-slate-100 flex flex-col">
                <h2 className="text-[18px] font-black text-[#1A1A2E] mb-auto">Hasil Analisis CV</h2>
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-[13px] text-slate-300 text-center leading-relaxed">
                        Upload dan analisa CV<br />untuk mendapatkan hasil
                    </p>
                </div>
            </div>

            <div className="md:col-span-5 bg-white rounded-3xl px-8 py-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-[18px] font-black text-[#1A1A2E] mb-1">Rekomendasi dari AI</h2>
                    <p className="text-[13px] text-slate-400">Upload dan analisis CV anda untuk mendapatkan rekomendasi.</p>
                </div>
                <button className="bg-[#2563EB] text-white px-6 py-2.5 rounded-full text-[13px] font-bold shadow-md hover:bg-blue-700 transition-colors flex-shrink-0">
                    Roadmap
                </button>
            </div>
        </div>
    );
}

// ─── Result State ─────────────────────────────────────────────────────────────
function AnalysisResults({
    result,
    onReset,
}: {
    result: AnalysisResult;
    onReset: () => void;
}) {
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
                <div className="md:col-span-3 bg-white rounded-3xl p-7 shadow-sm border border-slate-100">
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <h2 className="text-[18px] font-black text-[#1A1A2E]">Analisis CV</h2>
                            <p className="text-[13px] text-slate-400">Upload file atau paste text CV kamu.</p>
                        </div>
                        <button
                            onClick={onReset}
                            className="text-[12px] text-[#2563EB] font-semibold border border-[#2563EB] px-4 py-1.5 rounded-full hover:bg-blue-50 transition-colors flex-shrink-0"
                        >
                            Upload Ulang
                        </button>
                    </div>
                    <RadarChart data={result.radarSkills} />
                    <div className="flex items-center justify-center gap-6 mt-2">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-2.5 rounded-full bg-[#2563EB]" />
                            <span className="text-[11px] text-slate-500 font-medium">Skill Kamu</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-2.5 rounded-full bg-green-500" />
                            <span className="text-[11px] text-slate-500 font-medium">Industri</span>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 bg-white rounded-3xl p-7 shadow-sm border border-slate-100">
                    <h2 className="text-[18px] font-black text-[#1A1A2E] mb-1">Hasil Analisis CV</h2>
                    <p className="text-[12px] text-slate-400 font-semibold mb-5">Skill Gap</p>
                    <div className="space-y-4">
                        {result.skillGaps.map((item) => (
                            <SkillGapBar key={item.name} item={item} />
                        ))}
                    </div>
                    <button className="mt-6 w-full bg-[#2563EB] text-white py-2.5 rounded-full text-[13px] font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-200">
                        Lihat Selengkapnya
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-3xl px-8 py-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#2563EB">
                        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                    </svg>
                </div>
                <div className="flex-1">
                    <h2 className="text-[16px] font-black text-[#1A1A2E] mb-1">Rekomendasi dari AI</h2>
                    <p className="text-[13px] text-slate-500 leading-relaxed">{result.aiRecommendation}</p>
                </div>
                <button className="bg-[#2563EB] text-white px-7 py-2.5 rounded-full text-[13px] font-bold shadow-md hover:bg-blue-700 transition-colors flex-shrink-0">
                    Roadmap
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
                <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                    <h2 className="text-[16px] font-black text-[#1A1A2E] mb-1">Hasil Analisis CV</h2>
                    <p className="text-[11px] text-slate-400 font-semibold mb-4">Skill Gap</p>
                    <div className="space-y-4">
                        {result.skillGaps.map((item) => (
                            <SkillGapBar key={item.name} item={item} />
                        ))}
                    </div>
                    <button className="mt-5 w-full bg-[#2563EB] text-white py-2.5 rounded-full text-[13px] font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-200">
                        Lihat Selengkapnya
                    </button>
                </div>

                <div className="md:col-span-3 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                    <h2 className="text-[18px] font-black text-[#1A1A2E] mb-1">Posisi Alternatif</h2>
                    <p className="text-[13px] text-slate-400 mb-6">
                        Berdasarkan analisis CV kamu, kami telah memetakan alternatif posisi lain yang cocok
                    </p>
                    <div className="space-y-5">
                        {result.alternativePositions.map((pos) => (
                            <div key={pos.title} className="flex items-center justify-between">
                                <div>
                                    <p className="text-[16px] font-black text-[#1A1A2E]">{pos.title}</p>
                                    <p className="text-[12px] text-slate-400 mt-0.5">Skill yang kamu punya: {pos.skills}</p>
                                </div>
                                <div className="text-right flex-shrink-0 ml-4">
                                    <p className="text-[28px] font-black text-[#1A1A2E] leading-none">{pos.match}%</p>
                                    <p className="text-[11px] text-slate-400 font-semibold">cocok</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const DEFAULT_USER: User = { name: 'Paijo Safitrti', email: 'paijo123@gmail.com' };

export default function SkillGapAnalysis({ user = DEFAULT_USER }: Props) {
    const { auth }: any = usePage().props;
    const resolvedUser: User = auth?.user ? { name: auth.user.name, email: auth.user.email } : user;
    const [target, setTarget] = useState('Fullstack Developer');
    const [mode, setMode] = useState<'upload' | 'paste'>('upload');
    const [pasteText, setPasteText] = useState('');
    const [dragging, setDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => setDragging(false), []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files.length > 0) {
            simulateAnalysis();
        }
    }, []);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            simulateAnalysis();
        }
    }, []);

    function simulateAnalysis() {
        setLoading(true);
        setTimeout(() => {
            setResult(MOCK_RESULT);
            setLoading(false);
        }, 1800);
    }

    function handleAnalyze() {
        if (mode === 'paste' && !pasteText.trim()) return;
        simulateAnalysis();
    }

    function handleReset() {
        setResult(null);
        setPasteText('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    }

    return (
        <AppLayout header="Skill Gap Analysis">
            <Head title="Skill Gap Analysis | CareerSync" />
            <div className="max-w-5xl mx-auto pt-4">
                {result ? (
                    <AnalysisResults result={result} onReset={handleReset} />
                ) : (
                    <UploadForm
                        target={target}
                        setTarget={setTarget}
                        mode={mode}
                        setMode={setMode}
                        pasteText={pasteText}
                        setPasteText={setPasteText}
                        dragging={dragging}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onFileChange={handleFileChange}
                        onAnalyze={handleAnalyze}
                        loading={loading}
                        fileInputRef={fileInputRef}
                    />
                )}
            </div>
        </AppLayout>
    );
}
