import { MenuItem } from '@/types';

export const MOCK_MENU: MenuItem[] = [
    // Starters
    { id: '1', name: 'Garlic Bread', price: 150, category: 'Starters', isAvailable: true, image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=300&q=80' },
    { id: '2', name: 'Chicken Wings', price: 350, category: 'Starters', isAvailable: true, image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=300&q=80' },
    { id: '3', name: 'Spring Rolls', price: 220, category: 'Starters', isAvailable: true, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80' },

    // Main Course
    { id: '4', name: 'Classic Burger', price: 280, category: 'Main Course', isAvailable: true, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80' },
    { id: '5', name: 'Pasta Carbonara', price: 420, category: 'Main Course', isAvailable: true, image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=300&q=80' },
    { id: '6', name: 'Margherita Pizza', price: 450, category: 'Main Course', isAvailable: true, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=300&q=80' },
    { id: '7', name: 'Grilled Salmon', price: 850, category: 'Main Course', isAvailable: true, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=300&q=80' },

    // Drinks
    { id: '8', name: 'Iced Coffee', price: 180, category: 'Drinks', isAvailable: true, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=300&q=80' },
    { id: '9', name: 'Fresh Lime Soda', price: 120, category: 'Drinks', isAvailable: true, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80' },
    { id: '10', name: 'Red Wine', price: 1200, category: 'Drinks', isAvailable: true, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=300&q=80' },

    // Desserts
    { id: '11', name: 'Chocolate Lava Cake', price: 250, category: 'Desserts', isAvailable: true, image: 'https://images.unsplash.com/photo-1624353335566-3d710500f40d?auto=format&fit=crop&w=300&q=80' },
    { id: '12', name: 'Tiramisu', price: 320, category: 'Desserts', isAvailable: true, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=300&q=80' },
];
