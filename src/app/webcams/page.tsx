"use client";

import { useState, useMemo } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { webcams } from "@/data/webcams";
import { getWebcamArticleSlugs } from "@/data/webcam-articles";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default function WebcamsComparison() {
  const [resolutionFilter, setResolutionFilter] = useState<string>("all");
  const [fpsFilter, setFpsFilter] = useState<string>("all");
  const [autofocusFilter, setAutofocusFilter] = useState<string>("all");
  const [hdrFilter, setHdrFilter] = useState<string>("all");
  const [priceMin, setPriceMin] = useState<string>("0");
  const [priceMax, setPriceMax] = useState<string>("500");
  const [sortBy, setSortBy] = useState<string>("name");

  const filteredProducts = useMemo(() => {
    let result = [...webcams];

    // Resolution filter
    if (resolutionFilter !== "all") {
      result = result.filter((w) => w.resolution === resolutionFilter);
    }

    // FPS filter
    if (fpsFilter !== "all") {
      result = result.filter((w) => w.fps === parseInt(fpsFilter));
    }

    // Autofocus filter
    if (autofocusFilter === "yes") {
      result = result.filter((w) => w.autofocus === true);
    } else if (autofocusFilter === "no") {
      result = result.filter((w) => w.autofocus === false);
    }

    // HDR filter
    if (hdrFilter === "yes") {
      result = result.filter((w) => w.hdr === true);
    } else if (hdrFilter === "no") {
      result = result.filter((w) => w.hdr === false);
    }

    // Price filter
    const minPrice = parseInt(priceMin) || 0;
    const maxPrice = parseInt(priceMax) || 500;
    result = result.filter((w) => w.price >= minPrice && w.price <= maxPrice);

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
  }, [resolutionFilter, fpsFilter, autofocusFilter, hdrFilter, priceMin, priceMax, sortBy]);

  const articleSlugs = getWebcamArticleSlugs();

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs
          items={[
            {
              label: "Webcams",
              href: "/webcams",
            },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Best Webcams Compared in 2025
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          We've compared 13 premium webcams across all types and price points. Explore 4K versus 1080p, frame rates from 30fps to 60fps, autofocus options, HDR capability, and specialized features. Find the perfect webcam for video conferencing, streaming, content creation, or professional presentations. Our analysis covers resolution, fps, field of view, low-light performance, microphone quality, privacy shutters, and real-world performance for different use cases.
        </p>
      </section>

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-lg text-gray-900 mb-6">Filters & Sort</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Resolution Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resolution
              </label>
              <select
                value={resolutionFilter}
                onChange={(e) => setResolutionFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Resolutions</option>
                <option value="4K">4K</option>
                <option value="1440p">1440p</option>
                <option value="1080p">1080p</option>
                <option value="720p">720p</option>
              </select>
            </div>

            {/* FPS Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Frame Rate
              </label>
              <select
                value={fpsFilter}
                onChange={(e) => setFpsFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Frame Rates</option>
                <option value="60">60fps</option>
                <option value="30">30fps</option>
              </select>
            </div>

            {/* Autofocus Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Autofocus
              </label>
              <select
                value={autofocusFilter}
                onChange={(e) => setAutofocusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Options</option>
                <option value="yes">With Autofocus</option>
                <option value="no">Fixed Focus</option>
              </select>
            </div>

            {/* HDR Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                HDR Support
              </label>
              <select
                value={hdrFilter}
                onChange={(e) => setHdrFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Options</option>
                <option value="yes">With HDR</option>
                <option value="no">No HDR</option>
              </select>
            </div>

            {/* Price Min */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Price
              </label>
              <input
                type="number"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="0"
              />
            </div>

            {/* Price Max */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price
              </label>
              <input
                type="number"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="500"
              />
            </div>

            {/* Sort */}
            <div className="md:col-span-2 lg:col-span-2">
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
                <option value="rating">Rating: High to Low</option>
              </select>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Showing {filteredProducts.length} of {webcams.length} webcams
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Resolution
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  FPS
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  FOV
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Autofocus
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  HDR
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Mic
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Privacy
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((webcam) => (
                <tr key={webcam.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {webcam.brand} {webcam.model}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{webcam.summary}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {webcam.resolution}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {webcam.fps}fps
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {webcam.fieldOfView}°
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {webcam.autofocus ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      <span className="text-gray-500">Fixed</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {webcam.hdr ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      <span className="text-gray-500">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {webcam.builtInMic ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      <span className="text-gray-500">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {webcam.privacyShutter ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      <span className="text-gray-500">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {formatPrice(webcam.price)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <span className="inline-flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      {webcam.rating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Webcam Guides & Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articleSlugs.map((slug) => {
            // Map slug to title
            const slugTitles: Record<string, string> = {
              "4k-vs-1080p": "4K vs 1080p Webcams: Is the Upgrade Worth It?",
              "best-for-streaming": "Best Webcams for Streaming in 2025",
              "lighting-tips": "Webcam Lighting Tips for Professional Video Calls",
              "privacy-security-guide": "Webcam Privacy and Security: What You Need to Know",
            };

            return (
              <Link
                key={slug}
                href={`/webcams/${slug}`}
                className="block p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {slugTitles[slug] || slug}
                </h3>
                <p className="text-gray-600 text-sm">
                  Read our in-depth guide →
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
