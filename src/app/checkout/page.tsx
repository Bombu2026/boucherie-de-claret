"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { shop } from "@/config/shop";
import { formatPrice } from "@/lib/utils";
import { estimateChronofresh, getChronofreshMessage } from "@/lib/chronofresh";
import type { DeliveryMethod, DeliverySlot, ChronofreshEstimate } from "@/types";

// ── Types ────────────────────────────────────────────────────────────────────

interface CustomerFields {
  nom: string;
  email: string;
  telephone: string;
}

interface DeliveryFields {
  method: DeliveryMethod;
  adresse: string;
  codePostal: string;
  ville: string;
  slotId: string;
}

type Step = 1 | 2 | 3;

// ── Slot generation ──────────────────────────────────────────────────────────

function generateSlots(): DeliverySlot[] {
  const slots: DeliverySlot[] = [];
  const today = new Date();
  const labels = [
    { time: "09h00 – 12h00", suffix: "matin" },
    { time: "14h00 – 18h00", suffix: "après-midi" },
  ];
  let id = 0;
  for (let d = 1; d <= 3; d++) {
    const date = new Date(today);
    date.setDate(today.getDate() + d);
    const dateStr = date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    for (const l of labels) {
      id++;
      slots.push({
        id: `slot-${id}`,
        date: dateStr,
        time: l.time,
        available: true,
      });
    }
  }
  return slots.slice(0, 5);
}

const DELIVERY_SLOTS = generateSlots();

// ── Capitalize helper ─────────────────────────────────────────────────────────

function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── Stepper ──────────────────────────────────────────────────────────────────

const STEPS = [
  { n: 1, label: "Informations" },
  { n: 2, label: "Livraison" },
  { n: 3, label: "Récapitulatif" },
];

function Stepper({ current }: { current: Step }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((s, i) => (
        <div key={s.n} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                current > s.n
                  ? "bg-green-500 border-green-500 text-white"
                  : current === s.n
                  ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-white"
                  : "bg-white border-gray-200 text-gray-300"
              }`}
            >
              {current > s.n ? "✓" : s.n}
            </div>
            <span
              className={`text-xs mt-1.5 font-medium ${
                current >= s.n ? "text-[var(--color-primary)]" : "text-gray-300"
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`h-0.5 w-16 mx-1 mb-4 transition-colors ${
                current > s.n ? "bg-green-400" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Chronofresh icon ─────────────────────────────────────────────────────────

function IconSnowflake({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <polyline points="6 8 12 2 18 8" />
      <polyline points="6 16 12 22 18 16" />
      <polyline points="8 6 2 12 8 18" />
      <polyline points="16 6 22 12 16 18" />
    </svg>
  );
}

function IconPackage({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function IconThermometer({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
  );
}

// ── Chronofresh card ─────────────────────────────────────────────────────────

function ChronofreshCard({ estimate }: { estimate: ChronofreshEstimate }) {
  const message = getChronofreshMessage(estimate);
  return (
    <div className="border-2 border-[#0077B6] rounded-xl p-4 bg-blue-50 space-y-3">
      {/* Header branding */}
      <div className="flex items-center gap-2">
        <IconSnowflake className="w-5 h-5 text-[#0077B6] shrink-0" />
        <span className="font-bold text-[#0077B6] text-sm tracking-wide">
          Chronofresh
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-600">
        Livraison spécialisée produits frais — Chaîne du froid garantie de A à Z
      </p>

      {/* Estimation dynamique */}
      <div className="bg-white rounded-lg p-3 space-y-1 border border-blue-100">
        <p className="text-xs text-gray-500">{message}</p>
        <p className="text-sm font-semibold text-[var(--color-primary)]">
          Livraison estimée entre{" "}
          <span className="text-[#0077B6]">{estimate.minHours}h</span> et{" "}
          <span className="text-[#0077B6]">{estimate.maxHours}h</span>
        </p>
        <p className="text-sm font-medium text-[var(--color-primary)]">
          {capitalize(estimate.estimatedDate)}
        </p>
      </div>

      {/* Bandeau cutoff */}
      {estimate.cutoffPassed ? (
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-700">
          <span className="mt-0.5 shrink-0">ℹ</span>
          <span>Commandez demain avant 14h pour une expédition plus rapide</span>
        </div>
      ) : (
        <div className="flex items-start gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-xs text-green-700">
          <span className="mt-0.5 shrink-0">●</span>
          <span>Commandez maintenant pour une expédition aujourd&apos;hui !</span>
        </div>
      )}
    </div>
  );
}

// ── Trust badges ─────────────────────────────────────────────────────────────

function TrustBadges() {
  const badges = [
    { icon: <IconPackage className="w-4 h-4 text-gray-400" />, label: "Emballage isotherme" },
    { icon: <IconSnowflake className="w-4 h-4 text-gray-400" />, label: "Gel eutectique" },
    { icon: <IconThermometer className="w-4 h-4 text-gray-400" />, label: "0°C à 4°C garanti" },
  ];
  return (
    <div className="border-t border-gray-100 pt-3">
      <div className="flex items-center justify-between gap-2">
        {badges.map((b) => (
          <div key={b.label} className="flex items-center gap-1.5 flex-1 justify-center">
            {b.icon}
            <span className="text-xs text-gray-400 whitespace-nowrap">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Cart summary (compact) ───────────────────────────────────────────────────

function CartSummary({ deliveryMethod }: { deliveryMethod: DeliveryMethod }) {
  const { items, subtotal, total, promoDiscount } = useCart();
  const deliveryFee = deliveryMethod === "click-collect"
    ? 0
    : subtotal >= shop.freeDeliveryThreshold
    ? 0
    : shop.deliveryFee;
  const grandTotal = total + deliveryFee;

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-cream-dark)] p-5">
      <h3 className="font-serif text-base font-bold text-[var(--color-primary)] mb-4">
        Votre commande
      </h3>
      <div className="space-y-2 mb-4">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="flex justify-between text-sm">
            <span className="text-gray-600 truncate pr-2">
              {product.name}{" "}
              <span className="text-gray-400">×{quantity}</span>
            </span>
            <span className="font-medium text-[var(--color-primary)] shrink-0">
              {formatPrice(product.price * quantity)}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-[var(--color-cream-dark)] pt-3 space-y-1.5 text-sm">
        {promoDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Réduction ({promoDiscount}%)</span>
            <span>−{formatPrice((subtotal * promoDiscount) / 100)}</span>
          </div>
        )}
        {/* Livraison Chronofresh */}
        {deliveryMethod === "chronofresh" && (
          <div className="flex justify-between">
            <span className="text-gray-500">Livraison Chronofresh</span>
            {deliveryFee === 0 ? (
              <span className="text-green-600 font-medium">Offerte</span>
            ) : (
              <span className="text-gray-500">{formatPrice(deliveryFee)}</span>
            )}
          </div>
        )}
        {deliveryMethod === "click-collect" && (
          <div className="flex justify-between text-gray-500">
            <span>Retrait boutique</span>
            <span className="text-green-600 font-medium">Gratuit</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-[var(--color-primary)] text-base pt-1 border-t border-[var(--color-cream-dark)]">
          <span>Total</span>
          <span>{formatPrice(grandTotal)}</span>
        </div>
      </div>
      {/* Mention Chronofresh sous le total */}
      {deliveryMethod === "chronofresh" && (
        <p className="text-xs text-gray-400 mt-2 text-center">
          Livraison fraîcheur Chronofresh 24–48h
        </p>
      )}
    </div>
  );
}

// ── Success modal ────────────────────────────────────────────────────────────

function SuccessModal({ orderNumber }: { orderNumber: string }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-10 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <span className="text-green-500 text-3xl font-bold">✓</span>
        </div>
        <h2 className="font-serif text-2xl font-bold text-[var(--color-primary)] mb-2">
          Commande confirmée !
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          Merci pour votre confiance. Vous recevrez une confirmation par email.
        </p>
        <div className="bg-[var(--color-cream)] rounded-xl px-6 py-3 mb-6 inline-block">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
            Numéro de commande
          </p>
          <p className="font-mono font-bold text-[var(--color-accent)] text-lg">
            {orderNumber}
          </p>
        </div>
        <p className="text-xs text-gray-400 mb-6">
          Conservez ce numéro pour le suivi de votre commande.
        </p>
        <Link
          href="/"
          className="block w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}

// ── Validation helpers ───────────────────────────────────────────────────────

function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}
function isValidPhone(p: string) {
  return /^[\d\s+\-.]{8,15}$/.test(p.replace(/\s/g, ""));
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const { items, subtotal, total, promoCode, clearCart } = useCart();

  const [step, setStep] = useState<Step>(1);
  const [customer, setCustomer] = useState<CustomerFields>({
    nom: "",
    email: "",
    telephone: "",
  });
  const [customerErrors, setCustomerErrors] = useState<Partial<CustomerFields>>({});

  const [delivery, setDelivery] = useState<DeliveryFields>({
    method: "chronofresh",
    adresse: "",
    codePostal: "",
    ville: "",
    slotId: "",
  });
  const [deliveryErrors, setDeliveryErrors] = useState<
    Partial<DeliveryFields & { slot: string }>
  >({});

  const [submitting, setSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  // Chronofresh estimate — computed once on mount (client-side)
  const [cfEstimate, setCfEstimate] = useState<ChronofreshEstimate | null>(null);
  useEffect(() => {
    setCfEstimate(estimateChronofresh());
  }, []);

  const deliveryFee =
    delivery.method === "click-collect"
      ? 0
      : subtotal >= shop.freeDeliveryThreshold
      ? 0
      : shop.deliveryFee;
  const grandTotal = total + deliveryFee;

  // ── Empty cart guard ──
  if (items.length === 0 && !orderNumber) {
    return (
      <div className="min-h-screen bg-[var(--color-cream)] flex flex-col items-center justify-center px-4 py-24">
        <h1 className="font-serif text-3xl font-bold text-[var(--color-primary)] mb-4">
          Votre panier est vide
        </h1>
        <Link
          href="/nos-viandes"
          className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Découvrir nos viandes
        </Link>
      </div>
    );
  }

  // ── Step 1 — Informations ──
  function validateStep1(): boolean {
    const errs: Partial<CustomerFields> = {};
    if (!customer.nom.trim() || customer.nom.trim().length < 2)
      errs.nom = "Nom requis (2 caractères minimum)";
    if (!isValidEmail(customer.email)) errs.email = "Email invalide";
    if (!isValidPhone(customer.telephone)) errs.telephone = "Téléphone invalide";
    setCustomerErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleStep1(e: React.FormEvent) {
    e.preventDefault();
    if (validateStep1()) setStep(2);
  }

  // ── Step 2 — Livraison ──
  function validateStep2(): boolean {
    const errs: Partial<DeliveryFields & { slot: string }> = {};
    if (delivery.method === "chronofresh") {
      if (!delivery.adresse.trim()) errs.adresse = "Adresse requise";
      if (!delivery.codePostal.trim() || !/^\d{5}$/.test(delivery.codePostal.trim()))
        errs.codePostal = "Code postal invalide (5 chiffres)";
      if (!delivery.ville.trim()) errs.ville = "Ville requise";
    }
    if (!delivery.slotId) errs.slot = "Veuillez sélectionner un créneau";
    setDeliveryErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleStep2(e: React.FormEvent) {
    e.preventDefault();
    if (validateStep2()) setStep(3);
  }

  // ── Step 3 — Paiement ──
  async function handlePayment() {
    setSubmitting(true);
    const selectedSlot = DELIVERY_SLOTS.find((s) => s.id === delivery.slotId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customer,
          delivery: {
            method: delivery.method,
            adresse: delivery.adresse,
            codePostal: delivery.codePostal,
            ville: delivery.ville,
            slotId: delivery.slotId,
            slotLabel: selectedSlot
              ? `${selectedSlot.date} — ${selectedSlot.time}`
              : "",
          },
          subtotal,
          total: grandTotal,
          promoCode,
        }),
      });
      const data = (await res.json()) as { orderNumber?: string };
      if (res.ok && data.orderNumber) {
        setOrderNumber(data.orderNumber);
        clearCart();
      }
    } catch {
      // silent — MVP
    } finally {
      setSubmitting(false);
    }
  }

  const selectedSlot = DELIVERY_SLOTS.find((s) => s.id === delivery.slotId);

  return (
    <>
      {orderNumber && <SuccessModal orderNumber={orderNumber} />}

      <div className="min-h-screen bg-[var(--color-cream)]">
        <div className="bg-[var(--color-primary)] py-10 px-6 text-center">
          <h1 className="font-serif text-3xl font-bold text-white">Finaliser ma commande</h1>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-10">
          <Stepper current={step} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main form */}
            <div className="lg:col-span-2">

              {/* ── STEP 1 ── */}
              {step === 1 && (
                <form
                  onSubmit={handleStep1}
                  noValidate
                  className="bg-white rounded-2xl border border-[var(--color-cream-dark)] p-8 space-y-5"
                >
                  <h2 className="font-serif text-xl font-bold text-[var(--color-primary)]">
                    Vos informations
                  </h2>
                  <CheckoutField
                    label="Nom complet"
                    name="nom"
                    value={customer.nom}
                    onChange={(v) => {
                      setCustomer((p) => ({ ...p, nom: v }));
                      setCustomerErrors((p) => ({ ...p, nom: undefined }));
                    }}
                    autoComplete="name"
                    placeholder="Jean Dupont"
                    error={customerErrors.nom}
                  />
                  <CheckoutField
                    label="Email"
                    name="email"
                    type="email"
                    value={customer.email}
                    onChange={(v) => {
                      setCustomer((p) => ({ ...p, email: v }));
                      setCustomerErrors((p) => ({ ...p, email: undefined }));
                    }}
                    autoComplete="email"
                    placeholder="jean@exemple.fr"
                    error={customerErrors.email}
                  />
                  <CheckoutField
                    label="Téléphone"
                    name="telephone"
                    type="tel"
                    value={customer.telephone}
                    onChange={(v) => {
                      setCustomer((p) => ({ ...p, telephone: v }));
                      setCustomerErrors((p) => ({ ...p, telephone: undefined }));
                    }}
                    autoComplete="tel"
                    placeholder="06 00 00 00 00"
                    error={customerErrors.telephone}
                  />
                  <button
                    type="submit"
                    className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white font-semibold py-3 rounded-lg transition-colors mt-2"
                  >
                    Continuer vers la livraison →
                  </button>
                </form>
              )}

              {/* ── STEP 2 ── */}
              {step === 2 && (
                <form
                  onSubmit={handleStep2}
                  noValidate
                  className="bg-white rounded-2xl border border-[var(--color-cream-dark)] p-8 space-y-6"
                >
                  <h2 className="font-serif text-xl font-bold text-[var(--color-primary)]">
                    Mode de livraison
                  </h2>

                  {/* Choix méthode */}
                  <div className="grid grid-cols-2 gap-3">
                    {(
                      [
                        {
                          v: "chronofresh" as DeliveryMethod,
                          label: "Chronofresh — Livraison fraîcheur",
                          sub:
                            deliveryFee === 0
                              ? "Offerte"
                              : formatPrice(shop.deliveryFee),
                        },
                        {
                          v: "click-collect" as DeliveryMethod,
                          label: "Click & Collect",
                          sub: "Retrait en boutique",
                        },
                      ]
                    ).map(({ v, label, sub }) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() =>
                          setDelivery((p) => ({ ...p, method: v, slotId: "" }))
                        }
                        className={`p-4 rounded-xl border-2 text-left transition-colors ${
                          delivery.method === v
                            ? v === "chronofresh"
                              ? "border-[#0077B6] bg-blue-50"
                              : "border-[var(--color-accent)] bg-red-50"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <p className="font-semibold text-sm text-[var(--color-primary)]">
                          {label}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                      </button>
                    ))}
                  </div>

                  {/* Chronofresh : carte + badges + adresse */}
                  {delivery.method === "chronofresh" && (
                    <div className="space-y-4">
                      {/* Carte Chronofresh */}
                      {cfEstimate ? (
                        <ChronofreshCard estimate={cfEstimate} />
                      ) : (
                        <div className="border-2 border-[#0077B6] rounded-xl p-4 bg-blue-50 animate-pulse h-24" />
                      )}

                      {/* Badges de confiance */}
                      <TrustBadges />

                      {/* Formulaire adresse */}
                      <div className="space-y-4 pt-2">
                        <CheckoutField
                          label="Adresse"
                          name="adresse"
                          value={delivery.adresse}
                          onChange={(v) => {
                            setDelivery((p) => ({ ...p, adresse: v }));
                            setDeliveryErrors((p) => ({ ...p, adresse: undefined }));
                          }}
                          autoComplete="street-address"
                          placeholder="12 Rue de la République"
                          error={deliveryErrors.adresse}
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <CheckoutField
                            label="Code postal"
                            name="codePostal"
                            value={delivery.codePostal}
                            onChange={(v) => {
                              setDelivery((p) => ({ ...p, codePostal: v }));
                              setDeliveryErrors((p) => ({ ...p, codePostal: undefined }));
                            }}
                            autoComplete="postal-code"
                            placeholder="83000"
                            error={deliveryErrors.codePostal}
                          />
                          <CheckoutField
                            label="Ville"
                            name="ville"
                            value={delivery.ville}
                            onChange={(v) => {
                              setDelivery((p) => ({ ...p, ville: v }));
                              setDeliveryErrors((p) => ({ ...p, ville: undefined }));
                            }}
                            autoComplete="address-level2"
                            placeholder="Toulon"
                            error={deliveryErrors.ville}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Click & Collect : adresse boutique */}
                  {delivery.method === "click-collect" && (
                    <div className="bg-[var(--color-cream)] rounded-xl p-4 text-sm">
                      <p className="font-semibold text-[var(--color-primary)] mb-1">
                        Adresse de la boutique
                      </p>
                      <p className="text-gray-600">{shop.address}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        Mardi – Samedi : 8h00 – 19h30 · Dimanche : 8h00 – 13h00
                      </p>
                    </div>
                  )}

                  {/* Créneaux */}
                  <div>
                    <p className="text-sm font-medium text-[var(--color-primary)] mb-2">
                      {delivery.method === "chronofresh"
                        ? "Créneau de réception Chronofresh"
                        : "Créneau de retrait"}
                    </p>
                    <div className="space-y-2">
                      {DELIVERY_SLOTS.map((slot) => (
                        <label
                          key={slot.id}
                          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                            delivery.slotId === slot.id
                              ? delivery.method === "chronofresh"
                                ? "border-[#0077B6] bg-blue-50"
                                : "border-[var(--color-accent)] bg-red-50"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name="slot"
                            value={slot.id}
                            checked={delivery.slotId === slot.id}
                            onChange={() => {
                              setDelivery((p) => ({ ...p, slotId: slot.id }));
                              setDeliveryErrors((p) => ({ ...p, slot: undefined }));
                            }}
                            className="accent-[var(--color-accent)]"
                          />
                          <div>
                            <span className="text-sm font-medium text-[var(--color-primary)] capitalize">
                              {slot.date}
                            </span>
                            <span className="text-xs text-gray-400 ml-2">{slot.time}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                    {deliveryErrors.slot && (
                      <p className="text-red-500 text-xs mt-1">{deliveryErrors.slot}</p>
                    )}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 border border-gray-200 text-gray-500 hover:text-[var(--color-primary)] font-semibold py-3 rounded-lg text-sm transition-colors"
                    >
                      ← Retour
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                      Continuer →
                    </button>
                  </div>
                </form>
              )}

              {/* ── STEP 3 ── */}
              {step === 3 && (
                <div className="bg-white rounded-2xl border border-[var(--color-cream-dark)] p-8 space-y-6">
                  <h2 className="font-serif text-xl font-bold text-[var(--color-primary)]">
                    Récapitulatif &amp; Paiement
                  </h2>

                  {/* Récap infos */}
                  <div className="space-y-3">
                    <RecapBlock title="Vos informations">
                      <p>{customer.nom}</p>
                      <p className="text-gray-400">{customer.email}</p>
                      <p className="text-gray-400">{customer.telephone}</p>
                    </RecapBlock>

                    <RecapBlock title="Livraison">
                      {delivery.method === "chronofresh" ? (
                        <>
                          <p className="font-medium text-[#0077B6]">
                            Chronofresh — Livraison fraîcheur
                          </p>
                          <p className="text-gray-400">
                            {delivery.adresse}, {delivery.codePostal} {delivery.ville}
                          </p>
                          {cfEstimate && (
                            <p className="text-gray-400">
                              Livraison estimée le{" "}
                              <span className="font-medium">
                                {capitalize(cfEstimate.estimatedDate)}
                              </span>
                            </p>
                          )}
                        </>
                      ) : (
                        <>
                          <p>Click &amp; Collect</p>
                          <p className="text-gray-400">{shop.address}</p>
                        </>
                      )}
                      {selectedSlot && (
                        <p className="text-gray-400 capitalize">
                          {selectedSlot.date} — {selectedSlot.time}
                        </p>
                      )}
                    </RecapBlock>
                  </div>

                  {/* Moyen de paiement simulé */}
                  <div>
                    <p className="text-sm font-medium text-[var(--color-primary)] mb-3">
                      Moyen de paiement
                    </p>
                    <div className="border-2 border-[var(--color-accent)] bg-red-50 rounded-xl p-4 text-sm">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">💳</span>
                        <div>
                          <p className="font-semibold text-[var(--color-primary)]">
                            Carte bancaire (simulation)
                          </p>
                          <p className="text-gray-400 text-xs">
                            Paiement sécurisé — aucune donnée réelle traitée
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Total final */}
                  <div className="bg-[var(--color-cream)] rounded-xl p-4 flex justify-between items-center">
                    <span className="font-semibold text-[var(--color-primary)]">
                      Total à payer
                    </span>
                    <span className="font-bold text-[var(--color-accent)] text-xl">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>

                  {/* Bandeau Chronofresh avant le bouton payer */}
                  {delivery.method === "chronofresh" && (
                    <div className="flex items-start gap-3 bg-blue-50 border border-[#0077B6]/30 rounded-xl px-4 py-3 text-sm text-[#005f8e]">
                      <IconSnowflake className="w-4 h-4 shrink-0 mt-0.5 text-[#0077B6]" />
                      <p>
                        Vos produits seront expédiés sous emballage isotherme via Chronofresh.
                        Chaîne du froid respectée de notre atelier à votre porte.
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 border border-gray-200 text-gray-500 hover:text-[var(--color-primary)] font-semibold py-3 rounded-lg text-sm transition-colors"
                    >
                      ← Retour
                    </button>
                    <button
                      type="button"
                      onClick={handlePayment}
                      disabled={submitting}
                      className="flex-1 bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                      {submitting ? "Traitement…" : `Payer ${formatPrice(grandTotal)}`}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar récap panier */}
            <div className="lg:col-span-1">
              <CartSummary deliveryMethod={delivery.method} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function CheckoutField({
  label,
  name,
  type = "text",
  value,
  onChange,
  autoComplete,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={`checkout-${name}`}
        className="block text-sm font-medium text-[var(--color-primary)] mb-1.5"
      >
        {label}
      </label>
      <input
        id={`checkout-${name}`}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`w-full border rounded-lg px-4 py-2.5 text-sm bg-[var(--color-cream)] focus:outline-none transition-colors ${
          error
            ? "border-red-400 focus:border-red-400"
            : "border-gray-200 focus:border-[var(--color-accent)]"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function RecapBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-[var(--color-cream-dark)] rounded-xl p-4 text-sm">
      <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
        {title}
      </p>
      <div className="text-[var(--color-primary)] space-y-0.5">{children}</div>
    </div>
  );
}
