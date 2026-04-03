"use client";

import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/components/cart/CartProvider";
import { ProductImage } from "@/components/ui/ProductImage";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="group relative flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
      {/* Image */}
      <Link href={`/nos-viandes/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden">
        <ProductImage
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 bg-accent text-white text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </Link>

      {/* Contenu */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex-1">
          <Link href={`/nos-viandes/${product.slug}`}>
            <h3 className="font-serif text-lg font-bold text-primary leading-tight mb-1 group-hover:text-accent transition-colors">
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
          <span className="text-xl font-bold font-serif text-primary">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="bg-accent hover:bg-accent-light active:bg-accent-dark text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
