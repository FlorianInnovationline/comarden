import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin/auth";
import AdminLayout from "@/components/admin/AdminLayout";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

export default async function AdminSettingsPage() {
  const admin = await isAdmin();
  
  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <AdminLayout>
      <Reveal>
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">
            Paramètres
          </h1>
          <p className="text-muted-foreground">
            Gérez les paramètres de votre boutique
          </p>
        </div>
      </Reveal>

      <div className="bg-white rounded-2xl border border-border/50 p-6 sm:p-8 space-y-8">
        <section>
          <h2 className="text-xl font-bold text-primary mb-4">
            Informations de l&apos;entreprise
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Nom de l&apos;entreprise
              </label>
              <input
                type="text"
                defaultValue="Comarden"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Email de contact
              </label>
              <input
                type="email"
                defaultValue="info@comarden.be"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                defaultValue="061 41 27 06"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-4">
            Configuration de la boutique
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Devise par défaut
              </label>
              <select className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent">
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                />
                <span className="text-sm">Activer la boutique en ligne</span>
              </label>
            </div>
          </div>
        </section>

        <div className="pt-4 border-t border-border">
          <Button size="lg" className="bg-primary text-white">
            Enregistrer les modifications
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
