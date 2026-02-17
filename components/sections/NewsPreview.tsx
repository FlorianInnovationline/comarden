import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { getFeaturedNews } from "@/lib/news";
import Reveal from "@/components/ui/Reveal";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-BE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function NewsPreview() {
  const news = getFeaturedNews(3);
  return (
    <section className="py-12 sm:py-16 lg:py-20 xl:py-28 bg-neutral/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary tracking-tight">
                Actualités
              </h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                Les dernières nouvelles de Comarden
              </p>
            </div>
            <Link
              href="/actu"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-primary hover:gap-3 transition-all group"
            >
              Toutes les actualités
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {news.map((article, index) => (
            <Reveal key={article.slug} delay={index * 100}>
              <Link
                href={`/actu/${article.slug}`}
                className="group block bg-white p-4 sm:p-5 lg:p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
              >
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{formatDate(article.date)}</span>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-primary mb-2 group-hover:text-primary/80 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-2 sm:mb-3">
                  {article.excerpt}
                </p>
                <span className="inline-flex items-center text-xs sm:text-sm font-medium text-primary group-hover:gap-2 gap-1 transition-all">
                  Lire
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
