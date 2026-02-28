"use client";

import { useState, useMemo } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { powerBanks } from "@/data/power-banks";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default function PowerBanksComparison() {
  const [capacityMin, setCapacityMin] = useState<string>("0");
  const [capacityMax, setCapacityMax] = useState<string>("70000");
  const [outputMin, setOutputMin] = useState<string>("0");
  const [outputMax, setOutputMax] = useState<string>("300");
  const [fastChargingFilter, setFastChargingFilter] = useState<string>("all");
  const [wirelessChargingFilter, setWirelessChargingFilter] = useState<string>("all");
  const [airlineApprovedFilter, setAirlineApprovedFilter] = useState<string>("all");
  const [priceMin, setPriceMin] = useState<string>("0");
  const [priceMax, setPriceMax] = useState<string>("250");
  const [sortBy, setSortBy] = useState<string>("name");

  const filteredProducts = useMemo(() => {
    let result = [...powerBanks];

    // Capacity filter
    const minCapacity = parseInt(capacityMin) || 0;
    const maxCapacity = parseInt(capacityMax) || 70000;
    result = result.filter(
      (p) => p.capacityMah >= minCapacity && p.capacityMah <= maxCapacity
    );

    // Output wattage filter
    const minOutput = parseInt(outputMin) || 0;
    const maxOutput = parseInt(outputMax) || 300;
    result = result.filter(
      (p) => p.outputWatts >= minOutput && p.outputWatts <= maxOutput
    );

    // Fast charging filter
    if (fastChargingFilter === "yes") {
      result = result.filter((p) => p.fastCharging === true);
    } else if (fastChargingFilter === "no") {
      result = result.filter((p) => p.fastCharging === false);
    }

    // Wireless charging filter
    if (wirelessChargingFilter === "yes") {
      result = result.filter((p) => p.wirelessCharging === true);
    } else if (wirelessChargingFilter === "no") {
      result = result.filter((p) => p.wirelessCharging === false);
    }

    // Airline approved filter
    if (airlineApprovedFilter === "yes") {
      result = result.filter((p) => p.airlineApproved === true);
    } else if (airlineApprovedFilter === "no") {
      result = result.filter((p) => p.airlineApproved === false);
    }

    // Price filter
    const minPrice = parseInt(priceMin) || 0;
    const maxPrice = parseInt(priceMax) || 250;
    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "capacity") {
      result.sort((a, b) => b.capacityMah - a.capacityMah);
    } else if (sortBy === "output") {
      result.sort((a, b) => b.outputWatts - a.outputWatts);
    } else {
      result.sort((a, b) => `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`));
    }

    return result;
  }, [
    capacityMin,
    capacityMax,
    outputMin,
    outputMax,
    fastChargingFilter,
    wirelessChargingFilter,
    airlineApprovedFilter,
    priceMin,
    priceMax,
    sortBy,
  ]);

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs
          items={[
            {
              label: "Power Banks",
              href: "/power-banks",
            },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Best Power Banks Compared — Travel to Laptop Charging
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          We've analyzed 14 power banks from compact phone chargers to high-capacity laptop solutions.
          Compare capacity, output wattage, charging ports, fast charging support, and airline
          regulations. Find the perfect power bank for your lifestyle: daily commute, weekend travel,
          or extended expeditions.
        </p>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Link
            href="/power-banks/capacity-guide"
            className="text-blue-600 hover:underline font-semibold"
          >
            → Capacity Guide (mAh vs. Wh explained)
          </Link>
          <Link
            href="/power-banks/fast-charging-explained"
            className="text-blue-600 hover:underline font-semibold"
          >
            → Fast Charging Standards (USB PD, QC, PPS)
          </Link>
          <Link
            href="/power-banks/airline-rules"
            className="text-blue-600 hover:underline font-semibold"
          >
            → TSA & Airline Rules
          </Link>
          <Link
            href="/power-banks/best-for-laptops"
            className="text-blue-600 hover:underline font-semibold"
          >
            → Best for Laptop Charging
          </Link>
        </div>
      </section>

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-lg text-gray-900 mb-6">Filters & Sort</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Capacity Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacity (mAh)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={capacityMin}
                  onChange={(e) => setCapacityMin(e.target.value)}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={capacityMax}
                  onChange={(e) => setCapacityMax(e.target.value)}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>

            {/* Output Wattage Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Output Wattage (W)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={outputMin}
                  onChange={(e) => setOutputMin(e.target.value)}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={outputMax}
                  onChange={(e) => setOutputMax(e.target.value)}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>

            {/* Fast Charging Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fast Charging
              </label>
              <select
                value={fastChargingFilter}
                onChange={(e) => setFastChargingFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* Wireless Charging Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wireless Charging
              </label>
              <select
                value={wirelessChargingFilter}
                onChange={(e) => setWirelessChargingFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* Airline Approved Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Airline Approved
              </label>
              <select
                value={airlineApprovedFilter}
                onChange={(e) => setAirlineApprovedFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="name">Product Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="capacity">Capacity (High to Low)</option>
                <option value="output">Output (High to Low)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                    Capacity
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                    Output
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                    Ports
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                    Fast Charge
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                    Wireless
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                    Weight
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                    Airline OK
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
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
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                      {product.brand} {product.model}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.capacityMah.toLocaleString()} mAh
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.outputWatts}W
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.ports}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.fastCharging ? "✓ Yes" : "No"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.wirelessCharging ? "✓ Yes" : "No"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.weightOz} oz
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.airlineApproved ? "✓ Yes" : "No"}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      ★ {product.rating}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Showing {filteredProducts.length} of {powerBanks.length} power banks
        </p>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/power-banks/capacity-guide"
            className="block p-4 border border-gray-200 rounded-lg hover:shadow-lg transition"
          >
            <h3 className="font-bold text-gray-900 mb-2">Capacity Guide</h3>
            <p className="text-sm text-gray-600">
              Understand mAh vs. Wh and how many charges you actually get.
            </p>
          </Link>
          <Link
            href="/power-banks/fast-charging-explained"
            className="block p-4 border border-gray-200 rounded-lg hover:shadow-lg transition"
          >
            <h3 className="font-bold text-gray-900 mb-2">Fast Charging Standards</h3>
            <p className="text-sm text-gray-600">
              USB PD, Quick Charge, PPS explained.
            </p>
          </Link>
          <Link
            href="/power-banks/airline-rules"
            className="block p-4 border border-gray-200 rounded-lg hover:shadow-lg transition"
          >
            <h3 className="font-bold text-gray-900 mb-2">Airline Rules</h3>
            <p className="text-sm text-gray-600">
              TSA limits, 100Wh rule, and international policies.
            </p>
          </Link>
          <Link
            href="/power-banks/best-for-laptops"
            className="block p-4 border border-gray-200 rounded-lg hover:shadow-lg transition"
          >
            <h3 className="font-bold text-gray-900 mb-2">Best for Laptops</h3>
            <p className="text-sm text-gray-600">
              Which power banks charge MacBooks and Windows laptops.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
