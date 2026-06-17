"use client";

import { useEffect, useState } from "react";
import { Copy, Check, ExternalLink, QrCode } from "lucide-react";
import BrandLogo from "@/components/marques/BrandLogo";

interface Props {
  slug: string;
  name: string;
  logo: string | null;
  primary: string;
}

export default function MarquesAdminCard({ slug, name, logo, primary }: Props) {
  const [origin, setOrigin] = useState("");
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const path = `/marques/${slug}`;
  const url = origin ? `${origin}${path}` : path;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=8&data=${encodeURIComponent(url)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard may be blocked — ignore */
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden flex flex-col">
      <div
        className="h-20 flex items-center justify-center px-4"
        style={{ backgroundColor: primary }}
      >
        <BrandLogo
          name={name}
          logo={logo}
          imgClassName="h-10 w-auto object-contain"
          textClassName="text-xl font-extrabold tracking-tight text-white drop-shadow"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-bold text-primary mb-1">{name}</h3>
        <code className="block text-xs font-mono text-muted-foreground bg-neutral/30 rounded-lg px-3 py-2 mb-4 break-all">
          {url}
        </code>

        <div className="flex flex-wrap gap-2 mt-auto">
          <button
            onClick={copy}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copié !" : "Copier le lien"}
          </button>
          <a
            href={path}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-border text-primary hover:bg-neutral/30 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Voir la page
          </a>
          <button
            onClick={() => setShowQr((v) => !v)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-border text-primary hover:bg-neutral/30 transition-colors"
          >
            <QrCode className="w-3.5 h-3.5" />
            {showQr ? "Masquer QR" : "Générer QR code"}
          </button>
        </div>

        {showQr && origin && (
          <div className="mt-4 flex flex-col items-center gap-2 pt-4 border-t border-border/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrSrc}
              alt={`QR code ${name}`}
              width={160}
              height={160}
              className="rounded-lg border border-border"
            />
            <a
              href={qrSrc}
              download={`qr-${slug}.png`}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Télécharger le QR (PNG)
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
