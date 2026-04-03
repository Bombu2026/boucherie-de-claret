import { ProductImage } from "@/components/ui/ProductImage";

export default function Storytelling() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Text */}
        <div>
          {/* Decorative gold separator */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-px bg-gold" />
            <span className="text-gold text-xs font-semibold uppercase tracking-widest">
              Notre histoire
            </span>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6 leading-tight">
            Un savoir-faire artisanal depuis des générations
          </h2>

          <div className="space-y-5 text-gray-600 leading-relaxed">
            <p>
              Chez Boucherie de Claret, chaque pièce est le fruit d&apos;une
              sélection rigoureuse. Nous travaillons en direct avec des éleveurs
              partenaires engagés, choisissant des races d&apos;exception —
              Wagyu japonais, Simmental suisse, Aubrac d&apos;Aveyron, Black
              Pearl rare — pour leur persillage, leur tendreté et l&apos;intensité
              de leurs arômes.
            </p>
            <p>
              La maturation est au cœur de notre métier. Dans notre chambre de
              maturation à température et hygrométrie contrôlées, les pièces
              reposent jusqu&apos;à 60 jours. Ce processus patient concentre les
              saveurs, attendrit les fibres et révèle des arômes boisés et
              noisettés impossibles à obtenir autrement.
            </p>
            <p>
              Notre maître boucher façonne chaque découpe à la main, avec la
              précision que seules des décennies de pratique permettent. Pas de
              compromis sur la qualité, pas de raccourci sur le temps : c&apos;est
              cette passion du travail bien fait que nous livrons directement
              chez vous, à Toulon et ses environs.
            </p>
          </div>

          {/* Bottom gold accent */}
          <div className="mt-8 w-16 h-0.5 bg-gold" />
        </div>

        {/* Image */}
        <div className="relative w-full h-[420px] rounded-sm overflow-hidden">
          <ProductImage
            src="/images/storytelling.png"
            alt="Maître boucher — savoir-faire artisanal Boucherie de Claret"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
