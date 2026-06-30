"use client";

import { useState } from "react";
import Image from "next/image";
import { resolveProductGalleryImages } from "@/lib/shop/productImages";

/**
 * Simple product gallery: main image + clickable thumbnails.
 * Falls back to the placeholder when the product has no images yet.
 */
export default function ProductGallery({
  images,
  alt,
  accent = "#0066CC",
}: {
  images?: string[] | null;
  alt: string;
  accent?: string;
}) {
  const imgs = resolveProductGalleryImages(images);
  const [active, setActive] = useState(0);
  const main = imgs[Math.min(active, imgs.length - 1)];

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral/10 ring-1 ring-black/5">
        <Image
          src={main}
          alt={alt}
          fill
          className="object-contain p-4"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {imgs.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {imgs.slice(0, 5).map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Image ${i + 1}`}
              className="relative aspect-square rounded-lg overflow-hidden bg-neutral/10 transition-all"
            >
              <span
                className="absolute inset-0 rounded-lg pointer-events-none z-10"
                style={{ boxShadow: i === active ? `0 0 0 2px ${accent}` : "none" }}
              />
              <Image src={img} alt={`${alt} - vue ${i + 1}`} fill className="object-cover" sizes="100px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
