"use client";

import { useState, useMemo } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { luggage } from "@/data/luggage";
import { Luggage } from "@/data/luggage";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default function LuggageComparison() {
  const [luggageType, setLuggageType] = useState<string>("all");
  const [material, setMaterial] = useState<string>("all");
  const [wheels, setWheels] = useState<string>("all");
  const [expandable, setExpandable] = useState<string>("all");
  const [priceMin, setPriceMin] = useState<number>(0);
  const [priceMax, setPriceMax] = useState<number>(1000);
  const [sortBy, setSortBy] = useState<string>("name");

  const filteredProducts = useMemo(() => {
    let result = [...luggage];

    if (luggageType !== "all") {
      result = result.filter((p) => p.luggageType === luggageType);
    }

    if (material !== "all") {
      result = result.filter((p) => p.material === material);
    }

    if (wheels !== "all") {
      const wheelCount = parseInt(wheels);
      result = result.filter((p) => p.wheels === wheelCount);
    }

    if (expandable !== "all") {
      const isExpandable = expandable === "yes";
      result = result.filter((p) => p.expandable === isExpandable);
    }

    result = result.filter((p) => p.price >= priceMin && p.price <= priceMax);

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
  }, [luggageType, material, wheels, expandable, priceMin, priceMax, sortBy]);

  // Get unique materials
  const uniqueMaterials = Array.from(new Set(luggage.map((p) => p.material))).sort();

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs
          items={[
            {
              label: "Luggage",
              href: "/luggage",
            },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Best Luggage Compared — 2025-2026
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          We've analyzed 14 luggage options across carry-on, checked, backpack, and duffel categories. Compare specifications, materials, features, prices, and ratings to find the perfect travel bag for your needs.
        </p>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-lg text-gray-900 mb-6">Filters & Sort</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Luggage Type
              </label>
              <select
                value={luggageType}
                onChange={(e) => setLuggageType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="carry-on">Carry-On</option>
                <option value="checked">Checked</option>
                <option value="backpack">Backpack</option>
                <option value="duffel">Duffel</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Material
              </label>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Materials</option>
                {uniqueMaterials.map((mat) => (
                  <option key={mat} value={mat}>
                    {mat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wheels
              </label>
              <select
                value={wheels}
                onChange={(e) => setWheels(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Any</option>
                <option value="4">4-Wheel Spinner</option>
                <option value="2">2-Wheel</option>
                <option value="0">No Wheels (Backpack)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expandable
              </label>
              <select
                value={expandable}
                onChange={(e) => setExpandable(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Any</option>
                <option value="yes">Expandable Only</option>
                <option value="no">Non-Expandable Only</option>
              </select>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Min: ${priceMin}
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={priceMin}
                onChange={(e) => setPriceMin(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Max: ${priceMax}
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={priceMax}
                onChange={(e) => setPriceMax(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

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

          <p className="text-sm text-gray-600 mt-4">
            Showing {filteredProducts.length} of {luggage.length} luggage items
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
                <th className="border border-gray-300 px-4 py-2 text-left font-bold">
                  Material
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-bold">
                  Size
                </th>
                <th className="border border-gray-300 px-4 py-2 text-right font-bold">
                  Weight (lbs)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-right font-bold">
                  Capacity (L)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-bold">
                  Wheels
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-bold">
                  Expandable
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-bold">
                  TSA Lock
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
                  <td className="border border-gray-300 px-4 py-2">
                    <strong>{product.brand}</strong> {product.model}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-xs">
                    {product.luggageType.charAt(0).toUpperCase() + product.luggageType.slice(1)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-xs">
                    {product.material}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-xs">
                    {product.sizeInches}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {product.weightLbs}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {product.capacityLiters}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {product.wheels > 0 ? `${product.wheels}` : "—"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {product.expandable ? "✓" : "—"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {product.tsa_lock ? "✓" : "—"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right font-bold">
                    {formatPrice(product.price)}
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

      {/* Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Luggage Guides & Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/luggage/hardside-vs-softside">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Hardside vs Softside Luggage
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Understand the real differences between rigid and flexible luggage construction.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                Read Guide <span>→</span>
              </div>
            </div>
          </Link>

          <Link href="/luggage/carry-on-size-guide">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Carry-On Size Guide
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Learn airline carry-on rules and avoid gate checks with our comprehensive size guide.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                Read Guide <span>→</span>
              </div>
            </div>
          </Link>

          <Link href="/luggage/packing-tips">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Smart Packing Tips
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Master efficient packing techniques to fit 5 days into carry-on luggage.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                Read Guide <span>→</span>
              </div>
            </div>
          </Link>

          <Link href="/luggage/best-for-business-travel">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Best for Business Travel
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Find luggage built for business travelers with executive features.
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
              What's the best luggage for frequent travelers?
            </h3>
            <p className="text-gray-600">
              For frequent business travelers, hardside carry-on luggage with premium materials (ballistic nylon or polycarbonate) and lifetime warranty offers the best value over time. Briggs & Riley and Tumi are top choices. For leisure travelers, lightweight nylon options like Travelpro or Away provide good balance of durability and affordability.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              Should I choose 2-wheel or 4-wheel luggage?
            </h3>
            <p className="text-gray-600">
              4-wheel spinners (4-wheel luggage that spins 360 degrees) are easier to maneuver in crowded airports and require less arm strength. 2-wheel luggage is more stable and traditional, preferred by some business travelers. Choose based on personal preference—both are equally functional for travel.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              What size carry-on fits all airlines?
            </h3>
            <p className="text-gray-600">
              The universal carry-on size is 22 x 14 x 9 inches. This fits every major airline globally. Some airlines like Southwest allow slightly larger (24 x 16 x 10 inches), but 22 x 14 x 9 is the safest standard. Always check your specific airline's policy before purchasing.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              Is hardside or softside luggage better for protection?
            </h3>
            <p className="text-gray-600">
              Hardside luggage provides better protection against impacts, crushing, and rough baggage handling. Softside luggage is lighter and more flexible but less protective. For valuable electronics or fragile items, hardside is recommended. For general travel, both are protective enough if you pack carefully.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              How long does luggage typically last?
            </h3>
            <p className="text-gray-600">
              Quality luggage lasts 5-10 years with normal travel (2-4 trips per year). Hardside luggage tends to last longer than softside. Brands with warranty support (Briggs & Riley, Tumi) can extend lifespan 10+ years through repairs. Budget luggage may only last 2-3 years before needing replacement.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
