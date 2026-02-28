"use client";

import { useState, useMemo } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { turntables } from "@/data/turntables";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default function TurnTablesComparison() {
  const [driveTypeFilter, setDriveTypeFilter] = useState<string>("all");
  const [preampFilter, setPreampFilter] = useState<string>("all");
  const [bluetoothFilter, setBluetoothFilter] = useState<string>("all");
  const [priceMin, setPriceMin] = useState<string>("0");
  const [priceMax, setPriceMax] = useState<string>("2000");
  const [sortBy, setSortBy] = useState<string>("name");

  const filteredProducts = useMemo(() => {
    let result = [...turntables];

    // Drive type filter
    if (driveTypeFilter !== "all") {
      result = result.filter((t) => t.driveType === driveTypeFilter);
    }

    // Preamp filter
    if (preampFilter === "yes") {
      result = result.filter((t) => t.builtInPreamp === true);
    } else if (preampFilter === "no") {
      result = result.filter((t) => t.builtInPreamp === false);
    }

    // Bluetooth filter
    if (bluetoothFilter === "yes") {
      result = result.filter((t) => t.bluetoothOutput === true);
    } else if (bluetoothFilter === "no") {
      result = result.filter((t) => t.bluetoothOutput === false);
    }

    // Price filter
    const minPrice = parseInt(priceMin) || 0;
    const maxPrice = parseInt(priceMax) || 2000;
    result = result.filter((t) => t.price >= minPrice && t.price <= maxPrice);

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
  }, [driveTypeFilter, preampFilter, bluetoothFilter, priceMin, priceMax, sortBy]);

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs
          items={[
            {
              label: "Turntables",
              href: "/turntables",
            },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Best Turntables Compared — Budget to Audiophile
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          We've analyzed 13 premium turntables across all types and price points.
          Compare specifications, drive type, built-in preamps, Bluetooth
          connectivity, and ratings to find the perfect vinyl player for your
          listening needs. Our methodology is based on manufacturer
          specifications, real-world performance, and vinyl enthusiast analysis.
        </p>
      </section>

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-lg text-gray-900 mb-6">
            Filters & Sort
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Drive Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Drive Type
              </label>
              <select
                value={driveTypeFilter}
                onChange={(e) => setDriveTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="belt-drive">Belt-Drive</option>
                <option value="direct-drive">Direct-Drive</option>
              </select>
            </div>

            {/* Built-In Preamp Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Built-In Preamp
              </label>
              <select
                value={preampFilter}
                onChange={(e) => setPreampFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="yes">With Preamp</option>
                <option value="no">No Preamp</option>
              </select>
            </div>

            {/* Bluetooth Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bluetooth Output
              </label>
              <select
                value={bluetoothFilter}
                onChange={(e) => setBluetoothFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="yes">With Bluetooth</option>
                <option value="no">No Bluetooth</option>
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
                max="2000"
                step="50"
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
                max="2000"
                step="50"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-6">
            Showing {filteredProducts.length} of {turntables.length} turntables
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
                <th className="border border-gray-300 px-4 py-2 text-right font-bold">
                  Price
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-bold">
                  Drive
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-bold">
                  Speeds
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-bold">
                  Preamp
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-bold">
                  Cartridge
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-bold">
                  USB
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-bold">
                  Bluetooth
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
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    ${product.price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-xs capitalize">
                    {product.driveType === "belt-drive" ? "Belt" : "Direct"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-xs">
                    {product.speeds}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {product.builtInPreamp ? "✓" : "—"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-xs">
                    {product.cartridgeIncluded ? "Yes" : "No"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {product.usbOutput ? "✓" : "—"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {product.bluetoothOutput ? "✓" : "—"}
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Turntables</h2>
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
                    {product.driveType === "belt-drive" ? "Belt-Drive" : "Direct-Drive"}
                  </span>
                  {product.builtInPreamp && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                      Built-In Preamp
                    </span>
                  )}
                  {product.bluetoothOutput && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      Bluetooth
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
          Turntable Guides & Analysis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/turntables/belt-drive-vs-direct-drive">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Belt-Drive vs Direct-Drive Turntables
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Understand the differences between motor designs, sound quality
                implications, and which type suits your listening needs.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                Read Guide <span>→</span>
              </div>
            </div>
          </Link>

          <Link href="/turntables/best-under-300">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Best Turntables Under $300
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Discover the sweet spot for vinyl playback value. Premium sound
                quality without luxury pricing.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                Read Guide <span>→</span>
              </div>
            </div>
          </Link>

          <Link href="/turntables/vinyl-setup-guide">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Complete Vinyl Setup Guide for Beginners
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Everything needed to set up your first vinyl system. Turntable
                selection, speakers, and proper record care.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                Read Guide <span>→</span>
              </div>
            </div>
          </Link>

          <Link href="/turntables/cartridge-upgrade-guide">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                When and How to Upgrade Your Turntable Cartridge
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Learn why cartridge upgrades matter and how to choose the right
                replacement for your turntable.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                Read Guide <span>→</span>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
