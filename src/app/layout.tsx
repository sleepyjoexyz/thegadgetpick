import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Gadget Pick — Data-Driven Audio, PC & Travel Tech Comparisons',
  description: 'Compare audio gear, PC peripherals, and travel tech with data-driven reviews and buying guides. Explore headphones, speakers, monitors, keyboards, luggage, and more.',
  metadataBase: new URL('https://thegadgetpick.com'),
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
    url: 'https://thegadgetpick.com',
    title: 'The Gadget Pick — Data-Driven Audio, PC & Travel Tech Comparisons',
    description: 'Compare audio gear, PC peripherals, and travel tech with data-driven reviews and buying guides.',
    siteName: 'The Gadget Pick',
    images: [
      {
        url: 'https://thegadgetpick.com/og-image.jpg',
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
    images: ['https://thegadgetpick.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
