'use client';

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { Download, Calendar, Filter, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const COLORS = ['#6366f1', '#fbbf24', '#f472b6', '#34d399', '#60a5fa'];

const categoryData = [
    { name: 'Main Course', value: 45 },
    { name: 'Starters', value: 25 },
    { name: 'Drinks', value: 20 },
    { name: 'Desserts', value: 10 },
];

const dailyRevenue = [
    { name: 'Mon', revenue: 4500, orders: 42 },
    { name: 'Tue', revenue: 5200, orders: 48 },
    { name: 'Wed', revenue: 4800, orders: 45 },
    { name: 'Thu', revenue: 6100, orders: 52 },
    { name: 'Fri', revenue: 7500, orders: 68 },
    { name: 'Sat', revenue: 9200, orders: 85 },
    { name: 'Sun', revenue: 8400, orders: 78 },
];

export default function ReportsPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Sales Reports</h2>
                    <p className="text-muted-foreground mt-1">Analyze your restaurant performance.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-xl text-sm font-bold hover:bg-secondary transition-colors">
                        <Calendar size={18} /> Last 30 Days
                    </button>
                    <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95">
                        <Download size={18} /> Export Data
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card p-6 rounded-3xl border border-border">
                    <p className="text-sm text-muted-foreground font-medium">Net Revenue</p>
                    <div className="flex items-end gap-3 mt-2">
                        <h3 className="text-3xl font-bold">{formatCurrency(48500)}</h3>
                        <span className="flex items-center text-xs font-bold text-emerald-500 mb-1.5">
                            <ArrowUpRight size={14} /> +15.5%
                        </span>
                    </div>
                </div>
                <div className="bg-card p-6 rounded-3xl border border-border">
                    <p className="text-sm text-muted-foreground font-medium">Total Orders</p>
                    <div className="flex items-end gap-3 mt-2">
                        <h3 className="text-3xl font-bold">1,284</h3>
                        <span className="flex items-center text-xs font-bold text-emerald-500 mb-1.5">
                            <ArrowUpRight size={14} /> +8.2%
                        </span>
                    </div>
                </div>
                <div className="bg-card p-6 rounded-3xl border border-border">
                    <p className="text-sm text-muted-foreground font-medium">Avg. Table Turnaround</p>
                    <div className="flex items-end gap-3 mt-2">
                        <h3 className="text-3xl font-bold">45 min</h3>
                        <span className="flex items-center text-xs font-bold text-red-500 mb-1.5">
                            <ArrowDownRight size={14} /> -2.5%
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Full Revenue Chart */}
                <div className="lg:col-span-2 bg-card p-8 rounded-[2.5rem] border border-border">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold text-xl">Revenue vs Orders</h3>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-primary" />
                                <span className="text-xs font-bold text-muted-foreground">Revenue</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-amber-400" />
                                <span className="text-xs font-bold text-muted-foreground">Orders</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dailyRevenue}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: '#f1f5f9' }}
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="revenue" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={32} />
                                <Bar dataKey="orders" fill="#fbbf24" radius={[6, 6, 0, 0]} barSize={12} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sales by Category */}
                <div className="bg-card p-8 rounded-[2.5rem] border border-border">
                    <h3 className="font-bold text-xl mb-8">Sales by Category</h3>
                    <div className="h-[250px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-2xl font-bold">100%</span>
                            <span className="text-xs text-muted-foreground font-bold">Total Sales</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        {categoryData.map((cat, i) => (
                            <div key={cat.name} className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                <span className="text-xs font-bold whitespace-nowrap">{cat.name}</span>
                                <span className="text-xs font-medium text-muted-foreground ml-auto">{cat.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
