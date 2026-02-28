import {
  getNCHeadphoneArticle,
  getNCHeadphoneArticleSlugs,
} from "@/data/nc-headphone-articles";
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
  const slugs = getNCHeadphoneArticleSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;
  const article = getNCHeadphoneArticle(slug);

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
      url: `https://thegadgetpick.com/noise-canceling-headphones/${slug}`,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const slug = (await params).slug;
  const article = getNCHeadphoneArticle(slug);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900">Article not found</h1>
        <p className="text-gray-600 mt-4">
          <Link
            href="/noise-canceling-headphones"
            className="text-blue-600 hover:underline"
          >
            Back to noise-canceling headphones
          </Link>
        </p>
      </div>
    );
  }

  const allSlugs = getNCHeadphoneArticleSlugs();
  const currentIndex = allSlugs.indexOf(slug);
  const relatedSlugs = allSlugs.filter((s) => s !== slug);

  return (
    <article className="bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs
          items={[
            {
              label: "Noise-Canceling Headphones",
              href: "/noise-canceling-headphones",
            },
            { label: article.title, href: `/noise-canceling-headphones/${slug}` },
          ]}
        />
      </div>

      {/* Article Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>
        <p className="text-lg text-gray-600 mb-4">{article.excerpt}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>{article.author}</span>
          <span>•</span>
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          <span>•</span>
          <span>{article.readingTime} min read</span>
        </div>
      </section>

      {/* Article Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </section>

      {/* Related Articles */}
      {relatedSlugs.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Read Next
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedSlugs.map((relatedSlug) => {
              const relatedArticle = getNCHeadphoneArticle(relatedSlug);
              if (!relatedArticle) return null;

              return (
                <Link
                  key={relatedSlug}
                  href={`/noise-canceling-headphones/${relatedSlug}`}
                  className="p-6 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {relatedArticle.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{relatedArticle.excerpt}</p>
                  <div className="mt-4 text-blue-600 font-semibold text-sm">
                    Read Article →
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Comments */}
      <Comments pagePath={`/noise-canceling-headphones/${slug}`} siteName="thegadgetpick" />

      {/* Back to Comparison */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
        <Link
          href="/noise-canceling-headphones"
          className="inline-block text-blue-600 hover:underline font-semibold"
        >
          ← Back to Noise-Canceling Headphones Comparison
        </Link>
      </section>
    </article>
  );
}
