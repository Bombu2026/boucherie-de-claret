import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { CartItem, DeliveryMethod } from "@/types";

interface CustomerInfo {
  nom: string;
  email: string;
  telephone: string;
}

interface DeliveryInfo {
  method: DeliveryMethod;
  adresse?: string;
  codePostal?: string;
  ville?: string;
  slotId: string;
  slotLabel: string;
}

interface CheckoutBody {
  items: CartItem[];
  customer: CustomerInfo;
  delivery: DeliveryInfo;
  subtotal: number;
  total: number;
  promoCode?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  return /^[\d\s\+\-\.]{8,15}$/.test(phone.replace(/\s/g, ""));
}

function generateOrderNumber(): string {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `CMD-${random}`;
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corps de requête invalide" },
      { status: 400 }
    );
  }

  const { items, customer, delivery, subtotal, total } =
    body as Partial<CheckoutBody>;

  // Validation items
  if (!items || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { error: "Le panier est vide" },
      { status: 400 }
    );
  }

  // Validation client
  if (!customer?.nom || customer.nom.trim().length < 2) {
    return NextResponse.json(
      { error: "Le nom est requis" },
      { status: 400 }
    );
  }
  if (!customer?.email || !isValidEmail(customer.email)) {
    return NextResponse.json(
      { error: "Adresse email invalide" },
      { status: 400 }
    );
  }
  if (!customer?.telephone || !isValidPhone(customer.telephone)) {
    return NextResponse.json(
      { error: "Numéro de téléphone invalide" },
      { status: 400 }
    );
  }

  // Validation livraison
  if (!delivery?.method || !["livraison", "click-collect"].includes(delivery.method)) {
    return NextResponse.json(
      { error: "Méthode de livraison invalide" },
      { status: 400 }
    );
  }

  if (delivery.method === "livraison") {
    if (!delivery.adresse?.trim() || !delivery.codePostal?.trim() || !delivery.ville?.trim()) {
      return NextResponse.json(
        { error: "Adresse de livraison incomplète" },
        { status: 400 }
      );
    }
  }

  if (!delivery.slotId) {
    return NextResponse.json(
      { error: "Veuillez sélectionner un créneau" },
      { status: 400 }
    );
  }

  // Génération du numéro de commande
  const orderNumber = generateOrderNumber();
  const createdAt = new Date().toISOString();

  // MVP : log uniquement, pas de vrai paiement
  console.log("[Checkout] Nouvelle commande :", {
    orderNumber,
    customer: { ...customer, email: customer.email },
    itemCount: items.length,
    delivery: delivery.method,
    slot: delivery.slotLabel,
    subtotal,
    total,
    createdAt,
  });

  return NextResponse.json(
    {
      success: true,
      orderNumber,
      message: "Commande confirmée",
      estimatedDelivery: delivery.slotLabel,
    },
    { status: 201 }
  );
}
