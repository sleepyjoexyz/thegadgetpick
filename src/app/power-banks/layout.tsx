import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Power Banks Compared 2025-2026 | The Gadget Pick',
  description: 'Compare top power banks side-by-side with detailed specs, prices, and ratings. Portable charging solutions.',
  alternates: {
    canonical: 'https://thegadgetpick.com/power-banks',
  },
  openGraph: {
    title: 'Best Power Banks Compared 2025-2026 | The Gadget Pick',
    description: 'Compare top power banks with specs and ratings. Fast charging, portable, and high-capacity options.',
    type: 'website',
    url: 'https://thegadgetpick.com/power-banks',
  },
};

export default function PowerBanksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
