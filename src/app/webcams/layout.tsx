import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Webcams Compared 2025-2026 | The Gadget Pick',
  description: 'Compare top webcams side-by-side with detailed specs, prices, and ratings. Streaming to professional options.',
  alternates: {
    canonical: 'https://www.thegadgetpick.com/webcams',
  },
  openGraph: {
    title: 'Best Webcams Compared 2025-2026 | The Gadget Pick',
    description: 'Compare top webcams with specs and ratings. Video conferencing, streaming, and professional.',
    type: 'website',
    url: 'https://www.thegadgetpick.com/webcams',
  },
};

export default function WebcamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
