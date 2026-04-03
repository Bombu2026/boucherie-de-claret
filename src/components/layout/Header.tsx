"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { shop } from "@/config/shop";
import { formatPrice } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Cart Sidebar
// ---------------------------------------------------------------------------

function CartSidebar() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    total,
    promoDiscount,
    itemCount,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  // Trap focus inside sidebar when open
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isCartOpen) return;
    const el = sidebarRef.current;
    if (el) el.focus();
  }, [isCartOpen]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsCartOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setIsCartOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          aria-hidden="true"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Panier"
        className={[
          "fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl",
          "transition-transform duration-300 ease-in-out",
          isCartOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-primary" style={{ fontFamily: "var(--font-serif)" }}>
            Mon panier
            {itemCount > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({itemCount} article{itemCount > 1 ? "s" : ""})
              </span>
            )}
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Fermer le panier"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <path
                  d="M6 6h4l6 22h20l4-16H14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="20" cy="34" r="2" fill="currentColor" />
                <circle cx="32" cy="34" r="2" fill="currentColor" />
              </svg>
              <p className="text-sm">Votre panier est vide</p>
              <Link
                href="/nos-viandes"
                onClick={() => setIsCartOpen(false)}
                className="text-sm text-accent hover:underline font-medium"
                style={{ color: "var(--color-accent)" }}
              >
                Découvrir nos produits
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-4">
                  {/* Image placeholder */}
                  <div
                    className="w-16 h-16 rounded-lg flex-shrink-0 img-placeholder"
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary truncate">{product.name}</p>
                    <p className="text-xs text-gray-500 mb-2">{product.weight}</p>
                    <div className="flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center text-sm hover:border-accent transition-colors"
                          style={{ "--tw-border-opacity": "1" } as React.CSSProperties}
                          aria-label="Diminuer la quantité"
                        >
                          −
                        </button>
                        <span className="text-sm w-4 text-center">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center text-sm hover:border-accent transition-colors"
                          aria-label="Augmenter la quantité"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold">
                          {formatPrice(product.price * quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                          aria-label={`Retirer ${product.name} du panier`}
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 space-y-4">
            {promoDiscount > 0 && (
              <div className="flex justify-between text-sm text-gray-500">
                <span>Sous-total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            )}
            {promoDiscount > 0 && (
              <div className="flex justify-between text-sm" style={{ color: "var(--color-gold)" }}>
                <span>Réduction ({promoDiscount}%)</span>
                <span>−{formatPrice((subtotal * promoDiscount) / 100)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/panier"
                onClick={() => setIsCartOpen(false)}
                className="text-center px-4 py-3 border border-gray-200 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors"
              >
                Voir le panier
              </Link>
              <Link
                href="/commander"
                onClick={() => setIsCartOpen(false)}
                className="text-center px-4 py-3 rounded-lg text-sm font-medium text-white transition-colors"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                Commander
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Navigation links
// ---------------------------------------------------------------------------

const NAV_LINKS = [
  { label: "Notre histoire", href: "/notre-histoire" },
  { label: "Nos viandes", href: "/nos-viandes" },
  { label: "Contact", href: "/contact" },
] as const;

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

export function Header() {
  const { itemCount, isCartOpen, setIsCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setMobileOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl font-bold tracking-tight shrink-0"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-primary)" }}
            >
              {shop.name}
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Mon compte — desktop only */}
              <Link
                href="/compte"
                className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                aria-label="Mon compte"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <circle cx="9" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M2 16c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                Mon compte
              </Link>

              {/* Cart button */}
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-2 rounded-full hover:bg-gray-50 transition-colors"
                aria-label={`Panier — ${itemCount} article${itemCount !== 1 ? "s" : ""}`}
                aria-expanded={isCartOpen}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path
                    d="M3 3h2l3 10h9l3-8H7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="9" cy="17" r="1.5" fill="currentColor" />
                  <circle cx="16" cy="17" r="1.5" fill="currentColor" />
                </svg>
                {itemCount > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full text-white text-[10px] font-bold flex items-center justify-center leading-none"
                    style={{ backgroundColor: "var(--color-accent)" }}
                    aria-hidden="true"
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </button>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="md:hidden p-2 rounded-full hover:bg-gray-50 transition-colors"
                aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  {mobileOpen ? (
                    <path
                      d="M4 4l14 14M18 4L4 18"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  ) : (
                    <>
                      <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-gray-100 bg-white animate-fade-in"
            role="navigation"
            aria-label="Navigation mobile"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/compte"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Mon compte
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Cart sidebar — rendered outside header flow but still within this client tree */}
      <CartSidebar />
    </>
  );
}
