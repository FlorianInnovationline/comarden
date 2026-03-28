"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

interface Props {
  images: string[];
}

export default function ToitureVerteGallery({ images }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  const next = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null));

  // Masonry-like pattern: assign sizes to images
  const getSizeClass = (i: number) => {
    const pattern = i % 8;
    if (pattern === 0 || pattern === 5) return "col-span-2 row-span-2";
    return "col-span-1 row-span-1";
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] md:auto-rows-[200px] gap-3 sm:gap-4">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => openLightbox(i)}
            className={`relative rounded-2xl overflow-hidden group cursor-pointer ${getSizeClass(i)}`}
          >
            <Image
              src={src}
              alt={`Toiture végétalisée ${i + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                  <Camera className="w-5 h-5 text-primary" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="relative w-full max-w-5xl max-h-[85vh] aspect-auto mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex]}
              alt={`Toiture végétalisée ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
