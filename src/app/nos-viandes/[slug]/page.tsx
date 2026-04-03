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

  return (
    <main className="min-h-screen bg-[#FAF5F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-[#7C1D1D] transition-colors">
            Accueil
          </Link>
          <span>/</span>
          <Link
            href="/nos-viandes"
            className="hover:text-[#7C1D1D] transition-colors"
          >
            Nos viandes
          </Link>
          <span>/</span>
          <span className="text-[#1a1a1a] font-medium truncate">
            {product.name}
          </span>
        </nav>

        {/* Produit */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-square">
            <div className="img-placeholder w-full h-full">
              {product.badge && (
                <span className="absolute top-4 left-4 z-10 bg-[#7C1D1D] text-white text-sm font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  {product.badge}
                </span>
              )}
              <span className="relative z-10 text-white/10 text-8xl select-none">
                ☽
              </span>
            </div>
          </div>

          {/* Détails */}
          <div className="flex flex-col gap-6">
            {product.badge && (
              <span className="inline-flex w-fit bg-[#7C1D1D]/10 text-[#7C1D1D] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
                {product.badge}
              </span>
            )}

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a1a1a] leading-tight">
              {product.name}
            </h1>

            <p className="text-gray-500 text-sm uppercase tracking-wide">
              {product.origin}
            </p>

            <p className="text-gray-600 leading-relaxed">
              {product.longDescription}
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="bg-white border border-gray-100 rounded-lg px-3 py-1.5">
                {product.weight}
              </span>
            </div>

            {/* Conseil cuisson */}
            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <span className="text-[#B8860B] text-xl mt-0.5" aria-hidden="true">
                  ♨
                </span>
                <div>
                  <p className="font-semibold text-[#1a1a1a] text-sm mb-1">
                    Conseil cuisson
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {product.cookingTip}
                  </p>
                </div>
              </div>
            </div>

            {/* Prix + CTA */}
            <div className="pt-2">
              <p className="font-serif text-4xl font-bold text-[#1a1a1a] mb-4">
                {formatPrice(product.price)}
              </p>
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>

        {/* Upsell */}
        <Upsell products={related} />
      </div>
    </main>
  );
}
