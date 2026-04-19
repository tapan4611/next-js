export type Category = 'Starters' | 'Main Course' | 'Drinks' | 'Desserts';

export interface MenuItem {
    id: string;
    name: string;
    price: number;
    category: Category;
    image?: string;
    isAvailable: boolean;
}

export interface CartItem extends MenuItem {
    quantity: number;
}

export type OrderType = 'Dine-in' | 'Takeaway' | 'Delivery';

export type TableStatus = 'Available' | 'Occupied' | 'Reserved';

export interface Table {
    id: string;
    number: number;
    status: TableStatus;
    currentOrderId?: string;
    capacity: number;
}

export type PaymentMethod = 'Cash' | 'Card' | 'UPI';

export interface Order {
    id: string;
    items: CartItem[];
    subtotal: number;
    tax: number;
    discount: number;
    total: number;
    type: OrderType;
    tableId?: string;
    status: 'Pending' | 'Completed' | 'Cancelled';
    paymentMethod?: PaymentMethod;
    createdAt: string;
    customerName?: string;
}

export interface DashboardStats {
    totalSales: number;
    orderCount: number;
    topItems: { name: string; count: number }[];
    revenueData: { date: string; amount: number }[];
}
