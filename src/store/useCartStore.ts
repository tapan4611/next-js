import { create } from 'zustand';
import { CartItem, MenuItem } from '@/types';

interface CartState {
    items: CartItem[];
    discount: number;
    addItem: (item: MenuItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    setDiscount: (discount: number) => void;
    clearCart: () => void;
    getTotal: () => { subtotal: number; tax: number; total: number };
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    discount: 0,
    addItem: (item) => {
        const items = get().items;
        const existing = items.find((i) => i.id === item.id);
        if (existing) {
            set({
                items: items.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                ),
            });
        } else {
            set({ items: [...items, { ...item, quantity: 1 }] });
        }
    },
    removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
    },
    updateQuantity: (id, delta) => {
        set({
            items: get().items
                .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
                .filter((i) => i.quantity > 0),
        });
    },
    setDiscount: (discount) => set({ discount }),
    clearCart: () => set({ items: [], discount: 0 }),
    getTotal: () => {
        const { items, discount } = get();
        const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const tax = subtotal * 0.12; // 12% GST
        const total = subtotal + tax - discount;
        return { subtotal, tax, total };
    },
}));
