"use client";

import { useState } from "react";
import type { Product } from "@/types";
import { useCart } from "@/components/cart/CartProvider";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={added}
      className="w-full bg-accent hover:bg-accent-light active:bg-accent-dark disabled:bg-accent-light text-white text-base font-semibold px-8 py-4 rounded-xl transition-all duration-200 cursor-pointer disabled:cursor-default"
    >
      {added ? "Ajouté au panier ✓" : "Ajouter au panier"}
    </button>
  );
}
