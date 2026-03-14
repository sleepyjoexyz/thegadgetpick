'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import DealCard from '@/components/DealCard';
import { mockDeals } from '@/data/mockDeals';

// Note: Metadata cannot be exported from client components
// See layout.tsx for SEO metadata

type GadgetCategory = 'All' | 'Headphones' | 'Speakers' | 'Monitors' | 'Keyboards' | 'Mice' | 'Webcams' | 'Power Banks' | 'Travel Adapters';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<GadgetCategory>('All');

  const filteredDeals =
    selectedCategory === 'All'
      ? mockDeals
      : mockDeals.filter((deal) => deal.category === selectedCategory);

  const categories: GadgetCategory[] = ['All', 'Headphones', 'Speakers', 'Monitors', 'Keyboards', 'Mice', 'Webcams', 'Power Banks', 'Travel Adapters'];

  return (
    <main className="bg-white">
      {/* Hero + Filters — single line */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center flex-wrap gap-3">
          <h1 className="text-lg font-bold text-gray-900">The Gadget Pick</h1>
          <span className="text-sm text-gray-500">—</span>
          <span className="text-sm text-gray-600">Today's Best Tech Deals: <span className="font-semibold">{filteredDeals.length} available</span></span>
          <div className="flex gap-2 ml-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full font-medium text-xs transition-colors ${
                  selectedCategory === category
                    ? category === 'All'
                      ? 'bg-gray-900 text-white'
                      : category === 'Headphones'
                      ? 'bg-blue-600 text-white'
                      : category === 'Speakers'
                      ? 'bg-blue-600 text-white'
                      : category === 'Monitors'
                      ? 'bg-purple-600 text-white'
                      : category === 'Keyboards'
                      ? 'bg-purple-600 text-white'
                      : category === 'Mice'
                      ? 'bg-purple-600 text-white'
                      : category === 'Webcams'
                      ? 'bg-cyan-600 text-white'
                      : category === 'Power Banks'
                      ? 'bg-yellow-600 text-white'
                      : 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Deals Grid (2/3 of viewport) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-12">
          {filteredDeals.map((deal) => (
            <DealCard key={deal.id} {...deal} />
          ))}
        </div>
      </section>

      {/* Browse Categories Section (1/3 of viewport) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/headphones" className="group">
            <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow p-4 h-full flex flex-col items-center text-center">
              <div className="text-3xl mb-3">🎧</div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition">
                Headphones
              </h3>
            </div>
          </Link>

          <Link href="/speakers" className="group">
            <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow p-4 h-full flex flex-col items-center text-center">
              <div className="text-3xl mb-3">🔊</div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition">
                Speakers
              </h3>
            </div>
          </Link>

          <Link href="/monitors" className="group">
            <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow p-4 h-full flex flex-col items-center text-center">
              <div className="text-3xl mb-3">🖥️</div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-purple-600 transition">
                Monitors
              </h3>
            </div>
          </Link>

          <Link href="/keyboards" className="group">
            <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow p-4 h-full flex flex-col items-center text-center">
              <div className="text-3xl mb-3">⌨️</div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-purple-600 transition">
                Keyboards
              </h3>
            </div>
          </Link>

          <Link href="/mice" className="group">
            <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow p-4 h-full flex flex-col items-center text-center">
              <div className="text-3xl mb-3">🖱️</div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-purple-600 transition">
                Mice
              </h3>
            </div>
          </Link>

          <Link href="/webcams" className="group">
            <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow p-4 h-full flex flex-col items-center text-center">
              <div className="text-3xl mb-3">📷</div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-cyan-600 transition">
                Webcams
              </h3>
            </div>
          </Link>

          <Link href="/power-banks" className="group">
            <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow p-4 h-full flex flex-col items-center text-center">
              <div className="text-3xl mb-3">🔋</div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-yellow-600 transition">
                Power Banks
              </h3>
            </div>
          </Link>

          <Link href="/travel-adapters" className="group">
            <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow p-4 h-full flex flex-col items-center text-center">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-yellow-600 transition">
                Travel Adapters
              </h3>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
