import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { WebSiteSchema } from '@/components/JsonLd';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Gadget Pick — Data-Driven Audio, PC & Travel Tech Comparisons',
  description: 'Compare audio gear, PC peripherals, and travel tech with data-driven reviews and buying guides. Explore headphones, speakers, monitors, keyboards, luggage, and more.',
  metadataBase: new URL('https://www.thegadgetpick.com'),
  alternates: {
    canonical: 'https://www.thegadgetpick.com',
  },
  keywords: [
    'headphones',
    'speakers',
    'turntables',
    'microphones',
    'monitors',
    'keyboards',
    'mice',
    'webcams',
    'luggage',
    'power banks',
    'travel adapters',
    'noise-canceling headphones',
    'audio equipment',
    'PC peripherals',
    'travel gear',
  ],
  authors: [{ name: 'The Gadget Pick' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.thegadgetpick.com',
    title: 'The Gadget Pick — Data-Driven Audio, PC & Travel Tech Comparisons',
    description: 'Compare audio gear, PC peripherals, and travel tech with data-driven reviews and buying guides.',
    siteName: 'The Gadget Pick',
    images: [
      {
        url: 'https://www.thegadgetpick.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Gadget Pick',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Gadget Pick — Data-Driven Audio, PC & Travel Tech Comparisons',
    description: 'Compare audio gear, PC peripherals, and travel tech with data-driven reviews and buying guides.',
    images: ['https://www.thegadgetpick.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <WebSiteSchema />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
