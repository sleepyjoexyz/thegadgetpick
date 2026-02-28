import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Logo and Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-2">The Gadget Pick</h3>
            <p className="text-gray-400 text-sm">
              Data-driven comparisons of audio gear, PC peripherals, and travel tech.
            </p>
          </div>

          {/* Audio Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Audio</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/headphones" className="text-gray-400 hover:text-blue-400 transition">
                  Headphones
                </Link>
              </li>
              <li>
                <Link href="/speakers" className="text-gray-400 hover:text-blue-400 transition">
                  Speakers
                </Link>
              </li>
              <li>
                <Link href="/turntables" className="text-gray-400 hover:text-blue-400 transition">
                  Turntables
                </Link>
              </li>
              <li>
                <Link href="/microphones" className="text-gray-400 hover:text-blue-400 transition">
                  Microphones
                </Link>
              </li>
            </ul>
          </div>

          {/* PC & Peripherals Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">PC & Peripherals</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/monitors" className="text-gray-400 hover:text-blue-400 transition">
                  Monitors
                </Link>
              </li>
              <li>
                <Link href="/keyboards" className="text-gray-400 hover:text-blue-400 transition">
                  Keyboards
                </Link>
              </li>
              <li>
                <Link href="/mice" className="text-gray-400 hover:text-blue-400 transition">
                  Mice
                </Link>
              </li>
              <li>
                <Link href="/webcams" className="text-gray-400 hover:text-blue-400 transition">
                  Webcams
                </Link>
              </li>
            </ul>
          </div>

          {/* Travel Tech Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Travel Tech</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/luggage" className="text-gray-400 hover:text-blue-400 transition">
                  Luggage
                </Link>
              </li>
              <li>
                <Link href="/power-banks" className="text-gray-400 hover:text-blue-400 transition">
                  Power Banks
                </Link>
              </li>
              <li>
                <Link href="/travel-adapters" className="text-gray-400 hover:text-blue-400 transition">
                  Travel Adapters
                </Link>
              </li>
              <li>
                <Link href="/nc-headphones" className="text-gray-400 hover:text-blue-400 transition">
                  Noise-Canceling Headphones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Our Sites Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h4 className="text-white font-semibold mb-4">Our Sites</h4>
          <div className="flex flex-col md:flex-row gap-6">
            <Link href="https://thekitchenpick.com" className="text-gray-400 hover:text-blue-400 transition">
              The Kitchen Pick
            </Link>
            <Link href="https://thefamilypick.com" className="text-gray-400 hover:text-blue-400 transition">
              The Family Pick
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 The Gadget Pick. All rights reserved.
            </p>
            <p className="text-gray-400 text-xs">
              We may earn a commission when you buy through our links. Read our affiliate disclosure.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
