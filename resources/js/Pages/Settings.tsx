import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';

interface SettingsProps {
    settings: {
        email_notifications: boolean;
        product_updates: boolean;
        weekly_summary: boolean;
        language: string;
        timezone: string;
    };
}

export default function Settings({ settings }: SettingsProps) {
    const { data, setData, put, processing } = useForm({
        email_notifications: settings.email_notifications ?? true,
        product_updates: settings.product_updates ?? true,
        weekly_summary: settings.weekly_summary ?? true,
        language: settings.language ?? 'id',
        timezone: settings.timezone ?? 'Asia/Jakarta',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('settings.update'));
    };

    return (
        <AppLayout header="Settings">
            <Head title="Settings | Kembangin" />

            <div className="max-w-3xl mx-auto">
                <form onSubmit={submit} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
                    <div>
                        <h2 className="text-lg font-bold text-[#1A1A2E]">Preferensi Notifikasi</h2>
                        <p className="text-sm text-slate-500">Atur notifikasi yang ingin kamu terima.</p>
                    </div>

                    <div className="space-y-3">
                        <label className="flex items-center justify-between gap-4">
                            <span className="text-sm font-semibold text-[#1A1A2E]">Email Notifications</span>
                            <input
                                type="checkbox"
                                checked={data.email_notifications}
                                onChange={(e) => setData('email_notifications', e.target.checked)}
                                className="h-5 w-5 accent-blue-600"
                            />
                        </label>
                        <label className="flex items-center justify-between gap-4">
                            <span className="text-sm font-semibold text-[#1A1A2E]">Product Updates</span>
                            <input
                                type="checkbox"
                                checked={data.product_updates}
                                onChange={(e) => setData('product_updates', e.target.checked)}
                                className="h-5 w-5 accent-blue-600"
                            />
                        </label>
                        <label className="flex items-center justify-between gap-4">
                            <span className="text-sm font-semibold text-[#1A1A2E]">Weekly Summary</span>
                            <input
                                type="checkbox"
                                checked={data.weekly_summary}
                                onChange={(e) => setData('weekly_summary', e.target.checked)}
                                className="h-5 w-5 accent-blue-600"
                            />
                        </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label className="text-sm font-semibold text-[#1A1A2E]">
                            Language
                            <select
                                value={data.language}
                                onChange={(e) => setData('language', e.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                            >
                                <option value="id">Bahasa Indonesia</option>
                                <option value="en">English</option>
                            </select>
                        </label>
                        <label className="text-sm font-semibold text-[#1A1A2E]">
                            Timezone
                            <select
                                value={data.timezone}
                                onChange={(e) => setData('timezone', e.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                            >
                                <option value="Asia/Jakarta">Asia/Jakarta</option>
                                <option value="Asia/Makassar">Asia/Makassar</option>
                                <option value="Asia/Jayapura">Asia/Jayapura</option>
                            </select>
                        </label>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-indigo-900 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-indigo-900 transition-colors"
                        >
                            Simpan Settings
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}


