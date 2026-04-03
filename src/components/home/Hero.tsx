import Link from "next/link";
import { ProductImage } from "@/components/ui/ProductImage";

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center min-h-[85vh] overflow-hidden">
      {/* Background image */}
      <ProductImage
        src="/images/hero-bg.jpg"
        alt="Boucherie de Claret — viandes d'exception"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in">
        <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight mb-6">
          Viande d&apos;exception<br />
          livrée chez vous à Toulon
        </h1>

        <p className="text-xl text-cream mb-10 max-w-2xl mx-auto leading-relaxed">
          Sélection premium, maturation artisanale, qualité irréprochable
        </p>

        <div className="flex flex-col items-center gap-4">
          <Link
            href="/nos-viandes"
            className="inline-block bg-accent hover:bg-accent-dark text-white font-semibold text-lg px-10 py-4 rounded-sm transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-accent/30"
          >
            Commander maintenant
          </Link>

          <span className="text-sm text-cream/80 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
            Livraison offerte dès 100&nbsp;€
          </span>
        </div>
      </div>
    </section>
  );
}
