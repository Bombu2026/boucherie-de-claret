"use client";

import { useState } from "react";
import { ProductImage } from "@/components/ui/ProductImage";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  badge?: string;
}

export function ProductGallery({ images, productName, badge }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Si pas d'images, on affiche un placeholder unique
  const hasImages = images.length > 0;
  const showThumbnails = images.length > 1;

  return (
    <div className="flex flex-col gap-4">
      {/* Image principale */}
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
        {hasImages ? (
          <ProductImage
            key={selectedIndex}
            src={images[selectedIndex]}
            alt={`${productName}${hasImages ? ` — vue ${selectedIndex + 1}` : ""}`}
            fill
            priority={selectedIndex === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="transition-opacity duration-300"
          />
        ) : (
          <div
            className="img-placeholder w-full h-full"
            aria-label={productName}
          />
        )}

        {badge && (
          <span className="absolute top-4 left-4 z-20 bg-[#7C1D1D] text-white text-sm font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
            {badge}
          </span>
        )}

        {/* Indicateur de position quand plusieurs images */}
        {showThumbnails && (
          <div className="absolute bottom-4 right-4 z-20 bg-black/40 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {showThumbnails && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={[
                "relative flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden transition-all duration-200",
                selectedIndex === index
                  ? "ring-2 ring-[#7C1D1D] ring-offset-2 ring-offset-[#FAF5F0] opacity-100"
                  : "ring-1 ring-gray-200 opacity-60 hover:opacity-90 hover:ring-gray-300",
              ].join(" ")}
              aria-label={`Vue ${index + 1} de ${productName}`}
              aria-pressed={selectedIndex === index}
            >
              <ProductImage
                src={images[index]}
                alt={`${productName} — vue ${index + 1}`}
                fill
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
