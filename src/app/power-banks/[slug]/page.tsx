import { getPowerBankArticle, getPowerBankArticleSlugs } from "@/data/power-bank-articles";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";

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
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: `https://thegadgetpick.com/power-banks/${slug}`,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const slug = (await params).slug;
  const article = getPowerBankArticle(slug);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900">Article not found</h1>
        <p className="text-gray-600 mt-4">
          <Link href="/power-banks" className="text-blue-600 hover:underline">
            Back to power banks comparison
          </Link>
        </p>
      </div>
    );
  }

  return (
    <article className="bg-white">
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
        <p className="text-lg text-gray-600">{article.excerpt}</p>
        <div className="flex gap-6 mt-6 text-sm text-gray-500">
          <span>By {article.author}</span>
          <span>{article.readingTime} min read</span>
        </div>
      </section>

      {/* Article Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-sm max-w-none">
          {article.content.split("\n\n").map((paragraph, i) => {
            // Handle markdown headers (h2)
            if (paragraph.startsWith("##")) {
              const headerText = paragraph.replace("##", "").trim();
              return (
                <h2
                  key={i}
                  className="text-2xl font-bold text-gray-900 mt-8 mb-4"
                >
                  {headerText}
                </h2>
              );
            }

            // Handle markdown headers (h3)
            if (paragraph.startsWith("#")) {
              const headerText = paragraph.replace("#", "").trim();
              return (
                <h3
                  key={i}
                  className="text-xl font-bold text-gray-900 mt-6 mb-3"
                >
                  {headerText}
                </h3>
              );
            }

            // Handle bullet points
            if (paragraph.startsWith("-")) {
              const lines = paragraph.split("\n");
              return (
                <ul key={i} className="list-disc list-inside space-y-2 my-4">
                  {lines.map((line, j) => (
                    <li key={j} className="text-gray-700">
                      {line.replace(/^-\s*/, "")}
                    </li>
                  ))}
                </ul>
              );
            }

            // Regular paragraph
            return (
              <p key={i} className="text-gray-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            );
          })}
        </div>
      </section>

      {/* Related Articles */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">More Power Bank Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {slug !== "capacity-guide" && (
            <Link
              href="/power-banks/capacity-guide"
              className="block p-4 border border-gray-200 rounded-lg hover:shadow-lg transition"
            >
              <h3 className="font-bold text-gray-900 mb-2">Capacity Guide</h3>
              <p className="text-sm text-gray-600">
                mAh vs. Wh and real-world charging counts
              </p>
            </Link>
          )}
          {slug !== "fast-charging-explained" && (
            <Link
              href="/power-banks/fast-charging-explained"
              className="block p-4 border border-gray-200 rounded-lg hover:shadow-lg transition"
            >
              <h3 className="font-bold text-gray-900 mb-2">Fast Charging Standards</h3>
              <p className="text-sm text-gray-600">
                USB PD, Quick Charge, and PPS explained
              </p>
            </Link>
          )}
          {slug !== "airline-rules" && (
            <Link
              href="/power-banks/airline-rules"
              className="block p-4 border border-gray-200 rounded-lg hover:shadow-lg transition"
            >
              <h3 className="font-bold text-gray-900 mb-2">Airline Rules</h3>
              <p className="text-sm text-gray-600">
                TSA limits and international policies
              </p>
            </Link>
          )}
          {slug !== "best-for-laptops" && (
            <Link
              href="/power-banks/best-for-laptops"
              className="block p-4 border border-gray-200 rounded-lg hover:shadow-lg transition"
            >
              <h3 className="font-bold text-gray-900 mb-2">Best for Laptops</h3>
              <p className="text-sm text-gray-600">
                MacBook and Windows laptop charging
              </p>
            </Link>
          )}
        </div>
      </section>

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
