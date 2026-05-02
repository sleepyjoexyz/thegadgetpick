import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Travel Adapters Compared 2025-2026 | The Gadget Pick',
  description: 'Compare top travel adapters side-by-side with detailed specs, prices, and ratings. Universal solutions.',
  alternates: {
    canonical: 'https://www.thegadgetpick.com/travel-adapters',
  },
  openGraph: {
    title: 'Best Travel Adapters Compared 2025-2026 | The Gadget Pick',
    description: 'Compare top travel adapters with specs and ratings. Universal, multi-port, and compact options.',
    type: 'website',
    url: 'https://www.thegadgetpick.com/travel-adapters',

    images: [
      {
        url: 'https://www.thegadgetpick.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Gadget Pick',
      },
    ],
    locale: 'en_US',
    siteName: 'The Gadget Pick',
  },
};

export default function TravelAdaptersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
