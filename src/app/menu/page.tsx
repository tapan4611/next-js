'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MOCK_MENU } from '@/lib/mock-data';
import { Category, MenuItem } from '@/types';
import { Plus, Edit2, Trash2, Search, X, ImageIcon, Check, AlertCircle } from 'lucide-react';
import { formatCurrency, cn } from '@/lib/utils';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

const itemSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    price: z.number().min(0.01, 'Price must be greater than 0'),
    category: z.enum(['Starters', 'Main Course', 'Drinks', 'Desserts']),
    image: z.string().url('Must be a valid image URL').optional().or(z.literal('')),
    isAvailable: z.boolean().default(true),
});

type ItemFormData = z.infer<typeof itemSchema>;

export default function MenuManagement() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>(MOCK_MENU);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ItemFormData>({
        resolver: zodResolver(itemSchema),
    });

    const filteredMenu = menuItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const onSubmit = (data: ItemFormData) => {
        if (editingItem) {
            setMenuItems(prev => prev.map(item =>
                item.id === editingItem.id ? { ...item, ...data } : item
            ));
            toast.success('Item updated successfully');
        } else {
            const newItem: MenuItem = {
                id: Math.random().toString(36).substr(2, 9),
                ...data,
            };
            setMenuItems(prev => [...prev, newItem]);
            toast.success('Item added successfully');
        }
        closeModal();
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this item?')) {
            setMenuItems(prev => prev.filter(item => item.id !== id));
            toast.success('Item deleted');
        }
    };

    const openModal = (item?: MenuItem) => {
        if (item) {
            setEditingItem(item);
            reset({
                name: item.name,
                price: item.price,
                category: item.category,
                image: item.image || '',
                isAvailable: item.isAvailable,
            });
        } else {
            setEditingItem(null);
            reset({
                name: '',
                price: 0,
                category: 'Main Course',
                image: '',
                isAvailable: true,
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Menu Management</h2>
                    <p className="text-muted-foreground mt-1">Add, edit, or remove menu items.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            type="text"
                            placeholder="Search items..."
                            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-bold transition-transform active:scale-95 shadow-lg shadow-primary/20"
                    >
                        <Plus size={20} /> Add Item
                    </button>
                </div>
            </div>

            {/* Menu Table */}
            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-secondary/50 border-b border-border">
                            <th className="px-6 py-4 font-bold text-sm">Item</th>
                            <th className="px-6 py-4 font-bold text-sm">Category</th>
                            <th className="px-6 py-4 font-bold text-sm">Price</th>
                            <th className="px-6 py-4 font-bold text-sm">Status</th>
                            <th className="px-6 py-4 font-bold text-sm text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filteredMenu.map((item) => (
                            <tr key={item.id} className="hover:bg-secondary/30 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-secondary">
                                            {item.image ? (
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                    <ImageIcon size={20} />
                                                </div>
                                            )}
                                        </div>
                                        <span className="font-semibold">{item.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs font-bold px-3 py-1 bg-secondary rounded-full border border-border">
                                        {item.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-bold text-primary">
                                    {formatCurrency(item.price)}
                                </td>
                                <td className="px-6 py-4">
                                    {item.isAvailable ? (
                                        <span className="flex items-center gap-1.5 text-emerald-500 text-xs font-bold">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500" /> Available
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1.5 text-red-500 text-xs font-bold">
                                            <div className="w-2 h-2 rounded-full bg-red-500" /> Out of stock
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => openModal(item)}
                                            className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
                    <div className="relative bg-card w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-border">
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-bold">{editingItem ? 'Edit Item' : 'Add New Item'}</h3>
                                <button onClick={closeModal} className="p-2 hover:bg-secondary rounded-xl transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted-foreground">Item Name</label>
                                    <input
                                        {...register('name')}
                                        className={cn(
                                            "w-full px-4 py-3 bg-secondary border border-border rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all font-medium",
                                            errors.name && "border-red-500"
                                        )}
                                        placeholder="e.g. Classic Burger"
                                    />
                                    {errors.name && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.name.message}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-muted-foreground">Category</label>
                                        <select
                                            {...register('category')}
                                            className="w-full px-4 py-3 bg-secondary border border-border rounded-2xl focus:ring-2 focus:ring-primary outline-none font-medium"
                                        >
                                            <option value="Starters">Starters</option>
                                            <option value="Main Course">Main Course</option>
                                            <option value="Drinks">Drinks</option>
                                            <option value="Desserts">Desserts</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-muted-foreground">Price (INR)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            {...register('price', { valueAsNumber: true })}
                                            className={cn(
                                                "w-full px-4 py-3 bg-secondary border border-border rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all font-medium",
                                                errors.price && "border-red-500"
                                            )}
                                            placeholder="0.00"
                                        />
                                        {errors.price && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.price.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted-foreground">Image URL (Optional)</label>
                                    <input
                                        {...register('image')}
                                        className="w-full px-4 py-3 bg-secondary border border-border rounded-2xl focus:ring-2 focus:ring-primary outline-none font-medium"
                                        placeholder="https://images.unsplash.com/..."
                                    />
                                    {errors.image && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.image.message}</p>}
                                </div>

                                <div className="flex items-center gap-3 py-2 cursor-pointer group">
                                    <div className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" {...register('isAvailable')} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </div>
                                    <span className="text-sm font-bold">Item is available for order</span>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 py-4 bg-secondary font-bold rounded-2xl hover:bg-secondary/70 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95"
                                    >
                                        {editingItem ? 'Save Changes' : 'Create Item'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
