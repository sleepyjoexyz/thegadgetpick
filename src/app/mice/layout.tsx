import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Mice Compared 2025-2026 | The Gadget Pick',
  description: 'Compare top mice side-by-side with detailed specs, prices, and ratings. Gaming to productivity options.',
  alternates: {
    canonical: 'https://www.thegadgetpick.com/mice',
  },
  openGraph: {
    title: 'Best Mice Compared 2025-2026 | The Gadget Pick',
    description: 'Compare top mice with specs and ratings. Gaming, productivity, and ergonomic options.',
    type: 'website',
    url: 'https://www.thegadgetpick.com/mice',
  },
};

export default function MiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
