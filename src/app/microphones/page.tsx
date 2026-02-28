"use client";

import { useState, useMemo } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { microphones } from "@/data/microphones";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default function MicrophonesComparison() {
  const [micTypeFilter, setMicTypeFilter] = useState<string>("all");
  const [connectionTypeFilter, setConnectionTypeFilter] = useState<string>("all");
  const [polarPatternFilter, setPolarPatternFilter] = useState<string>("all");
  const [priceMin, setPriceMin] = useState<string>("0");
  const [priceMax, setPriceMax] = useState<string>("500");
  const [sortBy, setSortBy] = useState<string>("name");

  const filteredProducts = useMemo(() => {
    let result = [...microphones];

    // Microphone type filter
    if (micTypeFilter !== "all") {
      result = result.filter((m) => m.micType === micTypeFilter);
    }

    // Connection type filter
    if (connectionTypeFilter !== "all") {
      if (connectionTypeFilter === "usb-xlr") {
        result = result.filter((m) => m.connectionType === "USB/XLR");
      } else {
        result = result.filter((m) => m.connectionType === connectionTypeFilter);
      }
    }

    // Polar pattern filter
    if (polarPatternFilter !== "all") {
      if (polarPatternFilter === "cardioid") {
        result = result.filter((m) => m.polarPattern.includes("Cardioid"));
      } else if (polarPatternFilter === "multi") {
        result = result.filter((m) => m.polarPattern.includes("Multi-pattern"));
      }
    }

    // Price filter
    const minPrice = parseInt(priceMin) || 0;
    const maxPrice = parseInt(priceMax) || 500;
    result = result.filter((m) => m.price >= minPrice && m.price <= maxPrice);

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
  }, [micTypeFilter, connectionTypeFilter, polarPatternFilter, priceMin, priceMax, sortBy]);

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs
          items={[
            {
              label: "Microphones",
              href: "/microphones",
            },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Best Microphones Compared — Budget to Professional
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          We've analyzed 13 premium microphones across all types and price points. Compare
          specifications, microphone types, connection options, polar patterns, sample rates, and
          ratings to find the perfect microphone for podcasting, streaming, or studio recording.
          Our methodology is based on manufacturer specifications, real-world testing, and
          professional audio engineering standards.
        </p>
      </section>

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-lg text-gray-900 mb-6">Filters & Sort</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Microphone Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Microphone Type
              </label>
              <select
                value={micTypeFilter}
                onChange={(e) => setMicTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="condenser">Condenser</option>
                <option value="dynamic">Dynamic</option>
                <option value="ribbon">Ribbon</option>
                <option value="usb">USB</option>
              </select>
            </div>

            {/* Connection Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Connection Type
              </label>
              <select
                value={connectionTypeFilter}
                onChange={(e) => setConnectionTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="USB">USB Only</option>
                <option value="XLR">XLR Only</option>
                <option value="usb-xlr">USB/XLR Hybrid</option>
              </select>
            </div>

            {/* Polar Pattern Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Polar Pattern
              </label>
              <select
                value={polarPatternFilter}
                onChange={(e) => setPolarPatternFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Patterns</option>
                <option value="cardioid">Cardioid</option>
                <option value="multi">Multi-Pattern</option>
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
                max="500"
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
                max="500"
                step="10"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-6">
            Showing {filteredProducts.length} of {microphones.length} microphones
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
                  Product
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-bold">
                  Type
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-bold">
                  Pattern
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-bold">
                  Connection
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-bold">
                  Sample Rate
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-bold">
                  Mute Button
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-bold">
                  Headphone Jack
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
                    {product.micType}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-xs">
                    {product.polarPattern.includes("Multi") ? "Multi" : "Cardioid"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-xs">
                    {product.connectionType}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-xs">
                    {product.sampleRate}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {product.hasMuteButton ? "✓" : "—"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {product.hasHeadphoneJack ? "✓" : "—"}
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
          Featured Microphones
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
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {product.micType}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    {product.connectionType}
                  </span>
                  {product.hasMuteButton && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      Mute Button
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
          Microphone Guides & Analysis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/microphones/usb-vs-xlr">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                USB vs XLR Microphones
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Understand the difference between USB and XLR connections, when to use each,
                and how to choose the right setup for your needs.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                Read Guide <span>→</span>
              </div>
            </div>
          </Link>

          <Link href="/microphones/best-for-podcasting">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Best Microphones for Podcasting
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Discover the top microphones for podcasting across all budget levels, from
                budget USB options to professional broadcast equipment.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                Read Guide <span>→</span>
              </div>
            </div>
          </Link>

          <Link href="/microphones/condenser-vs-dynamic">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Condenser vs Dynamic Microphones
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Understand the key differences between condenser and dynamic microphones,
                their strengths, and which type suits your needs.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                Read Guide <span>→</span>
              </div>
            </div>
          </Link>

          <Link href="/microphones/room-treatment-tips">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Room Treatment Tips for Better Audio
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Improve your recording quality with practical room treatment solutions.
                Learn how to reduce echo and background noise.
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
              What's the difference between USB and XLR microphones?
            </h3>
            <p className="text-gray-600">
              USB microphones plug directly into your computer with built-in audio interface.
              XLR microphones require an external audio interface to convert analog to digital.
              USB is simpler and cheaper; XLR offers better sound quality and flexibility to
              add multiple microphones.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              Should I get a condenser or dynamic microphone?
            </h3>
            <p className="text-gray-600">
              Condenser microphones are sensitive and capture detail, ideal for studio
              recording and acoustically treated spaces. Dynamic microphones isolate the
              primary sound source, perfect for podcasting in untreated rooms. For podcasting
              and voice, dynamic is often the better choice.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              Do I need phantom power?
            </h3>
            <p className="text-gray-600">
              Condenser microphones require 48V phantom power to operate. USB microphones and
              dynamic XLR microphones do not. Most audio interfaces include a phantom power
              switch. If using dynamic microphones, phantom power is not needed.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              What sample rate should I use?
            </h3>
            <p className="text-gray-600">
              Standard CD quality is 44.1kHz/16-bit. Professional studios use 48kHz/24-bit or
              96kHz/24-bit for more headroom and flexibility during mixing. For podcasting and
              voice recording, 48kHz/24-bit is the industry standard. Higher sample rates are
              overkill for voice but useful for music production.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              What microphones work best for podcasting?
            </h3>
            <p className="text-gray-600">
              Dynamic microphones with cardioid patterns are ideal for podcasting. They isolate
              your voice and reject background noise. Recommended models: Shure SM7B for
              professional quality, Rode PodMic USB for budget-friendly podcasting, Blue Yeti
              for USB simplicity.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              Do I need room treatment?
            </h3>
            <p className="text-gray-600">
              Untreated rooms with hard surfaces (walls, glass, concrete) create echo and
              reflections that appear in recordings. Soft furnishings (curtains, rugs, furniture)
              help. Acoustic foam panels dramatically improve recordings. Even basic treatment
              significantly improves audio quality.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
