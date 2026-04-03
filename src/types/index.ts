export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  category: Category;
  origin: string;
  cookingTip: string;
  conservationTip: string;
  weight: string;
  image: string;
  gallery: string[];
  badge?: string;
  featured?: boolean;
}

export type Category = "boeuf-premium" | "saucisses-maison" | "charcuterie" | "box-colis";

export interface CategoryInfo {
  slug: Category;
  name: string;
  description: string;
}

export interface PartnerProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: PartnerCategory;
  image: string;
  badge?: string;
  /** IDs de catégories de produits principaux avec lesquels cet article se marie */
  pairsWith: Category[];
  /** Tags pour affiner les recommandations (ex: "boeuf", "grillades", "apéritif") */
  tags: string[];
}

export type PartnerCategory = "vins" | "sauces" | "epices" | "accompagnements";

export interface PartnerCategoryInfo {
  slug: PartnerCategory;
  name: string;
}

export interface CartItem {
  product: Product | PartnerProduct;
  quantity: number;
  isPartner?: boolean;
}

export interface CartState {
  items: CartItem[];
  promoCode: string | null;
  promoDiscount: number;
}

export interface DeliverySlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

export type DeliveryMethod = "chronofresh" | "click-collect";

export interface ChronofreshEstimate {
  minHours: number;
  maxHours: number;
  estimatedDate: string;
  cutoffPassed: boolean;
}

export interface ShopConfig {
  name: string;
  tagline: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  deliveryRadius: number;
  freeDeliveryThreshold: number;
  deliveryFee: number;
  colors: {
    primary: string;
    accent: string;
    cream: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  social: {
    instagram?: string;
    facebook?: string;
  };
}
