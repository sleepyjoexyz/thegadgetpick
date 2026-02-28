"use client";

import { useState, useMemo } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { keyboards } from "@/data/keyboards";
import { getKeyboardArticleSlugs } from "@/data/keyboard-articles";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default function KeyboardsComparison() {
  const [keyboardTypeFilter, setKeyboardTypeFilter] = useState<string>("all");
  const [layoutFilter, setLayoutFilter] = useState<string>("all");
  const [wirelessFilter, setWirelessFilter] = useState<string>("all");
  const [hotSwappableFilter, setHotSwappableFilter] = useState<string>("all");
  const [priceMin, setPriceMin] = useState<string>("0");
  const [priceMax, setPriceMax] = useState<string>("500");
  const [sortBy, setSortBy] = useState<string>("name");

  const filteredProducts = useMemo(() => {
    let result = [...keyboards];

    // Keyboard type filter
    if (keyboardTypeFilter !== "all") {
      result = result.filter((k) => k.keyboardType === keyboardTypeFilter);
    }

    // Layout filter
    if (layoutFilter !== "all") {
      result = result.filter((k) => k.layout === layoutFilter);
    }

    // Wireless filter
    if (wirelessFilter === "wireless") {
      result = result.filter((k) => k.wireless === true);
    } else if (wirelessFilter === "wired") {
      result = result.filter((k) => k.wireless === false);
    }

    // Hot-swappable filter
    if (hotSwappableFilter === "yes") {
      result = result.filter((k) => k.hotSwappable === true);
    } else if (hotSwappableFilter === "no") {
      result = result.filter((k) => k.hotSwappable === false);
    }

    // Price filter
    const minPrice = parseInt(priceMin) || 0;
    const maxPrice = parseInt(priceMax) || 500;
    result = result.filter((k) => k.price >= minPrice && k.price <= maxPrice);

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`));
    }

    return result;
  }, [keyboardTypeFilter, layoutFilter, wirelessFilter, hotSwappableFilter, priceMin, priceMax, sortBy]);

  const articleSlugs = getKeyboardArticleSlugs();

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs
          items={[
            {
              label: "Keyboards",
              href: "/keyboards",
            },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Best Mechanical & Membrane Keyboards Compared
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          We've compared 14 premium keyboards across all types and price points. Explore mechanical versus membrane, hot-swappable designs, wireless options, and layouts from 60% compact to full-size. Find the perfect keyboard for programming, gaming, or typing. Our analysis covers switch types, ergonomics, customization, and real-world performance.
        </p>
      </section>

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-lg text-gray-900 mb-6">Filters & Sort</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Keyboard Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keyboard Type
              </label>
              <select
                value={keyboardTypeFilter}
                onChange={(e) => setKeyboardTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="mechanical">Mechanical</option>
                <option value="membrane">Membrane</option>
                <option value="optical">Optical</option>
                <option value="topre">Topre</option>
              </select>
            </div>

            {/* Layout Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Layout
              </label>
              <select
                value={layoutFilter}
                onChange={(e) => setLayoutFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Layouts</option>
                <option value="full-size">Full-Size</option>
                <option value="tenkeyless">Tenkeyless (87 keys)</option>
                <option value="75%">75%</option>
                <option value="65%">65%</option>
                <option value="60%">60%</option>
              </select>
            </div>

            {/* Wireless Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wireless / Wired
              </label>
              <select
                value={wirelessFilter}
                onChange={(e) => setWirelessFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="wireless">Wireless Only</option>
                <option value="wired">Wired Only</option>
              </select>
            </div>

            {/* Hot-Swappable Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hot-Swappable
              </label>
              <select
                value={hotSwappableFilter}
                onChange={(e) => setHotSwappableFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="yes">Hot-Swappable</option>
                <option value="no">Non-Hot-Swappable</option>
              </select>
            </div>
          </div>

          {/* Price Range and Sort */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {/* Min Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Price
              </label>
              <input
                type="number"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>

            {/* Max Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price
              </label>
              <input
                type="number"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="500"
              />
            </div>

            {/* Sort */}
            <div className="md:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="rating">Rating (High to Low)</option>
              </select>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-4">
            Found {filteredProducts.length} keyboard{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Switches
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Layout
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Wireless
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Hot-Swap
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  RGB
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((keyboard, idx) => (
                <tr
                  key={keyboard.id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {keyboard.brand} {keyboard.model}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {keyboard.keyboardType.charAt(0).toUpperCase() + keyboard.keyboardType.slice(1)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {keyboard.switchType}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {keyboard.layout}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {keyboard.wireless ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {keyboard.hotSwappable ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {keyboard.rgbLighting ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {formatPrice(keyboard.price)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-blue-600">
                    {keyboard.rating.toFixed(1)}★
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No keyboards match your filters. Try adjusting your criteria.</p>
          </div>
        )}
      </section>

      {/* Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Keyboard Guides & Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articleSlugs.map((slug) => {
            // Map article slugs to titles
            const articleTitles: Record<string, string> = {
              "mechanical-vs-membrane": "Mechanical vs Membrane Keyboards",
              "best-for-programming": "Best Keyboards for Programming in 2025",
              "switch-types-explained": "Keyboard Switch Types Explained",
              "hot-swappable-guide": "Hot-Swappable Keyboards: A Beginner's Guide",
            };

            return (
              <Link
                key={slug}
                href={`/keyboards/${slug}`}
                className="block p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {articleTitles[slug] || slug}
                </h3>
                <p className="text-gray-600 text-sm">
                  Read our comprehensive guide on {articleTitles[slug]?.toLowerCase() || slug}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
