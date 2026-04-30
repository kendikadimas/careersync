import AppLayout from '@/Layouts/AppLayout';

const helpSections = [
    {
        title: 'Kontak Cepat',
        description: 'Hubungi tim kami untuk bantuan teknis atau pertanyaan akun.',
        items: [
            { label: 'Email', value: 'hello@kembangin.id' },
            { label: 'WhatsApp', value: '+62 812-3456-7890' },
        ],
    },
    {
        title: 'Panduan Penggunaan',
        description: 'Langkah cepat agar analisis CV kamu berjalan lancar.',
        items: [
            { label: 'Format CV', value: 'PDF / DOCX / TXT' },
            { label: 'Ukuran file', value: 'Maksimum 5 MB' },
            { label: 'Tips', value: 'Gunakan format yang jelas dan terbaru' },
        ],
    },
    {
        title: 'Jam Layanan',
        description: 'Kami aktif di hari kerja untuk membantu kamu.',
        items: [
            { label: 'Senin - Jumat', value: '09:00 - 18:00 WIB' },
            { label: 'Sabtu', value: '10:00 - 14:00 WIB' },
        ],
    },
];

export default function Help() {
    return (
        <AppLayout header="Help">
            <div className="pt-4 pb-12 px-4">
                <div className="max-w-4xl mx-auto text-center mb-10">
                    <p className="text-xs font-black text-[#2563EB] uppercase tracking-[0.2em] mb-3">Help Center</p>
                    <h1 className="text-3xl font-black text-gray-900 mb-4">Butuh Bantuan?</h1>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">
                        Kami siap membantu kamu secepat mungkin. Pilih topik bantuan di bawah ini.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
                    {helpSections.map((section) => (
                        <div key={section.title} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                            <h2 className="text-lg font-black text-gray-900 mb-2">{section.title}</h2>
                            <p className="text-sm text-slate-500 mb-4">{section.description}</p>
                            <div className="space-y-2 text-sm">
                                {section.items.map((item) => (
                                    <div key={item.label} className="flex justify-between gap-3">
                                        <span className="text-slate-400">{item.label}</span>
                                        <span className="font-semibold text-gray-900 text-right">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
