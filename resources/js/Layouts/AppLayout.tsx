import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    BarChart3, 
    Map as MapIcon, 
    TrendingUp, 
    LogOut, 
    Menu, 
    X, 
    Bell,
    CheckCircle2,
    Settings,
    ChevronDown,
    CircleHelp,
    Trophy,
    Briefcase,
    Stethoscope
} from 'lucide-react';

interface Props {
    children: React.ReactNode;
    header?: React.ReactNode;
}

export default function AppLayout({ children, header }: Props) {
    const { auth, flash, notifications } = usePage<any>().props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showBadgeToast, setShowBadgeToast] = useState(false);
    const [activeBadges, setActiveBadges] = useState<any[]>([]);
    const [openPanel, setOpenPanel] = useState<'settings' | 'notifications' | 'profile' | null>(null);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    useEffect(() => {
        if (flash.new_badges && flash.new_badges.length > 0) {
            setActiveBadges(flash.new_badges);
            setShowBadgeToast(true);
            const timer = setTimeout(() => setShowBadgeToast(false), 8000);
            return () => clearTimeout(timer);
        }
    }, [flash.new_badges]);

    const navItems = [
        { name: 'Dashboard', href: route('dashboard'), icon: LayoutDashboard, active: route().current('dashboard') },
        { name: 'Diagnostic Assessment', href: route('analysis'), icon: Stethoscope, active: route().current('analysis') },
        { name: 'Learning Path & PBL', href: route('roadmap'), icon: MapIcon, active: route().current('roadmap') },
        { name: 'Market Intelligence', href: route('market'), icon: TrendingUp, active: route().current('market') },
        { name: 'Leaderboard', href: route('leaderboard'), icon: Trophy, active: route().current('leaderboard') },
        { name: 'My Portfolio', href: route('portfolio.index'), icon: Briefcase, active: route().current('portfolio.index') },
    ];
    const activeItem = navItems.find((item) => item.active);

    return (
        <div className="min-h-screen bg-[#F3F6FF] flex text-[#1A1A2E] font-(--font-heading) max-w-full overflow-x-hidden">
            {/* Sidebar Desktop */}
            <aside className={`hidden md:flex flex-col ${isSidebarCollapsed ? 'w-20' : 'w-64'} bg-indigo-950 fixed h-full z-20 border-r border-white/5 transition-all duration-200 shadow-2xl`}>
                <div className="p-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">CS</div>
                    {!isSidebarCollapsed && <span className="font-bold text-lg text-white tracking-tight">CareerSync</span>}
                    <button
                        type="button"
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className="ml-auto w-8 h-8 rounded-full bg-white/10 border border-white/10 text-white/50 hover:text-white hover:border-white/30 flex items-center justify-center transition-all"
                        aria-label="Toggle sidebar"
                    >
                        {isSidebarCollapsed ? '›' : '‹'}
                    </button>
                </div>

                <div className={`px-6 mt-10 ${isSidebarCollapsed ? 'hidden' : ''}`}>
                    <p className="text-2xl font-bold text-white leading-tight">Welcome</p>
                    <p className="text-2xl font-bold text-white leading-tight">
                        Back, <span className="text-indigo-400">{auth?.user?.name?.split(' ')[0] || 'User'}</span>
                    </p>
                    <p className="text-sm text-indigo-200/40 mt-1">Ready to upgrade your skills?</p>
                </div>

                <div className={`px-4 mt-8 flex-1 flex flex-col ${isSidebarCollapsed ? 'px-2' : ''}`}>
                    <nav className="bg-white/5 backdrop-blur-md rounded-lg p-2.5 space-y-3 border border-white/5">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`w-full h-11 ${isSidebarCollapsed ? 'px-0 justify-center' : 'px-4 justify-between'} rounded-lg text-[13px] font-black inline-flex items-center transition-all ${
                                    item.active
                                        ? 'bg-white text-indigo-950 shadow-lg shadow-indigo-950/20'
                                        : 'text-indigo-100/60 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <span className={`inline-flex items-center ${isSidebarCollapsed ? '' : 'gap-3'}`}>
                                    <item.icon className={`w-4 h-4 ${item.active ? 'text-indigo-600' : 'text-indigo-300/50'}`} />
                                    {!isSidebarCollapsed && <span>{item.name}</span>}
                                </span>
                                {!isSidebarCollapsed && item.active && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 shadow-sm" />
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className={`p-4 mt-auto border-t border-white/5 ${isSidebarCollapsed ? 'px-2' : ''}`}>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className={`w-full h-11 ${isSidebarCollapsed ? 'px-0 justify-center' : 'px-4 justify-start'} rounded-lg text-[13px] font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 inline-flex items-center ${isSidebarCollapsed ? '' : 'gap-3'} transition-all`}
                    >
                        <LogOut className="w-4 h-4" />
                        {!isSidebarCollapsed && 'Sign Out'}
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 flex flex-col ${isSidebarCollapsed ? 'md:pl-20' : 'md:pl-64'} transition-all duration-200 min-w-0 max-w-full overflow-x-hidden`}>
                {/* Header */}
                <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-slate-200 h-16 flex items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-3">
                        <button
                            className="md:hidden p-2 text-[#2D3A8C]"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-500">
                            <Link href={route('dashboard')} className="hover:text-[#1A1A2E]">
                                Dashboard
                            </Link>
                            <span className="text-slate-300">/</span>
                            {activeItem && activeItem.name !== 'Dashboard' ? (
                                <Link href={activeItem.href} className="text-[#1A1A2E] hover:underline">
                                    {header || activeItem.name}
                                </Link>
                            ) : (
                                <span className="text-[#1A1A2E]">{header || 'Dashboard'}</span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 relative">
                        <button
                            className="w-9 h-9 rounded-full bg-indigo-900 flex items-center justify-center text-white hover:bg-indigo-800 transition-colors"
                            onClick={() => setOpenPanel(openPanel === 'settings' ? null : 'settings')}
                            aria-label="Settings"
                            type="button"
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                        <button
                            className="w-9 h-9 rounded-full bg-indigo-900 flex items-center justify-center text-white hover:bg-indigo-800 transition-colors"
                            onClick={() => setOpenPanel(openPanel === 'notifications' ? null : 'notifications')}
                            aria-label="Notifications"
                            type="button"
                        >
                            <Bell className="w-4 h-4" />
                        </button>

                        <button
                            className="flex items-center gap-2"
                            onClick={() => setOpenPanel(openPanel === 'profile' ? null : 'profile')}
                            type="button"
                        >
                            <div className="w-9 h-9 rounded-full bg-linear-to-br from-orange-300 to-pink-400 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center text-white font-bold text-xs">
                                {auth?.user?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="leading-tight hidden sm:block text-left">
                                <p className="text-[12px] font-bold text-[#1A1A2E]">{auth?.user?.name || 'User'}</p>
                                <p className="text-[10px] text-slate-400">{auth?.user?.email || 'user@email.com'}</p>
                            </div>
                        </button>

                        {openPanel === 'settings' && (
                            <div className="absolute right-40 top-12 w-64 bg-white border border-slate-200 shadow-lg rounded-lg p-4 z-20">
                                <p className="text-sm font-bold text-[#1A1A2E] mb-3">Settings</p>
                                <div className="space-y-2 text-sm text-slate-600">
                                    <Link href={route('settings.index')} className="block px-3 py-2 rounded-lg hover:bg-slate-50">Akun & Privasi</Link>
                                    <Link href={route('settings.index')} className="block px-3 py-2 rounded-lg hover:bg-slate-50">Preferensi Notifikasi</Link>
                                    <Link href={route('settings.index')} className="block px-3 py-2 rounded-lg hover:bg-slate-50">Bahasa & Tampilan</Link>
                                </div>
                            </div>
                        )}

                        {openPanel === 'notifications' && (
                            <div className="absolute right-24 top-12 w-72 bg-white border border-slate-200 shadow-lg rounded-lg p-4 z-20">
                                <p className="text-sm font-bold text-[#1A1A2E] mb-3">Notifications</p>
                                <div className="space-y-3">
                                    {notifications && notifications.length > 0 ? (
                                        notifications.map((item: any) => (
                                            <div key={item.id} className="p-3 rounded-lg bg-slate-50">
                                                <p className="text-[12px] font-semibold text-[#1A1A2E]">{item.title}</p>
                                                <p className="text-[11px] text-slate-500">{item.body || 'Tidak ada detail'}</p>
                                                <div className="flex items-center justify-between mt-2">
                                                    <span className="text-[10px] text-slate-400">{item.read_at ? 'Sudah dibaca' : 'Belum dibaca'}</span>
                                                    {!item.read_at && (
                                                        <Link
                                                            href={route('notifications.read', item.id)}
                                                            method="patch"
                                                            as="button"
                                                            className="text-[10px] font-semibold text-[#2563EB]"
                                                        >
                                                            Tandai
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-[12px] text-slate-500">Belum ada notifikasi.</p>
                                    )}
                                </div>
                                <div className="pt-3">
                                    <Link href={route('notifications.index')} className="text-[12px] font-semibold text-[#2563EB]">Lihat semua</Link>
                                </div>
                            </div>
                        )}

                        {openPanel === 'profile' && (
                            <div className="absolute right-0 top-12 w-64 bg-white border border-slate-200 shadow-lg rounded-lg p-4 z-20">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-300 to-pink-400 flex items-center justify-center text-white font-bold">
                                        {auth?.user?.name?.charAt(0) || 'U'}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#1A1A2E]">{auth?.user?.name || 'User'}</p>
                                        <p className="text-[11px] text-slate-500">{auth?.user?.email || 'user@email.com'}</p>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm text-slate-600">
                                    <Link href={route('profile.details')} className="block px-3 py-2 rounded-lg hover:bg-slate-50">Detail Profil</Link>
                                    <Link href={route('profile.edit')} className="block px-3 py-2 rounded-lg hover:bg-slate-50">Keamanan Akun</Link>
                                    <Link href={route('profile.edit')} className="block px-3 py-2 rounded-lg hover:bg-slate-50">Pengaturan Karier</Link>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                {/* Content */}
                <div className="p-3 md:p-6 w-full relative">
                    {/* Badge Notifications Toast */}
                    {showBadgeToast && (
                        <div className="fixed bottom-8 right-8 z-100 flex flex-col gap-3 max-w-sm animate-in slide-in-from-right duration-500">
                            {activeBadges.map((badge, idx) => (
                                <div key={idx} className="bg-[#2D3A8C] border-2 border-[#4F6FE8] shadow-2xl shadow-[#4F6FE8]/20 p-5 rounded-lg text-white flex gap-4">
                                    <div className="text-4xl animate-bounce">{badge.emoji}</div>
                                    <div>
                                        <h4 className="font-black text-[#A9C7FF] uppercase tracking-widest text-xs mb-1">New Badge Earned!</h4>
                                        <p className="font-bold text-lg leading-tight">{badge.name}</p>
                                        <p className="text-sm text-white/70 mt-1">{badge.description}</p>
                                    </div>
                                    <button onClick={() => setShowBadgeToast(false)} className="absolute top-3 right-3 text-white/40 hover:text-white">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {flash.success && (
                        <div className="mb-6 p-4 bg-[#EAF0FF] border border-[#D9E4FF] text-[#2D3A8C] rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top duration-300">
                            <CheckCircle2 className="w-5 h-5 text-indigo-900" />
                            <p className="text-sm font-medium">{flash.success}</p>
                        </div>
                    )}
                    {flash.error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-3">
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
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <aside className="absolute left-0 top-0 bottom-0 w-80 bg-indigo-950 text-white flex flex-col p-5 animate-in slide-in-from-left duration-300">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">CS</div>
                                <span className="font-bold text-lg tracking-tight">CareerSync</span>
                            </div>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white/50 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="mb-10">
                            <p className="text-2xl font-bold text-white leading-tight">Welcome</p>
                            <p className="text-2xl font-bold text-white leading-tight">
                                Back, <span className="text-indigo-400">{auth?.user?.name?.split(' ')[0] || 'User'}</span>
                            </p>
                            <p className="text-sm text-indigo-200/40 mt-1">Ready to upgrade your skills?</p>
                        </div>

                        <nav className="flex-1 space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`w-full h-11 px-4 rounded-lg text-[13px] font-bold inline-flex items-center justify-between transition-all ${
                                        item.active
                                            ? 'bg-white/10 text-white border-l-2 border-indigo-400'
                                            : 'text-indigo-200/50 hover:bg-white/5 hover:text-white'
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <span className="inline-flex items-center gap-3">
                                        <item.icon className={`w-4 h-4 ${item.active ? 'text-indigo-400' : ''}`} />
                                        {item.name}
                                    </span>
                                    {item.active && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-sm shadow-indigo-400/50" />}
                                </Link>
                            ))}
                        </nav>

                        <div className="mt-auto pt-6 border-t border-white/5">
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="w-full h-11 px-4 rounded-lg text-[13px] font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 inline-flex items-center gap-3 transition-all"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </Link>
                        </div>
                    </aside>
                </div>
            )}
        </div>
    );
}


