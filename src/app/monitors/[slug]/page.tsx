import {
  getMonitorArticle,
  getAllMonitorArticleSlugs,
} from "@/data/monitor-articles";
import { monitors } from "@/data/monitors";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllMonitorArticleSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;
  const article = getMonitorArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${article.title} | The Gadget Pick`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: `https://thegadgetpick.com/monitors/${slug}`,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const slug = (await params).slug;
  const article = getMonitorArticle(slug);

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900">Article not found</h1>
        <p className="text-gray-600 mt-4">
          <Link href="/monitors" className="text-blue-600 hover:underline">
            Back to comparisons
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
            { label: "Monitors", href: "/monitors" },
            { label: article.title, href: `/monitors/${slug}` },
          ]}
        />
      </div>

      {/* Article Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>
        <p className="text-lg text-gray-600">{article.description}</p>
      </section>

      {/* Article Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none text-gray-700">
          {article.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("##")) {
              const heading = paragraph.replace("## ", "");
              return (
                <h2 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  {heading}
                </h2>
              );
            }
            if (paragraph.startsWith("###")) {
              const heading = paragraph.replace("### ", "");
              return (
                <h3 key={i} className="text-xl font-bold text-gray-900 mt-6 mb-3">
                  {heading}
                </h3>
              );
            }
            if (paragraph.startsWith("-")) {
              const items = paragraph.split("\n").map((item) => item.replace(/^-\s/, ""));
              return (
                <ul key={i} className="list-disc list-inside mb-4 space-y-2">
                  {items.map((item, j) => (
                    <li key={j} className="text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }
            if (paragraph.match(/^\d+\./)) {
              const items = paragraph.split("\n").map((item) => item.replace(/^\d+\.\s/, ""));
              return (
                <ol key={i} className="list-decimal list-inside mb-4 space-y-2">
                  {items.map((item, j) => (
                    <li key={j} className="text-gray-700">
                      {item}
                    </li>
                  ))}
                </ol>
              );
            }
            if (paragraph.includes("|")) {
              // Table detection
              const lines = paragraph.split("\n").filter((line) => line.trim());
              if (lines.length > 2) {
                const headers = lines[0].split("|").map((h) => h.trim()).filter(Boolean);
                const rows = lines.slice(2).map((line) =>
                  line.split("|").map((cell) => cell.trim()).filter(Boolean)
                );
                return (
                  <div key={i} className="overflow-x-auto mb-4">
                    <table className="w-full text-sm border-collapse border border-gray-300">
                      <thead className="bg-gray-100">
                        <tr>
                          {headers.map((header, j) => (
                            <th
                              key={j}
                              className="border border-gray-300 px-4 py-2 text-left font-bold"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, rowIdx) => (
                          <tr
                            key={rowIdx}
                            className={rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                          >
                            {row.map((cell, cellIdx) => (
                              <td
                                key={cellIdx}
                                className="border border-gray-300 px-4 py-2"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }
            }
            return (
              <p key={i} className="text-gray-700 mb-4">
                {paragraph}
              </p>
            );
          })}
        </div>
      </section>

      {/* Recommended Products */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {monitors.slice(0, 4).map((product) => (
            <div key={product.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                {product.brand} {product.model}
              </h3>
              <p className="text-gray-600 mb-3">{product.summary}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {product.screenSize}" {product.resolution}
                </span>
              </div>
              {product.amazonAsin && (
                <a
                  href={`https://amazon.com/dp/${product.amazonAsin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View on Amazon
                </a>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/monitors"
            className="inline-block bg-gray-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            View All Monitors
          </Link>
        </div>
      </section>

      {/* Navigation */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <Link
          href="/monitors"
          className="text-blue-600 hover:underline font-medium"
        >
          ← Back to Monitors
        </Link>
      </section>
    </article>
  );
}
