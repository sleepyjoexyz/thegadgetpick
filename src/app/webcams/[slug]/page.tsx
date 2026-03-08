import { getWebcamArticle, getWebcamArticleSlugs } from "@/data/webcam-articles";
import Breadcrumbs from "@/components/Breadcrumbs";
import Comments from "@/components/Comments";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getWebcamArticleSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;
  const article = getWebcamArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${article.title} | The Gadget Pick`,
    description: article.description,
    alternates: {
      canonical: `https://www.thegadgetpick.com/webcams/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: `https://www.thegadgetpick.com/webcams/${slug}`,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const slug = (await params).slug;
  const article = getWebcamArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="bg-white">
      <ArticleSchema
        title={article.title}
        description={article.description}
        url={`https://www.thegadgetpick.com/webcams/${slug}`}
        datePublished="2025-01-01"
        dateModified="2026-03-01"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.thegadgetpick.com' },
        { name: 'Webcams', url: 'https://www.thegadgetpick.com/webcams' },
        { name: article.title, url: `https://www.thegadgetpick.com/webcams/${slug}` }
      ]} />
      {/* Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs
          items={[
            { label: "Webcams", href: "/webcams" },
            { label: article.title, href: `/webcams/${slug}` },
          ]}
        />
      </div>

      {/* Article Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>
        <p className="text-sm text-gray-500 mt-2">Last updated: March 2026</p>
        <p className="text-lg text-gray-600 mt-4">{article.description}</p>
      </section>

      {/* Article Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-sm max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html: article.content,
            }}
          />
        </div>
      </section>

      {/* Comments */}
      <Comments pagePath={`/webcams/${slug}`} siteName="thegadgetpick" />

      {/* Back to Comparison */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <Link
          href="/webcams"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Webcams Comparison
        </Link>
      </section>
    </article>
  );
}
