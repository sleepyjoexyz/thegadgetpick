import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Headphones Compared 2025-2026 | The Gadget Pick',
  description: 'Compare top headphones side-by-side with detailed specs, prices, and ratings. Audiophile to budget options in one place.',
  alternates: {
    canonical: 'https://www.thegadgetpick.com/headphones',
  },
  openGraph: {
    title: 'Best Headphones Compared 2025-2026 | The Gadget Pick',
    description: 'Compare top headphones side-by-side with detailed specs, prices, and ratings. Audiophile to budget options.',
    type: 'website',
    url: 'https://www.thegadgetpick.com/headphones',

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

export default function HeadphonesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
