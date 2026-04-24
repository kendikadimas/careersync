import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    BarChart3, 
    Map as MapIcon, 
    TrendingUp, 
    User, 
    LogOut, 
    Menu, 
    X, 
    Bell,
    CheckCircle2
} from 'lucide-react';

interface Props {
    children: React.ReactNode;
    header?: React.ReactNode;
}

export default function AppLayout({ children, header }: Props) {
    const { auth, flash } = usePage<any>().props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigation = [
        { name: 'Dashboard', href: route('dashboard'), icon: LayoutDashboard, active: route().current('dashboard') },
        { name: 'Analisis Skill', href: route('analysis'), icon: BarChart3, active: route().current('analysis') },
        { name: 'Learning Roadmap', href: route('roadmap'), icon: MapIcon, active: route().current('roadmap') },
        { name: 'Market Intel', href: route('market'), icon: TrendingUp, active: route().current('market') },
        { name: 'Profil Saya', href: route('profile.edit'), icon: User, active: route().current('profile.edit') },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar Desktop */}
            <aside className="hidden md:flex flex-col w-64 bg-navy-900 text-white fixed h-full z-20">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                        <TrendingUp className="text-white w-6 h-6" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">CareerSync</span>
                </div>

                <nav className="flex-1 px-4 mt-6 space-y-2">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                item.active 
                                ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20' 
                                : 'text-navy-100 hover:bg-navy-800 hover:text-white'
                            }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium text-sm">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 mt-auto border-t border-navy-800">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-navy-800/50 mb-4">
                        <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center">
                            <User className="w-6 h-6 text-navy-300" />
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-medium text-sm truncate">{auth?.user?.name || 'Guest'}</p>
                            <p className="text-xs text-navy-400 truncate">{auth?.user?.email || ''}</p>
                        </div>
                    </div>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-navy-300 hover:bg-red-500/10 hover:text-red-400 transition-colors w-full text-left"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium text-sm">Keluar</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col md:pl-64">
                {/* Header */}
                <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center justify-between px-4 md:px-8">
                    <div className="flex items-center gap-4">
                        <button 
                            className="md:hidden p-2 text-navy-600"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="font-bold text-lg text-navy-900 max-md:hidden">
                            {header || navigation.find(n => n.active)?.name || 'Career-Sync'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-navy-600 transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                    </div>
                </header>

                {/* Content */}
                <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
                    {flash.success && (
                        <div className="mb-6 p-4 bg-teal-50 border border-teal-200 text-teal-700 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top duration-300">
                            <CheckCircle2 className="w-5 h-5 text-teal-500" />
                            <p className="text-sm font-medium">{flash.success}</p>
                        </div>
                    )}
                    {flash.error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
                            <X className="w-5 h-5 text-red-500" />
                            <p className="text-sm font-medium">{flash.error}</p>
                        </div>
                    )}
                    {children}
                </div>
            </main>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <aside className="absolute left-0 top-0 bottom-0 w-72 bg-navy-900 text-white flex flex-col p-4 animate-in slide-in-from-left duration-300">
                        <div className="flex items-center justify-between mb-8 px-2">
                             <div className="flex items-center gap-3">
                                <TrendingUp className="text-teal-400 w-6 h-6" />
                                <span className="font-bold text-xl">CareerSync</span>
                            </div>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <nav className="flex-1 space-y-2">
                             {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${
                                        item.active ? 'bg-teal-500 text-white' : 'text-navy-100'
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </aside>
                </div>
            )}
        </div>
    );
}
