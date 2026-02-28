import { getMouseArticle, getMouseArticleSlugs } from "@/data/mouse-articles";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getMouseArticleSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;
  const article = getMouseArticle(slug);

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
      url: `https://thegadgetpick.com/mice/${slug}`,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const slug = (await params).slug;
  const article = getMouseArticle(slug);

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900">Article not found</h1>
        <p className="text-gray-600 mt-4">
          <Link href="/mice" className="text-blue-600 hover:underline">
            Back to mice comparison
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
            { label: "Mice", href: "/mice" },
            { label: article.title, href: `/mice/${slug}` },
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
        <div className="prose prose-sm max-w-none">
          {article.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("##")) {
              const headerText = paragraph.replace("##", "").trim();
              return (
                <h2 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  {headerText}
                </h2>
              );
            }
            if (paragraph.startsWith("#")) {
              const headerText = paragraph.replace("#", "").trim();
              return (
                <h3 key={i} className="text-xl font-bold text-gray-900 mt-6 mb-3">
                  {headerText}
                </h3>
              );
            }
            if (paragraph.startsWith("-")) {
              const items = paragraph.split("\n").filter((line) => line.trim());
              return (
                <ul key={i} className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                  {items.map((item, j) => (
                    <li key={j}>{item.replace("-", "").trim()}</li>
                  ))}
                </ul>
              );
            }
            if (/^\d+\./.test(paragraph)) {
              const items = paragraph.split("\n").filter((line) => line.trim());
              return (
                <ol key={i} className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
                  {items.map((item, j) => (
                    <li key={j}>{item.replace(/^\d+\./, "").trim()}</li>
                  ))}
                </ol>
              );
            }
            if (paragraph.includes("|")) {
              const lines = paragraph.split("\n").filter((line) => line.trim());
              if (lines.length > 2) {
                return (
                  <div key={i} className="overflow-x-auto my-6">
                    <table className="w-full text-sm border-collapse">
                      <tbody>
                        {lines.map((line, j) => {
                          const cells = line.split("|").filter((c) => c.trim());
                          if (cells[0].includes("-")) return null;
                          return (
                            <tr key={j} className={j === 0 ? "bg-gray-100" : j % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                              {cells.map((cell, k) => (
                                <td key={k} className={`border border-gray-300 px-4 py-2 ${j === 0 ? "font-bold" : ""}`}>
                                  {cell.trim()}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
              }
            }
            return (
              <p key={i} className="text-gray-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            );
          })}
        </div>
      </section>

      {/* Related Comparison CTA */}
      <section className="bg-blue-50 border-y border-blue-200 py-12 my-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Compare All Mice
          </h2>
          <p className="text-gray-600 mb-6">
            See the full comparison table with all 14 mice, specifications, prices, and
            ratings.
          </p>
          <Link
            href="/mice"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded font-medium hover:bg-blue-700 transition-colors"
          >
            View Comparison Table
          </Link>
        </div>
      </section>

      {/* Related Articles */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          More Mouse Guides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/mice/gaming-vs-productivity">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-gray-900 mb-2">Gaming vs Productivity Mice</h3>
              <p className="text-sm text-gray-600">Understand the fundamental differences between gaming and productivity mice. Learn how design and ergonomics diverge.</p>
            </div>
          </Link>
          <Link href="/mice/best-ergonomic-mice">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-gray-900 mb-2">Best Ergonomic Mice</h3>
              <p className="text-sm text-gray-600">Find the perfect ergonomic mouse to reduce wrist strain and RSI. Compare vertical, trackball, and contoured designs.</p>
            </div>
          </Link>
          <Link href="/mice/dpi-sensitivity-guide">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-gray-900 mb-2">DPI and Sensitivity Guide</h3>
              <p className="text-sm text-gray-600">Master DPI and mouse sensitivity settings. Learn why higher isn't always better and find your optimal sensitivity.</p>
            </div>
          </Link>
          <Link href="/mice/wireless-latency-myth">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-gray-900 mb-2">Wireless vs Wired: Latency Reality</h3>
              <p className="text-sm text-gray-600">Wireless mice latency isn't a barrier anymore. Compare modern 2.4GHz and Bluetooth technology.</p>
            </div>
          </Link>
        </div>
      </section>
    </article>
  );
}
