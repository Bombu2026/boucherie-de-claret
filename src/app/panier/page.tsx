"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { shop } from "@/config/shop";
import { formatPrice } from "@/lib/utils";

export default function PanierPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    total,
    promoCode,
    promoDiscount,
    itemCount,
    applyPromo,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoStatus, setPromoStatus] = useState<"idle" | "success" | "error">("idle");

  const deliveryFee =
    subtotal >= shop.freeDeliveryThreshold ? 0 : shop.deliveryFee;
  const totalWithDelivery = total + deliveryFee;
  const remaining = shop.freeDeliveryThreshold - subtotal;

  function handlePromo() {
    if (!promoInput.trim()) return;
    const ok = applyPromo(promoInput.trim());
    setPromoStatus(ok ? "success" : "error");
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--color-cream)] flex flex-col items-center justify-center px-4 py-24">
        <h1 className="font-serif text-4xl font-bold text-[var(--color-primary)] mb-4">
          Votre panier
        </h1>
        <p className="text-gray-500 mb-8 text-lg">
          Votre panier est vide pour le moment.
        </p>
        <Link
          href="/nos-viandes"
          className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white font-semibold px-8 py-3 rounded transition-colors"
        >
          Découvrir nos viandes
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="font-serif text-4xl font-bold text-[var(--color-primary)] mb-10">
          Votre panier{" "}
          <span className="text-lg font-normal text-gray-500 font-sans">
            ({itemCount} article{itemCount > 1 ? "s" : ""})
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Liste articles */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => {
              const lineTotal = product.price * quantity;
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm border border-[var(--color-cream-dark)] p-4 flex gap-4 items-start"
                >
                  {/* Image placeholder */}
                  <div className="img-placeholder w-20 h-20 rounded-lg shrink-0" />

                  {/* Infos */}
                  <div className="flex-1 min-w-0">
                    <h2 className="font-serif font-semibold text-[var(--color-primary)] text-base leading-tight">
                      {product.name}
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">{product.weight}</p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {formatPrice(product.price)} / unité
                    </p>
                  </div>

                  {/* Quantité */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[var(--color-cream)] transition-colors text-[var(--color-primary)] font-bold"
                      aria-label="Diminuer la quantité"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-semibold text-[var(--color-primary)]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[var(--color-cream)] transition-colors text-[var(--color-primary)] font-bold"
                      aria-label="Augmenter la quantité"
                    >
                      +
                    </button>
                  </div>

                  {/* Sous-total + supprimer */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="font-semibold text-[var(--color-accent)] text-base">
                      {formatPrice(lineTotal)}
                    </span>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors text-xs"
                      aria-label="Supprimer cet article"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Code promo */}
            <div className="bg-white rounded-xl shadow-sm border border-[var(--color-cream-dark)] p-5 mt-6">
              <h3 className="font-serif text-base font-semibold text-[var(--color-primary)] mb-3">
                Code promotionnel
              </h3>
              {promoCode ? (
                <p className="text-green-600 text-sm font-medium">
                  Code <strong>{promoCode}</strong> appliqué — {promoDiscount}% de réduction
                </p>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value);
                      setPromoStatus("idle");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handlePromo()}
                    placeholder="BIENVENUE10"
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-accent)] bg-[var(--color-cream)]"
                  />
                  <button
                    onClick={handlePromo}
                    className="bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Appliquer
                  </button>
                </div>
              )}
              {promoStatus === "error" && (
                <p className="text-red-500 text-xs mt-2">
                  Ce code promotionnel est invalide ou expiré.
                </p>
              )}
            </div>
          </div>

          {/* Récapitulatif */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-[var(--color-cream-dark)] p-6 sticky top-6">
              <h2 className="font-serif text-xl font-bold text-[var(--color-primary)] mb-5">
                Récapitulatif
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Réduction ({promoDiscount}%)</span>
                    <span>−{formatPrice(subtotal * promoDiscount / 100)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Frais de livraison</span>
                  {deliveryFee === 0 ? (
                    <span className="text-green-600 font-medium">Offerts</span>
                  ) : (
                    <span>{formatPrice(deliveryFee)}</span>
                  )}
                </div>

                <div className="border-t border-[var(--color-cream-dark)] pt-3 flex justify-between font-bold text-[var(--color-primary)] text-base">
                  <span>Total</span>
                  <span>{formatPrice(totalWithDelivery)}</span>
                </div>
              </div>

              {remaining > 0 && (
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-700 text-center">
                  Plus que <strong>{formatPrice(remaining)}</strong> pour la livraison offerte !
                </div>
              )}

              <Link
                href="/checkout"
                className="mt-6 block w-full text-center bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white font-semibold py-3 rounded-lg transition-colors text-base"
              >
                Passer commande
              </Link>

              <Link
                href="/nos-viandes"
                className="mt-3 block w-full text-center text-[var(--color-primary)] hover:text-[var(--color-accent)] text-sm font-medium transition-colors py-2"
              >
                ← Continuer mes achats
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
