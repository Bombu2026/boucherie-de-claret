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
  weight: string;
  image: string;
  badge?: string;
  featured?: boolean;
}

export type Category = "boeuf-premium" | "saucisses-maison" | "charcuterie" | "box-colis";

export interface CategoryInfo {
  slug: Category;
  name: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
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

export type DeliveryMethod = "livraison" | "click-collect";

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
