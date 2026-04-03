import type { Product, CategoryInfo } from "@/types";

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
    weight: "~800g (4 pièces)",
    image: "/images/wagyu.jpg",
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
    weight: "~1kg (4 pièces)",
    image: "/images/simmental.jpg",
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
    weight: "~1.2kg (1 pièce)",
    image: "/images/cote-boeuf.jpg",
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
    weight: "~900g (4 pièces)",
    image: "/images/black-pearl.jpg",
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
    weight: "~1kg (4 pièces)",
    image: "/images/aubrac.jpg",
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
    weight: "~1kg (4 pièces)",
    image: "/images/charolaise.jpg",
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
    weight: "~1kg (4 pièces)",
    image: "/images/gasconne.jpg",
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
    weight: "~600g (6 pièces)",
    image: "/images/saucisses.jpg",
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
    weight: "~500g (8 pièces)",
    image: "/images/merguez.jpg",
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
    weight: "~400g",
    image: "/images/charcuterie.jpg",
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
    weight: "~300g",
    image: "/images/terrine.jpg",
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
    weight: "~2.5kg",
    image: "/images/box-bbq.jpg",
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
    weight: "~1.5kg",
    image: "/images/box-decouverte.jpg",
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
    weight: "~3kg",
    image: "/images/box-prestige.jpg",
    badge: "Prestige",
  },
];

export const promoCodes: Record<string, number> = {
  BIENVENUE10: 10,
  CLARET20: 20,
  PREMIUM15: 15,
};

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
