"use client";

import { useState, useMemo } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { travelAdapters } from "@/data/travel-adapters";
import { travelAdapterArticles } from "@/data/travel-adapter-articles";
import Link from "next/link";

function formatPrice(price: number): string {
  return `$${price.toFixed(0)}`;
}

export default function TravelAdaptersComparison() {
  const [adapterType, setAdapterType] = useState<string>("all");
  const [pdFastCharging, setPdFastCharging] = useState<string>("all");
  const [ganTech, setGanTech] = useState<string>("all");
  const [voltageConverter, setVoltageConverter] = useState<string>("all");
  const [priceMin, setPriceMin] = useState<string>("0");
  const [priceMax, setPriceMax] = useState<string>("1000");
  const [sortBy, setSortBy] = useState<string>("rating");

  const filteredProducts = useMemo(() => {
    let result = [...travelAdapters];

    if (adapterType !== "all") {
      result = result.filter((a) => a.adapterType === adapterType);
    }

    if (pdFastCharging !== "all") {
      const hasPd = pdFastCharging === "yes";
      result = result.filter((a) => a.pdFastCharging === hasPd);
    }

    if (ganTech !== "all") {
      const hasGan = ganTech === "yes";
      result = result.filter((a) => a.ganTech === hasGan);
    }

    if (voltageConverter !== "all") {
      const hasConverter = voltageConverter === "yes";
      result = result.filter((a) => a.voltageConverter === hasConverter);
    }

    const minPrice = parseFloat(priceMin);
    const maxPrice = parseFloat(priceMax);
    result = result.filter((a) => a.price >= minPrice && a.price <= maxPrice);

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
  }, [adapterType, pdFastCharging, ganTech, voltageConverter, priceMin, priceMax, sortBy]);

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs
          items={[
            {
              label: "Travel Adapters",
              href: "/travel-adapters",
            },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Best Travel Adapters Compared — 2025-2026
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          We've analyzed 13 travel adapters, voltage converters, USB chargers, and power strips for international travel. Compare specifications, countries covered, USB ports, wattage, surge protection, and pricing. Find the perfect adapter for any destination—from universal 200+ country solutions to specialized GaN fast chargers.
        </p>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-lg text-gray-900 mb-6">Filters & Sort</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Adapter Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adapter Type
              </label>
              <select
                value={adapterType}
                onChange={(e) => setAdapterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="universal">Universal Adapter</option>
                <option value="voltage-converter">Voltage Converter</option>
                <option value="usb-hub">USB Charger</option>
                <option value="power-strip">Power Strip</option>
              </select>
            </div>

            {/* PD Fast Charging */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                USB Power Delivery
              </label>
              <select
                value={pdFastCharging}
                onChange={(e) => setPdFastCharging(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="yes">With PD Fast Charging</option>
                <option value="no">Without PD</option>
              </select>
            </div>

            {/* GaN Tech */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GaN Technology
              </label>
              <select
                value={ganTech}
                onChange={(e) => setGanTech(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="yes">With GaN Tech</option>
                <option value="no">Without GaN</option>
              </select>
            </div>

            {/* Voltage Converter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Voltage Converter
              </label>
              <select
                value={voltageConverter}
                onChange={(e) => setVoltageConverter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="yes">With 220V→110V Converter</option>
                <option value="no">Without Converter</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range ($)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  placeholder="Min"
                  className="w-1/2 px-2 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  min="0"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  placeholder="Max"
                  className="w-1/2 px-2 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Sort By */}
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
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-4">
            Showing {filteredProducts.length} of {travelAdapters.length} adapters
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Full Comparison Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-3 text-left font-bold">
                  Product
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-bold">
                  Type
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-bold">
                  Coverage
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-bold">
                  USB-C
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-bold">
                  USB-A
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-bold">
                  AC
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-bold">
                  Watts
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-bold">
                  PD
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-bold">
                  GaN
                </th>
                <th className="border border-gray-300 px-4 py-3 text-right font-bold">
                  Price
                </th>
                <th className="border border-gray-300 px-4 py-3 text-right font-bold">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, i) => (
                <tr
                  key={product.id}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="border border-gray-300 px-4 py-3 font-medium">
                    {product.brand} {product.model}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                      {product.adapterType === "universal"
                        ? "Universal"
                        : product.adapterType === "voltage-converter"
                          ? "Converter"
                          : product.adapterType === "usb-hub"
                            ? "USB Hub"
                            : "Power Strip"}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm">
                    {product.countries}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    {product.usbCPorts}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    {product.usbAPorts}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    {product.acOutlets}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    {product.totalWatts}W
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    {product.pdFastCharging ? "✓" : "—"}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    {product.ganTech ? "✓" : "—"}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-right font-medium">
                    {formatPrice(product.price)}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-right">
                    {product.rating}★
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Expert Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {travelAdapterArticles.map((article) => (
            <div
              key={article.slug}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                <Link
                  href={`/travel-adapters/${article.slug}`}
                  className="hover:text-blue-600"
                >
                  {article.title}
                </Link>
              </h3>
              <p className="text-gray-600 mb-4 text-sm">{article.excerpt}</p>
              <div className="flex items-center justify-between">
                <Link
                  href={`/travel-adapters/${article.slug}`}
                  className="text-blue-600 hover:underline font-medium text-sm"
                >
                  Read guide →
                </Link>
                <span className="text-xs text-gray-500">{article.readingTime} min read</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Do I need a voltage converter or just an adapter?
            </h3>
            <p className="text-gray-600">
              Most modern electronics (phones, laptops, tablets) are dual-voltage (100-240V). Check the label on your power brick. If it says "Input: 100-240V," you only need a plug adapter (which changes the shape). If it's single-voltage (e.g., 110V only), you need a converter. High-wattage devices like hairdryers and razors almost always require converters.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              What's the difference between USB-A and USB-C ports?
            </h3>
            <p className="text-gray-600">
              USB-A is the flat rectangular port used by older phones, action cameras, and some tablets. USB-C is the newer reversible connector used by modern phones (iPhone 15+, Samsung, Google), tablets, and laptops. USB-C is faster and more versatile. If you have both devices, choose an adapter with both port types.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              What is GaN technology and why does it matter for travel?
            </h3>
            <p className="text-gray-600">
              GaN (Gallium Nitride) is a semiconductor technology that makes chargers 50% smaller and lighter than traditional chargers, while delivering the same power. For travel, this means a compact charger fits in your pocket instead of taking up luggage space. GaN chargers are also more efficient and run cooler.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              How many USB ports do I need?
            </h3>
            <p className="text-gray-600">
              Count your devices: phone, tablet, watch, power bank, etc. A general rule is: buy an adapter with as many ports as your device count. If you have 2 devices, a single USB-C port is fine (charge one at a time). If you have 4+ devices, choose a 2-4 port charger to charge simultaneously. Multi-port chargers save time, especially in hotels.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Can I use a universal adapter in every country?
            </h3>
            <p className="text-gray-600">
              A true universal adapter covers 150+ countries and includes interchangeable plugs for all major types (A, B, C, E, F, G, H, I, J, K, L, M, N). However, always check the product specifications—some so-called "universal" adapters only cover 30-50 countries. Read reviews to confirm coverage for your specific destination.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              What is USB Power Delivery (PD) and why is it important?
            </h3>
            <p className="text-gray-600">
              USB Power Delivery allows a single USB port to safely charge multiple devices at different wattages. A PD charger can deliver 5W to a phone, 18W to a tablet, and 65W to a laptop all from one port. Non-PD chargers have fixed output (e.g., only 5W), so they charge slowly. For travel with multiple devices, PD is a game-changer.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Are voltage converters safe for all devices?
            </h3>
            <p className="text-gray-600">
              Voltage converters are safe for most devices up to their rated wattage. A 250W converter can safely step down 220V to 110V for devices under 250W. However, high-wattage devices like hair dryers (1200W), water heaters, and irons exceed converter limits. Check the wattage of your device and match it to a converter rated for that load.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Which adapter is best for long trips (10+ days)?
            </h3>
            <p className="text-gray-600">
              For long trips, invest in a universal adapter (Epicka ~$22 or Zendure Passport III ~$59) plus a multi-port GaN charger (Anker 65W ~$35). The combination handles any outlet type, charges multiple devices simultaneously, and weighs under 1 lb. Add a large power bank (20,000 mAh) if you'll be away from outlets for extended periods.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Can I charge my MacBook with these adapters?
            </h3>
            <p className="text-gray-600">
              Most modern adapters with 60W+ USB-C Power Delivery can charge MacBooks. MacBook Air requires 30-45W, MacBook Pro 13" requires 61W, and MacBook Pro 16" requires 96W+. The Anker 65W GaN, Baseus 65W GaN5, HYPER HyperJuice 100W, and Apple 35W Dual USB-C are all MacBook-compatible. Check the wattage against your MacBook model.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
