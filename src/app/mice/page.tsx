"use client";

import { useState, useMemo } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { mice } from "@/data/mice";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default function MiceComparison() {
  const [mouseTypeFilter, setMouseTypeFilter] = useState<string>("all");
  const [wirelessFilter, setWirelessFilter] = useState<string>("all");
  const [rgbLightingFilter, setRgbLightingFilter] = useState<string>("all");
  const [priceMin, setPriceMin] = useState<string>("0");
  const [priceMax, setPriceMax] = useState<string>("200");
  const [dpiMin, setDpiMin] = useState<string>("0");
  const [sortBy, setSortBy] = useState<string>("name");

  const filteredProducts = useMemo(() => {
    let result = [...mice];

    // Mouse type filter
    if (mouseTypeFilter !== "all") {
      result = result.filter((m) => m.mouseType === mouseTypeFilter);
    }

    // Wireless filter
    if (wirelessFilter === "wireless") {
      result = result.filter((m) => m.wireless === true);
    } else if (wirelessFilter === "wired") {
      result = result.filter((m) => m.wireless === false);
    }

    // RGB Lighting filter
    if (rgbLightingFilter === "yes") {
      result = result.filter((m) => m.rgbLighting === true);
    } else if (rgbLightingFilter === "no") {
      result = result.filter((m) => m.rgbLighting === false);
    }

    // Price filter
    const minPrice = parseInt(priceMin) || 0;
    const maxPrice = parseInt(priceMax) || 200;
    result = result.filter((m) => m.price >= minPrice && m.price <= maxPrice);

    // DPI filter
    const minDpi = parseInt(dpiMin) || 0;
    result = result.filter((m) => m.dpiMax >= minDpi);

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
  }, [mouseTypeFilter, wirelessFilter, rgbLightingFilter, priceMin, priceMax, dpiMin, sortBy]);

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs
          items={[
            {
              label: "Mice",
              href: "/mice",
            },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Best Gaming & Productivity Mice Compared
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          We've analyzed 14 premium mice across gaming, ergonomic, productivity, and travel
          categories. Compare sensors, DPI, wireless technology, weight, battery life, and
          ratings to find the perfect mouse for your setup. Our methodology is based on
          manufacturer specifications, user feedback, and hands-on testing.
        </p>
      </section>

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-lg text-gray-900 mb-6">Filters & Sort</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Mouse Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mouse Type
              </label>
              <select
                value={mouseTypeFilter}
                onChange={(e) => setMouseTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="gaming">Gaming</option>
                <option value="ergonomic">Ergonomic</option>
                <option value="productivity">Productivity</option>
                <option value="travel">Travel</option>
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

            {/* RGB Lighting Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                RGB Lighting
              </label>
              <select
                value={rgbLightingFilter}
                onChange={(e) => setRgbLightingFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="yes">RGB Only</option>
                <option value="no">No RGB</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Price Range Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Price: ${priceMin}
              </label>
              <input
                type="range"
                min="0"
                max="200"
                step="10"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price: ${priceMax}
              </label>
              <input
                type="range"
                min="0"
                max="200"
                step="10"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* DPI Range Slider */}
          <div className="grid grid-cols-1 gap-4 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Max DPI: {dpiMin}
              </label>
              <input
                type="range"
                min="0"
                max="40000"
                step="1000"
                value={dpiMin}
                onChange={(e) => setDpiMin(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-6">
            Showing {filteredProducts.length} of {mice.length} mice
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Full Comparison Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left font-bold">
                  Brand & Model
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-bold">
                  Type
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-bold">
                  Sensor
                </th>
                <th className="border border-gray-300 px-4 py-2 text-right font-bold">
                  Max DPI
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-bold">
                  Wireless
                </th>
                <th className="border border-gray-300 px-4 py-2 text-right font-bold">
                  Weight (g)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-right font-bold">
                  Battery (hrs)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-bold">
                  Buttons
                </th>
                <th className="border border-gray-300 px-4 py-2 text-right font-bold">
                  Price
                </th>
                <th className="border border-gray-300 px-4 py-2 text-right font-bold">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr
                  key={product.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="border border-gray-300 px-4 py-2 font-medium">
                    <strong>{product.brand}</strong> {product.model}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-xs capitalize">
                    {product.mouseType}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-xs">
                    {product.sensor}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-xs">
                    {product.dpiMax.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {product.wireless ? "✓" : "—"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-xs">
                    {product.weightGrams}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-xs">
                    {product.batteryHours > 0 ? product.batteryHours : "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-xs">
                    {product.buttons}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right font-medium">
                    ${product.price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right font-bold">
                    {product.rating.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Featured Mice
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.slice(0, 6).map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <img
                  src={product.imageUrl}
                  alt={product.model}
                  className="max-h-full max-w-full object-contain p-4"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900">
                  {product.brand} {product.model}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{product.summary}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <span className="text-sm font-semibold text-yellow-500">
                    ★ {product.rating.toFixed(1)}
                  </span>
                </div>
                <div className="flex gap-2 mt-3 flex-wrap text-xs">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded capitalize">
                    {product.mouseType}
                  </span>
                  {product.wireless && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                      Wireless
                    </span>
                  )}
                  {product.rgbLighting && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      RGB
                    </span>
                  )}
                </div>
                {product.amazonAsin && (
                  <a
                    href={`https://amazon.com/dp/${product.amazonAsin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 w-full text-center bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition-colors"
                  >
                    View on Amazon
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Mouse Guides & Analysis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/mice/gaming-vs-productivity">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Gaming vs Productivity Mice
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Understand the fundamental differences between gaming and productivity mice.
                Learn how design, sensors, and ergonomics diverge based on use case.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                Read Guide <span>→</span>
              </div>
            </div>
          </Link>

          <Link href="/mice/best-ergonomic-mice">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Best Ergonomic Mice for Long Work Days
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Find the perfect ergonomic mouse to reduce wrist strain and RSI. Compare
                vertical, trackball, and contoured designs.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                Read Guide <span>→</span>
              </div>
            </div>
          </Link>

          <Link href="/mice/dpi-sensitivity-guide">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                DPI and Sensitivity Guide
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Master DPI and mouse sensitivity settings. Learn why higher isn't always better
                and find your optimal sensitivity.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                Read Guide <span>→</span>
              </div>
            </div>
          </Link>

          <Link href="/mice/wireless-latency-myth">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Wireless vs Wired: Latency Reality Check
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Wireless mice latency isn't a barrier anymore. Compare modern 2.4GHz and
                Bluetooth technology performance.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                Read Guide <span>→</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              What's the difference between gaming and productivity mice?
            </h3>
            <p className="text-gray-600">
              Gaming mice prioritize speed, precision, and responsiveness for competitive
              advantage. They're lightweight, aggressive, and built for intense short sessions.
              Productivity mice prioritize comfort, accuracy, and efficiency features. They're
              heavier, ergonomic, and designed for all-day use. Using a gaming mouse for work
              causes wrist fatigue; using a productivity mouse for gaming feels sluggish.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              Is wireless really as good as wired for gaming?
            </h3>
            <p className="text-gray-600">
              Modern 2.4GHz wireless mice (like Logitech G PRO X Superlight 2, Razer Viper V3
              Pro) have latency equivalent to wired mice — 1-3ms. Professional gamers use
              wireless mice in competitive esports. The "wireless is too slow" myth is outdated.
              Choose wireless or wired based on comfort and preference, not performance.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              What DPI should I use?
            </h3>
            <p className="text-gray-600">
              Optimal DPI depends on your task. Competitive gamers use 400-1200 DPI. Casual
              gamers use 1200-2400 DPI. Productivity users benefit from 800-1600 DPI (1:1
              cursor-to-hand ratio). Design professionals use 400-800 DPI for precision. There's
              no universal optimal DPI — test systematically and find what feels natural.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              Should I choose ergonomic mice?
            </h3>
            <p className="text-gray-600">
              Ergonomic mice (vertical, trackball, contoured) significantly reduce wrist strain
              during all-day use. If you experience wrist pain or work 8+ hours daily, an
              ergonomic mouse is a worthwhile investment. Vertical mice (45-60 degree angle)
              reduce pronation strain most effectively. Trackballs eliminate repetitive hand
              movement but require a learning curve.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              Does high DPI improve gaming performance?
            </h3>
            <p className="text-gray-600">
              No. Professional gamers use moderate DPI (400-1200) because extreme DPI actually
              impairs precision and requires constant micro-adjustments. High DPI creates
              twitchy, imprecise movement. For gaming, use moderate DPI (400-1600) and adjust
              in-game sensitivity to your comfort level. Build muscle memory by keeping settings
              consistent.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              What's the best mouse for multi-device switching?
            </h3>
            <p className="text-gray-600">
              Productivity mice with Bluetooth support multi-device switching. The Logitech MX
              Anywhere 3S, Logitech MX Master 3S, and similar models switch between Mac, iPad,
              Windows, and Linux with a single button. Bluetooth latency is fine for productivity
              (15-30ms). Gaming mice typically use 2.4GHz only, limiting multi-device support.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
