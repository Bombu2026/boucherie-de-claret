import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Programme Fidélité",
  description:
    "Cumulez des points à chaque commande et profitez de réductions exclusives à la Boucherie de Claret.",
};

const steps = [
  {
    number: "1",
    title: "Créez votre compte",
    description: "Inscrivez-vous gratuitement et recevez 10 € offerts sur votre première commande.",
  },
  {
    number: "2",
    title: "Cumulez des points",
    description: "Chaque euro dépensé vous rapporte 1 point fidélité, automatiquement crédité sur votre compte.",
  },
  {
    number: "3",
    title: "Profitez de vos récompenses",
    description: "Dès 300 points, bénéficiez de 10 % de réduction sur votre prochaine commande.",
  },
];

const advantages = [
  {
    title: "Réductions exclusives",
    description:
      "Des remises réservées aux membres fidèles, utilisables sur l'ensemble de notre catalogue.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M16 8l-8 8" />
        <circle cx="9" cy="9" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="15" cy="15" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Accès prioritaire",
    description:
      "Soyez les premiers informés de nos arrivages exceptionnels et réservez les pièces premium avant tout le monde.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    title: "Offres anniversaire",
    description:
      "Un cadeau spécial vous attend chaque année pour célébrer votre fidélité.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 12v10H4V12" />
        <rect x="2" y="7" width="20" height="5" rx="1" />
        <path d="M12 22V7" />
        <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
      </svg>
    ),
  },
];

export default function ProgrammeFidelitePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[var(--color-primary)] py-20 px-6 text-center sm:py-28">
        <span className="inline-block text-xs font-medium uppercase tracking-[0.25em] text-[var(--color-gold)] mb-4">
          Programme fidélité
        </span>
        <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
          Récompensons votre fidélité
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300 leading-relaxed">
          Cumulez des points à chaque commande et profitez de réductions
          exclusives sur nos viandes d&apos;exception.
        </p>
      </section>

      {/* Bonus inscription */}
      <section className="bg-[var(--color-cream)]">
        <div className="max-w-3xl mx-auto px-6 py-12 text-center">
          <div className="inline-flex items-center gap-3 bg-white border border-[var(--color-cream-dark)] rounded-2xl px-8 py-5 shadow-sm">
            <span
              className="flex items-center justify-center w-12 h-12 rounded-full shrink-0"
              style={{ backgroundColor: "rgba(184, 134, 11, 0.12)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
            </span>
            <div className="text-left">
              <p className="font-serif text-lg font-bold text-[var(--color-primary)]">
                10 € offerts à l&apos;inscription
              </p>
              <p className="text-sm text-gray-500 mt-0.5">
                Créez votre compte et recevez immédiatement votre bonus de bienvenue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="bg-white py-16 px-6 sm:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
              Simple et généreux
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[var(--color-primary)] sm:text-4xl">
              Comment ça marche ?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div
                  className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full font-serif text-xl font-bold text-white"
                  style={{ backgroundColor: "var(--color-accent)" }}
                >
                  {step.number}
                </div>
                <h3 className="font-serif text-lg font-bold text-[var(--color-primary)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Conversion callout */}
          <div className="mt-16 bg-[var(--color-cream)] rounded-2xl border border-[var(--color-cream-dark)] p-8 text-center sm:p-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
              <div>
                <p className="font-serif text-4xl font-bold text-[var(--color-accent)] sm:text-5xl">
                  1 €
                </p>
                <p className="text-sm text-gray-500 mt-1">dépensé</p>
              </div>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 hidden sm:block" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
              <div>
                <p className="font-serif text-4xl font-bold text-[var(--color-gold)] sm:text-5xl">
                  1 point
                </p>
                <p className="text-sm text-gray-500 mt-1">fidélité</p>
              </div>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 hidden sm:block" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
              <div>
                <p className="font-serif text-4xl font-bold text-[var(--color-accent)] sm:text-5xl">
                  300 pts
                </p>
                <p className="text-sm text-gray-500 mt-1">= 10 % de réduction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="bg-[var(--color-cream)] py-16 px-6 sm:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
              Vos privilèges
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[var(--color-primary)] sm:text-4xl">
              Les avantages membres
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {advantages.map((adv) => (
              <div
                key={adv.title}
                className="bg-white rounded-2xl border border-[var(--color-cream-dark)] p-8 text-center"
              >
                <div
                  className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: "rgba(124, 29, 29, 0.08)",
                    color: "var(--color-accent)",
                  }}
                >
                  {adv.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-[var(--color-primary)]">
                  {adv.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  {adv.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-primary)] py-16 px-6 text-center sm:py-24">
        <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
          Rejoignez le programme
        </h2>
        <p className="mx-auto mt-4 max-w-md text-gray-300 text-sm leading-relaxed">
          Créez votre compte en quelques secondes et commencez à cumuler des
          points dès votre première commande.
        </p>
        <Link
          href="/compte"
          className="inline-block mt-8 px-10 py-4 rounded-lg text-white font-semibold transition-colors"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          Créer un compte
        </Link>
      </section>
    </div>
  );
}
