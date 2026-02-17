"use client";

import { MessageCircle } from "lucide-react";

interface UrgentButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function UrgentButton({ onClick, isOpen }: UrgentButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        left: 'auto',
        top: 'auto',
        width: '56px',
        height: '56px',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgb(239, 68, 68), rgb(220, 38, 38))',
        color: 'white',
        borderRadius: '50%',
        boxShadow: '0 10px 15px -3px rgba(220, 38, 38, 0.3), 0 4px 6px -2px rgba(220, 38, 38, 0.3)',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        opacity: isOpen ? 0.7 : 1,
        transform: isOpen ? 'rotate(180deg)' : 'none',
        margin: 0,
        padding: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'linear-gradient(to bottom right, rgb(220 38 38), rgb(185 28 28))';
        e.currentTarget.style.transform = isOpen ? 'rotate(180deg) scale(1.1)' : 'scale(1.1)';
        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(220, 38, 38, 0.4), 0 10px 10px -5px rgba(220, 38, 38, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'linear-gradient(to bottom right, rgb(239 68 68), rgb(220 38 38))';
        e.currentTarget.style.transform = isOpen ? 'rotate(180deg) scale(1)' : 'scale(1)';
        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(220, 38, 38, 0.3), 0 4px 6px -2px rgba(220, 38, 38, 0.3)';
      }}
      aria-label="Besoin d'information urgente"
      aria-expanded={isOpen}
    >
      {/* Subtle pulse ring animation - only when closed - removed for now to avoid CSS issues */}

      {/* Small notification badge - always visible but subtle */}
      <div
        style={{
          position: 'absolute',
          top: '-0.25rem',
          right: '-0.25rem',
          width: '0.75rem',
          height: '0.75rem',
          background: 'rgb(239 68 68)',
          borderRadius: '9999px',
          border: '2px solid white',
          opacity: 0.8,
          zIndex: 20,
        }}
      />

      {/* Icon - MessageCircle for friendly assistant feel */}
      <MessageCircle
        style={{
          width: '1.75rem',
          height: '1.75rem',
          position: 'relative',
          zIndex: 20,
        }}
        strokeWidth={2}
      />

    </button>
  );
}
