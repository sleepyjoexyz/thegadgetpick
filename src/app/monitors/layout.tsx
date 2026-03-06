import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Monitors Compared 2025-2026 | The Gadget Pick',
  description: 'Compare top monitors side-by-side with detailed specs, prices, and ratings. Gaming to productivity displays.',
  alternates: {
    canonical: 'https://thegadgetpick.com/monitors',
  },
  openGraph: {
    title: 'Best Monitors Compared 2025-2026 | The Gadget Pick',
    description: 'Compare top monitors with specs and ratings. Gaming, editing, and productivity displays.',
    type: 'website',
    url: 'https://thegadgetpick.com/monitors',
  },
};

export default function MonitorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
