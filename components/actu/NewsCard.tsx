import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";
import type { NewsPost } from "@/lib/news";

interface NewsCardProps {
  article: NewsPost;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-BE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <Link href={`/actu/${article.slug}`} className="block h-full">
      <Card className="h-full flex flex-col group hover:shadow-lg transition-all duration-300">
        <div className="flex-1 p-6">
          {/* Date and Category */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <time>{formatDate(article.date)}</time>
            </div>
            {article.category && (
              <span className="px-2.5 py-1 bg-accent/10 text-accent text-xs font-medium rounded-sm">
                {article.category}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2 leading-tight">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4 flex-1">
            {article.excerpt}
          </p>
        </div>

        {/* CTA Link */}
        <div className="p-6 pt-0 mt-auto">
          <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:gap-2 gap-1 transition-all">
            Lire la suite
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
