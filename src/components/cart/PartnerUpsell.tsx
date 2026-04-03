"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { getRecommendedPartners, partnerCategories } from "@/config/products";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "@/components/ui/ProductImage";
import type { Category, PartnerProduct } from "@/types";

function AddButton({ product }: { product: PartnerProduct }) {
  const { addPartnerItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addPartnerItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={added}
      className={`mt-3 w-full py-1.5 rounded-lg text-xs font-semibold transition-colors ${
        added
          ? "bg-[#B8860B]/20 text-[#B8860B] cursor-default"
          : "bg-[#B8860B] hover:bg-[#9a7009] text-white"
      }`}
    >
      {added ? "Ajouté ✓" : "Ajouter"}
    </button>
  );
}

export function PartnerUpsell() {
  const { items } = useCart();

  // Catégories des produits principaux uniquement (non-partenaires)
  const cartCategories = items
    .filter((i) => !i.isPartner)
    .map((i) => (i.product as { category: Category }).category)
    .filter(Boolean);

  // IDs partenaires déjà dans le panier
  const partnerIdsInCart = items
    .filter((i) => i.isPartner)
    .map((i) => i.product.id);

  const recommendations = getRecommendedPartners(
    cartCategories,
    partnerIdsInCart
  );

  if (recommendations.length === 0) return null;

  function getCategoryLabel(slug: string): string {
    return partnerCategories.find((c) => c.slug === slug)?.name ?? slug;
  }

  return (
    <div className="mt-6 bg-white rounded-xl border border-[#B8860B]/30 shadow-sm overflow-hidden">
      {/* En-tête */}
      <div className="px-5 py-4 border-b border-[#B8860B]/20 flex items-center gap-3">
        <span className="w-1 h-6 rounded-full bg-[#B8860B] shrink-0" />
        <div>
          <h3 className="font-serif text-base font-semibold text-[var(--color-primary)] leading-tight">
            Complétez votre repas
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Sélection de nos partenaires artisans
          </p>
        </div>
      </div>

      {/* Grille scrollable */}
      <div
        className="flex gap-3 overflow-x-auto scroll-smooth px-5 py-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {recommendations.map((product) => (
          <div
            key={product.id}
            className="snap-start shrink-0 w-40 flex flex-col"
          >
            {/* Image */}
            <div className="relative">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="160px"
                />
              </div>
              {/* Badge Partenaire */}
              <span className="absolute top-1.5 left-1.5 bg-[#B8860B] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                Partenaire
              </span>
              {product.badge && (
                <span className="absolute top-1.5 right-1.5 bg-white/90 text-[#B8860B] text-[10px] font-semibold px-1.5 py-0.5 rounded border border-[#B8860B]/30">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Contenu */}
            <div className="mt-2 flex flex-col flex-1">
              <span className="text-[10px] font-medium text-[#B8860B] uppercase tracking-wide">
                {getCategoryLabel(product.category)}
              </span>
              <h4 className="font-serif text-xs font-semibold text-[var(--color-primary)] mt-0.5 leading-tight line-clamp-2">
                {product.name}
              </h4>
              <p className="text-[11px] text-gray-400 mt-1 leading-snug line-clamp-1 flex-1">
                {product.description}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-bold text-[var(--color-primary)]">
                  {formatPrice(product.price)}
                </span>
              </div>
              <AddButton product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
