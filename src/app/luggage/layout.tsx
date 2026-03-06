import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Luggage Compared 2025-2026 | The Gadget Pick',
  description: 'Compare top luggage side-by-side with detailed specs, prices, and ratings. Carry-on to checked bag options.',
  alternates: {
    canonical: 'https://thegadgetpick.com/luggage',
  },
  openGraph: {
    title: 'Best Luggage Compared 2025-2026 | The Gadget Pick',
    description: 'Compare top luggage with specs and ratings. Carry-on, hardshell, and smart luggage.',
    type: 'website',
    url: 'https://thegadgetpick.com/luggage',
  },
};

export default function LuggageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
