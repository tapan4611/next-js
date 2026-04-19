'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    ShoppingCart,
    Utensils,
    Table2,
    Settings,
    BarChart3,
    Moon,
    Sun,
    LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: ShoppingCart, label: 'POS', href: '/pos' },
    { icon: Table2, label: 'Tables', href: '/tables' },
    { icon: BarChart3, label: 'Reports', href: '/reports' },
    { icon: Utensils, label: 'Menu', href: '/menu' },
    { icon: Settings, label: 'Settings', href: '/settings' },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, [isDarkMode]);

    return (
        <div className="flex flex-col h-screen w-64 border-r border-border bg-card text-foreground">
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl">
                    R
                </div>
                <div>
                    <h1 className="font-bold text-lg leading-none">RestoPOS</h1>
                    <p className="text-xs text-muted-foreground mt-1">Managed by Admin</p>
                </div>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                            pathname === item.href
                                ? "bg-primary text-white shadow-lg shadow-primary/20"
                                : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <item.icon size={20} className={cn(
                            "transition-transform group-hover:scale-110",
                            pathname === item.href ? "text-white" : ""
                        )} />
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-border space-y-2">
                <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    <span className="font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
}
