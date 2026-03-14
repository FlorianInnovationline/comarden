"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { HousePart } from "@/lib/houseParts";
import { HOUSE_PARTS } from "@/lib/houseParts";
import Hotspot from "./Hotspot";
import HousePopup from "./HousePopup";
import { Copy, RotateCcw } from "lucide-react";

export default function InteractiveHouseCard() {
  const [isCalibrationMode, setIsCalibrationMode] = useState(false);

  const [selectedPart, setSelectedPart] = useState<HousePart | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);
  const [calibratedCoords, setCalibratedCoords] = useState<Record<string, { xPct: number; yPct: number; align?: string }>>({});
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  // Detect calibration mode from URL query param
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setIsCalibrationMode(params.get("hotspots") === "1");
    }
  }, []);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Parallax effect on image hover (desktop only, subtle depth effect)
  // NOTE: Hotspots are now OUTSIDE the image wrapper, so parallax won't affect them
  // But keeping it disabled for now to ensure hotspots are completely static
  useEffect(() => {
    // DISABLED: Keeping parallax disabled to ensure hotspots never move
    if (true) return; // Temporarily disabled
    if (isMobile || isCalibrationMode || !imageWrapperRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !imageWrapperRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = ((e.clientX - centerX) / rect.width) * 4; // Max 4px translate (more subtle)
      const y = ((e.clientY - centerY) / rect.height) * 4;
      const rotateX = ((e.clientY - centerY) / rect.height) * 0.5; // Max 0.5deg rotate (more subtle)
      const rotateY = ((e.clientX - centerX) / rect.width) * -0.5; // Inverse for 3D effect

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        if (imageWrapperRef.current) {
          imageWrapperRef.current.style.transform = `translate(${x}px, ${y}px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          imageWrapperRef.current.style.transition = "transform 0.15s ease-out";
        }
      });

      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (imageWrapperRef.current) {
        imageWrapperRef.current.style.transform = "translate(0, 0) perspective(1000px) rotateX(0deg) rotateY(0deg)";
        imageWrapperRef.current.style.transition = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
      }
      
      setMousePosition(null);
    };

    if (containerRef.current) {
      const el = containerRef.current as HTMLElement;
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [isMobile, isCalibrationMode]);

  const handleHotspotClick = (part: HousePart, element: HTMLElement) => {
    if (isCalibrationMode) return; // Disable clicks in calibration mode
    setTriggerElement(element);
    setSelectedPart(part);
  };

  const handleClose = () => {
    setSelectedPart(null);
  };

  const handleDragEnd = useCallback((id: string, xPct: number, yPct: number) => {
    setCalibratedCoords((prev) => ({
      ...prev,
      [id]: { ...prev[id], xPct, yPct },
    }));
  }, []);

  const handleCopyJSON = () => {
    // Map icon components to their string names (matching lib/houseParts.ts imports)
    const getIconName = (part: HousePart): string => {
      const iconMap: Record<string, string> = {
        "toiture-inclinee": "Triangle",
        "tuiles-ardoises": "Package",
        "fenetre-de-toit": "Square",
        "gouttieres": "Droplets",
        "toiture-plate": "Home",
        "toiture-vegetale": "Sprout",
        "facade": "Building2",
        "isolant-facade": "Layers",
      };
      return iconMap[part.id] || "Icon";
    };

    const updatedParts = HOUSE_PARTS.map((part) => {
      const calibrated = calibratedCoords[part.id];
      
      return {
        id: part.id,
        label: part.label,
        description: part.description,
        iconName: getIconName(part),
        productHref: part.productHref,
        quoteHref: part.quoteHref,
        coords: calibrated
          ? {
              xPct: calibrated.xPct,
              yPct: calibrated.yPct,
              align: calibrated.align || part.coords.align || "center",
            }
          : part.coords,
        tag: part.tag,
      };
    });

    // Generate the full TypeScript code snippet ready to paste (removes trailing comma from last item)
    const codeSnippet = updatedParts
      .map((p, index) => {
        const isLast = index === updatedParts.length - 1;
        return `  {
    id: "${p.id}",
    label: "${p.label}",
    description: "${p.description.replace(/"/g, '\\"')}",
    icon: ${p.iconName},
    productHref: "${p.productHref}",
    quoteHref: "${p.quoteHref}",
    coords: { xPct: ${p.coords.xPct.toFixed(1)}, yPct: ${p.coords.yPct.toFixed(1)}${p.coords.align ? `, align: "${p.coords.align}"` : ""} },${p.tag ? `
    tag: "${p.tag}",` : ""}
  }${isLast ? "" : ","}`;
      })
      .join("\n");

    const fullSnippet = `export const HOUSE_PARTS: HousePart[] = [
${codeSnippet}
];`;

    navigator.clipboard.writeText(fullSnippet).then(() => {
      // Show success message
      const msg = document.createElement("div");
      msg.textContent = "✅ Coordonnées copiées ! Collez dans lib/houseParts.ts";
      msg.className =
        "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-[100] font-semibold text-sm animate-fade-in";
      document.body.appendChild(msg);
      setTimeout(() => {
        msg.style.opacity = "0";
        msg.style.transition = "opacity 0.3s ease-out";
        setTimeout(() => {
          msg.remove();
        }, 300);
      }, 3000);
    }).catch(() => {
      alert("Erreur lors de la copie. Veuillez réessayer.");
    });
  };

  const handleResetCoords = () => {
    setCalibratedCoords({});
  };

  return (
    <>
      <section className="pt-12 lg:pt-16 pb-6 lg:pb-8 bg-gradient-to-b from-white to-slate-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header - Smaller and cleaner */}
          <div className="text-center mb-6 lg:mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
              Explorez une maison — cliquez sur une zone
            </h2>
            <p className="text-sm lg:text-base text-slate-600 max-w-xl mx-auto">
              Découvrez nos solutions toiture, façade et isolation.
            </p>
          </div>

          {/* Calibration Mode Badge */}
          {isCalibrationMode && (
            <div className="mb-4 p-4 bg-accent/10 border-2 border-accent rounded-xl shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <div>
                    <span className="text-sm font-bold text-primary block">
                      Mode calibration activé
                    </span>
                    <span className="text-xs text-primary/70">
                      Déplacez les points pour ajuster les coordonnées
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={handleResetCoords}
                    className="px-3 py-1.5 text-xs font-semibold bg-white border border-accent text-primary rounded-lg hover:bg-accent/10 transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <RotateCcw className="w-3 h-3" strokeWidth={2} />
                    Réinitialiser
                  </button>
                  <button
                    onClick={handleCopyJSON}
                    className="px-3 py-1.5 text-xs font-semibold bg-accent text-primary rounded-lg hover:bg-accent-dark transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-accent-dark"
                  >
                    <Copy className="w-3 h-3" strokeWidth={2} />
                    Copier JSON
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Interactive House Card - No container, just image */}
          <div
            ref={containerRef}
            data-house-container
            className="relative w-full max-w-4xl mx-auto overflow-visible"
          >
            {/* Image container - Hotspots are siblings, not children, to prevent parallax from moving them */}
            <div
              ref={imageWrapperRef}
              className="relative aspect-[4/3] w-full"
            >
              <Image
                src="/interactive/house.png"
                alt="Schéma interactif d'une maison montrant les différentes zones : toiture, façade, isolation"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 896px"
              />
            </div>

            {/* Hotspots overlay - SIBLING of image wrapper, positioned absolutely relative to container */}
            {/* CRITICAL: Positioned relative to container (same as image wrapper), NOT inside transformed wrapper */}
            {/* This ensures hotspots NEVER move when image has parallax transforms */}
            {/* CRITICAL: overflow-visible to allow labels to show outside bounds */}
            <div className="absolute inset-0 aspect-[4/3] w-full overflow-visible" style={{ zIndex: 10 }}>
              {HOUSE_PARTS.map((part) => {
                // ALWAYS use part.coords from houseParts.ts unless in calibration mode
                // In calibration mode, use calibrated coordinates if available
                const calibrated = calibratedCoords[part.id];
                const coords = (isCalibrationMode && calibrated)
                  ? { ...part.coords, ...calibrated }
                  : part.coords; // ALWAYS use part.coords - this is the source of truth from houseParts.ts

                return (
                  <Hotspot
                    key={part.id}
                    part={part}
                    onClick={(e) => {
                      const button = e.currentTarget as HTMLElement;
                      handleHotspotClick(part, button);
                    }}
                    isMobile={isMobile}
                    isCalibrationMode={isCalibrationMode}
                    onDragEnd={handleDragEnd}
                    coords={coords}
                  />
                );
              })}
            </div>
          </div>

          {/* Instruction text - Updated copy */}
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-400">
              {isMobile
                ? "Appuyez sur les points pour en savoir plus"
                : "Survolez ou cliquez sur les points pour découvrir nos solutions."}
            </p>
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      <HousePopup
        part={selectedPart}
        isOpen={selectedPart !== null}
        onClose={handleClose}
        triggerElement={triggerElement}
        isMobile={isMobile}
      />
    </>
  );
}
