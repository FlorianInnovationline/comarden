"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import type { HousePart } from "@/lib/houseParts";

interface HotspotProps {
  part: HousePart;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isMobile: boolean;
  isCalibrationMode?: boolean;
  onDragEnd?: (id: string, xPct: number, yPct: number) => void;
  coords?: { xPct: number; yPct: number; align?: string };
}

export default function Hotspot({
  part,
  onClick,
  isMobile,
  isCalibrationMode = false,
  onDragEnd,
  coords,
}: HotspotProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  // ABSOLUTE CRITICAL: Always use coordinates from houseParts.ts (part.coords)
  // The coords prop should ALWAYS be part.coords unless in calibration mode
  // NEVER change coordinates on hover - they must ALWAYS be at the exact position from houseParts.ts
  // Use coords prop if provided (from parent), otherwise use part.coords directly from houseParts.ts
  // This ensures coordinates are ALWAYS correct from the start
  const currentCoords = useMemo(() => {
    return (coords && coords.xPct !== undefined && coords.yPct !== undefined) 
      ? coords 
      : part.coords;
  }, [coords, part.coords]);
  
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  // Find image container for calibration
  useEffect(() => {
    if (isCalibrationMode && buttonRef.current) {
      containerRef.current = buttonRef.current.closest('[data-house-container]') as HTMLElement;
    }
  }, [isCalibrationMode]);

  // CRITICAL: Hotspots are now siblings of image wrapper, not children
  // This means parallax transforms on the image won't affect hotspot positions
  // Position is locked via inline styles which never change

  // CRITICAL: Button style with FIXED coordinates - NEVER changes, even on hover
  // These coordinates MUST match exactly what's in houseParts.ts
  // Position is ABSOLUTE - locked and never changes
  // Using fixed width/height to prevent any size changes from affecting position
  const buttonStyle: React.CSSProperties = useMemo(() => ({
    position: 'absolute',
    left: `${currentCoords.xPct}%`,
    top: `${currentCoords.yPct}%`,
    transform: 'translate(-50%, -50%)',
    touchAction: isCalibrationMode ? 'none' : 'auto',
    // CRITICAL: NO transitions on ANY properties - position NEVER changes
    transition: 'none',
    willChange: 'auto',
    // Ensure no CSS can override position
    margin: 0,
    padding: 0,
    // Prevent any layout shifts
    boxSizing: 'border-box',
    // CRITICAL: Fixed size so children scaling doesn't affect position
    // Using min/max to ensure size never changes
    width: '24px',
    height: '24px',
    minWidth: '24px',
    maxWidth: '24px',
    minHeight: '24px',
    maxHeight: '24px',
    // Isolate from children transforms - use layout only to allow label overflow
    contain: 'layout style',
    // CRITICAL: Allow overflow so label can show outside button bounds
    overflow: 'visible',
  }), [currentCoords.xPct, currentCoords.yPct, isCalibrationMode]);

  // CRITICAL: Force position to NEVER change - lock it on mount and hover changes
  useEffect(() => {
    if (!buttonRef.current || isCalibrationMode) return;
    
    const button = buttonRef.current;
    const expectedLeft = `${currentCoords.xPct}%`;
    const expectedTop = `${currentCoords.yPct}%`;
    const expectedTransform = 'translate(-50%, -50%)';
    
    // Force position to be correct - runs after render
    const enforcePosition = () => {
      // CRITICAL: Always set these values directly on the element
      // This overrides any CSS that might try to change position
      if (button.style.left !== expectedLeft) {
        button.style.left = expectedLeft;
      }
      if (button.style.top !== expectedTop) {
        button.style.top = expectedTop;
      }
      if (button.style.transform !== expectedTransform) {
        button.style.transform = expectedTransform;
      }
      if (button.style.transition !== 'none') {
        button.style.transition = 'none';
      }
    };
    
    // Enforce after DOM update
    const rafId = requestAnimationFrame(() => {
      enforcePosition();
      // Double-check after a microtask
      setTimeout(enforcePosition, 0);
    });
    
    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [currentCoords.xPct, currentCoords.yPct, isCalibrationMode, isHovered]);

  const getLabelAlignment = () => {
    const align = currentCoords.align || part.coords.align;
    if (align === "left") return "left-0";
    if (align === "right") return "right-0";
    return "left-1/2 -translate-x-1/2";
  };

  const getPointerNotch = () => {
    const align = currentCoords.align || part.coords.align;
    if (align === "left") return "before:left-3";
    if (align === "right") return "before:right-3";
    return "before:left-1/2 before:-translate-x-1/2";
  };

  const showLabel = isMobile || isHovered || isCalibrationMode;
  const shouldAnimateTooltip = (isHovered && !isCalibrationMode) || isCalibrationMode;

  // Calibration drag handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!isCalibrationMode || !buttonRef.current) return;

    e.preventDefault();
    e.stopPropagation();

    // Find container
    const container = buttonRef.current.closest('[data-house-container]') as HTMLElement;
    if (!container) return;

    containerRef.current = container;
    setIsDragging(true);

    const rect = container.getBoundingClientRect();
    const xPct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const yPct = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));

    // Update via onDragEnd callback in parent (which will update calibratedCoords state)
    // We don't update local state here to keep coordinates fixed
    buttonRef.current.setPointerCapture(e.pointerId);
  }, [isCalibrationMode]);

  // Global pointer move/up handlers for calibration - coordinates are managed by parent
  useEffect(() => {
    if (!isCalibrationMode || !isDragging || !onDragEnd) return;

    const handleGlobalPointerMove = (e: PointerEvent) => {
      // Visual feedback only - coordinates are managed by parent component
      if (!containerRef.current || !buttonRef.current) return;
    };

    const handleGlobalPointerUp = (e: PointerEvent) => {
      if (!containerRef.current || !buttonRef.current || !onDragEnd) return;

      setIsDragging(false);
      buttonRef.current.releasePointerCapture(e.pointerId);

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const xPct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const yPct = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));

      // Notify parent to update coordinates
      onDragEnd(part.id, xPct, yPct);
    };

    document.addEventListener("pointermove", handleGlobalPointerMove, { passive: false });
    document.addEventListener("pointerup", handleGlobalPointerUp);

    return () => {
      document.removeEventListener("pointermove", handleGlobalPointerMove);
      document.removeEventListener("pointerup", handleGlobalPointerUp);
    };
  }, [isCalibrationMode, isDragging, onDragEnd, part.id]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent click during drag or in calibration mode
    if (isDragging || isCalibrationMode) {
      e.stopPropagation();
      return;
    }
    e.stopPropagation();
    
    // Pop animation on click
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    
    onClick(e);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => !isMobile && !isCalibrationMode && setIsHovered(true)}
        onMouseLeave={() => !isMobile && !isCalibrationMode && setIsHovered(false)}
        onFocus={() => !isMobile && !isCalibrationMode && setIsHovered(true)}
        onBlur={() => !isMobile && !isCalibrationMode && setIsHovered(false)}
        onPointerDown={handlePointerDown}
        className={`focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full z-10 ${
          isDragging
            ? "cursor-grabbing z-50"
            : isCalibrationMode
            ? "cursor-grab z-20"
            : "cursor-pointer"
        } ${isHovered && !isCalibrationMode ? "z-30" : ""}`}
        style={buttonStyle}
        // CRITICAL: Use ref callback to enforce position on every render - this runs on every render
        ref={(el) => {
          buttonRef.current = el;
          if (el) {
            // CRITICAL: ALWAYS enforce position - never let it change
            // This runs on every render to ensure position is ALWAYS correct
            const expectedLeft = `${currentCoords.xPct}%`;
            const expectedTop = `${currentCoords.yPct}%`;
            el.style.left = expectedLeft;
            el.style.top = expectedTop;
            el.style.transform = 'translate(-50%, -50%)';
            el.style.transition = 'none';
            el.style.position = 'absolute';
            // If in calibration mode, find container
            if (isCalibrationMode) {
              const container = el.closest('[data-house-container]') as HTMLElement;
              if (container) {
                containerRef.current = container;
              }
            }
          }
        }}
        aria-label={
          isCalibrationMode
            ? `Déplacer: ${part.label} (${currentCoords.xPct.toFixed(1)}%, ${currentCoords.yPct.toFixed(1)}%)`
            : `Ouvrir info: ${part.label}`
        }
      >
        {/* Multiple pulse rings for dynamic hover effect - Layer 1 (outermost) */}
        <div 
          className={`absolute inset-0 rounded-full border-2 border-accent/40 pointer-events-none ${
            isHovered && !isCalibrationMode 
              ? "animate-hotspot-pulse-ring-1-hover opacity-80" 
              : "animate-hotspot-pulse-ring-1 opacity-40"
          }`}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '24px',
            height: '24px',
            transform: 'translate(-50%, -50%)',
            transformOrigin: 'center center',
            pointerEvents: 'none',
            overflow: 'visible',
          }}
        />

        {/* Pulse ring Layer 2 (middle) */}
        <div 
          className={`absolute inset-0 rounded-full border-2 border-accent/50 pointer-events-none ${
            isHovered && !isCalibrationMode 
              ? "animate-hotspot-pulse-ring-2-hover opacity-70" 
              : "animate-hotspot-pulse-ring-2 opacity-30"
          }`}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '24px',
            height: '24px',
            transform: 'translate(-50%, -50%)',
            transformOrigin: 'center center',
            pointerEvents: 'none',
            overflow: 'visible',
          }}
        />

        {/* Pulse ring Layer 3 (inner) */}
        <div 
          className={`absolute inset-0 rounded-full border border-accent/60 pointer-events-none ${
            isHovered && !isCalibrationMode 
              ? "animate-hotspot-pulse-ring-3-hover opacity-60" 
              : "animate-hotspot-pulse-ring-3 opacity-20"
          }`}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '24px',
            height: '24px',
            transform: 'translate(-50%, -50%)',
            transformOrigin: 'center center',
            pointerEvents: 'none',
            overflow: 'visible',
          }}
        />

        {/* Gold glow ring - intensifies on hover */}
        <div 
          className={`absolute inset-0 rounded-full bg-accent/30 pointer-events-none transition-all duration-500 ${
            isHovered && !isCalibrationMode ? "opacity-100 scale-150" : "opacity-50 scale-100"
          }`}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '32px',
            height: '32px',
            transform: 'translate(-50%, -50%)',
            transformOrigin: 'center center',
            pointerEvents: 'none',
            overflow: 'visible',
            filter: isHovered && !isCalibrationMode ? 'blur(4px)' : 'blur(2px)',
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, filter 0.3s ease-out',
          }}
        />

        {/* Hotspot dot - premium styling with smooth animations and dynamic hover */}
        {/* CRITICAL: Scale transforms are on child ONLY - they cannot affect parent button position */}
        {/* CRITICAL: Absolutely positioned and centered so it never affects button size or position */}
        <div
          className={`rounded-full border-2 border-white shadow-lg pointer-events-none transition-all duration-300 ${
            isHovered && !isCalibrationMode
              ? "bg-accent shadow-xl animate-hotspot-magnetic-glow"
              : isCalibrationMode
              ? "bg-red-500 border-red-300"
              : "bg-primary"
          }`}
          style={{
            // CRITICAL: Fixed size - doesn't depend on parent
            width: isHovered && !isCalibrationMode ? '18px' : '16px',
            height: isHovered && !isCalibrationMode ? '18px' : '16px',
            // CRITICAL: Absolutely positioned and centered - CANNOT affect parent button position
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) ${
              isHovered && !isCalibrationMode
                ? 'scale(1.4)'
                : isClicked
                ? 'scale(1.6)'
                : isDragging
                ? 'scale(1.3)'
                : isCalibrationMode
                ? 'scale(1.1)'
                : 'scale(1)'
            }`,
            transformOrigin: 'center center',
            boxShadow: isHovered && !isCalibrationMode 
              ? '0 0 24px rgba(245, 192, 0, 0.8), 0 0 40px rgba(245, 192, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.3)' 
              : '0 4px 14px rgba(0, 0, 0, 0.15)',
            // CRITICAL: Only transition transform (scale) and visual properties - NEVER position
            transition: isClicked 
              ? 'transform 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55), box-shadow 0.2s, background-color 0.2s, width 0.3s, height 0.3s' 
              : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s, background-color 0.4s, width 0.3s, height 0.3s',
            // Prevent overflow
            overflow: 'visible',
            zIndex: isHovered && !isCalibrationMode ? 10 : 5,
          }}
        >
          {/* Inner glow ping animation - more intense on hover */}
          <div 
            className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
              isHovered && !isCalibrationMode 
                ? "bg-accent/50 opacity-100 animate-ping" 
                : isCalibrationMode
                ? "bg-red-400/30 opacity-70"
                : "bg-primary/30 opacity-50"
            }`}
            style={{
              animationDuration: isHovered && !isCalibrationMode ? '0.8s' : '2s',
            }}
          />
          
          {/* Inner sparkle effect on hover */}
          {isHovered && !isCalibrationMode && (
            <div 
              className="absolute inset-0 rounded-full bg-white/40 animate-pulse"
              style={{
                animationDuration: '1.5s',
              }}
            />
          )}
        </div>

        {/* Premium tooltip label - ALWAYS RENDER, control with inline styles */}
        {/* CRITICAL: Positioned absolutely relative to button, positioned below */}
        <div
          className={`absolute top-full mt-3 px-4 py-2.5 bg-white border-2 rounded-xl shadow-xl ${getLabelAlignment()} transition-all duration-300 ease-out`}
          style={{
            pointerEvents: "none",
            minWidth: isCalibrationMode ? "140px" : "auto",
            transformOrigin: "top center",
            zIndex: 99999,
            // CRITICAL: Control visibility and opacity with inline styles only
            visibility: (isHovered && !isCalibrationMode) || isCalibrationMode || isMobile ? "visible" : "hidden",
            opacity: isHovered && !isCalibrationMode ? 1 : isCalibrationMode ? 1 : 0,
            transform: isHovered && !isCalibrationMode ? "scale(1) translateY(0)" : isCalibrationMode ? "scale(1) translateY(0)" : "scale(0.95) translateY(8px)",
            borderColor: isHovered && !isCalibrationMode ? "rgba(245, 192, 0, 0.6)" : "rgba(245, 192, 0, 0.2)",
            backgroundColor: "#ffffff", // Explicit white background - guaranteed visible
            boxShadow: isHovered && !isCalibrationMode
              ? "0 12px 32px rgba(0, 0, 0, 0.15), 0 6px 20px rgba(245, 192, 0, 0.3)"
              : "0 6px 16px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Pointer notch - only on desktop hover */}
          {!isMobile && isHovered && !isCalibrationMode && (
            <div
              className="absolute -top-1.5 w-3 h-3 bg-white border-l border-t border-accent/40 rotate-45"
              style={{
                ...((currentCoords.align || part.coords.align) === "center"
                  ? { left: "50%", transform: "translateX(-50%) rotate(45deg)" }
                  : (currentCoords.align || part.coords.align) === "left"
                  ? { left: "16px" }
                  : { right: "16px" }),
              }}
            />
          )}

          {/* Label content - GUARANTEED VISIBLE with high contrast */}
          <div className="relative z-10 flex items-center gap-2.5">
            {/* Icon - only on hover */}
            {isHovered && !isCalibrationMode && (
              <div className="flex-shrink-0 w-5 h-5 text-accent flex items-center justify-center">
                {(() => {
                  const IconComponent = part.icon;
                  return <IconComponent className="w-full h-full" strokeWidth={2.5} />;
                })()}
              </div>
            )}
            
            {/* Label text - ALWAYS SHOWN with high contrast */}
            <div className="flex flex-col gap-0.5">
              <span
                className="whitespace-nowrap font-bold leading-tight"
                style={{
                  fontSize: "13px",
                  color: "#1e293b", // slate-800 - high contrast, guaranteed visible
                  fontWeight: 700,
                  textShadow: "0 1px 2px rgba(255, 255, 255, 0.9)",
                }}
              >
                {part.label}
              </span>
              
              {/* Tag - only on hover */}
              {part.tag && isHovered && !isCalibrationMode && (
                <span 
                  className="text-[10px] font-semibold uppercase tracking-wider"
                  style={{
                    color: "rgba(245, 192, 0, 0.9)",
                  }}
                >
                  {part.tag}
                </span>
              )}
            </div>
          </div>

          {/* Calibration mode coordinates */}
          {isCalibrationMode && (
            <div className="mt-2 pt-2 border-t border-slate-200 text-[8px] font-normal text-slate-500 text-center">
              {currentCoords.xPct.toFixed(1)}%, {currentCoords.yPct.toFixed(1)}%
            </div>
          )}
        </div>
      </button>

      {/* Active/click pop animation overlay - dynamic ripple effect */}
      {!isCalibrationMode && isClicked && (
        <div 
          className="absolute pointer-events-none rounded-full bg-accent/30 animate-hotspot-ripple"
          style={{
            left: `${currentCoords.xPct}%`,
            top: `${currentCoords.yPct}%`,
            width: "40px",
            height: "40px",
          }}
        />
      )}
    </>
  );
}
