import { getMicrophoneArticle, getAllMicrophoneArticleSlugs } from "@/data/microphone-articles";
import Breadcrumbs from "@/components/Breadcrumbs";
import Comments from "@/components/Comments";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import MarkdownContent from "@/components/MarkdownContent";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllMicrophoneArticleSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;
  const article = getMicrophoneArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${article.title} | The Gadget Pick`,
    description: article.excerpt,
    alternates: {
      canonical: `https://www.thegadgetpick.com/microphones/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: `https://www.thegadgetpick.com/microphones/${slug}`,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const slug = (await params).slug;
  const article = getMicrophoneArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="bg-white">
      <ArticleSchema
        title={article.title}
        description={article.excerpt}
        url={`https://www.thegadgetpick.com/microphones/${slug}`}
        datePublished="2025-01-01"
        dateModified="2026-03-01"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.thegadgetpick.com' },
        { name: 'Microphones', url: 'https://www.thegadgetpick.com/microphones' },
        { name: article.title, url: `https://www.thegadgetpick.com/microphones/${slug}` }
      ]} />
      {/* Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs
          items={[
            { label: "Microphones", href: "/microphones" },
            { label: article.title, href: `/microphones/${slug}` },
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
        <div className="flex items-center gap-4 mt-6 text-sm text-gray-500">
          <span>{article.author}</span>
          <span>•</span>
          <span>{article.readingTime} min read</span>
        </div>
      </section>

      {/* Article Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MarkdownContent content={article.content} />
      </section>

      {/* Related Comparison CTA */}
      <section className="bg-blue-50 border-y border-blue-200 py-12 my-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Compare All Microphones
          </h2>
          <p className="text-gray-600 mb-6">
            See the full comparison table with all 13 microphones, specifications, prices, and
            ratings.
          </p>
          <Link
            href="/microphones"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded font-medium hover:bg-blue-700 transition-colors"
          >
            View Comparison Table
          </Link>
        </div>
      </section>

      {/* Related Articles */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          More Microphone Guides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/microphones/usb-vs-xlr">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-gray-900 mb-2">USB vs XLR Microphones</h3>
              <p className="text-sm text-gray-600">Understand the difference between USB and XLR connections and how to choose the right setup for your needs.</p>
            </div>
          </Link>
          <Link href="/microphones/best-for-podcasting">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-gray-900 mb-2">Best Microphones for Podcasting</h3>
              <p className="text-sm text-gray-600">Discover the top microphones for podcasting across all budget levels, from budget USB to professional broadcast.</p>
            </div>
          </Link>
          <Link href="/microphones/condenser-vs-dynamic">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-gray-900 mb-2">Condenser vs Dynamic Microphones</h3>
              <p className="text-sm text-gray-600">Understand the key differences between condenser and dynamic microphones and which type suits your needs.</p>
            </div>
          </Link>
          <Link href="/microphones/room-treatment-tips">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-gray-900 mb-2">Room Treatment Tips for Better Audio</h3>
              <p className="text-sm text-gray-600">Improve your recording quality with practical room treatment solutions. Learn how to reduce echo and background noise.</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Comments */}
      <Comments pagePath={`/microphones/${slug}`} siteName="thegadgetpick" />
    </article>
  );
}
