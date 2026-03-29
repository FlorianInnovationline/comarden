"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const TRACK_W = "w-[4px]";
const BAR_COLOR = "#ffd500";

/**
 * Fixed right-edge scroll progress (0 → 100% of scroll range).
 * Hidden when the page has no vertical overflow.
 */
export default function ScrollProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    const update = () => {
      const scrollable = root.scrollHeight - root.clientHeight;
      if (scrollable <= 1) {
        setShow(false);
        setProgress(0);
        return;
      }
      setShow(true);
      const p = root.scrollTop / scrollable;
      setProgress(Math.min(1, Math.max(0, p)));
    };

    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const ro = new ResizeObserver(update);
    ro.observe(document.body);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, [pathname]);

  if (!show) return null;

  return (
    <div
      className={`pointer-events-none fixed top-0 right-0 z-[45] h-[100dvh] ${TRACK_W}`}
      aria-hidden
    >
      {/* Track */}
      <div
        className="absolute inset-0 rounded-l-full bg-black/[0.07]"
        style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.04)" }}
      />
      {/* Fill — grows from top */}
      <div
        className="absolute left-0 right-0 top-0 origin-top rounded-l-full transition-[transform] duration-150 ease-out"
        style={{
          height: "100%",
          backgroundColor: BAR_COLOR,
          transform: `scaleY(${progress})`,
          boxShadow: "0 0 14px rgba(255, 213, 0, 0.28)",
        }}
      />
    </div>
  );
}
