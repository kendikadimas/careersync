import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';

interface ProfileDetailProps {
    profile: {
        headline?: string | null;
        bio?: string | null;
        location?: string | null;
        phone?: string | null;
        linkedin?: string | null;
        github?: string | null;
    };
}

export default function ProfileDetail({ profile }: ProfileDetailProps) {
    const { data, setData, put, processing } = useForm({
        headline: profile.headline ?? '',
        bio: profile.bio ?? '',
        location: profile.location ?? '',
        phone: profile.phone ?? '',
        linkedin: profile.linkedin ?? '',
        github: profile.github ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('profile.details.update'));
    };

    return (
        <AppLayout header="Profile Detail">
            <Head title="Profile Detail | CareerSync" />

            <div className="max-w-3xl mx-auto">
                <form onSubmit={submit} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
                    <div>
                        <h2 className="text-lg font-bold text-[#1A1A2E]">Detail Profil</h2>
                        <p className="text-sm text-slate-500">Lengkapi informasi profilmu.</p>
                    </div>

                    <label className="text-sm font-semibold text-[#1A1A2E]">
                        Headline
                        <input
                            value={data.headline}
                            onChange={(e) => setData('headline', e.target.value)}
                            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                            placeholder="Frontend Engineer"
                        />
                    </label>

                    <label className="text-sm font-semibold text-[#1A1A2E]">
                        Bio
                        <textarea
                            value={data.bio}
                            onChange={(e) => setData('bio', e.target.value)}
                            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm min-h-[120px]"
                        />
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label className="text-sm font-semibold text-[#1A1A2E]">
                            Lokasi
                            <input
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                                placeholder="Jakarta"
                            />
                        </label>
                        <label className="text-sm font-semibold text-[#1A1A2E]">
                            Telepon
                            <input
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                                placeholder="08xxxxxxxxxx"
                            />
                        </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label className="text-sm font-semibold text-[#1A1A2E]">
                            LinkedIn
                            <input
                                value={data.linkedin}
                                onChange={(e) => setData('linkedin', e.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                                placeholder="https://linkedin.com/in/..."
                            />
                        </label>
                        <label className="text-sm font-semibold text-[#1A1A2E]">
                            GitHub
                            <input
                                value={data.github}
                                onChange={(e) => setData('github', e.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                                placeholder="https://github.com/..."
                            />
                        </label>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#2563EB] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-blue-700 transition-colors"
                        >
                            Simpan Profil
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
