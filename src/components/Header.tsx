'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioDropdownOpen, setAudioDropdownOpen] = useState(false);
  const [pcDropdownOpen, setPcDropdownOpen] = useState(false);
  const [travelDropdownOpen, setTravelDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
            The Gadget Pick
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Audio Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 font-medium">
                Audio
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/headphones" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 first:rounded-t-lg">
                  Headphones
                </Link>
                <Link href="/speakers" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                  Speakers
                </Link>
                <Link href="/turntables" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                  Turntables
                </Link>
                <Link href="/microphones" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 last:rounded-b-lg">
                  Microphones
                </Link>
              </div>
            </div>

            {/* PC & Peripherals Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 font-medium">
                PC & Peripherals
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/monitors" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 first:rounded-t-lg">
                  Monitors
                </Link>
                <Link href="/keyboards" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                  Keyboards
                </Link>
                <Link href="/mice" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                  Mice
                </Link>
                <Link href="/webcams" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 last:rounded-b-lg">
                  Webcams
                </Link>
              </div>
            </div>

            {/* Travel Tech Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 font-medium">
                Travel Tech
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/luggage" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 first:rounded-t-lg">
                  Luggage
                </Link>
                <Link href="/power-banks" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                  Power Banks
                </Link>
                <Link href="/travel-adapters" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                  Travel Adapters
                </Link>
                <Link href="/nc-headphones" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 last:rounded-b-lg">
                  Noise-Canceling Headphones
                </Link>
              </div>
            </div>

            {/* Cross-site Links */}
            <div className="flex items-center space-x-4 pl-8 border-l border-gray-200">
              <Link href="https://thekitchenpick.com" className="text-gray-600 text-sm hover:text-blue-600">
                The Kitchen Pick
              </Link>
              <Link href="https://thefamilypick.com" className="text-gray-600 text-sm hover:text-blue-600">
                The Family Pick
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <span className="text-2xl text-gray-700">✕</span>
            ) : (
              <span className="text-2xl text-gray-700">☰</span>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-4">
            {/* Audio Section */}
            <div>
              <button
                onClick={() => setAudioDropdownOpen(!audioDropdownOpen)}
                className="w-full text-left text-gray-700 font-medium hover:text-blue-600"
              >
                Audio
              </button>
              {audioDropdownOpen && (
                <div className="pl-4 space-y-2 mt-2">
                  <Link href="/headphones" className="block text-gray-600 hover:text-blue-600">
                    Headphones
                  </Link>
                  <Link href="/speakers" className="block text-gray-600 hover:text-blue-600">
                    Speakers
                  </Link>
                  <Link href="/turntables" className="block text-gray-600 hover:text-blue-600">
                    Turntables
                  </Link>
                  <Link href="/microphones" className="block text-gray-600 hover:text-blue-600">
                    Microphones
                  </Link>
                </div>
              )}
            </div>

            {/* PC & Peripherals Section */}
            <div>
              <button
                onClick={() => setPcDropdownOpen(!pcDropdownOpen)}
                className="w-full text-left text-gray-700 font-medium hover:text-blue-600"
              >
                PC & Peripherals
              </button>
              {pcDropdownOpen && (
                <div className="pl-4 space-y-2 mt-2">
                  <Link href="/monitors" className="block text-gray-600 hover:text-blue-600">
                    Monitors
                  </Link>
                  <Link href="/keyboards" className="block text-gray-600 hover:text-blue-600">
                    Keyboards
                  </Link>
                  <Link href="/mice" className="block text-gray-600 hover:text-blue-600">
                    Mice
                  </Link>
                  <Link href="/webcams" className="block text-gray-600 hover:text-blue-600">
                    Webcams
                  </Link>
                </div>
              )}
            </div>

            {/* Travel Tech Section */}
            <div>
              <button
                onClick={() => setTravelDropdownOpen(!travelDropdownOpen)}
                className="w-full text-left text-gray-700 font-medium hover:text-blue-600"
              >
                Travel Tech
              </button>
              {travelDropdownOpen && (
                <div className="pl-4 space-y-2 mt-2">
                  <Link href="/luggage" className="block text-gray-600 hover:text-blue-600">
                    Luggage
                  </Link>
                  <Link href="/power-banks" className="block text-gray-600 hover:text-blue-600">
                    Power Banks
                  </Link>
                  <Link href="/travel-adapters" className="block text-gray-600 hover:text-blue-600">
                    Travel Adapters
                  </Link>
                  <Link href="/nc-headphones" className="block text-gray-600 hover:text-blue-600">
                    Noise-Canceling Headphones
                  </Link>
                </div>
              )}
            </div>

            {/* Cross-site Links */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <Link href="https://thekitchenpick.com" className="block text-gray-600 hover:text-blue-600">
                The Kitchen Pick
              </Link>
              <Link href="https://thefamilypick.com" className="block text-gray-600 hover:text-blue-600">
                The Family Pick
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
