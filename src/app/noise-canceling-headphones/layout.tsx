import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Noise-Canceling Headphones Compared 2025-2026 | The Gadget Pick',
  description: 'Compare top noise-canceling headphones side-by-side with detailed specs, prices, and ratings. Premium ANC options.',
  alternates: {
    canonical: 'https://www.thegadgetpick.com/noise-canceling-headphones',
  },
  openGraph: {
    title: 'Best Noise-Canceling Headphones Compared 2025-2026 | The Gadget Pick',
    description: 'Compare top noise-canceling headphones with specs and ratings. Premium ANC technology.',
    type: 'website',
    url: 'https://www.thegadgetpick.com/noise-canceling-headphones',
  },
};

export default function NoiseCancelingHeadphonesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
