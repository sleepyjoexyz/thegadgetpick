"use client";

import Link from "next/link";

/**
 * Article shape accepted by this component. Some categories use `description`
 * and others use `excerpt` (legacy inconsistency in the data files); we accept
 * either and prefer `description` when both are present.
 */
interface ArticleSummary {
  slug: string;
  title: string;
  description?: string;
  excerpt?: string;
}

interface Props {
  /** URL path for the category, e.g. "/headphones" */
  categoryPath: string;
  /** Display name used in the section heading, e.g. "Headphone" */
  categoryName: string;
  /**
   * Article collection from the data file. Some categories store articles as
   * Record<slug, Article>, others as Article[]. Both work here.
   */
  articles: Record<string, ArticleSummary> | ArticleSummary[];
}

/**
 * Renders a card grid linking to EVERY article in the category's data file.
 * Replaces the hardcoded 4-link "Guides" sections that previously created
 * Ahrefs orphan-page errors (articles in sitemap but never internally linked).
 */
export default function CategoryArticleGuides({ categoryPath, categoryName, articles }: Props) {
  const all = Array.isArray(articles) ? articles : Object.values(articles);
  if (all.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{categoryName} Guides</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {all.map((article) => {
          const summary = article.description ?? article.excerpt ?? "";
          return (
            <Link
              key={article.slug}
              href={`${categoryPath}/${article.slug}`}
              className="block h-full"
            >
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{summary}</p>
                <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                  Read Guide <span>→</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
