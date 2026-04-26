import React, { useState, useEffect } from 'react';
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
    CheckCircle2,
    Lightbulb,
    Settings,
    Award,
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
        { name: 'Skill Gap Analysis', href: route('analysis'), icon: BarChart3, active: route().current('analysis') },
        { name: 'Dynamic Learning Path', href: route('roadmap'), icon: MapIcon, active: route().current('roadmap') },
        { name: 'Market Intelligent', href: route('market'), icon: TrendingUp, active: route().current('market') },
    ];
    const activeItem = navItems.find((item) => item.active);

    return (
        <div className="min-h-screen bg-[#F3F6FF] flex text-[#1A1A2E]">
            {/* Sidebar Desktop */}
            <aside className={`hidden md:flex flex-col ${isSidebarCollapsed ? 'w-20' : 'w-72'} bg-[#F3F6FF] fixed h-full z-20 border-r border-slate-200 transition-all duration-200`}>
                <div className="p-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#A9C7FF] rounded-xl flex items-center justify-center text-[#2D3A8C] font-bold">CS</div>
                    {!isSidebarCollapsed && <span className="font-semibold text-base">CareerSync</span>}
                    <button
                        type="button"
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className="ml-auto w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-[#2563EB] hover:border-[#2563EB] flex items-center justify-center"
                        aria-label="Toggle sidebar"
                    >
                        {isSidebarCollapsed ? '›' : '‹'}
                    </button>
                </div>

                <div className={`px-6 mt-4 ${isSidebarCollapsed ? 'hidden' : ''}`}>
                    <p className="text-2xl font-bold">Welcome</p>
                    <p className="text-2xl font-bold">
                        Back, <span className="text-[#4F6FE8]">{auth?.user?.name?.split(' ')[0] || 'User'}</span>
                    </p>
                    <p className="text-sm text-slate-400">ready to upgrade your skills?</p>
                </div>

                <nav className={`flex-1 px-6 mt-6 space-y-2 pb-6 ${isSidebarCollapsed ? 'px-3' : ''}`}>
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`w-full ${isSidebarCollapsed ? 'px-0' : 'px-3'} py-2 rounded-full text-[13px] font-semibold inline-flex items-center justify-center border transition-all ${
                                item.active
                                    ? 'bg-[#1E66FF] text-white border-[#1E66FF]'
                                    : 'bg-white text-[#1A1A2E] border-slate-200 hover:border-[#4F6FE8]'
                            }`}
                        >
                            {isSidebarCollapsed ? item.name.charAt(0) : item.name}
                        </Link>
                    ))}
                </nav>

                <div className={`p-6 mt-auto space-y-2 ${isSidebarCollapsed ? 'px-3' : ''}`}>
                    <Link
                        href={route('app.faq')}
                        className={`w-full ${isSidebarCollapsed ? 'px-0' : 'px-3'} py-2 rounded-full text-[13px] font-semibold border border-slate-200 bg-white inline-flex items-center justify-center`}
                    >
                        {isSidebarCollapsed ? '?' : 'FAQ'}
                    </Link>
                    <Link
                        href={route('help')}
                        className={`w-full ${isSidebarCollapsed ? 'px-0' : 'px-3'} py-2 rounded-full text-[13px] font-semibold border border-slate-200 bg-white inline-flex items-center justify-center`}
                    >
                        {isSidebarCollapsed ? 'i' : 'Help'}
                    </Link>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className={`w-full ${isSidebarCollapsed ? 'px-0' : 'px-3'} py-2 rounded-full text-[13px] font-semibold bg-[#2D3A8C] text-white inline-flex items-center justify-center gap-2`}
                    >
                        <LogOut className="w-4 h-4" />
                        {!isSidebarCollapsed && 'Log Out'}
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 flex flex-col ${isSidebarCollapsed ? 'md:pl-20' : 'md:pl-72'} transition-all duration-200`}>
                {/* Header */}
                <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-slate-200 h-16 flex items-center justify-between px-4 md:px-8">
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
                            className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-[#2563EB] hover:bg-blue-100 transition-colors"
                            onClick={() => setOpenPanel(openPanel === 'settings' ? null : 'settings')}
                            aria-label="Settings"
                            type="button"
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                        <button
                            className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-[#2563EB] hover:bg-blue-100 transition-colors"
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
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-300 to-pink-400 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center text-white font-bold text-xs">
                                {auth?.user?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="leading-tight hidden sm:block text-left">
                                <p className="text-[12px] font-bold text-[#1A1A2E]">{auth?.user?.name || 'User'}</p>
                                <p className="text-[10px] text-slate-400">{auth?.user?.email || 'user@email.com'}</p>
                            </div>
                        </button>

                        {openPanel === 'settings' && (
                            <div className="absolute right-40 top-12 w-64 bg-white border border-slate-200 shadow-lg rounded-2xl p-4 z-20">
                                <p className="text-sm font-bold text-[#1A1A2E] mb-3">Settings</p>
                                <div className="space-y-2 text-sm text-slate-600">
                                    <Link href={route('settings.index')} className="block px-3 py-2 rounded-xl hover:bg-slate-50">Akun & Privasi</Link>
                                    <Link href={route('settings.index')} className="block px-3 py-2 rounded-xl hover:bg-slate-50">Preferensi Notifikasi</Link>
                                    <Link href={route('settings.index')} className="block px-3 py-2 rounded-xl hover:bg-slate-50">Bahasa & Tampilan</Link>
                                </div>
                            </div>
                        )}

                        {openPanel === 'notifications' && (
                            <div className="absolute right-24 top-12 w-72 bg-white border border-slate-200 shadow-lg rounded-2xl p-4 z-20">
                                <p className="text-sm font-bold text-[#1A1A2E] mb-3">Notifications</p>
                                <div className="space-y-3">
                                    {notifications && notifications.length > 0 ? (
                                        notifications.map((item: any) => (
                                            <div key={item.id} className="p-3 rounded-xl bg-slate-50">
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
                            <div className="absolute right-0 top-12 w-64 bg-white border border-slate-200 shadow-lg rounded-2xl p-4 z-20">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-300 to-pink-400 flex items-center justify-center text-white font-bold">
                                        {auth?.user?.name?.charAt(0) || 'U'}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#1A1A2E]">{auth?.user?.name || 'User'}</p>
                                        <p className="text-[11px] text-slate-500">{auth?.user?.email || 'user@email.com'}</p>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm text-slate-600">
                                    <Link href={route('profile.details')} className="block px-3 py-2 rounded-xl hover:bg-slate-50">Detail Profil</Link>
                                    <Link href={route('profile.edit')} className="block px-3 py-2 rounded-xl hover:bg-slate-50">Keamanan Akun</Link>
                                    <Link href={route('profile.edit')} className="block px-3 py-2 rounded-xl hover:bg-slate-50">Pengaturan Karier</Link>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                {/* Content */}
                <div className="p-4 md:p-8 max-w-7xl mx-auto w-full relative">
                    {/* Badge Notifications Toast */}
                    {showBadgeToast && (
                        <div className="fixed bottom-8 right-8 z-100 flex flex-col gap-3 max-w-sm animate-in slide-in-from-right duration-500">
                            {activeBadges.map((badge, idx) => (
                                <div key={idx} className="bg-[#2D3A8C] border-2 border-[#4F6FE8] shadow-2xl shadow-[#4F6FE8]/20 p-5 rounded-2xl text-white flex gap-4">
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
                        <div className="mb-6 p-4 bg-[#EAF0FF] border border-[#D9E4FF] text-[#2D3A8C] rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top duration-300">
                            <CheckCircle2 className="w-5 h-5 text-[#4F6FE8]" />
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
                    <div className="absolute inset-0 bg-black/30" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <aside className="absolute left-0 top-0 bottom-0 w-80 bg-[#F3F6FF] text-[#1A1A2E] flex flex-col p-5 animate-in slide-in-from-left duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#A9C7FF] rounded-xl flex items-center justify-center text-[#2D3A8C] font-bold">CS</div>
                                <span className="font-semibold">CareerSync</span>
                            </div>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="mb-6">
                            <p className="text-2xl font-bold">Welcome</p>
                            <p className="text-2xl font-bold">
                                Back, <span className="text-[#4F6FE8]">{auth?.user?.name?.split(' ')[0] || 'User'}</span>
                            </p>
                            <p className="text-sm text-slate-400">ready to upgrade your skills?</p>
                        </div>

                        <nav className="flex-1 space-y-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`w-full px-3 py-2 rounded-full text-[13px] font-semibold inline-flex items-center justify-center border transition-all ${
                                        item.active
                                            ? 'bg-[#1E66FF] text-white border-[#1E66FF]'
                                            : 'bg-white text-[#1A1A2E] border-slate-200 hover:border-[#4F6FE8]'
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        <div className="mt-6 space-y-2">
                            <button className="w-full px-3 py-2 rounded-full text-[13px] font-semibold border border-slate-200 bg-white">FAQ</button>
                            <button className="w-full px-3 py-2 rounded-full text-[13px] font-semibold border border-slate-200 bg-white">Help</button>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="w-full px-3 py-2 rounded-full text-[13px] font-semibold bg-[#2D3A8C] text-white inline-flex items-center justify-center gap-2"
                            >
                                <LogOut className="w-4 h-4" />
                                Log Out
                            </Link>
                        </div>
                    </aside>
                </div>
            )}
        </div>
    );
}
