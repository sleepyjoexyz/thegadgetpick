import { travelAdapterArticles, getTravelAdapterArticleSlugs } from "@/data/travel-adapter-articles";
import Breadcrumbs from "@/components/Breadcrumbs";
import Comments from "@/components/Comments";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";

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
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: `https://thegadgetpick.com/travel-adapters/${slug}`,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const slug = (await params).slug;
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900">Article not found</h1>
        <p className="text-gray-600 mt-4">
          <Link href="/travel-adapters" className="text-blue-600 hover:underline">
            Back to travel adapters
          </Link>
        </p>
      </div>
    );
  }

  // Get related articles (other articles, excluding current)
  const relatedArticles = travelAdapterArticles.filter(
    (a) => a.slug !== article.slug
  );

  return (
    <article className="bg-white">
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
          {relatedArticles.map((related) => (
            <div
              key={related.slug}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                <Link
                  href={`/travel-adapters/${related.slug}`}
                  className="hover:text-blue-600"
                >
                  {related.title}
                </Link>
              </h3>
              <p className="text-gray-600 text-sm mb-4">{related.excerpt}</p>
              <div className="flex items-center justify-between">
                <Link
                  href={`/travel-adapters/${related.slug}`}
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Read guide →
                </Link>
                <span className="text-xs text-gray-500">
                  {related.readingTime} min read
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comments */}
      <Comments pagePath={`/travel-adapters/${slug}`} siteName="thegadgetpick" />

      {/* Back to Comparison */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <Link
          href="/travel-adapters"
          className="inline-block text-blue-600 hover:underline font-medium"
        >
          ← Back to Travel Adapters Comparison
        </Link>
      </section>
    </article>
  );
}
