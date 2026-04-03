import type { Metadata } from "next";
import { shop } from "@/config/shop";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TrustBadges from "@/components/home/TrustBadges";
import Storytelling from "@/components/home/Storytelling";
import BoxSection from "@/components/home/BoxSection";
import Advantages from "@/components/home/Advantages";

export const metadata: Metadata = {
  title: shop.seo.title,
  description: shop.seo.description,
  keywords: shop.seo.keywords,
  openGraph: {
    title: shop.seo.title,
    description: shop.seo.description,
    type: "website",
    locale: "fr_FR",
    siteName: shop.name,
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <TrustBadges />
      <Storytelling />
      <BoxSection />
      <Advantages />
    </>
  );
}
