import type { ChronofreshEstimate } from "@/types";

/**
 * Calcule une estimation de livraison Chronofresh basée sur l'heure et le jour de commande.
 *
 * Règles métier :
 * - Commandes avant 14h jours ouvrés : expédition le jour même → livraison 24-36h
 * - Commandes après 14h ou veille de week-end : expédition J+1 ouvré → livraison 36-45h
 * - Commandes week-end : expédition lundi → estimation selon le jour
 * - Pas de livraison le dimanche
 */
export function estimateChronofresh(now = new Date()): ChronofreshEstimate {
  const hour = now.getHours();
  const day = now.getDay(); // 0=dim, 6=sam

  const isWeekend = day === 0 || day === 6;
  const cutoffPassed = hour >= 14;

  let minHours: number;
  let maxHours: number;
  let shippingDate: Date;

  if (isWeekend) {
    // Week-end → expédition lundi
    const daysUntilMonday = day === 0 ? 1 : 2;
    shippingDate = addBusinessDays(now, daysUntilMonday);
    minHours = 24 * daysUntilMonday + 24;
    maxHours = 24 * daysUntilMonday + 45;
  } else if (cutoffPassed) {
    // Après 14h jour ouvré → expédition J+1
    shippingDate = addBusinessDays(now, 1);
    // Si vendredi après 14h → expédition lundi
    if (day === 5) {
      minHours = 72; // sam + dim + lundi matin
      maxHours = 96;
    } else {
      minHours = 36;
      maxHours = 45;
    }
  } else {
    // Avant 14h jour ouvré → expédition aujourd'hui
    shippingDate = now;
    minHours = 24;
    maxHours = 36;
  }

  const deliveryDate = new Date(shippingDate);
  deliveryDate.setHours(deliveryDate.getHours() + minHours);
  // Sauter le dimanche si la livraison tombe un dimanche
  if (deliveryDate.getDay() === 0) {
    deliveryDate.setDate(deliveryDate.getDate() + 1);
  }

  const estimatedDate = deliveryDate.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return {
    minHours,
    maxHours,
    estimatedDate,
    cutoffPassed,
  };
}

function addBusinessDays(date: Date, days: number): Date {
  const result = new Date(date);
  let remaining = days;
  while (remaining > 0) {
    result.setDate(result.getDate() + 1);
    const d = result.getDay();
    if (d !== 0 && d !== 6) remaining--;
  }
  return result;
}

/**
 * Génère un message humain à afficher à l'utilisateur.
 */
export function getChronofreshMessage(estimate: ChronofreshEstimate): string {
  if (estimate.cutoffPassed) {
    return `Commande expédiée demain via Chronofresh. Livraison estimée : ${estimate.estimatedDate}.`;
  }
  return `Commandez avant 14h pour une expédition aujourd'hui. Livraison estimée : ${estimate.estimatedDate}.`;
}
