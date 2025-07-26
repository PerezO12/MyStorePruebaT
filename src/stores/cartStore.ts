import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '../types';

interface CartStore {
  items: CartItem[];
  total: number;
  itemCount: number;
  
  // Acciones
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: number) => number;
  getTotalPrice: () => number;
}

// Funciones helper
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
};

const calculateItemCount = (items: CartItem[]): number => {
  return items.reduce((count, item) => count + item.quantity, 0);
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,

      addItem: (product: Product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(item => item.product.id === product.id);

        let newItems: CartItem[];
        
        if (existingItem) {
          // actualizar cantidad
          newItems = items.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          // es un producto nuevo, agregarlo
          newItems = [...items, { id: product.id, product, quantity }];
        }

        set({
          items: newItems,
          total: calculateTotal(newItems),
          itemCount: calculateItemCount(newItems),
        });
      },

      removeItem: (productId: number) => {
        const { items } = get();
        const newItems = items.filter(item => item.product.id !== productId);

        set({
          items: newItems,
          total: calculateTotal(newItems),
          itemCount: calculateItemCount(newItems),
        });
      },

      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const { items } = get();
        const newItems = items.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        );

        set({
          items: newItems,
          total: calculateTotal(newItems),
          itemCount: calculateItemCount(newItems),
        });
      },

      clearCart: () => {
        set({
          items: [],
          total: 0,
          itemCount: 0,
        });
      },

      getItemQuantity: (productId: number) => {
        const { items } = get();
        const item = items.find(item => item.product.id === productId);
        return item ? item.quantity : 0;
      },

      getTotalPrice: () => {
        const { items } = get();
        return calculateTotal(items);
      },
    }),
    {
      name: 'cart-storage', 
      version: 1,
    }
  )
);
