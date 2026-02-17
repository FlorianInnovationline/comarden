import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import type { NewsPost } from "@/lib/news";
import Reveal from "@/components/ui/Reveal";

interface ArticleHeaderProps {
  post: NewsPost;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-BE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ArticleHeader({ post }: ArticleHeaderProps) {
  return (
    <section className="py-16 lg:py-20 bg-primary text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Link
            href="/actu"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Retour aux actualités</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-sm text-white/70 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time>{formatDate(post.date)}</time>
            </div>
            {post.category && (
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">
                {post.category}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
