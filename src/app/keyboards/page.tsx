import { Metadata } from "next";
import Content from "./KeyboardsContent";

export const metadata: Metadata = {
  title: "Best Keyboards Compared — 2025-2026 | The Gadget Pick",
  description: "Compare mechanical and membrane keyboards for typing and gaming. Detailed specs, prices, ratings, and buying guide.",
  alternates: {
    canonical: "https://thegadgetpick.com/keyboards",
  },
  openGraph: {
    title: "Best Keyboards Compared",
    description: "Compare mechanical and membrane keyboards for typing and gaming. Detailed specs, prices, ratings, and buying guide.",
    type: "website",
    url: "https://thegadgetpick.com/keyboards",
  },
};

export default function Page() {
  return <Content />;
}
