import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Noise-Canceling Headphones Compared | The Gadget Pick',
  description: 'Compare top noise-canceling headphones side-by-side with detailed specs, prices, and ratings. Premium ANC options.',
  alternates: {
    canonical: 'https://www.thegadgetpick.com/noise-canceling-headphones',
  },
  openGraph: {
    title: 'Best Noise-Canceling Headphones Compared | The Gadget Pick',
    description: 'Compare top noise-canceling headphones with specs and ratings. Premium ANC technology.',
    type: 'website',
    url: 'https://www.thegadgetpick.com/noise-canceling-headphones',

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

export default function NoiseCancelingHeadphonesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
