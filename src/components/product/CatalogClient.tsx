"use client";

import { useState } from "react";
import { products, categories } from "@/config/products";
import type { Category } from "@/types";
import { cn } from "@/lib/utils";
import { ProductGrid } from "./ProductGrid";

type Filter = Category | "tous";

export function CatalogClient() {
  const [active, setActive] = useState<Filter>("tous");

  const filtered =
    active === "tous"
      ? products
      : products.filter((p) => p.category === active);

  return (
    <div>
      {/* Filtres */}
      <div className="sticky top-0 z-20 bg-[#FAF5F0] border-b border-gray-100 py-4 mb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setActive("tous")}
              className={cn(
                "shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer",
                active === "tous"
                  ? "bg-[#7C1D1D] text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#7C1D1D] hover:text-[#7C1D1D]"
              )}
            >
              Tous
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setActive(cat.slug)}
                className={cn(
                  "shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer",
                  active === cat.slug
                    ? "bg-[#7C1D1D] text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#7C1D1D] hover:text-[#7C1D1D]"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grille + compteur */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <p className="text-sm text-gray-400 mb-6">
          {filtered.length} produit{filtered.length > 1 ? "s" : ""}
        </p>
        <ProductGrid products={filtered} />
      </div>
    </div>
  );
}
