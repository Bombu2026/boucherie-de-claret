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
      className="w-full bg-[#7C1D1D] hover:bg-[#9B2C2C] active:bg-[#5B1414] disabled:bg-[#9B2C2C] text-white text-base font-semibold px-8 py-4 rounded-xl transition-all duration-200 cursor-pointer disabled:cursor-default"
    >
      {added ? "Ajouté au panier ✓" : "Ajouter au panier"}
    </button>
  );
}
