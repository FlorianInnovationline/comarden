import type { NewsPost } from "@/lib/news";
import Reveal from "@/components/ui/Reveal";

interface ArticleBodyProps {
  post: NewsPost;
}

export default function ArticleBody({ post }: ArticleBodyProps) {
  const content = post.content || [];

  if (content.length === 0) {
    return null;
  }

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="prose prose-lg max-w-none">
            {content.map((paragraph, index) => (
              <p
                key={index}
                className="text-base text-muted-foreground leading-relaxed mb-6 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
