'use client';

import {
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { formatCurrency } from '@/lib/utils';

const stats = [
  { label: 'Total Revenue', value: 125430, icon: DollarSign, trend: '+12.5%', color: 'blue' },
  { label: 'Total Orders', value: 456, icon: ShoppingBag, trend: '+8.2%', color: 'purple' },
  { label: 'New Customers', value: 124, icon: Users, trend: '+5.4%', color: 'orange' },
  { label: 'Avg Order Value', value: 275, icon: TrendingUp, trend: '+2.1%', color: 'emerald' },
];

const revenueData = [
  { name: 'Mon', revenue: 4500 },
  { name: 'Tue', revenue: 5200 },
  { name: 'Wed', revenue: 4800 },
  { name: 'Thu', revenue: 6100 },
  { name: 'Fri', revenue: 7500 },
  { name: 'Sat', revenue: 9200 },
  { name: 'Sun', revenue: 8400 },
];

const topItems = [
  { name: 'Classic Burger', orders: 120, revenue: 18000 },
  { name: 'Pasta Carbonara', orders: 95, revenue: 23750 },
  { name: 'Margherita Pizza', orders: 88, revenue: 17600 },
  { name: 'Iced Coffee', orders: 75, revenue: 7500 },
  { name: 'Chocolate Lava Cake', orders: 62, revenue: 9300 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-muted-foreground mt-1">Welcome back, here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-500`}>
                <stat.icon size={24} />
              </div>
              <span className="text-sm font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                {stat.trend}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold mt-1">
                {stat.label.includes('Revenue') || stat.label.includes('Value')
                  ? formatCurrency(stat.value)
                  : stat.value.toLocaleString()}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">Revenue Analytics</h3>
            <select className="bg-secondary text-sm px-3 py-1 rounded-lg border-none focus:ring-2 focus:ring-primary outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  cursor={{ stroke: '#6366f1', strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Items */}
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="font-bold text-lg mb-6">Popular Dishes</h3>
          <div className="space-y-6">
            {topItems.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.orders} orders</p>
                  </div>
                </div>
                <span className="font-bold text-sm">{formatCurrency(item.revenue)}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors">
            View All Items
          </button>
        </div>
      </div>
    </div>
  );
}
