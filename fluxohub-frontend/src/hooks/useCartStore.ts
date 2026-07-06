"use client";

import { useState, useEffect, useCallback } from "react";

export type CartItem = {
  id: string; // Produto ID + Variação combinados para chave única
  productId: string;
  title: string;
  variation: string;
  quantity: number;
  price: number;
  isWholesale: boolean;
};

// Singleton pattern para forçar re-render entre componentes sem Context API complexo
let cartSubscribers: (() => void)[] = [];
const emitCartChange = () => cartSubscribers.forEach(cb => cb());

export function useCartStore() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Sincroniza do LocalStorage na montagem
  useEffect(() => {
    const loadFromStorage = () => {
      try {
        const stored = localStorage.getItem("fluxohub_cart");
        if (stored) setItems(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse cart storage", err);
      }
      setIsHydrated(true);
    };

    loadFromStorage();
    
    // Inscreve este hook nas atualizações globais
    const updateHandler = () => loadFromStorage();
    cartSubscribers.push(updateHandler);
    
    // Sync across tabs
    window.addEventListener("storage", loadFromStorage);
    
    return () => {
      cartSubscribers = cartSubscribers.filter(cb => cb !== updateHandler);
      window.removeEventListener("storage", loadFromStorage);
    };
  }, []);

  const saveAndEmit = useCallback((newItems: CartItem[]) => {
    localStorage.setItem("fluxohub_cart", JSON.stringify(newItems));
    setItems(newItems);
    emitCartChange();
  }, []);

  const addItem = useCallback((item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      let next;
      if (existing) {
        next = prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity, price: item.price, isWholesale: item.isWholesale } : i);
      } else {
        next = [...prev, item];
      }
      saveAndEmit(next);
      return next; // Return value for immediate local use if needed
    });
  }, [saveAndEmit]);

  const removeItem = useCallback((itemId: string) => {
    setItems(prev => {
      const next = prev.filter(i => i.id !== itemId);
      saveAndEmit(next);
      return next;
    });
  }, [saveAndEmit]);

  const updateQuantity = useCallback((itemId: string, newQuantity: number, newPrice: number, isWholesale: boolean) => {
    if (newQuantity <= 0) return removeItem(itemId);
    setItems(prev => {
      const next = prev.map(i => i.id === itemId ? { ...i, quantity: newQuantity, price: newPrice, isWholesale } : i);
      saveAndEmit(next);
      return next;
    });
  }, [saveAndEmit, removeItem]);

  const clearCart = useCallback(() => {
    saveAndEmit([]);
  }, [saveAndEmit]);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return {
    items,
    isHydrated,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  };
}
