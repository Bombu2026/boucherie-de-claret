import type { Metadata } from "next";
import { shop } from "@/config/shop";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contactez-nous",
  description:
    "Contactez la Boucherie de Claret à Toulon. Renseignements produits, commandes, livraisons — notre équipe vous répond sous 24h.",
};

const HORAIRES = [
  { jour: "Lundi", horaire: "Fermé" },
  { jour: "Mardi – Vendredi", horaire: "8h00 – 19h30" },
  { jour: "Samedi", horaire: "7h30 – 19h30" },
  { jour: "Dimanche", horaire: "8h00 – 13h00" },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      {/* Header */}
      <div className="bg-[var(--color-primary)] py-16 px-6 text-center">
        <p className="text-[var(--color-gold)] uppercase tracking-widest text-xs font-semibold mb-3">
          Nous sommes à votre écoute
        </p>
        <h1 className="font-serif text-5xl font-bold text-white">
          Contactez-nous
        </h1>
        <p className="text-gray-300 mt-4 max-w-lg mx-auto">
          Une question sur nos produits, une commande spéciale, un problème de
          livraison — notre équipe répond sous 24h.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Formulaire — 3 colonnes */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-[var(--color-cream-dark)] p-8">
            <h2 className="font-serif text-2xl font-bold text-[var(--color-primary)] mb-6">
              Envoyez-nous un message
            </h2>
            <ContactForm />
          </div>

          {/* Infos — 2 colonnes */}
          <div className="lg:col-span-2 space-y-6">
            {/* Adresse */}
            <div className="bg-white rounded-2xl border border-[var(--color-cream-dark)] p-6">
              <h3 className="font-serif text-lg font-bold text-[var(--color-primary)] mb-4">
                La boutique
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex gap-3">
                  <span className="text-[var(--color-accent)] shrink-0 mt-0.5">📍</span>
                  <div>
                    <p className="font-medium text-[var(--color-primary)]">{shop.address}</p>
                    <p className="text-gray-400 text-xs mt-0.5">Parking disponible à proximité</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-[var(--color-accent)] shrink-0 mt-0.5">📞</span>
                  <a
                    href={`tel:${shop.phone.replace(/\s/g, "")}`}
                    className="font-medium text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {shop.phone}
                  </a>
                </div>
                <div className="flex gap-3">
                  <span className="text-[var(--color-accent)] shrink-0 mt-0.5">✉️</span>
                  <a
                    href={`mailto:${shop.email}`}
                    className="font-medium text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors break-all"
                  >
                    {shop.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Horaires */}
            <div className="bg-white rounded-2xl border border-[var(--color-cream-dark)] p-6">
              <h3 className="font-serif text-lg font-bold text-[var(--color-primary)] mb-4">
                Horaires d&apos;ouverture
              </h3>
              <table className="w-full text-sm">
                <tbody>
                  {HORAIRES.map(({ jour, horaire }) => (
                    <tr
                      key={jour}
                      className="border-b border-[var(--color-cream-dark)] last:border-0"
                    >
                      <td className="py-2 text-gray-600">{jour}</td>
                      <td
                        className={`py-2 text-right font-medium ${
                          horaire === "Fermé"
                            ? "text-gray-400"
                            : "text-[var(--color-primary)]"
                        }`}
                      >
                        {horaire}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Livraison */}
            <div className="bg-[var(--color-primary)] rounded-2xl p-6 text-white">
              <h3 className="font-serif text-lg font-bold mb-2">
                Livraison à domicile
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Livraison sous 48h dans un rayon de {shop.deliveryRadius} km autour de{" "}
                {shop.city}. Gratuite dès {shop.freeDeliveryThreshold}€ d&apos;achat.
              </p>
              <p className="text-[var(--color-gold)] text-sm mt-3 font-medium">
                Emballage sous-vide · Chaîne du froid garantie
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
