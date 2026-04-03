import type { Product, CategoryInfo, PartnerProduct, PartnerCategoryInfo, Category } from "@/types";

export const categories: CategoryInfo[] = [
  {
    slug: "boeuf-premium",
    name: "Boeuf Premium",
    description: "Nos plus belles pièces, issues de races d'exception",
  },
  {
    slug: "saucisses-maison",
    name: "Saucisses Maison",
    description: "Préparées chaque jour dans notre atelier",
  },
  {
    slug: "charcuterie",
    name: "Charcuterie",
    description: "Sélection artisanale de charcuteries fines",
  },
  {
    slug: "box-colis",
    name: "Box & Colis",
    description: "Nos coffrets découverte et barbecue",
  },
];

export const partnerCategories: PartnerCategoryInfo[] = [
  { slug: "vins", name: "Vins" },
  { slug: "sauces", name: "Sauces & Marinades" },
  { slug: "epices", name: "Épices & Condiments" },
  { slug: "accompagnements", name: "Accompagnements" },
];

export const products: Product[] = [
  // --- Boeuf Premium ---
  {
    id: "wagyu-premium",
    slug: "wagyu-premium",
    name: "Pack Wagyu Premium",
    description:
      "L'excellence japonaise. Persillage exceptionnel, fondant incomparable.",
    longDescription:
      "Notre Wagyu est sélectionné auprès d'éleveurs certifiés. Chaque pièce offre un persillage de grade A5, garantissant une tendreté et une saveur inégalées. Ce pack comprend 2 faux-filets et 2 entrecôtes Wagyu, soit environ 800g de viande d'exception.",
    price: 249,
    category: "boeuf-premium",
    origin: "Wagyu japonais, élevage certifié",
    cookingTip:
      "Cuisson à la poêle en fonte, 2 min par face à feu vif. Repos 5 min. Ne pas dépasser la cuisson saignante pour préserver le persillage.",
    conservationTip:
      "Conserver sous vide au réfrigérateur entre 0°C et 4°C. Consommer dans les 5 jours après réception. Congélation possible jusqu'à 6 mois.",
    weight: "~800g (4 pièces)",
    image: "/images/wagyu.jpg",
    gallery: ["/images/wagyu.jpg", "/images/wagyu-2.jpg", "/images/wagyu-3.jpg"],
    badge: "Exception",
    featured: true,
  },
  {
    id: "simmental-excellence",
    slug: "simmental-excellence",
    name: "Pack Simmental Excellence",
    description:
      "Race suisse au goût intense. Viande persillée, juteuse et savoureuse.",
    longDescription:
      "La Simmental est réputée pour sa viande rouge intense, finement persillée. Élevée en plein air, elle développe des saveurs profondes et complexes. Pack de 4 pièces : 2 pavés et 2 entrecôtes.",
    price: 89,
    category: "boeuf-premium",
    origin: "Simmental, élevage plein air, France",
    cookingTip:
      "Sortir 30 min avant cuisson. Poêle très chaude, 3 min par face pour une cuisson saignante. Assaisonner après cuisson.",
    conservationTip:
      "Réfrigérateur 0-4°C, sous vide. Consommer sous 5 jours. Ne pas recongeler après décongélation.",
    weight: "~1kg (4 pièces)",
    image: "/images/simmental.jpg",
    gallery: ["/images/simmental.jpg", "/images/simmental-2.jpg", "/images/simmental-3.jpg"],
    badge: "Populaire",
    featured: true,
  },
  {
    id: "cote-boeuf-maturee",
    slug: "cote-boeuf-maturee",
    name: "Côte de Boeuf Maturée 60 jours",
    description:
      "60 jours de maturation pour une concentration de saveurs unique.",
    longDescription:
      "Notre côte de bœuf est maturée pendant 60 jours dans notre chambre de maturation. Ce processus concentre les saveurs et attendrit la viande pour une expérience gustative incomparable. Pièce de 1,2kg minimum, idéale pour 2-3 personnes.",
    price: 69,
    category: "boeuf-premium",
    origin: "Race Charolaise, Bourgogne",
    cookingTip:
      "Sortir 1h avant. Saisir 4 min par face au barbecue ou à la poêle. Finir au four 180°C pendant 15 min. Repos 10 min sous aluminium.",
    conservationTip:
      "La maturation est déjà réalisée. Conserver au réfrigérateur et consommer dans les 3 jours après réception pour une saveur optimale.",
    weight: "~1.2kg (1 pièce)",
    image: "/images/cote-boeuf.jpg",
    gallery: ["/images/cote-boeuf.jpg", "/images/cote-boeuf-2.jpg", "/images/cote-boeuf-3.jpg"],
    badge: "60 jours",
    featured: true,
  },
  {
    id: "black-pearl",
    slug: "black-pearl",
    name: "Pack Black Pearl",
    description:
      "Race rare au goût unique. Viande noire, tendre et exceptionnelle.",
    longDescription:
      "Le Black Pearl est une race bovine rare, prisée pour sa viande d'un rouge profond presque noir. Élevée dans des conditions optimales, elle offre une tendreté et des arômes boisés uniques. Pack de 4 pièces premium.",
    price: 159,
    category: "boeuf-premium",
    origin: "Black Pearl, élevage sélectionné",
    cookingTip:
      "Cuisson douce recommandée. Poêle chaude, 2-3 min par face. Laisser reposer autant que le temps de cuisson.",
    conservationTip:
      "Sous vide, entre 0°C et 4°C. Consommer dans les 5 jours. Se congèle parfaitement sous vide jusqu'à 6 mois.",
    weight: "~900g (4 pièces)",
    image: "/images/black-pearl.jpg",
    gallery: ["/images/black-pearl.jpg", "/images/black-pearl-2.jpg"],
    badge: "Rare",
  },
  {
    id: "aubrac-tradition",
    slug: "aubrac-tradition",
    name: "Pack Aubrac Tradition",
    description:
      "L'Aubrac, fierté de l'Aveyron. Viande de caractère, goût intense.",
    longDescription:
      "Race rustique emblématique du plateau de l'Aubrac, cette viande est le fruit d'un élevage extensif en plein air. Son goût prononcé et sa texture ferme en font une viande de caractère. Pack de 4 pièces : 2 bavettes et 2 faux-filets.",
    price: 79,
    category: "boeuf-premium",
    origin: "Race Aubrac, Aveyron",
    cookingTip:
      "La bavette se cuit vite à feu vif, 2 min par face. Le faux-filet supporte une cuisson à point. Sel et poivre du moulin.",
    conservationTip:
      "Réfrigérateur 0-4°C sous vide. Consommer sous 5 jours après réception.",
    weight: "~1kg (4 pièces)",
    image: "/images/aubrac.jpg",
    gallery: ["/images/aubrac.jpg", "/images/aubrac-2.jpg"],
  },
  {
    id: "charolaise-selection",
    slug: "charolaise-selection",
    name: "Pack Charolaise Sélection",
    description:
      "La référence française. Viande tendre, maigre et savoureuse.",
    longDescription:
      "La Charolaise est la race emblématique de la boucherie française. Reconnue pour sa viande maigre mais tendre, elle offre un équilibre parfait entre goût et texture. Pack de 4 pièces sélectionnées par notre maître boucher.",
    price: 75,
    category: "boeuf-premium",
    origin: "Race Charolaise, Bourgogne",
    cookingTip:
      "Viande maigre, ne pas surcuire. Poêle bien chaude avec une noix de beurre, 3 min par face. Repos obligatoire.",
    conservationTip:
      "Conserver sous vide entre 0°C et 4°C. Consommer dans les 5 jours après réception.",
    weight: "~1kg (4 pièces)",
    image: "/images/charolaise.jpg",
    gallery: ["/images/charolaise.jpg", "/images/charolaise-2.jpg"],
  },
  {
    id: "gasconne-terroir",
    slug: "gasconne-terroir",
    name: "Pack Gasconne Terroir",
    description:
      "Race pyrénéenne rustique. Goût authentique du Sud-Ouest.",
    longDescription:
      "Élevée dans les contreforts pyrénéens, la Gasconne est une race rustique qui donne une viande au goût prononcé, reflet de son terroir. Idéale pour les amateurs de saveurs authentiques. Pack de 4 pièces du terroir.",
    price: 72,
    category: "boeuf-premium",
    origin: "Race Gasconne, Pyrénées",
    cookingTip:
      "Se prête autant à la grillade qu'au braisé. Pour une grillade, feu vif 3 min par face. Pour un braisé, cuisson longue à 140°C.",
    conservationTip:
      "Réfrigérateur 0-4°C sous vide. Consommer sous 5 jours. Idéal pour une cuisson le jour même de réception.",
    weight: "~1kg (4 pièces)",
    image: "/images/gasconne.jpg",
    gallery: ["/images/gasconne.jpg", "/images/gasconne-2.jpg"],
  },

  // --- Saucisses Maison ---
  {
    id: "saucisses-assortiment",
    slug: "saucisses-assortiment",
    name: "Assortiment Saucisses Maison",
    description:
      "6 saucisses artisanales : nature, herbes de Provence, piment d'Espelette.",
    longDescription:
      "Préparées chaque matin dans notre atelier, nos saucisses sont élaborées à partir de viande fraîche de première qualité. Cet assortiment comprend 2 natures, 2 aux herbes de Provence et 2 au piment d'Espelette.",
    price: 35,
    category: "saucisses-maison",
    origin: "Fabrication maison, viande française",
    cookingTip:
      "Griller à feu moyen 12-15 min en les retournant régulièrement. Ne pas piquer pour garder le jus.",
    conservationTip:
      "Réfrigérateur 0-4°C. Consommer dans les 3 jours après réception. Congélation possible jusqu'à 3 mois.",
    weight: "~600g (6 pièces)",
    image: "/images/saucisses.jpg",
    gallery: ["/images/saucisses.jpg", "/images/saucisses-2.jpg"],
  },
  {
    id: "merguez-artisanales",
    slug: "merguez-artisanales",
    name: "Merguez Artisanales",
    description:
      "Recette maison aux épices sélectionnées. Le goût du vrai.",
    longDescription:
      "Nos merguez sont préparées selon une recette traditionnelle avec des épices soigneusement dosées : cumin, coriandre, piment doux, harissa. 100% boeuf et agneau, sans colorant artificiel.",
    price: 28,
    category: "saucisses-maison",
    origin: "Fabrication maison, viande française",
    cookingTip:
      "Barbecue ou poêle, feu moyen, 10-12 min. Retourner délicatement sans piquer.",
    conservationTip:
      "Réfrigérateur 0-4°C. Consommer dans les 3 jours. Ne pas recongeler si décongelées.",
    weight: "~500g (8 pièces)",
    image: "/images/merguez.jpg",
    gallery: ["/images/merguez.jpg", "/images/merguez-2.jpg"],
  },

  // --- Charcuterie ---
  {
    id: "plateau-charcuterie",
    slug: "plateau-charcuterie",
    name: "Plateau Charcuterie Premium",
    description:
      "Sélection de charcuteries fines pour un apéritif d'exception.",
    longDescription:
      "Notre plateau comprend une sélection de charcuteries artisanales : coppa, bresaola, saucisson sec, jambon cru affiné 18 mois, et rillettes de canard. Idéal pour un apéritif ou une entrée raffinée.",
    price: 45,
    category: "charcuterie",
    origin: "Artisans charcutiers sélectionnés, France",
    cookingTip:
      "Sortir du réfrigérateur 20 min avant dégustation. Servir à température ambiante pour libérer tous les arômes.",
    conservationTip:
      "Réfrigérateur 0-4°C. Consommer dans les 4 jours. Une fois ouvert, emballer dans du film alimentaire.",
    weight: "~400g",
    image: "/images/charcuterie.jpg",
    gallery: ["/images/charcuterie.jpg", "/images/charcuterie-2.jpg"],
  },
  {
    id: "terrine-campagne",
    slug: "terrine-campagne",
    name: "Terrine de Campagne Maison",
    description:
      "Recette traditionnelle de notre chef. Texture rustique, goût authentique.",
    longDescription:
      "Préparée dans notre atelier selon une recette transmise de génération en génération. Porc fermier, foie de volaille, cognac et épices fines. Cuite lentement au four pour une texture parfaite.",
    price: 18,
    category: "charcuterie",
    origin: "Fabrication maison",
    cookingTip:
      "Se déguste sur du pain de campagne grillé, accompagnée de cornichons et moutarde à l'ancienne.",
    conservationTip:
      "Réfrigérateur 0-4°C. Se conserve jusqu'à 10 jours non entamée. Une fois ouverte, consommer sous 3 jours.",
    weight: "~300g",
    image: "/images/terrine.jpg",
    gallery: ["/images/terrine.jpg"],
  },

  // --- Box & Colis ---
  {
    id: "box-barbecue",
    slug: "box-barbecue",
    name: "Box Barbecue",
    description:
      "Tout pour un barbecue d'exception. Viandes, saucisses, marinades.",
    longDescription:
      "Notre Box Barbecue réunit le meilleur pour vos grillades : 2 entrecôtes de Charolaise, 4 saucisses maison, 4 merguez artisanales, 2 brochettes marinées et notre sauce BBQ maison. Pour 4-6 personnes.",
    price: 129,
    category: "box-colis",
    origin: "Multiples origines premium",
    cookingTip:
      "Sortir les viandes 30 min avant. Commencer par les pièces épaisses, finir par les saucisses. Braises moyennes, pas de flammes directes.",
    conservationTip:
      "Réfrigérateur 0-4°C dès réception. Les différentes pièces peuvent avoir des DLC différentes — consulter les étiquettes individuelles.",
    weight: "~2.5kg",
    image: "/images/box-bbq.jpg",
    gallery: ["/images/box-bbq.jpg", "/images/box-bbq-2.jpg", "/images/box-bbq-3.jpg"],
    badge: "Best-seller",
    featured: true,
  },
  {
    id: "box-decouverte",
    slug: "box-decouverte",
    name: "Box Découverte",
    description:
      "Idéale pour découvrir nos viandes d'exception. 5 races, 5 saveurs.",
    longDescription:
      "Découvrez 5 de nos plus belles races en un seul coffret : un pavé de Simmental, une bavette d'Aubrac, un faux-filet de Charolaise, une entrecôte de Gasconne et des saucisses maison. Le tour de France des saveurs.",
    price: 99,
    category: "box-colis",
    origin: "5 races françaises d'exception",
    cookingTip:
      "Chaque pièce a son conseil cuisson détaillé sur la fiche incluse dans le colis.",
    conservationTip:
      "Chaque pièce est emballée sous vide individuellement. Réfrigérateur 0-4°C, consommer sous 5 jours.",
    weight: "~1.5kg",
    image: "/images/box-decouverte.jpg",
    gallery: ["/images/box-decouverte.jpg", "/images/box-decouverte-2.jpg"],
    badge: "Découverte",
  },
  {
    id: "box-prestige",
    slug: "box-prestige",
    name: "Box Prestige",
    description:
      "Le summum du goût. Wagyu, Black Pearl, côte maturée. Cadeau idéal.",
    longDescription:
      "Notre coffret le plus exclusif : 2 pièces de Wagyu A5, 2 pièces de Black Pearl, 1 côte de bœuf maturée 60 jours et notre plateau charcuterie premium. Livré dans un écrin cadeau. Pour 4-6 personnes.",
    price: 349,
    category: "box-colis",
    origin: "Sélection des meilleures races mondiales",
    cookingTip:
      "Guide de cuisson détaillé inclus pour chaque pièce. Nous recommandons une cuisson pièce par pièce pour apprécier chaque race.",
    conservationTip:
      "Écrin isotherme. Placer immédiatement au réfrigérateur 0-4°C. Consulter les DLC individuelles sur chaque pièce.",
    weight: "~3kg",
    image: "/images/box-prestige.jpg",
    gallery: ["/images/box-prestige.jpg", "/images/box-prestige-2.jpg", "/images/box-prestige-3.jpg"],
    badge: "Prestige",
  },
];

// ── Produits partenaires ────────────────────────────────────────────────────

export const partnerProducts: PartnerProduct[] = [
  // --- Vins ---
  {
    id: "vin-rouge-cotes-provence",
    slug: "vin-rouge-cotes-provence",
    name: "Côtes de Provence Rouge — Domaine de la Bégude",
    description: "Vin rouge charpenté, notes de fruits noirs et garrigue. Accord parfait avec le boeuf grillé.",
    price: 24,
    category: "vins",
    image: "/images/partner/vin-rouge.jpg",
    badge: "Accord viande",
    pairsWith: ["boeuf-premium", "box-colis"],
    tags: ["boeuf", "grillades", "maturé"],
  },
  {
    id: "vin-rouge-bordeaux",
    slug: "vin-rouge-bordeaux",
    name: "Saint-Émilion Grand Cru 2019",
    description: "Bordeaux rond et puissant, tanins soyeux. Sublime les viandes d'exception.",
    price: 38,
    category: "vins",
    image: "/images/partner/bordeaux.jpg",
    badge: "Premium",
    pairsWith: ["boeuf-premium"],
    tags: ["boeuf", "maturé", "wagyu", "prestige"],
  },
  {
    id: "vin-rose-provence",
    slug: "vin-rose-provence",
    name: "Rosé de Provence — Château Minuty",
    description: "Frais et fruité, idéal pour accompagner vos grillades estivales et charcuteries.",
    price: 18,
    category: "vins",
    image: "/images/partner/rose.jpg",
    pairsWith: ["saucisses-maison", "charcuterie", "box-colis"],
    tags: ["grillades", "charcuterie", "barbecue", "apéritif"],
  },

  // --- Sauces & Marinades ---
  {
    id: "sauce-poivre",
    slug: "sauce-poivre",
    name: "Sauce au Poivre Artisanale",
    description: "Sauce onctueuse au poivre vert de Madagascar. Idéale sur vos pavés et entrecôtes.",
    price: 8,
    category: "sauces",
    image: "/images/partner/sauce-poivre.jpg",
    pairsWith: ["boeuf-premium"],
    tags: ["boeuf", "pavé", "entrecôte"],
  },
  {
    id: "marinade-bbq",
    slug: "marinade-bbq",
    name: "Marinade BBQ Fumée",
    description: "Marinade au paprika fumé, miel et romarin. Transforme vos grillades.",
    price: 9,
    category: "sauces",
    image: "/images/partner/marinade-bbq.jpg",
    badge: "BBQ",
    pairsWith: ["saucisses-maison", "box-colis", "boeuf-premium"],
    tags: ["grillades", "barbecue", "saucisses"],
  },
  {
    id: "moutarde-ancienne",
    slug: "moutarde-ancienne",
    name: "Moutarde à l'Ancienne — Maison Fallot",
    description: "Moutarde en grains de Bourgogne, relevée et croquante. L'accompagnement noble.",
    price: 7,
    category: "sauces",
    image: "/images/partner/moutarde.jpg",
    pairsWith: ["boeuf-premium", "charcuterie", "saucisses-maison"],
    tags: ["boeuf", "charcuterie", "classique"],
  },

  // --- Épices & Condiments ---
  {
    id: "sel-guerande",
    slug: "sel-guerande",
    name: "Fleur de Sel de Guérande",
    description: "Fleur de sel récoltée à la main. Finition parfaite pour vos viandes.",
    price: 6,
    category: "epices",
    image: "/images/partner/fleur-sel.jpg",
    pairsWith: ["boeuf-premium", "saucisses-maison", "charcuterie", "box-colis"],
    tags: ["boeuf", "universel", "finition"],
  },
  {
    id: "poivre-kampot",
    slug: "poivre-kampot",
    name: "Poivre de Kampot Noir IGP",
    description: "Poivre rare du Cambodge, notes florales et boisées. L'accord ultime avec le boeuf.",
    price: 12,
    category: "epices",
    image: "/images/partner/poivre-kampot.jpg",
    badge: "IGP",
    pairsWith: ["boeuf-premium"],
    tags: ["boeuf", "maturé", "wagyu", "prestige"],
  },
  {
    id: "melange-grillades",
    slug: "melange-grillades",
    name: "Mélange Épices Grillades",
    description: "Paprika, cumin, coriandre, ail. Notre mélange secret pour des grillades parfaites.",
    price: 8,
    category: "epices",
    image: "/images/partner/epices-grillades.jpg",
    pairsWith: ["saucisses-maison", "box-colis", "boeuf-premium"],
    tags: ["grillades", "barbecue", "saucisses"],
  },

  // --- Accompagnements ---
  {
    id: "cornichons-artisanaux",
    slug: "cornichons-artisanaux",
    name: "Cornichons Artisanaux au Vinaigre",
    description: "Petits cornichons croquants, recette traditionnelle. Indispensable avec la charcuterie.",
    price: 6,
    category: "accompagnements",
    image: "/images/partner/cornichons.jpg",
    pairsWith: ["charcuterie"],
    tags: ["charcuterie", "apéritif", "terrine"],
  },
  {
    id: "pain-campagne",
    slug: "pain-campagne",
    name: "Pain de Campagne au Levain",
    description: "Pain rustique au levain naturel, croûte épaisse. Parfait pour accompagner terrines et charcuteries.",
    price: 5,
    category: "accompagnements",
    image: "/images/partner/pain.jpg",
    pairsWith: ["charcuterie"],
    tags: ["charcuterie", "terrine", "apéritif"],
  },
];

// ── Codes promo ─────────────────────────────────────────────────────────────

export const promoCodes: Record<string, number> = {
  BIENVENUE10: 10,
  CLARET20: 20,
  PREMIUM15: 15,
};

// ── Helpers produits principaux ─────────────────────────────────────────────

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

// ── Helpers produits partenaires ─────────────────────────────────────────────

export function getPartnerBySlug(slug: string): PartnerProduct | undefined {
  return partnerProducts.find((p) => p.slug === slug);
}

/**
 * Recommande des produits partenaires basés sur les catégories présentes dans le panier.
 * Trie par pertinence (nombre de catégories matchées) puis limite à `limit` résultats.
 */
export function getRecommendedPartners(
  cartCategories: Category[],
  excludeIds: string[] = [],
  limit = 6
): PartnerProduct[] {
  if (cartCategories.length === 0) return partnerProducts.slice(0, limit);

  const uniqueCategories = [...new Set(cartCategories)];

  const scored = partnerProducts
    .filter((p) => !excludeIds.includes(p.id))
    .map((p) => {
      const score = uniqueCategories.reduce(
        (acc, cat) => acc + (p.pairsWith.includes(cat) ? 1 : 0),
        0
      );
      return { product: p, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.product);
}
