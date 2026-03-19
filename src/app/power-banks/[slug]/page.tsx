import { getPowerBankArticle, getPowerBankArticleSlugs } from "@/data/power-bank-articles";
import Breadcrumbs from "@/components/Breadcrumbs";
import Comments from "@/components/Comments";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import MarkdownContent from "@/components/MarkdownContent";
import CrossCategoryLinks from "@/components/CrossCategoryLinks";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getPowerBankArticleSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;
  const article = getPowerBankArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${article.title} | The Gadget Pick`,
    description: article.excerpt,
    alternates: {
      canonical: `https://www.thegadgetpick.com/power-banks/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: `https://www.thegadgetpick.com/power-banks/${slug}`,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const slug = (await params).slug;
  const article = getPowerBankArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="bg-white">
      <ArticleSchema
        title={article.title}
        description={article.excerpt}
        url={`https://www.thegadgetpick.com/power-banks/${slug}`}
        datePublished="2026-03-15"
        dateModified="2026-03-18"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.thegadgetpick.com' },
        { name: 'Power Banks', url: 'https://www.thegadgetpick.com/power-banks' },
        { name: article.title, url: `https://www.thegadgetpick.com/power-banks/${slug}` }
      ]} />
      {/* Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs
          items={[
            { label: "Power Banks", href: "/power-banks" },
            { label: article.title, href: `/power-banks/${slug}` },
          ]}
        />
      </div>

      {/* Article Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>
        <p className="text-sm text-gray-500 mt-2">Last updated: March 2026</p>
        <p className="text-lg text-gray-600 mt-4">{article.excerpt}</p>
        <div className="flex gap-6 mt-6 text-sm text-gray-500">
          <span>By {article.author}</span>
          <span>{article.readingTime} min read</span>
        </div>
      </section>

      {/* Article Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MarkdownContent content={article.content} />
      </section>

      {/* Related Articles */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {getPowerBankArticleSlugs()
            .filter((s) => s !== slug)
            .slice(0, 4)
            .map((relatedSlug) => {
              const related = getPowerBankArticle(relatedSlug);
              if (!related) return null;
              return (
                <Link
                  key={relatedSlug}
                  href={`/power-banks/${relatedSlug}`}
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
      <CrossCategoryLinks currentCategory="power-banks" />

<Comments pagePath={`/power-banks/${slug}`} siteName="thegadgetpick" />

      {/* Back to Comparison */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/power-banks"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
        >
          ← Back to Power Banks Comparison
        </Link>
      </section>
    </article>
  );
}
