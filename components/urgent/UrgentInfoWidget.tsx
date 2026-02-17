"use client";

import { useState, useEffect } from "react";
import UrgentButton from "./UrgentButton";
import UrgentPanel from "./UrgentPanel";

const STORAGE_KEY = "urgent-info-widget-state";

export default function UrgentInfoWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hydration-safe - only run after mount
  useEffect(() => {
    setMounted(true);
    
    // Restore state from sessionStorage if available (only on client)
    if (typeof window !== "undefined" && window.sessionStorage) {
      try {
        const saved = window.sessionStorage.getItem(STORAGE_KEY);
        if (saved === "open") {
          setIsOpen(true);
        }
      } catch (e) {
        // Ignore sessionStorage errors
      }
    }
  }, []);

  // Save state to sessionStorage
  useEffect(() => {
    if (!mounted || typeof window === "undefined" || !window.sessionStorage) return;
    
    try {
      window.sessionStorage.setItem(STORAGE_KEY, isOpen ? "open" : "closed");
    } catch (e) {
      // Ignore sessionStorage errors
    }
  }, [isOpen, mounted]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Always render both - button handles its own client-side logic
  return (
    <>
      <UrgentButton onClick={handleToggle} isOpen={isOpen} />
      <UrgentPanel isOpen={isOpen} onClose={handleClose} />
    </>
  );
}
