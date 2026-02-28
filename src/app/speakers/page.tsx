"use client";

import { useState, useMemo } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { speakers, Speaker } from "@/data/speakers";
import { getAmazonLink, formatPrice, formatRating } from "@/lib/utils";
import Link from "next/link";

type SpeakerType = "bookshelf" | "portable" | "soundbar" | "studio-monitor" | "smart";

interface FilterState {
  speakerType: SpeakerType | "all";
  wireless: "all" | "yes" | "no";
  waterproof: "all" | "yes" | "no";
  priceMin: number;
  priceMax: number;
}

export default function SpeakersPage() {
  const [filters, setFilters] = useState<FilterState>({
    speakerType: "all",
    wireless: "all",
    waterproof: "all",
    priceMin: 0,
    priceMax: 2000,
  });

  const filteredSpeakers = useMemo(() => {
    return speakers.filter((speaker) => {
      if (filters.speakerType !== "all" && speaker.speakerType !== filters.speakerType) {
        return false;
      }

      if (filters.wireless === "yes" && !speaker.wireless) {
        return false;
      }
      if (filters.wireless === "no" && speaker.wireless) {
        return false;
      }

      const hasWaterproof =
        speaker.waterproof && speaker.waterproof !== "None";
      if (filters.waterproof === "yes" && !hasWaterproof) {
        return false;
      }
      if (filters.waterproof === "no" && hasWaterproof) {
        return false;
      }

      if (speaker.price < filters.priceMin || speaker.price > filters.priceMax) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const speakerTypes: Array<{ value: SpeakerType; label: string }> = [
    { value: "bookshelf", label: "Bookshelf" },
    { value: "portable", label: "Portable" },
    { value: "soundbar", label: "Soundbar" },
    { value: "studio-monitor", label: "Studio Monitor" },
    { value: "smart", label: "Smart" },
  ];

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={[{ label: "Speakers", href: "/speakers" }]} />
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Best Speakers Compared — 2025-2026
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          We've analyzed 14 speakers across all types: bookshelf, portable,
          soundbar, studio monitor, and smart speakers. Compare specifications,
          prices, and features to find the perfect speaker for your needs.
        </p>
      </section>

      {/* Inline Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Filter Speakers</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Speaker Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Speaker Type
            </label>
            <select
              value={filters.speakerType}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  speakerType: e.target.value as SpeakerType | "all",
                })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              {speakerTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Wireless Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wireless
            </label>
            <select
              value={filters.wireless}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  wireless: e.target.value as "all" | "yes" | "no",
                })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Any</option>
              <option value="yes">Wireless Only</option>
              <option value="no">Wired Only</option>
            </select>
          </div>

          {/* Waterproof Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Waterproof
            </label>
            <select
              value={filters.waterproof}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  waterproof: e.target.value as "all" | "yes" | "no",
                })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Any</option>
              <option value="yes">Waterproof Only</option>
              <option value="no">Not Waterproof</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Price: ${filters.priceMax}
            </label>
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={filters.priceMax}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priceMax: parseInt(e.target.value),
                })
              }
              className="w-full"
            />
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          Showing {filteredSpeakers.length} of {speakers.length} speakers
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Full Comparison Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">
                  Model
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">
                  Type
                </th>
                <th className="border border-gray-300 px-4 py-3 text-right font-bold text-gray-900">
                  Price
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-900">
                  Rating
                </th>
                <th className="border border-gray-300 px-4 py-3 text-right font-bold text-gray-900">
                  Wattage
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">
                  Freq. Response
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-900">
                  WiFi
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-900">
                  BT
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-900">
                  Waterproof
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-900">
                  Battery (hrs)
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSpeakers.length > 0 ? (
                filteredSpeakers.map((speaker, idx) => (
                  <tr
                    key={speaker.id}
                    className={
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }
                  >
                    <td className="border border-gray-300 px-4 py-3 text-gray-900 font-medium">
                      <div className="font-bold">{speaker.brand}</div>
                      <div className="text-gray-600 text-xs">
                        {speaker.model}
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {speaker.speakerType.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-gray-900 font-medium">
                      {formatPrice(speaker.price)}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-gray-700">
                      <div className="text-yellow-500 font-bold">
                        ★ {formatRating(speaker.rating)}
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-gray-700">
                      {speaker.wattage}W
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      {speaker.frequencyResponse}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      {speaker.wifi ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : (
                        <span className="text-gray-400">−</span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      {speaker.bluetooth ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : (
                        <span className="text-gray-400">−</span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm">
                      {speaker.waterproof !== "None" ? (
                        <span className="text-green-600 font-bold">
                          {speaker.waterproof}
                        </span>
                      ) : (
                        <span className="text-gray-400">−</span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-gray-700">
                      {speaker.batteryHours > 0
                        ? speaker.batteryHours
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="border border-gray-300 px-4 py-6 text-center text-gray-600">
                    No speakers match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Speaker Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpeakers.length > 0 ? (
            filteredSpeakers.map((speaker) => {
              const amazonLink = getAmazonLink(speaker.amazonAsin);
              return (
                <div
                  key={speaker.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="bg-gray-100 h-48 flex items-center justify-center">
                    <span className="text-gray-400">
                      {speaker.brand} {speaker.model}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {speaker.brand}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {speaker.model}
                        </p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {speaker.speakerType
                          .split("-")
                          .map(
                            (w) =>
                              w.charAt(0).toUpperCase() + w.slice(1)
                          )
                          .join(" ")}
                      </span>
                    </div>

                    <p className="text-gray-700 text-sm mb-4">
                      {speaker.summary}
                    </p>

                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Price:</span>
                        <span className="font-bold text-gray-900">
                          {formatPrice(speaker.price)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rating:</span>
                        <span className="text-yellow-500 font-bold">
                          ★ {formatRating(speaker.rating)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Power:</span>
                        <span className="font-medium">
                          {speaker.wattage}W
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Freq. Response:</span>
                        <span className="font-medium">
                          {speaker.frequencyResponse}
                        </span>
                      </div>
                      {speaker.batteryHours > 0 && (
                        <div className="flex justify-between">
                          <span>Battery Life:</span>
                          <span className="font-medium">
                            {speaker.batteryHours}h
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 text-xs mb-4">
                      {speaker.wireless && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                          Wireless
                        </span>
                      )}
                      {speaker.bluetooth && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                          Bluetooth
                        </span>
                      )}
                      {speaker.wifi && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                          WiFi
                        </span>
                      )}
                      {speaker.waterproof !== "None" && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                          Waterproof
                        </span>
                      )}
                    </div>

                    {amazonLink && (
                      <a
                        href={amazonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-blue-600 text-white py-2 rounded text-center font-medium hover:bg-blue-700 transition-colors"
                      >
                        View on Amazon
                      </a>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12 text-gray-600">
              No speakers match your filters. Try adjusting your search criteria.
            </div>
          )}
        </div>
      </section>

      {/* Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Speaker Guides & Comparisons
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/speakers/bookshelf-vs-portable-speakers">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Bookshelf vs Portable Speakers
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Compare home audio speakers vs on-the-go listening. Learn when
                each makes sense for your lifestyle.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                Read Guide <span>→</span>
              </div>
            </div>
          </Link>

          <Link href="/speakers/best-speakers-under-300">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Best Speakers Under $300
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Budget audiophile picks across portable, smart, and bookshelf
                categories. Quality doesn't require premium prices.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                Read Guide <span>→</span>
              </div>
            </div>
          </Link>

          <Link href="/speakers/bluetooth-vs-wifi-speakers">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Bluetooth vs WiFi Speakers
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Understand latency, audio quality, and multi-room capabilities.
                Learn which is best for your use case.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                Read Guide <span>→</span>
              </div>
            </div>
          </Link>

          <Link href="/speakers/studio-monitors-vs-regular-speakers">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Studio Monitors vs Regular Speakers
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                When accuracy matters. Learn the difference between mixing and
                listening speakers.
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
              What's the difference between bookshelf and portable speakers?
            </h3>
            <p className="text-gray-600">
              Bookshelf speakers are designed for a fixed location (home, office)
              and prioritize sound quality and features. They require wall power.
              Portable speakers are designed to move with you, prioritizing
              battery life, durability, and waterproofing over maximum sound
              quality. Choose bookshelf for home audio, portable for travel.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              Should I choose Bluetooth or WiFi speakers?
            </h3>
            <p className="text-gray-600">
              Bluetooth excels at portability, universal compatibility, and
              battery efficiency. WiFi excels at low latency (for video/gaming),
              high bandwidth (for lossless audio), and multi-room audio. Choose
              Bluetooth for travel; WiFi for home audio and multi-room systems.
              Many modern speakers offer both.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              Do I need waterproof speakers?
            </h3>
            <p className="text-gray-600">
              Yes, if you plan to use speakers outdoors, near pools, beaches, or
              in bathrooms. Waterproof speakers (IP67-rated can be fully
              submerged) provide peace of mind. If speakers stay indoors,
              waterproofing isn't necessary.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              What's the best speaker for mixing music?
            </h3>
            <p className="text-gray-600">
              Studio monitors are essential for mixing. They have flat frequency
              response, revealing exactly what's in your audio without
              enhancement. Regular speakers color the sound, making mixes sound
              good on those speakers but bad elsewhere. Professional mixes are
              made on studio monitors.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              How important is wattage?
            </h3>
            <p className="text-gray-600">
              Wattage matters but isn't everything. Higher wattage doesn't always
              mean louder or better sound. Speaker driver size, enclosure design,
              and room size matter as much. A 30-watt portable speaker can sound
              better than a 60-watt speaker with poor design. Wattage helps
              determine loudness ceiling, not quality.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              What's the best speaker under $300?
            </h3>
            <p className="text-gray-600">
              It depends on your needs. For portable audio, the JBL Charge 5
              ($180) offers excellent value with waterproofing and 20-hour
              battery. For smart home integration, the Sonos Era 300 ($299)
              provides multi-room capability. For accurate reference, the Yamaha
              HS5 ($180) is the professional standard. See our detailed budget
              guide for comprehensive analysis.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              Do I need a subwoofer with bookshelf speakers?
            </h3>
            <p className="text-gray-600">
              It depends on your room and preferences. Bookshelf speakers with
              5-6 inch woofers produce adequate bass for most listening. A
              subwoofer adds impact and extends bass below 40Hz, which is
              beneficial for movies and bass-heavy music. Music listening in
              small rooms typically doesn't require a subwoofer.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              Should I buy smart speakers for multi-room audio?
            </h3>
            <p className="text-gray-600">
              Yes, if multi-room audio interests you. Smart speakers (Sonos, Echo,
              Google Home) sync music across rooms from a single app. Bluetooth
              speakers can't do this—you'd manually reconnect your phone to
              different speakers. WiFi speakers are the only choice for true
              multi-room audio integration.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
