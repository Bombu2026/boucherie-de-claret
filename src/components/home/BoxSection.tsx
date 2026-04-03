"use client";

import { products } from "@/config/products";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "@/components/ui/ProductImage";
import type { Product } from "@/types";

function BoxCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="bg-white/5 border border-white/10 rounded-sm overflow-hidden flex flex-col hover:border-white/20 transition-colors duration-200">
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden">
        <ProductImage
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 bg-gold text-white text-xs font-semibold px-2.5 py-1 rounded-sm">
            {product.badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1 gap-3">
        <h3 className="font-serif text-xl text-white leading-snug">
          {product.name}
        </h3>
        <p className="text-sm text-white/60 flex-1 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
          <span className="font-serif text-2xl font-bold text-gold">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="bg-accent hover:bg-accent-light text-white text-sm font-medium px-4 py-2 rounded-sm transition-colors duration-150"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BoxSection() {
  const boxes = products.filter((p) => p.category === "box-colis");

  return (
    <section className="bg-primary py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Nos coffrets
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-white/60 text-sm max-w-md mx-auto">
            Commandez un coffret pour un panier moyen de 100&nbsp;€ et profitez
            de la livraison offerte
          </p>
        </div>

        {/* Grid */}
        <div className="stagger-children grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {boxes.map((box) => (
            <BoxCard key={box.id} product={box} />
          ))}
        </div>
      </div>
    </section>
  );
}
