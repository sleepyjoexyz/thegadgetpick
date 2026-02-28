"use client";

import { useState, useMemo } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { monitors } from "@/data/monitors";
import { getAmazonLink } from "@/lib/utils";
import Link from "next/link";

export default function MonitorsComparison() {
  const [panelType, setPanelType] = useState<string>("all");
  const [useCase, setUseCase] = useState<string>("all");
  const [refreshRate, setRefreshRate] = useState<string>("all");
  const [screenSizeMin, setScreenSizeMin] = useState<string>("0");
  const [screenSizeMax, setScreenSizeMax] = useState<string>("40");
  const [priceMin, setPriceMin] = useState<string>("0");
  const [priceMax, setPriceMax] = useState<string>("10000");
  const [curvedOnly, setCurvedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("name");

  const filteredProducts = useMemo(() => {
    let result = [...monitors];

    if (panelType !== "all") {
      result = result.filter((m) => m.panelType === panelType);
    }

    if (useCase !== "all") {
      result = result.filter((m) => m.useCase === useCase);
    }

    if (refreshRate !== "all") {
      const minRefresh = parseInt(refreshRate);
      result = result.filter((m) => m.refreshRate >= minRefresh);
    }

    const minSize = parseFloat(screenSizeMin);
    const maxSize = parseFloat(screenSizeMax);
    result = result.filter((m) => m.screenSize >= minSize && m.screenSize <= maxSize);

    const minPrice = parseFloat(priceMin);
    const maxPrice = parseFloat(priceMax);
    result = result.filter((m) => m.price >= minPrice && m.price <= maxPrice);

    if (curvedOnly) {
      result = result.filter((m) => m.curvedScreen);
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "size") {
      result.sort((a, b) => b.screenSize - a.screenSize);
    } else if (sortBy === "refresh") {
      result.sort((a, b) => b.refreshRate - a.refreshRate);
    } else {
      result.sort((a, b) => `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`));
    }

    return result;
  }, [panelType, useCase, refreshRate, screenSizeMin, screenSizeMax, priceMin, priceMax, curvedOnly, sortBy]);

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs
          items={[
            {
              label: "Monitors",
              href: "/monitors",
            },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Best Monitors Compared — 2025-2026
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          We've analyzed 14 premium monitors across gaming, creative work, productivity, and ultrawide displays. Compare specifications, features, prices, and ratings to find the monitor that matches your workflow. Our methodology is based on manufacturer specs, panel technology, color accuracy, refresh rates, and real-world performance testing.
        </p>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-lg text-gray-900 mb-6">Filters & Sort</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Panel Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Panel Type
              </label>
              <select
                value={panelType}
                onChange={(e) => setPanelType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="IPS">IPS</option>
                <option value="VA">VA</option>
                <option value="OLED">OLED</option>
                <option value="TN">TN</option>
              </select>
            </div>

            {/* Use Case */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Use Case
              </label>
              <select
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Uses</option>
                <option value="gaming">Gaming</option>
                <option value="creative">Creative Work</option>
                <option value="office">Office / Productivity</option>
                <option value="ultrawide">Ultrawide</option>
              </select>
            </div>

            {/* Refresh Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Refresh Rate
              </label>
              <select
                value={refreshRate}
                onChange={(e) => setRefreshRate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Any</option>
                <option value="60">60 Hz or Higher</option>
                <option value="144">144 Hz or Higher</option>
                <option value="165">165 Hz or Higher</option>
                <option value="240">240 Hz or Higher</option>
              </select>
            </div>

            {/* Screen Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Screen Size (inches)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  max="40"
                  value={screenSizeMin}
                  onChange={(e) => setScreenSizeMin(e.target.value)}
                  placeholder="Min"
                  className="w-1/2 px-2 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  min="0"
                  max="40"
                  value={screenSizeMax}
                  onChange={(e) => setScreenSizeMax(e.target.value)}
                  placeholder="Max"
                  className="w-1/2 px-2 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
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

            {/* Curved Screen */}
            <div className="flex items-end">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={curvedOnly}
                  onChange={(e) => setCurvedOnly(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Curved Only</span>
              </label>
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
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="size">Screen Size: Largest First</option>
                <option value="refresh">Refresh Rate: Highest First</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-4">
            Showing {filteredProducts.length} of {monitors.length} monitors
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
                  Brand & Model
                </th>
                <th className="border border-gray-300 px-4 py-3 text-right font-bold">
                  Price
                </th>
                <th className="border border-gray-300 px-4 py-3 text-right font-bold">
                  Size
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-bold">
                  Resolution
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-bold">
                  Panel
                </th>
                <th className="border border-gray-300 px-4 py-3 text-right font-bold">
                  Refresh Rate
                </th>
                <th className="border border-gray-300 px-4 py-3 text-right font-bold">
                  Response Time
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-bold">
                  Curved
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-bold">
                  HDR
                </th>
                <th className="border border-gray-300 px-4 py-3 text-right font-bold">
                  Rating
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-bold">
                  Amazon
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
                  <td className="border border-gray-300 px-4 py-3 text-right">
                    ${product.price}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-right">
                    {product.screenSize}"
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    {product.resolution}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                      {product.panelType}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-right">
                    {product.refreshRate}Hz
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-right">
                    {product.responseTime}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    {product.curvedScreen ? "✓" : "—"}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-sm">
                    {product.hdr !== "None" ? "✓" : "—"}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-right">
                    {product.rating}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    {product.amazonAsin ? (
                      <a
                        href={getAmazonLink(product.amazonAsin) || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    ) : (
                      "—"
                    )}
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
          <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              <Link
                href="/monitors/ips-vs-va-vs-oled-monitors"
                className="hover:text-blue-600"
              >
                IPS vs VA vs OLED Monitors
              </Link>
            </h3>
            <p className="text-gray-600 mb-4">
              Deep dive into panel technologies. Learn the differences between IPS, VA, and OLED, their strengths and weaknesses, and which is best for your use case.
            </p>
            <Link
              href="/monitors/ips-vs-va-vs-oled-monitors"
              className="text-blue-600 hover:underline font-medium"
            >
              Read guide →
            </Link>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              <Link
                href="/monitors/best-monitors-for-programming"
                className="hover:text-blue-600"
              >
                Best Monitors for Programming
              </Link>
            </h3>
            <p className="text-gray-600 mb-4">
              Find the ideal monitor for software development. Learn why screen size matters, which resolutions reduce eye strain, and how to maximize readability.
            </p>
            <Link
              href="/monitors/best-monitors-for-programming"
              className="text-blue-600 hover:underline font-medium"
            >
              Read guide →
            </Link>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              <Link
                href="/monitors/ultrawide-vs-dual-monitor-setup"
                className="hover:text-blue-600"
              >
                Ultrawide vs Dual Monitors
              </Link>
            </h3>
            <p className="text-gray-600 mb-4">
              Compare ultrawide monitors to traditional dual-monitor setups. Learn the productivity differences and which setup is right for your workflow.
            </p>
            <Link
              href="/monitors/ultrawide-vs-dual-monitor-setup"
              className="text-blue-600 hover:underline font-medium"
            >
              Read guide →
            </Link>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              <Link
                href="/monitors/monitor-refresh-rate-guide"
                className="hover:text-blue-600"
              >
                Refresh Rate Guide: 60Hz vs 144Hz vs 240Hz
              </Link>
            </h3>
            <p className="text-gray-600 mb-4">
              Learn the differences between 60Hz, 144Hz, and 240Hz, and whether the upgrade is worth the cost for gaming, work, and everyday use.
            </p>
            <Link
              href="/monitors/monitor-refresh-rate-guide"
              className="text-blue-600 hover:underline font-medium"
            >
              Read guide →
            </Link>
          </div>
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
              What size monitor should I buy?
            </h3>
            <p className="text-gray-600">
              For most people, 27 inches is the ideal size. At arm's length (24-28 inches), a 27" monitor provides enough screen real estate without requiring excessive head movement. For coding or productivity work, consider 32" or 34" ultrawide. For gaming, 27" is standard; professionals use 32" at higher price points.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              What resolution should I get?
            </h3>
            <p className="text-gray-600">
              At 27", 1440p is ideal (110 PPI). At 32", 4K (163 PPI) is preferred. At 24", 1080p or 1440p both work. Ultrawide (34") typically uses 3440x1440. Rule of thumb: aim for 100-150 PPI for comfortable text reading. Pixel density matters more than total pixels.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Is IPS or VA better for gaming?
            </h3>
            <p className="text-gray-600">
              VA panels have better contrast and deeper blacks, making single-player games more dramatic. IPS panels have faster response times and wider viewing angles, better for competitive gaming and shared viewing. For most gamers, modern IPS panels with 1ms response time are preferred. Choose based on game type: VA for story-driven games, IPS for competitive shooters.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Do I need 144Hz or higher?
            </h3>
            <p className="text-gray-600">
              60Hz is fine for office work, browsing, and casual gaming. 144Hz is ideal for competitive gaming and significantly improves the feel of scrolling and window dragging. 240Hz is for professional esports players. Unless you're gaming competitively, 60Hz is acceptable; 144Hz is a worthwhile upgrade.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              What does HDR mean?
            </h3>
            <p className="text-gray-600">
              HDR (High Dynamic Range) displays show brighter highlights, darker shadows, and more colors simultaneously. VESA DisplayHDR 400 and above are meaningful. Budget monitors often claim "HDR" with minimal specs; true HDR requires high brightness (500+ nits), wide color gamut, and excellent contrast. Important for video work and gaming, less critical for office work.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Is curved better than flat?
            </h3>
            <p className="text-gray-600">
              Curved screens reduce perceived edge distortion and make large displays feel more immersive. They're beneficial at 27"+ and especially at ultrawides (34"+). For 24-25" monitors, curvature is less noticeable. Curved screens don't improve gaming performance or productivity—they're primarily ergonomic comfort. Choose based on preference.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              What is USB-C power delivery on a monitor?
            </h3>
            <p className="text-gray-600">
              Monitors with USB-C power delivery can charge your laptop through the monitor's USB-C cable. This is convenient for docking setups: one cable to the monitor provides video, USB data, and laptop charging. Premium 4K monitors often include 65-90W power delivery. Excellent for reducing cable clutter on desks.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Is OLED worth the extra cost?
            </h3>
            <p className="text-gray-600">
              OLED monitors provide perfect blacks, instant response times, and exceptional color accuracy. They're 2-3x more expensive than IPS/VA. Worth it for professional colorists, video editors, and high-end gamers. For office work and casual use, the premium is hard to justify. Be aware of burn-in risk with static UI (taskbars, Twitch overlays).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
