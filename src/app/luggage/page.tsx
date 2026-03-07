import { Metadata } from "next";
import Content from "./LuggageContent";

export const metadata: Metadata = {
  title: "Best Luggage Compared — 2025-2026 | The Gadget Pick",
  description: "Compare carry-on, checked, and cabin luggage. Detailed specs, prices, ratings, and buying guide.",
  alternates: {
    canonical: "https://thegadgetpick.com/luggage",
  },
  openGraph: {
    title: "Best Luggage Compared",
    description: "Compare carry-on, checked, and cabin luggage. Detailed specs, prices, ratings, and buying guide.",
    type: "website",
    url: "https://thegadgetpick.com/luggage",
  },
};

export default function Page() {
  return <Content />;
}
