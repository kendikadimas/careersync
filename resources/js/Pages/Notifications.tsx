import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

interface NotificationItem {
    id: number;
    title: string;
    body?: string | null;
    type: string;
    action_url?: string | null;
    read_at?: string | null;
}

interface NotificationsProps {
    notifications: NotificationItem[];
}

export default function Notifications({ notifications }: NotificationsProps) {
    return (
        <AppLayout header="Notifications">
            <Head title="Notifications | CareerSync" />

            <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">Daftar Notifikasi</h3>
                    <div className="space-y-3">
                        {notifications.length === 0 && (
                            <p className="text-sm text-slate-500">Belum ada notifikasi.</p>
                        )}
                        {notifications.map((item) => (
                            <div key={item.id} className="border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-[#1A1A2E]">{item.title}</p>
                                    <p className="text-xs text-slate-500">{item.body || 'Tidak ada pesan'}</p>
                                    <p className="text-xs text-slate-400 mt-1">Tipe: {item.type} · {item.read_at ? 'Sudah dibaca' : 'Belum dibaca'}</p>
                                </div>
                                <div className="flex gap-2">
                                    {!item.read_at && (
                                        <Link
                                            href={route('notifications.read', item.id)}
                                            method="patch"
                                            as="button"
                                            className="px-3 py-1.5 rounded-full text-xs font-semibold border border-slate-200"
                                        >
                                            Tandai Dibaca
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
