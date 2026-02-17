import { notFound } from "next/navigation";
import { getNewsBySlug, getRelatedPosts, newsPosts } from "@/lib/news";
import type { Metadata } from "next";
import ArticleHeader from "@/components/actu/ArticleHeader";
import ArticleBody from "@/components/actu/ArticleBody";
import RelatedPosts from "@/components/actu/RelatedPosts";
import Callout from "@/components/actu/Callout";
import CTACompact from "@/components/sections/CTA";

export async function generateStaticParams() {
  return newsPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getNewsBySlug(params.slug);
  if (!post) {
    return {
      title: "Article non trouvé - Comarden",
    };
  }
  return {
    title: `${post.title} - Comarden`,
    description: post.excerpt,
  };
}

export default function NewsArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getNewsBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(params.slug, 3);

  return (
    <div className="pt-20">
      <ArticleHeader post={post} />

      <ArticleBody post={post} />

      {/* Optional Callout - Can be conditionally rendered based on post category */}
      {post.category === "Formations" && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Callout variant="info" title="Formation accréditée Constructiv">
            Cette formation est reconnue par Constructiv et peut être prise en
            charge par les fonds sectoriels. Contactez-nous pour plus
            d'informations sur les modalités d'inscription et de financement.
          </Callout>
        </div>
      )}

      {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}

      <CTACompact />
    </div>
  );
}
