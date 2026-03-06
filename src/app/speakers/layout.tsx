import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Speakers Compared 2025-2026 | The Gadget Pick',
  description: 'Compare top speakers side-by-side with detailed specs, prices, and ratings. Portable to studio-quality options.',
  alternates: {
    canonical: 'https://thegadgetpick.com/speakers',
  },
  openGraph: {
    title: 'Best Speakers Compared 2025-2026 | The Gadget Pick',
    description: 'Compare top speakers with detailed specs, prices, and ratings. Portable to studio-quality.',
    type: 'website',
    url: 'https://thegadgetpick.com/speakers',
  },
};

export default function SpeakersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
