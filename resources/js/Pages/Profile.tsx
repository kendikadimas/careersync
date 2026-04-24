import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { 
    User, 
    Mail, 
    Target, 
    Code, 
    Plus, 
    X, 
    Save, 
    AlertCircle,
    Check
} from 'lucide-react';

export default function Profile({ mustVerifyEmail, status, profile, roles }: any) {
    const { auth }: any = usePage().props;
    
    // Form for identity
    const identityForm = useForm({
        name: auth.user.name,
        email: auth.user.email,
    });

    // Form for career & skills
    const careerForm = useForm({
        career_target: profile?.career_target || [],
        skills: profile?.skills || [],
    });

    const [tempSkill, setTempSkill] = useState('');

    const handleIdentitySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        identityForm.patch(route('profile.update'));
    };

    const handleCareerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        careerForm.post(route('profile.career.update'));
    };

    const toggleRole = (role: string) => {
        const current = [...careerForm.data.career_target];
        if (current.includes(role)) {
            careerForm.setData('career_target', current.filter(r => r !== role));
        } else {
            careerForm.setData('career_target', [...current, role]);
        }
    };

    const addSkill = (e: React.FormEvent) => {
        e.preventDefault();
        if (tempSkill.trim()) {
            const newSkill = { name: tempSkill.trim(), level: 'intermediate' };
            if (!careerForm.data.skills.find((s: any) => s.name.toLowerCase() === newSkill.name.toLowerCase())) {
                careerForm.setData('skills', [...careerForm.data.skills, newSkill]);
            }
            setTempSkill('');
        }
    };

    const removeSkill = (skillName: string) => {
        careerForm.setData('skills', careerForm.data.skills.filter((s: any) => s.name !== skillName));
    };

    return (
        <AppLayout header="Profil & Pengaturan">
            <Head title="Profil Saya" />

            <div className="space-y-8">
                {/* Identity Settings */}
                <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex items-center gap-3">
                        <div className="w-10 h-10 bg-navy-50 text-navy-600 rounded-xl flex items-center justify-center">
                            <User className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-navy-900">Informasi Pengguna</h3>
                            <p className="text-xs text-slate-500">Perbarui informasi dasar akun Anda.</p>
                        </div>
                    </div>
                    <form onSubmit={handleIdentitySubmit} className="p-8">
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Nama Lengkap</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input 
                                        type="text" 
                                        value={identityForm.data.name}
                                        onChange={e => identityForm.setData('name', e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-teal-500 font-medium"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Alamat Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input 
                                        type="email" 
                                        value={identityForm.data.email}
                                        onChange={e => identityForm.setData('email', e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-teal-500 font-medium"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button 
                                type="submit" 
                                disabled={identityForm.processing}
                                className="flex items-center gap-2 px-6 py-3 bg-navy-900 text-white rounded-xl font-bold hover:scale-105 transition-transform disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </section>

                {/* Career Settings */}
                <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex items-center gap-3">
                        <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center">
                            <Target className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-navy-900">Target Karir</h3>
                            <p className="text-xs text-slate-500">Pilih role yang ingin Anda fokuskan.</p>
                        </div>
                    </div>
                    <div className="p-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                            {roles.map((role: string) => {
                                const isSelected = careerForm.data.career_target.includes(role);
                                return (
                                    <button
                                        key={role}
                                        onClick={() => toggleRole(role)}
                                        className={`px-4 py-4 rounded-xl border-2 text-sm font-bold transition-all ${
                                            isSelected 
                                            ? 'border-teal-500 bg-teal-50 text-teal-700' 
                                            : 'border-slate-50 bg-slate-50 text-slate-500 hover:border-slate-200'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            {role}
                                            {isSelected && <Check className="w-4 h-4" />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Skill Management */}
                        <div className="mb-8 p-6 bg-slate-50 rounded-2xl">
                             <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Daftar Skill Saat Ini</label>
                             
                             <form onSubmit={addSkill} className="flex gap-2 mb-6">
                                <input 
                                    type="text" 
                                    value={tempSkill}
                                    onChange={e => setTempSkill(e.target.value)}
                                    placeholder="Tambah skill baru..."
                                    className="flex-1 px-4 py-3 bg-white border-none rounded-xl focus:ring-2 focus:ring-teal-500 font-medium"
                                />
                                <button type="submit" className="p-3 bg-navy-900 text-white rounded-xl hover:scale-105 transition-transform">
                                    <Plus className="w-5 h-5" />
                                </button>
                             </form>

                             <div className="flex flex-wrap gap-2">
                                {careerForm.data.skills.map((skill: any) => (
                                    <div key={skill.name} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-navy-900 shadow-sm animate-in zoom-in duration-200">
                                        {skill.name}
                                        <button onClick={() => removeSkill(skill.name)} className="text-slate-400 hover:text-red-500 transition-colors">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                             </div>
                        </div>

                        <div className="flex justify-end">
                            <button 
                                onClick={handleCareerSubmit}
                                disabled={careerForm.processing}
                                className="flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-xl font-bold hover:scale-105 transition-transform disabled:opacity-50 shadow-lg shadow-teal-500/20"
                            >
                                <Save className="w-4 h-4" />
                                Update Karir & Skill
                            </button>
                        </div>
                    </div>
                </section>

                {/* Dangerous Settings */}
                <section className="bg-red-50/50 rounded-3xl border border-red-100 p-8">
                    <div className="flex items-center gap-4 mb-6 text-red-600">
                        <AlertCircle className="w-6 h-6" />
                        <div>
                            <h3 className="font-bold">Zona Bahaya</h3>
                            <p className="text-sm opacity-80">Menghapus akun akan menghilangkan semua data analisis dan progres Anda secara permanen.</p>
                        </div>
                    </div>
                    <button className="px-6 py-3 bg-white border border-red-200 text-red-600 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all">
                        Hapus Akun
                    </button>
                </section>
            </div>
        </AppLayout>
    );
}
