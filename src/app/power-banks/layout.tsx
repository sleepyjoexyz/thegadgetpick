import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Power Banks Compared 2025-2026 | The Gadget Pick',
  description: 'Compare top power banks side-by-side with detailed specs, prices, and ratings. Portable charging solutions.',
  alternates: {
    canonical: 'https://www.thegadgetpick.com/power-banks',
  },
  openGraph: {
    title: 'Best Power Banks Compared 2025-2026 | The Gadget Pick',
    description: 'Compare top power banks with specs and ratings. Fast charging, portable, and high-capacity options.',
    type: 'website',
    url: 'https://www.thegadgetpick.com/power-banks',

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

export default function PowerBanksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
