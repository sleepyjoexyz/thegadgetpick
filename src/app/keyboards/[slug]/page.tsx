import { getKeyboardArticle, getKeyboardArticleSlugs } from "@/data/keyboard-articles";
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
  const slugs = getKeyboardArticleSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;
  const article = getKeyboardArticle(slug);

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
      url: `https://thegadgetpick.com/keyboards/${slug}`,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const slug = (await params).slug;
  const article = getKeyboardArticle(slug);

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900">Article not found</h1>
        <p className="text-gray-600 mt-4">
          <Link href="/keyboards" className="text-blue-600 hover:underline">
            Back to keyboards comparison
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
            { label: "Keyboards", href: "/keyboards" },
            { label: article.title, href: `/keyboards/${slug}` },
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
        <div
          className="prose prose-lg max-w-none
            prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-gray-900
            prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-gray-900
            prose-p:text-gray-700 prose-p:leading-7 prose-p:mb-4
            prose-ul:text-gray-700 prose-ul:mb-4
            prose-li:mb-2
            prose-strong:font-semibold prose-strong:text-gray-900
            prose-em:text-gray-700
          "
        >
          {article.content.split('\n').map((line, idx) => {
            // Handle headings
            if (line.startsWith('## ')) {
              return (
                <h2 key={idx} className="text-2xl font-bold mt-8 mb-4 text-gray-900">
                  {line.replace('## ', '')}
                </h2>
              );
            }
            if (line.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl font-semibold mt-6 mb-3 text-gray-900">
                  {line.replace('### ', '')}
                </h3>
              );
            }
            // Handle bullet lists
            if (line.startsWith('- ')) {
              return (
                <li key={idx} className="ml-6 mb-2 text-gray-700">
                  {line.replace('- ', '')}
                </li>
              );
            }
            // Handle empty lines (paragraphs)
            if (line.trim() === '') {
              return null;
            }
            // Regular paragraphs
            return (
              <p key={idx} className="text-gray-700 leading-7 mb-4">
                {line}
              </p>
            );
          })}
        </div>
      </section>

      {/* Related Articles */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">More Keyboard Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/keyboards/mechanical-vs-membrane"
            className="block p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Mechanical vs Membrane Keyboards
            </h3>
            <p className="text-gray-600 text-sm">
              Compare mechanical and membrane keyboards to understand which is best for your needs.
            </p>
          </Link>

          <Link
            href="/keyboards/best-for-programming"
            className="block p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Best Keyboards for Programming in 2025
            </h3>
            <p className="text-gray-600 text-sm">
              Find the ideal keyboard for programming with excellent tactile feedback and ergonomics.
            </p>
          </Link>

          <Link
            href="/keyboards/switch-types-explained"
            className="block p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Keyboard Switch Types Explained
            </h3>
            <p className="text-gray-600 text-sm">
              Understand the differences between linear, tactile, and clicky mechanical switches.
            </p>
          </Link>

          <Link
            href="/keyboards/hot-swappable-guide"
            className="block p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Hot-Swappable Keyboards: A Beginner's Guide
            </h3>
            <p className="text-gray-600 text-sm">
              Learn what hot-swappable keyboards are and why they enable endless customization.
            </p>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Find Your Perfect Keyboard?
          </h2>
          <p className="text-gray-700 mb-6">
            Browse our curated comparison of the best keyboards across all types, price points, and features.
          </p>
          <Link href="/keyboards" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Compare Keyboards
          </Link>
        </div>
      </section>

      {/* Comments */}
      <Comments pagePath={`/keyboards/${slug}`} siteName="thegadgetpick" />
    </article>
  );
}
