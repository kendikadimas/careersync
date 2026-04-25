import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { UserPlus, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar Akun" />

            <div className="mb-8">
                <h2 className="text-3xl font-black text-navy-900 mb-2">Mulai Akselerasi 🚀</h2>
                <p className="text-slate-500 font-medium tracking-tight">Buat profilmu dan dapatkan kurikulum belajarmu hari ini.</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label htmlFor="name" className="block text-sm font-bold text-navy-900 mb-2">Nama Lengkap</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <User className="w-5 h-5" />
                        </div>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="bg-slate-50 border border-slate-200 text-navy-900 text-sm rounded-xl focus:ring-teal-500 focus:border-teal-500 block w-full pl-11 p-3.5 transition-colors"
                            autoComplete="name"
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Dimas Kendika"
                            required
                        />
                    </div>
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-bold text-navy-900 mb-2">Alamat Email</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <Mail className="w-5 h-5" />
                        </div>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="bg-slate-50 border border-slate-200 text-navy-900 text-sm rounded-xl focus:ring-teal-500 focus:border-teal-500 block w-full pl-11 p-3.5 transition-colors"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="nama@email.com"
                            required
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="password" className="block text-sm font-bold text-navy-900 mb-2">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="bg-slate-50 border border-slate-200 text-navy-900 text-sm rounded-xl focus:ring-teal-500 focus:border-teal-500 block w-full pl-11 p-3.5 transition-colors"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div>
                        <label htmlFor="password_confirmation" className="block text-sm font-bold text-navy-900 mb-2">Ulangi Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="bg-slate-50 border border-slate-200 text-navy-900 text-sm rounded-xl focus:ring-teal-500 focus:border-teal-500 block w-full pl-11 p-3.5 transition-colors"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>
                </div>

                <div className="pt-4">
                    <button 
                        disabled={processing}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-teal-500 text-white rounded-xl font-black shadow-lg shadow-teal-500/20 hover:bg-teal-400 hover:shadow-xl hover:shadow-teal-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        <UserPlus className="w-5 h-5" />
                        Buat Akun Sekarang
                        <ArrowRight className="w-5 h-5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    </button>
                </div>

                <p className="text-center text-sm font-medium text-slate-500 pt-2">
                    Sudah punya akun?{' '}
                    <Link href={route('login')} className="font-bold text-navy-900 hover:text-teal-600 hover:underline underline-offset-4 transition-all">
                        Masuk ke Dashboard
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
