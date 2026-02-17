import Reveal from "@/components/ui/Reveal";
import NewsCard from "./NewsCard";
import type { NewsPost } from "@/lib/news";

interface NewsGridProps {
  articles: NewsPost[];
}

export default function NewsGrid({ articles }: NewsGridProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Aucun article trouvé dans cette catégorie.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <Reveal key={article.slug} delay={index * 100}>
          <NewsCard article={article} />
        </Reveal>
      ))}
    </div>
  );
}
