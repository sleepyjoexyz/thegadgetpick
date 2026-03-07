import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Gadget Pick — Data-Driven Audio, PC & Travel Tech Comparisons',
  description: 'Compare audio gear, PC peripherals, and travel tech with data-driven reviews and buying guides. Explore headphones, speakers, monitors, keyboards, luggage, and more.',
  alternates: {
    canonical: 'https://thegadgetpick.com',
  },
  openGraph: {
    title: 'The Gadget Pick — Data-Driven Audio, PC & Travel Tech Comparisons',
    description: 'Compare audio gear, PC peripherals, and travel tech with data-driven reviews and buying guides.',
    type: 'website',
    url: 'https://thegadgetpick.com',
  },
};

export default function Home() {
  const categories = [
    {
      group: 'Audio',
      items: [
        { name: 'Headphones', href: '/headphones', description: 'Wired and wireless headphones for every budget and use case' },
        { name: 'Speakers', href: '/speakers', description: 'From portable to home theater speakers' },
        { name: 'Turntables', href: '/turntables', description: 'Vinyl turntables for audiophiles and collectors' },
        { name: 'Microphones', href: '/microphones', description: 'Streaming, podcasting, and studio microphones' },
      ],
    },
    {
      group: 'PC & Peripherals',
      items: [
        { name: 'Monitors', href: '/monitors', description: 'Gaming, productivity, and curved displays' },
        { name: 'Keyboards', href: '/keyboards', description: 'Mechanical and membrane keyboards for typing and gaming' },
        { name: 'Mice', href: '/mice', description: 'Gaming, ergonomic, and wireless mice' },
        { name: 'Webcams', href: '/webcams', description: 'HD and 4K webcams for streaming and calls' },
      ],
    },
    {
      group: 'Travel Tech',
      items: [
        { name: 'Luggage', href: '/luggage', description: 'Carry-on, checked, and cabin luggage' },
        { name: 'Power Banks', href: '/power-banks', description: 'Portable power for phones and tablets' },
        { name: 'Travel Adapters', href: '/travel-adapters', description: 'International power adapters and converters' },
        { name: 'Noise-Canceling Headphones', href: '/nc-headphones', description: 'ANC headphones for flights and commutes' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          The Gadget Pick
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-6">
          Data-Driven Audio, PC & Travel Tech Comparisons
        </p>
        <p className="text-lg text-gray-700 font-medium mb-2">
          Compare before you buy. Every spec verified. No sponsored rankings.
        </p>
        <p className="text-gray-600 mb-8">
          We research audio gear, PC peripherals, and travel tech so you don&apos;t have to.
        </p>

        {/* Stats Section */}
        <div className="bg-white border border-gray-200 rounded-lg inline-block px-8 py-6 mb-4">
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">12</div>
              <div className="text-gray-600 text-sm">categories</div>
            </div>
            <div className="border-l border-gray-200"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">160+</div>
              <div className="text-gray-600 text-sm">products</div>
            </div>
            <div className="border-l border-gray-200"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">48</div>
              <div className="text-gray-600 text-sm">in-depth guides</div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Compare Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            How We Compare
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                1
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Research Every Spec</h3>
              <p className="text-gray-600">
                We analyze specifications, performance data, and real user feedback from verified sources.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                2
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Side-by-Side Comparison</h3>
              <p className="text-gray-600">
                Compare features, prices, and performance across products in detailed comparison tables.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                3
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">You Decide — No Bias</h3>
              <p className="text-gray-600">
                We never accept sponsorships or promotional payments. Your decision is based on facts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories.map((category) => (
        <section key={category.group} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{category.group}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {category.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  <span className="text-blue-600 flex-shrink-0 ml-4">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* Why Trust Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-blue-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Trust Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Data-Driven</h3>
              <p className="text-gray-600">
                We analyze specifications, reviews, and real-world testing to provide honest recommendations.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Independent Reviews</h3>
              <p className="text-gray-600">
                Our comparisons are based on third-party data and user feedback, not manufacturer claims.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Guides</h3>
              <p className="text-gray-600">
                Each category includes detailed buying guides to help you make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
