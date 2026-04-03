import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getProductsByCategory,
  products,
} from "@/config/products";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { Upsell } from "@/components/product/Upsell";
import { ProductGallery } from "@/components/product/ProductGallery";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | Boucherie de Claret`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getProductsByCategory(product.category).filter(
    (p) => p.id !== product.id
  );

  // Construire la galerie : dédupliquer l'image principale si déjà dans gallery
  const allImages = product.gallery.length > 0
    ? [...new Set([product.image, ...product.gallery])]
    : [product.image];

  return (
    <main className="min-h-screen bg-[#FAF5F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-12">

        {/* Breadcrumb */}
        <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-sm text-gray-400 mb-10">
          <Link href="/" className="hover:text-[#7C1D1D] transition-colors">
            Accueil
          </Link>
          <span aria-hidden="true" className="text-gray-300">/</span>
          <Link
            href="/nos-viandes"
            className="hover:text-[#7C1D1D] transition-colors"
          >
            Nos viandes
          </Link>
          <span aria-hidden="true" className="text-gray-300">/</span>
          <span className="text-[#1a1a1a] font-medium truncate max-w-[180px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Section principale — grille 2 colonnes desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 items-start">

          {/* Colonne gauche — Galerie */}
          <div className="lg:sticky lg:top-8">
            <ProductGallery
              images={allImages}
              productName={product.name}
              badge={product.badge}
            />
          </div>

          {/* Colonne droite — Détails */}
          <div className="flex flex-col gap-7">

            {/* 1. Badge */}
            {product.badge && (
              <span className="inline-flex w-fit bg-[#7C1D1D]/10 text-[#7C1D1D] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full border border-[#7C1D1D]/20">
                {product.badge}
              </span>
            )}

            {/* 2. Nom */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] leading-tight">
              {product.name}
            </h1>

            {/* 3. Origine */}
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest -mt-3">
              {product.origin}
            </p>

            {/* 4. Description longue */}
            <p className="text-gray-600 leading-relaxed text-base">
              {product.longDescription}
            </p>

            {/* 5. Poids */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-white border border-gray-100 rounded-lg px-3 py-1.5 text-sm text-gray-500 font-medium shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 text-gray-400"
                  aria-hidden="true"
                >
                  <path d="M10 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM7.27 7.18A5 5 0 1 1 12.73 7.18C14.56 7.67 16 9.18 16 11v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5c0-1.82 1.44-3.33 3.27-3.82Z" />
                </svg>
                {product.weight}
              </span>
            </div>

            {/* 6. Section Conservation */}
            <div className="bg-[#FAF5F0] border border-[#e8ddd4] rounded-xl p-5">
              <div className="flex items-start gap-3.5">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-blue-400"
                    aria-hidden="true"
                  >
                    <line x1="12" y1="2" x2="12" y2="22" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    <line x1="12" y1="2" x2="15.5" y2="5.5" />
                    <line x1="12" y1="2" x2="8.5" y2="5.5" />
                    <line x1="12" y1="22" x2="15.5" y2="18.5" />
                    <line x1="12" y1="22" x2="8.5" y2="18.5" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <line x1="2" y1="12" x2="5" y2="8.5" />
                    <line x1="2" y1="12" x2="5" y2="15.5" />
                    <line x1="22" y1="12" x2="19" y2="8.5" />
                    <line x1="22" y1="12" x2="19" y2="15.5" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[#1a1a1a] text-sm mb-1.5">
                    Conservation
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {product.conservationTip}
                  </p>
                </div>
              </div>
            </div>

            {/* 7. Section Cuisson */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
              <div className="flex items-start gap-3.5">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-amber-500"
                    aria-hidden="true"
                  >
                    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
                    <path d="M12 22a3 3 0 0 0 3-3c0-1-.5-2-1.5-2.5S12 14 11.5 12c-.5 1.5-1.5 3-1.5 4 0 .5-.5 1.5-.5 2a3 3 0 0 0 2.5 3Z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[#1a1a1a] text-sm mb-1.5">
                    Conseil cuisson
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {product.cookingTip}
                  </p>
                </div>
              </div>
            </div>

            {/* 8. Prix + 9. CTA + 10. Micro-badges */}
            <div className="pt-2 flex flex-col gap-4">
              <p className="font-serif text-4xl sm:text-5xl font-bold text-[#1a1a1a]">
                {formatPrice(product.price)}
              </p>

              <AddToCartButton product={product} />

              {/* Micro-badges de confiance */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-white border border-gray-100 rounded-full px-3 py-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-gray-400" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 1a3.5 3.5 0 1 0-3.5 3.5h7A3.5 3.5 0 0 0 8 1ZM4.5 4.5A2 2 0 1 1 8 2.7a2 2 0 0 1-3.5 1.8ZM2 9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9Z" clipRule="evenodd" />
                  </svg>
                  Sous vide
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-white border border-gray-100 rounded-full px-3 py-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-gray-400" aria-hidden="true">
                    <path d="M8 1a5 5 0 1 0 0 10A5 5 0 0 0 8 1ZM4.5 6a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7Z" />
                    <path d="M5 12.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5ZM6 14.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z" />
                  </svg>
                  Chronofresh 24-48h
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-white border border-gray-100 rounded-full px-3 py-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-gray-400" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM7 5a1 1 0 0 1 2 0v3.586l1.707 1.707a1 1 0 0 1-1.414 1.414l-2-2A1 1 0 0 1 7 9V5Z" clipRule="evenodd" />
                  </svg>
                  Origine contrôlée
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Section upsell — produits de la même catégorie */}
        <Upsell products={related} />

      </div>
    </main>
  );
}
