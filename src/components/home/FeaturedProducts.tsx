"use client";

import Link from "next/link";
import { getFeaturedProducts } from "@/config/products";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Image placeholder */}
      <div className="img-placeholder h-56 w-full relative">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 bg-accent text-white text-xs font-semibold px-2.5 py-1 rounded-sm">
            {product.badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <h3 className="font-serif text-lg text-primary leading-snug">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 flex-1 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <span className="font-serif text-xl font-bold text-accent">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="bg-accent hover:bg-accent-dark text-white text-sm font-medium px-4 py-2 rounded-sm transition-colors duration-150"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section className="bg-cream py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">
            Nos sélections d&apos;exception
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto" />
        </div>

        {/* Grid */}
        <div className="stagger-children grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/nos-viandes"
            className="inline-block border-2 border-accent text-accent hover:bg-accent hover:text-white font-semibold px-8 py-3 rounded-sm transition-all duration-200"
          >
            Voir toute la sélection
          </Link>
        </div>
      </div>
    </section>
  );
}
