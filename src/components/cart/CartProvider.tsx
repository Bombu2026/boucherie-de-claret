"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { promoCodes } from "@/config/products";
import type { CartItem, PartnerProduct, Product } from "@/types";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  addPartnerItem: (product: PartnerProduct) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromo: (code: string) => boolean;
  promoCode: string | null;
  promoDiscount: number;
  itemCount: number;
  subtotal: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "boucherie-cart";

function loadFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: CartItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setItems(loadFromStorage());
  }, []);

  // Persist on every change
  useEffect(() => {
    saveToStorage(items);
  }, [items]);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const addPartnerItem = useCallback((product: PartnerProduct) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1, isPartner: true }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        setItems((prev) => prev.filter((i) => i.product.id !== productId));
      } else {
        setItems((prev) =>
          prev.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          )
        );
      }
    },
    []
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setPromoCode(null);
    setPromoDiscount(0);
  }, []);

  const applyPromo = useCallback((code: string): boolean => {
    const discount = promoCodes[code.toUpperCase()];
    if (discount !== undefined) {
      setPromoCode(code.toUpperCase());
      setPromoDiscount(discount);
      return true;
    }
    return false;
  }, []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );
  const total = subtotal - (subtotal * promoDiscount) / 100;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        addPartnerItem,
        removeItem,
        updateQuantity,
        clearCart,
        applyPromo,
        promoCode,
        promoDiscount,
        itemCount,
        subtotal,
        total,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
