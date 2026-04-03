import type { ShopConfig } from "@/types";

/**
 * TEMPLATE CONFIG — Modifier ces valeurs pour personnaliser le site
 * pour une autre boucherie.
 */
export const shop: ShopConfig = {
  name: "Boucherie de Claret",
  tagline: "Viande d'exception livrée chez vous à Toulon",
  city: "Toulon",
  address: "12 Rue de Claret, 83000 Toulon",
  phone: "04 94 00 00 00",
  email: "contact@boucherie-claret.fr",
  deliveryRadius: 100,
  freeDeliveryThreshold: 100,
  deliveryFee: 9.90,
  colors: {
    primary: "#1a1a1a",
    accent: "#7C1D1D",
    cream: "#FAF5F0",
  },
  seo: {
    title: "Boucherie de Claret — Viande Premium à Toulon",
    description:
      "Boucherie artisanale haut de gamme à Toulon. Wagyu, Simmental, Black Pearl, maturation d'exception. Livraison 48h.",
    keywords: [
      "boucherie Toulon",
      "viande premium Toulon",
      "boucherie artisanale",
      "wagyu Toulon",
      "viande maturée",
      "livraison viande Toulon",
    ],
  },
  social: {
    instagram: "https://instagram.com/boucherie.claret",
    facebook: "https://facebook.com/boucherie.claret",
  },
};
