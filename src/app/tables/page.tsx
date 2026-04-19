'use client';

import { useTableStore } from '@/store/useTableStore';
import { TableStatus } from '@/types';
import { cn } from '@/lib/utils';
import { Users, CheckCircle2, AlarmClock, Ban, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';

const statusIcons = {
    Available: CheckCircle2,
    Occupied: AlarmClock,
    Reserved: Ban,
};

const statusColors = {
    Available: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    Occupied: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    Reserved: 'bg-red-500/10 text-red-500 border-red-500/20',
};

export default function TablesPage() {
    const { tables, updateTableStatus } = useTableStore();

    const handleTableClick = (tableId: string, currentStatus: TableStatus) => {
        let nextStatus: TableStatus = 'Available';
        if (currentStatus === 'Available') nextStatus = 'Occupied';
        else if (currentStatus === 'Occupied') nextStatus = 'Reserved';
        else nextStatus = 'Available';

        updateTableStatus(tableId, nextStatus);
        toast.success(`Table updated to ${nextStatus}`);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Table Management</h2>
                    <p className="text-muted-foreground mt-1">Manage restaurant seating and availability.</p>
                </div>
                <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold transition-transform active:scale-95 shadow-lg shadow-primary/20">
                    <Plus size={20} />
                    Add Table
                </button>
            </div>

            <div className="flex gap-4 p-4 bg-card border border-border rounded-2xl">
                <div className="flex items-center gap-2 text-sm font-medium">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span>Available: {tables.filter(t => t.status === 'Available').length}</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground px-4 border-l border-border">
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <span>Occupied: {tables.filter(t => t.status === 'Occupied').length}</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground px-4 border-l border-border">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span>Reserved: {tables.filter(t => t.status === 'Reserved').length}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-center">
                {tables.map((table) => {
                    const Icon = statusIcons[table.status];
                    return (
                        <div
                            key={table.id}
                            onClick={() => handleTableClick(table.id, table.status)}
                            className={cn(
                                "group cursor-pointer bg-card border-2 p-8 rounded-[2.5rem] transition-all relative overflow-hidden",
                                table.status === 'Available' ? "border-emerald-500/20 hover:border-emerald-500" :
                                    table.status === 'Occupied' ? "border-amber-500/20 hover:border-amber-500 shadow-lg shadow-amber-500/5" :
                                        "border-red-500/20 hover:border-red-500"
                            )}
                        >
                            {/* Dynamic Table Visualization */}
                            <div className="relative mx-auto w-32 h-32 mb-6 flex items-center justify-center">
                                <div className={cn(
                                    "absolute inset-0 rounded-full border-4 border-dashed animate-[spin_10s_linear_infinite]",
                                    table.status === 'Available' ? "border-emerald-500/20" :
                                        table.status === 'Occupied' ? "border-amber-500/20" : "border-red-500/20"
                                )} />
                                <div className={cn(
                                    "w-24 h-24 rounded-3xl flex items-center justify-center text-3xl font-bold shadow-xl transition-transform group-hover:scale-110",
                                    table.status === 'Available' ? "bg-emerald-500 text-white" :
                                        table.status === 'Occupied' ? "bg-amber-500 text-white" : "bg-red-500 text-white"
                                )}>
                                    {table.number}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className={cn(
                                    "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border",
                                    statusColors[table.status]
                                )}>
                                    <Icon size={14} />
                                    {table.status}
                                </div>

                                <div className="flex items-center justify-center gap-3 text-muted-foreground text-sm font-semibold">
                                    <Users size={16} />
                                    {table.capacity} Persons
                                </div>

                                {table.currentOrderId && (
                                    <p className="text-xs text-primary font-bold mt-2">ID: {table.currentOrderId}</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
