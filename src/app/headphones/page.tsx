"use client";

import { useState, useMemo } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { headphones } from "@/data/headphones";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default function HeadphonesComparison() {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [wirelessFilter, setWirelessFilter] = useState<string>("all");
  const [ancFilter, setAncFilter] = useState<string>("all");
  const [priceMin, setPriceMin] = useState<string>("0");
  const [priceMax, setPriceMax] = useState<string>("2000");
  const [impedanceMin, setImpedanceMin] = useState<string>("0");
  const [impedanceMax, setImpedanceMax] = useState<string>("100");
  const [sortBy, setSortBy] = useState<string>("name");

  const filteredProducts = useMemo(() => {
    let result = [...headphones];

    // Type filter
    if (typeFilter !== "all") {
      result = result.filter((h) => h.type === typeFilter);
    }

    // Wireless filter
    if (wirelessFilter === "wireless") {
      result = result.filter((h) => h.wireless === true);
    } else if (wirelessFilter === "wired") {
      result = result.filter((h) => h.wireless === false);
    }

    // ANC filter
    if (ancFilter === "yes") {
      result = result.filter((h) => h.anc === true);
    } else if (ancFilter === "no") {
      result = result.filter((h) => h.anc === false);
    }

    // Price filter
    const minPrice = parseInt(priceMin) || 0;
    const maxPrice = parseInt(priceMax) || 2000;
    result = result.filter((h) => h.price >= minPrice && h.price <= maxPrice);

    // Impedance filter
    const minImpedance = parseInt(impedanceMin) || 0;
    const maxImpedance = parseInt(impedanceMax) || 100;
    result = result.filter(
      (h) => h.impedanceOhms >= minImpedance && h.impedanceOhms <= maxImpedance
    );

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
  }, [typeFilter, wirelessFilter, ancFilter, priceMin, priceMax, impedanceMin, impedanceMax, sortBy]);

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs
          items={[
            {
              label: "Headphones",
              href: "/headphones",
            },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Best Headphones Compared — Audiophile to Budget
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          We've analyzed 14 premium headphones across all types and price points. Compare
          specifications, driver technology, wireless vs wired, ANC capabilities, and ratings
          to find the perfect headphones for music, gaming, or studio work. Our methodology is
          based on manufacturer specifications, real-world testing, and audiophile analysis.
        </p>
      </section>

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-lg text-gray-900 mb-6">Filters & Sort</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Headphone Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="over-ear">Over-Ear</option>
                <option value="on-ear">On-Ear</option>
                <option value="in-ear">In-Ear</option>
                <option value="earbuds">Earbuds</option>
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

            {/* ANC Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Noise Cancellation
              </label>
              <select
                value={ancFilter}
                onChange={(e) => setAncFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="yes">ANC Only</option>
                <option value="no">No ANC</option>
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

          {/* Impedance Range Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Impedance: {impedanceMin}Ω
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={impedanceMin}
                onChange={(e) => setImpedanceMin(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Impedance: {impedanceMax}Ω
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={impedanceMax}
                onChange={(e) => setImpedanceMax(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-6">
            Showing {filteredProducts.length} of {headphones.length} headphones
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
                  Type
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-bold">
                  Wireless
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-bold">
                  ANC
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-bold">
                  Driver
                </th>
                <th className="border border-gray-300 px-4 py-2 text-right font-bold">
                  Impedance
                </th>
                <th className="border border-gray-300 px-4 py-2 text-right font-bold">
                  Battery (hrs)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-bold">
                  Codec
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
                    {product.type}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {product.wireless ? "✓" : "—"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {product.anc ? "✓" : "—"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-xs">
                    {product.driverSize}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-xs">
                    {product.impedanceOhms}Ω
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-xs">
                    {product.batteryHours > 0 ? product.batteryHours : "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-xs">
                    {product.codec}
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
          Featured Headphones
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
                    {product.type}
                  </span>
                  {product.wireless && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                      Wireless
                    </span>
                  )}
                  {product.anc && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      ANC
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
          Headphone Guides & Analysis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/headphones/open-back-vs-closed-back-headphones">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Open-Back vs Closed-Back Headphones
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Understand soundstage, noise isolation, and which design suits your listening
                environment. A deep dive into acoustic design and listening experience.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                Read Guide <span>→</span>
              </div>
            </div>
          </Link>

          <Link href="/headphones/best-headphones-under-200">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Best Headphones Under $200
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                The sweet spot for audio quality and value. Compare wireless, studio-quality,
                and audiophile options without premium pricing.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                Read Guide <span>→</span>
              </div>
            </div>
          </Link>

          <Link href="/headphones/headphone-driver-types-explained">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Headphone Driver Types Explained
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Dynamic, planar magnetic, balanced armature, and electrostatic drivers. How
                they work, trade-offs, and which matters for your use case.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                Read Guide <span>→</span>
              </div>
            </div>
          </Link>

          <Link href="/headphones/wireless-vs-wired-headphones-sound-quality">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Wireless vs Wired Headphones: Sound Quality Truth
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Do wireless headphones sacrifice audio quality? An audiophile analysis of
                Bluetooth codecs, latency, and transparency.
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
              What's the difference between over-ear and in-ear headphones?
            </h3>
            <p className="text-gray-600">
              Over-ear headphones cover your entire ear and rest on your head. They offer
              larger soundstage, better bass, and comfort for extended wear, but are bulkier.
              In-ear and earbud headphones fit inside or on your ear canal. They're portable
              and discreet but typically offer less soundstage and may be uncomfortable for
              extended sessions. Choose over-ear for home/studio use and in-ear for travel
              and active use.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              Is active noise cancellation worth the extra cost?
            </h3>
            <p className="text-gray-600">
              ANC is essential if you use headphones in noisy environments (planes, trains,
              offices). The cost premium is typically $50-100 for effective ANC. If you use
              headphones primarily in quiet spaces, passive isolation from a sealed design
              might be sufficient. For commuters and travelers, ANC is a worthwhile investment
              for focus and reduced listening fatigue.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              Should I buy wireless or wired headphones?
            </h3>
            <p className="text-gray-600">
              Modern wireless headphones (AAC, aptX, LDAC codecs) sound excellent and are
              nearly indistinguishable from wired for casual listening. Wireless offers
              convenience, ANC capability, and freedom of movement. Wired headphones offer
              zero latency, lossless audio, and consistent performance. For portability and
              everyday use: wireless. For critical listening, studio work, or gaming: wired.
              The best choice depends on your primary use case.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              What does impedance mean and does it matter?
            </h3>
            <p className="text-gray-600">
              Impedance (measured in ohms) determines how much amplifier power a headphone
              needs. Lower impedance (8-32Ω) headphones require less power; higher impedance
              (64Ω+) require more. For portable devices, lower impedance is easier to drive.
              For studio monitors, impedance matching to your amplifier matters more. Most
              consumer headphones (16-32Ω) work fine with phones and laptops.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              What's the difference between Bluetooth codecs?
            </h3>
            <p className="text-gray-600">
              Bluetooth codecs (SBC, AAC, aptX, LDAC) compress audio for wireless
              transmission. SBC is basic and sounds obviously compressed. AAC is used by
              Apple and sounds very good. aptX offers lower latency for gaming. LDAC supports
              Hi-Res audio at 909kbps, nearly lossless. Higher bitrate codecs sound better,
              but require both phone and headphone support. For casual listening, AAC is
              excellent.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              Are audiophile headphones worth the premium price?
            </h3>
            <p className="text-gray-600">
              Audiophile headphones (open-back, planar magnetic) offer exceptional clarity
              and soundstage compared to consumer models, but at 2-5x the cost. If you listen
              to lossless audio, value transparency, or do critical listening, the upgrade is
              worthwhile. For casual streaming and everyday music, mid-range headphones offer
              excellent sound at better value. The jump from $100 to $300 yields noticeable
              improvement; $300 to $1000+ yields diminishing returns.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
