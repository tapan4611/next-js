'use client';

import {
    User,
    Store,
    Bell,
    Shield,
    Globe,
    Printer,
    CreditCard,
    ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sections = [
    {
        title: 'General',
        items: [
            { icon: Store, label: 'Restaurant Information', desc: 'Name, address, contact details' },
            { icon: Globe, label: 'Language & Region', desc: 'English, Currency (INR)' },
            { icon: Printer, label: 'Printer Settings', desc: 'Connect thermal printers' },
        ]
    },
    {
        title: 'Personal',
        items: [
            { icon: User, label: 'Profile Settings', desc: 'Update your personal info' },
            { icon: Bell, label: 'Notifications', desc: 'App alerts and sounds' },
        ]
    },
    {
        title: 'Payments & Security',
        items: [
            { icon: CreditCard, label: 'Payment Methods', desc: 'Cash, Card, UPI, Wallets' },
            { icon: Shield, label: 'Security & Privacy', desc: 'Change password, two-factor auth' },
        ]
    }
];

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground mt-1">Manage your system preferences and account.</p>
            </div>

            <div className="space-y-8">
                {sections.map((section) => (
                    <div key={section.title} className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground px-4">
                            {section.title}
                        </h3>
                        <div className="bg-card border border-border rounded-3xl overflow-hidden divide-y divide-border shadow-sm">
                            {section.items.map((item) => (
                                <button
                                    key={item.label}
                                    className="w-full flex items-center justify-between p-6 hover:bg-secondary/50 transition-colors text-left"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">{item.label}</h4>
                                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-muted-foreground" />
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-8">
                <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8 flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-lg text-red-500">Reset System</h4>
                        <p className="text-sm text-red-500/70">Wipe all data and restore to factory settings.</p>
                    </div>
                    <button className="px-6 py-3 bg-red-500 text-white rounded-xl font-bold shadow-lg shadow-red-500/20 hover:scale-[1.02] transition-transform active:scale-95">
                        Reset Now
                    </button>
                </div>
            </div>
        </div>
    );
}
