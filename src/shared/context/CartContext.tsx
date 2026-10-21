"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string; // unique item id (variantId + goldCare)
  productId: string;
  variantId: string;
  name: string;
  slug: string;
  thumbnail: string;
  color: string;
  ram?: string;
  storage?: string;
  basePrice: number;
  goldCareFee: number;
  hasGoldCare: boolean;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalQuantity: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mc_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load cart", e);
    }
  }, []);

  const saveItems = (newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem("mc_cart", JSON.stringify(newItems));
  };

  const addToCart = (newItem: Omit<CartItem, "id">) => {
    const id = `${newItem.variantId}-${newItem.hasGoldCare ? "gold" : "std"}`;
    const existingIndex = items.findIndex((i) => i.id === id);

    if (existingIndex > -1) {
      const updated = [...items];
      updated[existingIndex].quantity += newItem.quantity;
      saveItems(updated);
    } else {
      saveItems([...items, { ...newItem, id }]);
    }
  };

  const removeFromCart = (id: string) => {
    saveItems(items.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    const updated = items
      .map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean) as CartItem[];
    saveItems(updated);
  };

  const clearCart = () => {
    saveItems([]);
  };

  const totalQuantity = items.reduce((acc, curr) => acc + curr.quantity, 0);

  const totalPrice = items.reduce((acc, curr) => {
    const itemUnitPrice = curr.basePrice + (curr.hasGoldCare ? curr.goldCareFee : 0);
    return acc + itemUnitPrice * curr.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
