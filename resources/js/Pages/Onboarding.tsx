import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { 
    Code, 
    Database, 
    Monitor, 
    Palette, 
    Smartphone, 
    Shield, 
    Cpu, 
    Plus, 
    X,
    ChevronRight,
    ChevronLeft,
    Check
} from 'lucide-react';

const ROLES = [
    { title: 'Frontend Engineer', icon: Monitor, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Backend Engineer', icon: Database, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Data Scientist', icon: Cpu, color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: 'UI/UX Designer', icon: Palette, color: 'text-pink-500', bg: 'bg-pink-50' },
    { title: 'DevOps Engineer', icon: Shield, color: 'text-amber-500', bg: 'bg-amber-50' },
    { title: 'Mobile Developer', icon: Smartphone, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { title: 'ML Engineer', icon: Rocket, color: 'text-red-500', bg: 'bg-red-50' }
];

import { Rocket } from 'lucide-react'; // Fix missing import in constant

export default function Onboarding() {
    const [step, setStep] = useState(1);
    const [careerTarget, setCareerTarget] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [tempSkill, setTempSkill] = useState('');
    const [cvText, setCvText] = useState('');

    const addSkill = (e: React.FormEvent) => {
        e.preventDefault();
        if (tempSkill.trim() && !skills.includes(tempSkill.trim())) {
            setSkills([...skills, tempSkill.trim()]);
            setTempSkill('');
        }
    };

    const removeSkill = (skill: string) => {
        setSkills(skills.filter(s => s !== skill));
    };

    const handleFinish = () => {
        router.post(route('onboarding.store'), {
            career_target: careerTarget,
            skills: skills.map(s => ({ name: s, level: 'intermediate' })), // Simplified initial level
            cv_text: cvText
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <Head title="Onboarding | Career-Sync Academy" />
            
            <div className="max-w-4xl w-full">
                {/* Progress Bar */}
                <div className="mb-12 flex items-center justify-between px-10 relative">
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 -z-10"></div>
                    <div 
                        className="absolute top-1/2 left-0 h-1 bg-teal-500 -translate-y-1/2 -z-10 transition-all duration-500" 
                        style={{ width: `${((step - 1) / 2) * 100}%` }}
                    ></div>
                    
                    {[1, 2, 3].map((s) => (
                        <div 
                            key={s} 
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 transition-all duration-300 ${
                                step >= s ? 'bg-teal-500 border-teal-200 text-white' : 'bg-white border-slate-200 text-slate-400'
                            }`}
                        >
                            {step > s ? <Check className="w-5 h-5" /> : s}
                        </div>
                    ))}
                </div>

                {/* Content */}
                <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-12 min-h-[500px] flex flex-col">
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-right duration-500 flex-1">
                            <h2 className="text-3xl font-black text-navy-900 mb-2">Pilih Target Karirmu</h2>
                            <p className="text-slate-500 mb-10">Pilih satu role yang ingin kamu capai atau kembangkan saat ini.</p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {ROLES.map((role) => (
                                    <button
                                        key={role.title}
                                        onClick={() => setCareerTarget(role.title)}
                                        className={`p-6 rounded-2xl flex flex-col items-center gap-4 transition-all duration-300 border-2 ${
                                            careerTarget === role.title 
                                            ? 'border-teal-500 bg-teal-50 shadow-lg shadow-teal-500/10 scale-105' 
                                            : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                                        }`}
                                    >
                                        <div className={`w-14 h-14 rounded-xl ${role.bg} ${role.color} flex items-center justify-center`}>
                                            <role.icon className="w-8 h-8" />
                                        </div>
                                        <span className="text-sm font-bold text-navy-900 text-center">{role.title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right duration-500 flex-1">
                            <h2 className="text-3xl font-black text-navy-900 mb-2">Skill yang Kamu Miliki</h2>
                            <p className="text-slate-500 mb-10">Tuliskan skill teknis atau soft-skill yang saat ini sudah kamu kuasai.</p>
                            
                            <form onSubmit={addSkill} className="mb-8">
                                <div className="flex gap-3">
                                    <div className="relative flex-1">
                                        <input 
                                            type="text" 
                                            value={tempSkill}
                                            onChange={(e) => setTempSkill(e.target.value)}
                                            placeholder="Contoh: React.js, Python, Figma..." 
                                            className="w-full px-5 py-4 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 font-medium"
                                        />
                                    </div>
                                    <button type="submit" className="p-4 bg-navy-900 text-white rounded-2xl hover:scale-105 transition-transform active:scale-95">
                                        <Plus className="w-6 h-6" />
                                    </button>
                                </div>
                            </form>

                            <div className="flex flex-wrap gap-3">
                                {skills.length === 0 && (
                                    <p className="text-slate-400 italic">Belum ada skill yang ditambahkan...</p>
                                )}
                                {skills.map((skill) => (
                                    <div key={skill} className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-100 rounded-xl font-bold text-navy-800 animate-in zoom-in duration-300">
                                        {skill}
                                        <button onClick={() => removeSkill(skill)} className="p-1 hover:text-red-500 transition-colors">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-right duration-500 flex-1">
                            <h2 className="text-3xl font-black text-navy-900 mb-2">Salin & Tempel CV (Opsional)</h2>
                            <p className="text-slate-500 mb-10">AI akan menganalisis profilmu lebih detail jika kamu memberikan teks CV-mu.</p>
                            
                            <textarea 
                                value={cvText}
                                onChange={(e) => setCvText(e.target.value)}
                                className="w-full h-64 p-6 bg-slate-100 border-none rounded-3xl focus:ring-2 focus:ring-teal-500 font-medium text-sm leading-relaxed"
                                placeholder="Paste isi CV kamu di sini (Pendidikan, Pengalaman, dll)..."
                            ></textarea>
                            <p className="mt-4 text-xs text-slate-400 italic text-right">Data aman dan hanya digunakan untuk analisis karirmu.</p>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="mt-12 flex items-center justify-between pt-8 border-t border-slate-100">
                        <button 
                            onClick={() => setStep(s => Math.max(1, s - 1))}
                            disabled={step === 1}
                            className={`flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-colors ${
                                step === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-navy-900 hover:bg-slate-100'
                            }`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                            Kembali
                        </button>

                        {step < 3 ? (
                            <button 
                                onClick={() => setStep(s => s + 1)}
                                disabled={step === 1 && !careerTarget}
                                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${
                                    (step === 1 && !careerTarget) 
                                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                                    : 'bg-navy-900 text-white shadow-navy-900/20 hover:scale-105'
                                }`}
                            >
                                Lanjut
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <button 
                                onClick={handleFinish}
                                className="flex items-center gap-2 px-10 py-3 bg-teal-500 text-white rounded-xl font-black shadow-lg shadow-teal-500/20 hover:scale-105 transition-all"
                            >
                                Selesai
                                <Check className="w-6 h-6" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
