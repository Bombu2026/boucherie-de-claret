import type { Metadata } from "next";
import Link from "next/link";
import { shop } from "@/config/shop";
import { ProductImage } from "@/components/ui/ProductImage";

export const metadata: Metadata = {
  title: "Notre Histoire",
  description:
    "Depuis 1962, la Boucherie de Claret perpétue l'art de la boucherie artisanale à Toulon. Découvrez notre histoire, nos races d'exception et notre passion pour la viande maturée.",
  openGraph: {
    title: `Notre Histoire | ${shop.name}`,
    description:
      "La passion de la viande depuis plus de 60 ans à Toulon. Races d'exception, maturation, engagement qualité.",
    type: "website",
  },
};

const races = [
  {
    name: "Simmental",
    origin: "Suisse / Bavière",
    description:
      "Race rustique et polyvalente, la Simmental offre une viande persillée d'une tendreté remarquable. Sa croissance lente en plein air lui confère des arômes profonds et une texture fondante.",
  },
  {
    name: "Wagyu",
    origin: "Japon",
    description:
      "La plus prisée des races bovines au monde. Son persillage exceptionnel (marbling) lui donne un fondant incomparable et un goût beurré inimitable. Une expérience gustative unique.",
  },
  {
    name: "Black Pearl",
    origin: "Australie",
    description:
      "Descendante du Wagyu japonais élevée sous le soleil australien, la Black Pearl allie la génétique d'exception asiatique à l'élevage extensif. Persillage intense, saveur ronde.",
  },
  {
    name: "Aubrac",
    origin: "Aveyron, France",
    description:
      "Race emblématique des plateaux du Massif Central, l'Aubrac est la viande du terroir français par excellence. Musclée, savoureuse, avec une note légèrement noisettée caractéristique.",
  },
  {
    name: "Charolaise",
    origin: "Bourgogne, France",
    description:
      "Fleuron de l'élevage français, la Charolaise produit une viande à la fois tendre et goûteuse, peu grasse, idéale pour les rôtis et les pièces du boucher. La référence en restauration étoilée.",
  },
  {
    name: "Gasconne",
    origin: "Gascogne, France",
    description:
      "Vache grise des contreforts pyrénéens, la Gasconne est élevée en estive sur des pâturages d'altitude. Sa viande est dense, légèrement sauvage, avec un goût de terroir prononcé.",
  },
];

export default function NotreHistoirePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <ProductImage
          src="/images/storytelling.jpg"
          alt="Notre histoire — Boucherie de Claret"
          fill
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-16 w-full">
          <p className="text-[var(--color-gold)] uppercase tracking-widest text-sm font-semibold mb-3">
            Boucherie de Claret · Toulon depuis 1962
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight">
            Notre Histoire
          </h1>
        </div>
      </section>

      {/* Section 1 — La passion */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[var(--color-gold)] uppercase tracking-widest text-xs font-semibold mb-4">
              Depuis 1962
            </p>
            <h2 className="font-serif text-4xl font-bold text-[var(--color-primary)] mb-6">
              La passion de la viande
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Tout a commencé en 1962, quand Henri Claret, apprenti boucher venu des Alpes-de-Haute-Provence,
                ouvre sa première boutique dans le quartier du Mourillon à Toulon. Sa philosophie tient en
                quelques mots : <em className="text-[var(--color-primary)]">seule la qualité dure</em>.
              </p>
              <p>
                Pendant soixante ans, trois générations de la famille Claret ont sélectionné personnellement
                leurs éleveurs, rendu visite à chaque ferme, refusé toute filière industrielle. Chaque pièce
                qui arrive dans notre laboratoire est tracée de la naissance à l&apos;assiette.
              </p>
              <p>
                Aujourd&apos;hui, la Boucherie de Claret est une adresse incontournable pour les amateurs de
                viande d&apos;exception à Toulon et dans tout le Var. Nos clients viennent de Marseille, de
                Monaco, et même de Paris pour nos pièces maturées.
              </p>
            </div>
          </div>
          <div className="relative rounded-2xl aspect-square overflow-hidden">
            <ProductImage
              src="/images/wagyu.jpg"
              alt="Viande persillée Wagyu — sélection Boucherie de Claret"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Section 2 — Races */}
      <section className="py-20 bg-[var(--color-cream)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[var(--color-gold)] uppercase tracking-widest text-xs font-semibold mb-3">
              Sélection rigoureuse
            </p>
            <h2 className="font-serif text-4xl font-bold text-[var(--color-primary)]">
              Nos races d&apos;exception
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Chaque race est choisie pour ses qualités gustatives uniques. Nous travaillons uniquement
              avec des éleveurs qui partagent notre exigence.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {races.map((race) => (
              <div
                key={race.name}
                className="bg-white rounded-xl p-6 border border-[var(--color-cream-dark)] hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-serif text-xl font-bold text-[var(--color-primary)]">
                    {race.name}
                  </h3>
                  <span className="text-xs text-[var(--color-gold)] font-medium bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    {race.origin}
                  </span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{race.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Maturation */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-2xl aspect-[4/3] overflow-hidden">
            <ProductImage
              src="/images/cote-boeuf.jpg"
              alt="Côte de boeuf maturée — savoir-faire artisanal"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-[var(--color-gold)] uppercase tracking-widest text-xs font-semibold mb-4">
              Savoir-faire
            </p>
            <h2 className="font-serif text-4xl font-bold text-[var(--color-primary)] mb-6">
              L&apos;art de la maturation
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                La maturation à sec (<em className="text-[var(--color-primary)]">dry aging</em>) est une
                technique ancestrale que peu de bouchers maîtrisent encore. Elle consiste à laisser reposer
                la viande en chambre froide ventilée, entre 1°C et 4°C, pendant 21 à 90 jours selon les pièces.
              </p>
              <p>
                Pendant ce processus, les enzymes naturelles de la viande décomposent les fibres musculaires,
                développant une tendreté incomparable et concentrant les arômes. Une pièce maturée 45 jours
                perd jusqu&apos;à 30% de son poids en eau — ce qui explique son goût intensément concentré.
              </p>
              <p>
                Nous proposons trois niveaux de maturation : <strong className="text-[var(--color-primary)]">21 jours</strong> (fondant),{" "}
                <strong className="text-[var(--color-primary)]">45 jours</strong> (caractère), et{" "}
                <strong className="text-[var(--color-primary)]">90 jours</strong> (exception). Chaque pièce est
                surveillée quotidiennement par nos artisans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Engagement qualité */}
      <section className="py-20 bg-[var(--color-primary)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[var(--color-gold)] uppercase tracking-widest text-xs font-semibold mb-4">
                Notre promesse
              </p>
              <h2 className="font-serif text-4xl font-bold text-white mb-6">
                Notre engagement qualité
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Chaque animal est identifié par un numéro de traçabilité unique. De l&apos;élevage à votre
                  assiette, nous pouvons retracer l&apos;intégralité du parcours de votre viande : ferme
                  d&apos;origine, alimentation, mode d&apos;élevage, date d&apos;abattage.
                </p>
                <p>
                  La chaîne du froid est maintenue sans rupture grâce à notre camion frigorifique dédié et
                  nos emballages sous-vide professionnels. La viande vous arrive dans les mêmes conditions
                  qu&apos;en boutique.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { label: "Traçabilité", value: "100%" },
                  { label: "Chaîne du froid", value: "1–4°C" },
                  { label: "Livraison", value: "48h" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-serif text-2xl font-bold text-[var(--color-gold)]">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl aspect-[4/3] overflow-hidden">
              <ProductImage
                src="/images/box-prestige.jpg"
                alt="Coffret prestige — engagement qualité Boucherie de Claret"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--color-cream)] text-center px-6">
        <h2 className="font-serif text-3xl font-bold text-[var(--color-primary)] mb-4">
          Prêt à découvrir nos viandes d&apos;exception ?
        </h2>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">
          Livraison sous 48h à Toulon et dans le Var. Emballage sous-vide, chaîne du froid garantie.
        </p>
        <Link
          href="/nos-viandes"
          className="inline-block bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white font-semibold px-10 py-4 rounded-lg transition-colors text-lg"
        >
          Découvrir nos viandes
        </Link>
      </section>
    </div>
  );
}
