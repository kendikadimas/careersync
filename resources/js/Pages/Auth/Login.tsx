import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk Akun" />

            {status && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-sm font-bold text-emerald-600 rounded-xl">
                    {status}
                </div>
            )}

            <div className="mb-8">
                <h2 className="text-3xl font-black text-slate-950 mb-2 tracking-tight">Selamat Datang</h2>
                <p className="text-slate-500 font-medium tracking-tight">Masuk untuk melanjutkan kemajuan karier Anda.</p>
            </div>

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-[13px] font-bold text-slate-700 mb-2 uppercase tracking-wider">Alamat Email</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <Mail className="w-5 h-5" />
                        </div>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-primary focus:border-primary block w-full pl-11 p-4 transition-all focus:bg-white shadow-sm"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="nama@email.com"
                            required
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <label htmlFor="password" className="block text-[13px] font-bold text-slate-700 mb-2 uppercase tracking-wider">Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <Lock className="w-5 h-5" />
                        </div>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-primary focus:border-primary block w-full pl-11 p-4 transition-all focus:bg-white shadow-sm"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer group">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-slate-300 text-primary focus:ring-primary w-5 h-5"
                        />
                        <span className="ms-3 text-sm font-bold text-slate-600 group-hover:text-primary transition-colors">
                            Ingat sesi saya
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm font-bold text-primary hover:text-primary-dark underline-offset-4 hover:underline transition-all"
                        >
                            Lupa Password?
                        </Link>
                    )}
                </div>

                <div className="pt-2">
                    <button 
                        disabled={processing}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        <LogIn className="w-5 h-5" />
                        Masuk Sekarang
                        <ArrowRight className="w-5 h-5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    </button>
                </div>
                
                <p className="text-center text-sm font-medium text-slate-500 pt-4">
                    Belum punya akun?{' '}
                    <Link href={route('register')} className="font-bold text-primary hover:text-primary-dark hover:underline underline-offset-4 transition-all">
                        Daftar Gratis
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
