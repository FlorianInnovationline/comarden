import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import type { NewsPost } from "@/lib/news";
import Reveal from "@/components/ui/Reveal";
import Card from "@/components/ui/Card";

interface RelatedPostsProps {
  posts: NewsPost[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-BE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 lg:py-16 bg-neutral/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight mb-3">
              Articles similaires
            </h2>
            <p className="text-sm text-muted-foreground">
              Découvrez d'autres actualités qui pourraient vous intéresser
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 100}>
              <Link href={`/actu/${post.slug}`} className="block h-full">
                <Card className="h-full flex flex-col group hover:shadow-lg transition-all duration-300">
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      <time>{formatDate(post.date)}</time>
                      {post.category && (
                        <span className="px-2 py-0.5 bg-accent/10 text-accent rounded-sm font-medium">
                          {post.category}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="p-6 pt-0 mt-auto">
                    <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:gap-2 gap-1 transition-all">
                      Lire l'article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="text-center mt-10">
            <Link
              href="/actu"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
            >
              Voir toutes les actualités
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
