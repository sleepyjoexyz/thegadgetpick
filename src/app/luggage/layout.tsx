import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Luggage Compared 2025-2026 | The Gadget Pick',
  description: 'Compare top luggage side-by-side with detailed specs, prices, and ratings. Carry-on to checked bag options.',
  alternates: {
    canonical: 'https://www.thegadgetpick.com/luggage',
  },
  openGraph: {
    title: 'Best Luggage Compared 2025-2026 | The Gadget Pick',
    description: 'Compare top luggage with specs and ratings. Carry-on, hardshell, and smart luggage.',
    type: 'website',
    url: 'https://www.thegadgetpick.com/luggage',

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

export default function LuggageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
