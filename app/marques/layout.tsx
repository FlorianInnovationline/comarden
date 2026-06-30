import type { Metadata } from "next";

// All /marques/* pages are QR-only landing pages - keep them out of search engines.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function MarquesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
