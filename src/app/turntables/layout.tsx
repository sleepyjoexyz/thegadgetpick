import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Turntables Compared 2025-2026 | The Gadget Pick',
  description: 'Compare top turntables side-by-side with detailed specs, prices, and ratings. Entry-level to audiophile options.',
  alternates: {
    canonical: 'https://www.thegadgetpick.com/turntables',
  },
  openGraph: {
    title: 'Best Turntables Compared 2025-2026 | The Gadget Pick',
    description: 'Compare top turntables with specs, prices, and ratings. Entry-level to audiophile vinyl players.',
    type: 'website',
    url: 'https://www.thegadgetpick.com/turntables',
  },
};

export default function TurntablesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
