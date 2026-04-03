import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { shop } from "@/config/shop";
import { CartProvider } from "@/components/cart/CartProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: shop.seo.title,
    template: `%s | ${shop.name}`,
  },
  description: shop.seo.description,
  keywords: shop.seo.keywords,
  openGraph: {
    title: shop.seo.title,
    description: shop.seo.description,
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
