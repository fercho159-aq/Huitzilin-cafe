"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

type Cart = Record<string, number>;

interface CartContextValue {
  cart: Cart;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("boreal_cart");
      if (saved) setCart(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("boreal_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart = useCallback((id: string) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((c) => {
      const n = { ...c };
      if (!n[id]) return c;
      n[id] -= 1;
      if (n[id] <= 0) delete n[id];
      return n;
    });
  }, []);

  const clearCart = useCallback(() => setCart({}), []);

  const cartCount = Object.values(cart).reduce((s, n) => s + n, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
