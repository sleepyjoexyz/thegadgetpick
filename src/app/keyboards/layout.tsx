import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Keyboards Compared 2025-2026 | The Gadget Pick',
  description: 'Compare top keyboards side-by-side with detailed specs, prices, and ratings. Mechanical to wireless options.',
  alternates: {
    canonical: 'https://www.thegadgetpick.com/keyboards',
  },
  openGraph: {
    title: 'Best Keyboards Compared 2025-2026 | The Gadget Pick',
    description: 'Compare top keyboards with specs and ratings. Mechanical, gaming, and wireless options.',
    type: 'website',
    url: 'https://www.thegadgetpick.com/keyboards',
  },
};

export default function KeyboardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
