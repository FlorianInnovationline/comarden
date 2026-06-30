import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin/auth";
import { allBrands } from "@/lib/brands/config";
import AdminLayout from "@/components/admin/AdminLayout";
import MarquesAdminCard from "@/components/admin/MarquesAdminCard";
import Reveal from "@/components/ui/Reveal";
import { QrCode } from "lucide-react";

export default async function AdminMarquesPage() {
  const admin = await isAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const brands = allBrands();

  return (
    <AdminLayout>
      <Reveal>
        <div className="flex items-start gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <QrCode className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">
              Pages Marques (QR codes)
            </h1>
            <p className="text-muted-foreground">
              Pages dédiées accessibles uniquement par lien direct ou QR code -
              non référencées et absentes de la navigation du site.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {brands.map((b, i) => (
          <Reveal key={b.slug} delay={i * 70}>
            <MarquesAdminCard
              slug={b.slug}
              name={b.name}
              logo={b.logo}
              primary={b.colors.primary}
            />
          </Reveal>
        ))}
      </div>
    </AdminLayout>
  );
}
