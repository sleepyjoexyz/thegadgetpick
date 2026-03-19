import { travelAdapterArticles, getTravelAdapterArticleSlugs } from "@/data/travel-adapter-articles";
import Breadcrumbs from "@/components/Breadcrumbs";
import Comments from "@/components/Comments";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import CrossCategoryLinks from "@/components/CrossCategoryLinks";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getTravelAdapterArticleSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

function getArticleBySlug(slug: string) {
  return travelAdapterArticles.find((article) => article.slug === slug);
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${article.title} | The Gadget Pick`,
    description: article.excerpt,
    alternates: {
      canonical: `https://www.thegadgetpick.com/travel-adapters/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: `https://www.thegadgetpick.com/travel-adapters/${slug}`,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const slug = (await params).slug;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Get related articles (other articles, excluding current)
  const relatedArticles = travelAdapterArticles.filter(
    (a) => a.slug !== article.slug
  );

  return (
    <article className="bg-white">
      <ArticleSchema
        title={article.title}
        description={article.excerpt}
        url={`https://www.thegadgetpick.com/travel-adapters/${slug}`}
        datePublished="2026-03-15"
        dateModified="2026-03-18"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.thegadgetpick.com' },
        { name: 'Travel Adapters', url: 'https://www.thegadgetpick.com/travel-adapters' },
        { name: article.title, url: `https://www.thegadgetpick.com/travel-adapters/${slug}` }
      ]} />
      {/* Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs
          items={[
            { label: "Travel Adapters", href: "/travel-adapters" },
            { label: article.title, href: `/travel-adapters/${slug}` },
          ]}
        />
      </div>

      {/* Article Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <span>{article.author}</span>
          <span>•</span>
          <span>{article.readingTime} min read</span>
          <span>•</span>
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
        </div>
      </section>

      {/* Article Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className="prose prose-lg max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </section>

      {/* Related Articles */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {getTravelAdapterArticleSlugs()
            .filter((s) => s !== slug)
            .slice(0, 4)
            .map((relatedSlug) => {
              const related = travelAdapterArticles.find((a) => a.slug === relatedSlug);
              if (!related) return null;
              return (
                <Link
                  key={relatedSlug}
                  href={`/travel-adapters/${relatedSlug}`}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-blue-600 hover:underline">
                    {related.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {related.excerpt}
                  </p>
                </Link>
              );
            })}
        </div>
      </section>

      {/* Comments */}
      
      {/* Cross-Category Links */}
      <CrossCategoryLinks currentCategory="travel-adapters" />

<Comments pagePath={`/travel-adapters/${slug}`} siteName="thegadgetpick" />
    </article>
  );
}
