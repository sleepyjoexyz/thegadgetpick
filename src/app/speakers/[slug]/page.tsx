import {
  getSpeakerArticle,
  getAllSpeakerArticleSlugs,
} from "@/data/speaker-articles";
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
  const slugs = getAllSpeakerArticleSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;
  const article = getSpeakerArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${article.title} | The Gadget Pick`,
    description: article.description,
    alternates: {
      canonical: `https://www.thegadgetpick.com/speakers/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: `https://www.thegadgetpick.com/speakers/${slug}`,
    },
  };
}

export default async function SpeakerArticlePage({ params }: PageProps) {
  const slug = (await params).slug;
  const article = getSpeakerArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="bg-white">
      <ArticleSchema
        title={article.title}
        description={article.description}
        url={`https://www.thegadgetpick.com/speakers/${slug}`}
        datePublished="2025-01-01"
        dateModified="2026-03-01"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.thegadgetpick.com' },
        { name: 'Speakers', url: 'https://www.thegadgetpick.com/speakers' },
        { name: article.title, url: `https://www.thegadgetpick.com/speakers/${slug}` }
      ]} />
      {/* Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs
          items={[
            { label: "Speakers", href: "/speakers" },
            { label: article.title, href: `/speakers/${slug}` },
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
        <MarkdownContent content={article.content} />
      </section>

      {/* Related Comparison CTA */}
      <section className="bg-blue-50 border-y border-blue-200 py-12 my-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Compare All Speakers
          </h2>
          <p className="text-gray-600 mb-6">
            See the full comparison table with all 14 speakers, specs, prices,
            and filtering options.
          </p>
          <Link
            href="/speakers"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded font-medium hover:bg-blue-700 transition-colors"
          >
            View Comparison Table
          </Link>
        </div>
      </section>

      {/* Related Articles */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          More Speaker Guides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/speakers/bookshelf-vs-portable-speakers">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-gray-900 mb-2">
                Bookshelf vs Portable Speakers
              </h3>
              <p className="text-sm text-gray-600">
                Compare home audio speakers vs on-the-go listening options.
              </p>
            </div>
          </Link>

          <Link href="/speakers/best-speakers-under-300">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-gray-900 mb-2">
                Best Speakers Under $300
              </h3>
              <p className="text-sm text-gray-600">
                Budget audiophile picks that deliver surprising quality.
              </p>
            </div>
          </Link>

          <Link href="/speakers/bluetooth-vs-wifi-speakers">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-gray-900 mb-2">
                Bluetooth vs WiFi Speakers
              </h3>
              <p className="text-sm text-gray-600">
                Understand latency, quality, and multi-room audio capabilities.
              </p>
            </div>
          </Link>

          <Link href="/speakers/studio-monitors-vs-regular-speakers">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-gray-900 mb-2">
                Studio Monitors vs Regular Speakers
              </h3>
              <p className="text-sm text-gray-600">
                Learn when accuracy matters and the difference between them.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Comments */}
      <Comments pagePath={`/speakers/${slug}`} siteName="thegadgetpick" />
    </article>
  );
}
