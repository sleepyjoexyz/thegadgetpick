"use client";

import { useState, useMemo } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ncHeadphones } from "@/data/noise-canceling-headphones";
import { getNCHeadphoneArticleSlugs } from "@/data/nc-headphone-articles";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default function NoiseCancelingHeadphonesComparison() {
  const [formFactorFilter, setFormFactorFilter] = useState<string>("all");
  const [ancLevelFilter, setAncLevelFilter] = useState<string>("all");
  const [transparencyFilter, setTransparencyFilter] = useState<string>("all");
  const [multipointFilter, setMultipointFilter] = useState<string>("all");
  const [priceMin, setPriceMin] = useState<string>("0");
  const [priceMax, setPriceMax] = useState<string>("600");
  const [sortBy, setSortBy] = useState<string>("name");

  const filteredProducts = useMemo(() => {
    let result = [...ncHeadphones];

    // Form factor filter
    if (formFactorFilter !== "all") {
      result = result.filter((h) => h.formFactor === formFactorFilter);
    }

    // ANC level filter
    if (ancLevelFilter !== "all") {
      result = result.filter((h) => h.ancLevel === ancLevelFilter);
    }

    // Transparency mode filter
    if (transparencyFilter === "yes") {
      result = result.filter((h) => h.transparencyMode === true);
    } else if (transparencyFilter === "no") {
      result = result.filter((h) => h.transparencyMode === false);
    }

    // Multipoint filter
    if (multipointFilter === "yes") {
      result = result.filter((h) => h.multipoint === true);
    } else if (multipointFilter === "no") {
      result = result.filter((h) => h.multipoint === false);
    }

    // Price filter
    const minPrice = parseInt(priceMin) || 0;
    const maxPrice = parseInt(priceMax) || 600;
    result = result.filter((h) => h.price >= minPrice && h.price <= maxPrice);

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) =>
        `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`)
      );
    }

    return result;
  }, [
    formFactorFilter,
    ancLevelFilter,
    transparencyFilter,
    multipointFilter,
    priceMin,
    priceMax,
    sortBy,
  ]);

  const articleSlugs = getNCHeadphoneArticleSlugs();

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs
          items={[
            {
              label: "Noise-Canceling Headphones",
              href: "/noise-canceling-headphones",
            },
          ]}
        />
      </div>

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Best Noise-Canceling Headphones for Travel
        </h1>
        <p className="text-lg text-gray-600">
          Compare premium, good, and budget ANC headphones optimized for travel and flying.
        </p>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Filters & Sort</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Form Factor */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Form Factor
            </label>
            <select
              value={formFactorFilter}
              onChange={(e) => setFormFactorFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="over-ear">Over-Ear</option>
              <option value="on-ear">On-Ear</option>
              <option value="earbuds">Earbuds</option>
            </select>
          </div>

          {/* ANC Level */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              ANC Level
            </label>
            <select
              value={ancLevelFilter}
              onChange={(e) => setAncLevelFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="premium">Premium</option>
              <option value="good">Good</option>
              <option value="basic">Basic</option>
            </select>
          </div>

          {/* Transparency Mode */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Transparency Mode
            </label>
            <select
              value={transparencyFilter}
              onChange={(e) => setTransparencyFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Multipoint */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Multipoint Connection
            </label>
            <select
              value={multipointFilter}
              onChange={(e) => setMultipointFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Price Range
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                placeholder="Min"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-500 py-2">-</span>
              <input
                type="number"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                placeholder="Max"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating: High to Low</option>
            </select>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          Showing {filteredProducts.length} of {ncHeadphones.length} products
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                  Product
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                  Form Factor
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                  ANC Level
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                  Transparency
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                  Battery (ANC)
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                  Quick Charge
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                  Multipoint
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                  Codec
                </th>
                <th className="border border-gray-300 px-4 py-3 text-right font-semibold">
                  Price
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 border-t border-gray-300">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-blue-600">
                      {product.brand} {product.model}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      {product.formFactor === "over-ear"
                        ? "Over-Ear"
                        : product.formFactor === "on-ear"
                        ? "On-Ear"
                        : "Earbuds"}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs font-semibold ${
                          product.ancLevel === "premium"
                            ? "bg-purple-600"
                            : product.ancLevel === "good"
                            ? "bg-blue-600"
                            : "bg-gray-500"
                        }`}
                      >
                        {product.ancLevel.charAt(0).toUpperCase() +
                          product.ancLevel.slice(1)}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      {product.transparencyMode ? (
                        <span className="text-green-600 font-semibold">✓</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      {product.batteryWithAnc}h
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-xs">
                      {product.quickCharge}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      {product.multipoint ? (
                        <span className="text-green-600 font-semibold">✓</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-xs">
                      {product.codec}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-right font-semibold">
                      {formatPrice(product.price)}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-semibold">
                        {product.rating}★
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={10}
                    className="border border-gray-300 px-4 py-8 text-center text-gray-500"
                  >
                    No products match your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Articles Section */}
      {articleSlugs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Essential Reading
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articleSlugs.map((slug) => {
              const articleTitles: Record<string, string> = {
                "how-anc-works": "How Active Noise Cancellation Actually Works",
                "best-for-flying":
                  "Best Noise-Canceling Headphones for Flying in 2025",
                "earbuds-vs-over-ear":
                  "ANC Earbuds vs Over-Ear: Which Cancel More Noise?",
                "hearing-health-guide":
                  "Noise Cancellation and Hearing Health: What Science Says",
              };

              const articleExcerpts: Record<string, string> = {
                "how-anc-works":
                  "Discover the science behind ANC technology and how it eliminates ambient noise in modern headphones.",
                "best-for-flying":
                  "Find the perfect noise-canceling headphones for air travel with our expert recommendations covering comfort, battery life, and ANC performance.",
                "earbuds-vs-over-ear":
                  "Compare noise cancellation performance, comfort, and portability between earbud and over-ear styles to find your ideal travel headphone.",
                "hearing-health-guide":
                  "Understand how noise cancellation affects hearing health, safe listening levels, and best practices for protecting your hearing while using ANC headphones.",
              };

              return (
                <Link
                  key={slug}
                  href={`/noise-canceling-headphones/${slug}`}
                  className="p-6 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {articleTitles[slug] || slug}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {articleExcerpts[slug] || "Read the article for more information."}
                  </p>
                  <div className="mt-4 text-blue-600 font-semibold text-sm">
                    Read Article →
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
