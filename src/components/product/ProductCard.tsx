"use client";

import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/components/cart/CartProvider";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="group relative flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
      {/* Image */}
      <Link href={`/nos-viandes/${product.slug}`} className="block relative aspect-[4/3]">
        <div className="img-placeholder w-full h-full">
          {product.badge && (
            <span className="absolute top-3 left-3 z-10 bg-[#7C1D1D] text-white text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
              {product.badge}
            </span>
          )}
          <span className="relative z-10 text-white/20 text-5xl select-none">
            ☽
          </span>
        </div>
      </Link>

      {/* Contenu */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex-1">
          <Link href={`/nos-viandes/${product.slug}`}>
            <h3 className="font-serif text-lg font-bold text-[#1a1a1a] leading-tight mb-1 group-hover:text-[#7C1D1D] transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>{product.weight}</span>
          <span className="text-xs uppercase tracking-wide">{product.origin.split(",")[0]}</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <span className="text-xl font-bold font-serif text-[#1a1a1a]">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="bg-[#7C1D1D] hover:bg-[#9B2C2C] active:bg-[#5B1414] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
