"use client";

import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface UpsellProps {
  products: Product[];
}

export function Upsell({ products }: UpsellProps) {
  if (products.length === 0) return null;

  const displayed = products.slice(0, 3);

  return (
    <section className="mt-16 pt-12 border-t border-gray-100">
      <h2 className="font-serif text-2xl font-bold text-primary mb-8 text-center">
        Complétez votre commande
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayed.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
