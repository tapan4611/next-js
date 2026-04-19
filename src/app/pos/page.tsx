'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { MOCK_MENU } from '@/lib/mock-data';
import { Category, MenuItem } from '@/types';
import { Search, Plus, Minus, Trash2, ShoppingCart, User, CreditCard, Banknote } from 'lucide-react';
import { formatCurrency, cn } from '@/lib/utils';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

const categories: Category[] = ['Starters', 'Main Course', 'Drinks', 'Desserts'];

export default function POSPage() {
    const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
    const [searchQuery, setSearchQuery] = useState('');

    const {
        items: cartItems,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        getTotal
    } = useCartStore();

    const filteredMenu = MOCK_MENU.filter((item) => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const { subtotal, tax, total } = getTotal();

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            toast.error('Cart is empty!');
            return;
        }
        toast.success('Order placed successfully!');
        clearCart();
    };

    return (
        <div className="flex h-[calc(100vh-64px)] gap-6 overflow-hidden">
            {/* Menu Section */}
            <div className="flex-1 flex flex-col min-w-0">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">New Order</h2>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            type="text"
                            placeholder="Search dishes..."
                            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-none">
                    <button
                        onClick={() => setSelectedCategory('All')}
                        className={cn(
                            "px-5 py-2 rounded-xl border font-medium transition-all whitespace-nowrap",
                            selectedCategory === 'All'
                                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                : "bg-card border-border hover:border-primary text-muted-foreground hover:text-primary"
                        )}
                    >
                        All Items
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={cn(
                                "px-5 py-2 rounded-xl border font-medium transition-all whitespace-nowrap",
                                selectedCategory === cat
                                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                    : "bg-card border-border hover:border-primary text-muted-foreground hover:text-primary"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Menu Items Grid */}
                <div className="flex-1 overflow-y-auto pr-2">
                    <div className="pos-grid">
                        {filteredMenu.map((item) => (
                            <div
                                key={item.id}
                                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all group flex flex-col"
                            >
                                <div className="relative h-32 w-full">
                                    <Image
                                        src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'}
                                        alt={item.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {!item.isAvailable && (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                            <span className="text-white text-xs font-bold px-2 py-1 bg-red-500 rounded">Unavailable</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="font-bold text-sm line-clamp-1">{item.name}</h3>
                                    <p className="text-xs text-muted-foreground mt-1">{item.category}</p>
                                    <div className="mt-auto pt-4 flex items-center justify-between">
                                        <span className="font-bold text-primary">{formatCurrency(item.price)}</span>
                                        <button
                                            onClick={() => item.isAvailable && addItem(item)}
                                            disabled={!item.isAvailable}
                                            className={cn(
                                                "p-2 rounded-lg transition-colors",
                                                item.isAvailable
                                                    ? "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                                                    : "bg-secondary text-muted-foreground cursor-not-allowed"
                                            )}
                                        >
                                            <Plus size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Cart Sidebar */}
            <div className="w-96 bg-card border border-border rounded-3xl flex flex-col overflow-hidden shadow-2xl relative">
                <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-xl flex items-center gap-2">
                            <ShoppingCart size={22} className="text-primary" />
                            Current Order
                        </h3>
                        <button
                            onClick={clearCart}
                            className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>

                    <div className="flex items-center gap-4 p-3 bg-secondary rounded-xl">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                            <User size={20} />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold">New Customer</p>
                            <p className="text-xs text-muted-foreground">Select customer</p>
                        </div>
                        <Plus size={18} className="text-muted-foreground" />
                    </div>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-muted-foreground">
                                <ShoppingCart size={32} />
                            </div>
                            <div>
                                <p className="font-bold">Your cart is empty</p>
                                <p className="text-sm text-muted-foreground">Add items from the menu to start</p>
                            </div>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                                    <Image fill src={item.image || ''} alt={item.name} className="object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm mb-1">{item.name}</h4>
                                    <p className="text-xs text-primary font-bold">{formatCurrency(item.price)}</p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center hover:bg-primary/10 transition-colors"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="text-sm font-bold">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center hover:bg-primary/10 transition-colors"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end justify-between">
                                    <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-red-500 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                    <p className="font-bold text-sm">{formatCurrency(item.price * item.quantity)}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Totals & Checkout */}
                <div className="p-6 bg-secondary/50 border-t border-border space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span className="font-medium">{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Tax (12%)</span>
                            <span className="font-medium">{formatCurrency(tax)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold border-t border-border pt-4 mt-2">
                            <span>Total</span>
                            <span className="text-primary">{formatCurrency(total)}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 py-3 bg-white dark:bg-card border border-border rounded-xl font-bold text-sm hover:border-primary transition-colors">
                            <Banknote size={18} /> Cash
                        </button>
                        <button className="flex items-center justify-center gap-2 py-3 bg-white dark:bg-card border border-border rounded-xl font-bold text-sm hover:border-primary transition-colors">
                            <CreditCard size={18} /> Card / UPI
                        </button>
                    </div>

                    <button
                        onClick={handleCheckout}
                        className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95 disabled:bg-muted-foreground disabled:cursor-not-allowed"
                        disabled={cartItems.length === 0}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}
