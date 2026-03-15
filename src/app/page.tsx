"use client";

import { useState } from 'react';
import Link from 'next/link';
import DealCard from '@/components/DealCard';
import { mockDeals } from '@/data/mockDeals';
import { dealCategories } from '@/lib/dealCategories';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">The Gadget Pick</h1>
          <p className="text-lg text-gray-600">Today's best deals on tech gadgets — {mockDeals.length} deals across {dealCategories.length} categories.</p>
        </div>
        <Link href="/deals" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          Browse All Deals
          <span>→</span>
        </Link>
      </section>

      {/* Deals by Category */}
      {dealCategories.map((cat) => {
        const categoryDeals = mockDeals.filter((d) => d.category === cat.name).slice(0, 6);
        if (categoryDeals.length === 0) return null;
        return (
          <section key={cat.slug} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                <span className="mr-2">{cat.emoji}</span>
                {cat.name} Deals
              </h2>
              <Link href={`/deals/${cat.slug}`} className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                Find more {cat.name.toLowerCase()} deals →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {categoryDeals.map((deal) => (
                <DealCard key={deal.id} {...deal} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Browse Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-100">
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
              <div className="text-3xl mb-3">🔌</div>
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
