import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Microphones Compared 2025-2026 | The Gadget Pick',
  description: 'Compare top microphones side-by-side with detailed specs, prices, and ratings. Streaming to studio-quality options.',
  alternates: {
    canonical: 'https://www.thegadgetpick.com/microphones',
  },
  openGraph: {
    title: 'Best Microphones Compared 2025-2026 | The Gadget Pick',
    description: 'Compare top microphones with specs and ratings. Streaming to studio-quality recording.',
    type: 'website',
    url: 'https://www.thegadgetpick.com/microphones',

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

export default function MicrophonesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
