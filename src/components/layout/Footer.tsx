import Link from "next/link";
import { shop } from "@/config/shop";

const NAV_LINKS = [
  { label: "Notre histoire", href: "/notre-histoire" },
  { label: "Nos viandes", href: "/nos-viandes" },
  { label: "Contact", href: "/contact" },
  { label: "Mon compte", href: "/compte" },
  { label: "Mon panier", href: "/panier" },
];

const LEGAL_LINKS = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "CGV", href: "/cgv" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
  { label: "Cookies", href: "/cookies" },
];

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="text-gray-400"
      style={{ backgroundColor: "var(--color-primary)" }}
      aria-label="Pied de page"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 — Marque */}
          <div className="space-y-4">
            <h2
              className="text-xl font-bold text-white tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {shop.name}
            </h2>
            <p className="text-sm leading-relaxed">{shop.tagline}</p>
            {/* Social */}
            <div className="flex gap-3 pt-1">
              {shop.social?.instagram && (
                <a
                  href={shop.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-white/15 text-gray-400 hover:text-white hover:border-white/40 transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
              )}
              {shop.social?.facebook && (
                <a
                  href={shop.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-white/15 text-gray-400 hover:text-white hover:border-white/40 transition-colors"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
              )}
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase tracking-widest">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase tracking-widest">
              Contact
            </h3>
            <address className="not-italic space-y-2.5 text-sm">
              <p>{shop.address}</p>
              <p>
                <a
                  href={`tel:${shop.phone.replace(/\s/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {shop.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${shop.email}`}
                  className="hover:text-white transition-colors"
                >
                  {shop.email}
                </a>
              </p>
            </address>
            {/* Delivery info */}
            <div className="mt-4 pt-4 border-t border-white/10 text-xs space-y-1">
              <p className="text-white/60">
                Livraison offerte à partir de{" "}
                <span className="text-white font-medium">
                  {shop.freeDeliveryThreshold}&nbsp;€
                </span>
              </p>
              <p className="text-white/60">
                Rayon de livraison&nbsp;: {shop.deliveryRadius}&nbsp;km
              </p>
            </div>
          </div>

          {/* Col 4 — Légal */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase tracking-widest">
              Informations
            </h3>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>
            &copy; {year}{" "}
            <span className="text-gray-500">{shop.name}</span> — Tous droits
            réservés.
          </p>
          <p>
            Artisan boucher depuis des générations,{" "}
            <span className="text-gray-500">{shop.city}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
