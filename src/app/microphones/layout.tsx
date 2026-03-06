import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Microphones Compared 2025-2026 | The Gadget Pick',
  description: 'Compare top microphones side-by-side with detailed specs, prices, and ratings. Streaming to studio-quality options.',
  alternates: {
    canonical: 'https://thegadgetpick.com/microphones',
  },
  openGraph: {
    title: 'Best Microphones Compared 2025-2026 | The Gadget Pick',
    description: 'Compare top microphones with specs and ratings. Streaming to studio-quality recording.',
    type: 'website',
    url: 'https://thegadgetpick.com/microphones',
  },
};

export default function MicrophonesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
