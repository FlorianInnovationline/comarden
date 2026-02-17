import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ProductNotFound() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-white to-neutral/20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <Package className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 text-muted-foreground" />
        <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
          Produit non trouvé
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground mb-8">
          Le produit que vous recherchez n&apos;existe pas ou a été supprimé.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild href="/shop" variant="primary">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour au magasin
          </Button>
          <Button asChild href="/" variant="outline">
            Retour à l&apos;accueil
          </Button>
        </div>
      </div>
    </div>
  );
}
