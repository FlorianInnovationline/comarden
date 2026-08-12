import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin/auth";
import AdminLayout from "@/components/admin/AdminLayout";
import StatsPanel from "@/components/admin/StatsPanel";
import Reveal from "@/components/ui/Reveal";

export const dynamic = "force-dynamic";

export default async function AdminStatsPage() {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }

  return (
    <AdminLayout>
      <Reveal>
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">Stats</h1>
          <p className="text-muted-foreground">
            Fréquentation de comarden-events.be : pages vues, visiteurs, contenus les
            plus consultés et éléments les plus cliqués.
          </p>
        </div>
      </Reveal>

      <StatsPanel />
    </AdminLayout>
  );
}
