import type { Metadata } from "next";
import { CatalogClient } from "@/components/product/CatalogClient";

export const metadata: Metadata = {
  title: "Nos Viandes | Boucherie de Claret",
  description:
    "Découvrez notre sélection de viandes d'exception : Wagyu, Simmental, Black Pearl, Côte maturée. Livraison 48h à Toulon.",
};

export default function NosViandesPage() {
  return (
    <main className="min-h-screen bg-[#FAF5F0]">
      {/* En-tête */}
      <div className="pt-16 pb-10 text-center px-4">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1a1a1a] mb-3">
          Nos Viandes
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Des pièces d'exception sélectionnées par notre maître boucher
        </p>
      </div>

      {/* Catalogue avec filtres */}
      <CatalogClient />
    </main>
  );
}
