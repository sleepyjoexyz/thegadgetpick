import Link from 'next/link';

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
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Data-Driven Audio, PC & Travel Tech Comparisons
        </p>
        <div className="flex justify-center gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">12</div>
            <div className="text-gray-600">categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">160+</div>
            <div className="text-gray-600">products</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">48</div>
            <div className="text-gray-600">in-depth guides</div>
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
