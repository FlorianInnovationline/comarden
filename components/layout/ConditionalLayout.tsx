"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import PageShell from "./PageShell";
import UrgentInfoWidget from "@/components/urgent/UrgentInfoWidget";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isCatalogRoute = pathname?.startsWith("/catalog-secret");

  if (isAdminRoute || isCatalogRoute) {
    // Admin and catalog routes: no header, footer, or PageShell wrapper
    return <>{children}</>;
  }

  // Regular routes: full layout with header and footer
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <PageShell>{children}</PageShell>
      </main>
      <Footer />
      <UrgentInfoWidget />
    </>
  );
}
