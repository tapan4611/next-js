import { create } from 'zustand';
import { Table, TableStatus } from '@/types';

interface TableState {
    tables: Table[];
    updateTableStatus: (id: string, status: TableStatus, currentOrderId?: string) => void;
    setTables: (tables: Table[]) => void;
}

export const useTableStore = create<TableState>((set) => ({
    tables: [
        { id: '1', number: 1, status: 'Available', capacity: 4 },
        { id: '2', number: 2, status: 'Occupied', capacity: 2, currentOrderId: 'ord-123' },
        { id: '3', number: 3, status: 'Reserved', capacity: 6 },
        { id: '4', number: 4, status: 'Available', capacity: 4 },
        { id: '5', number: 5, status: 'Available', capacity: 2 },
        { id: '6', number: 6, status: 'Available', capacity: 8 },
    ],
    updateTableStatus: (id, status, currentOrderId) =>
        set((state) => ({
            tables: state.tables.map((t) =>
                t.id === id ? { ...t, status, currentOrderId } : t
            ),
        })),
    setTables: (tables) => set({ tables }),
}));
