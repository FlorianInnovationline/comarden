import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import PageShell from "@/components/layout/PageShell";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Comarden - Matériaux de construction | Toiture, Bois, Isolation",
  description:
    "Comarden, fournisseur belge de matériaux de construction : toiture, bois de charpente, isolation, toitures végétalisées, tôles métalliques, panneaux sandwich. Façonnage sur mesure, livraison en Wallonie.",
  keywords: [
    "matériaux construction",
    "toiture",
    "bois charpente",
    "isolation",
    "façonnage",
    "livraison",
    "Wallonie",
    "Bertrix",
    "Naninne",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body style={{ position: 'relative' }}>
        <Providers>
          <ConditionalLayout>{children}</ConditionalLayout>
        </Providers>
      </body>
    </html>
  );
}

