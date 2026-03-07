import { Metadata } from "next";
import Content from "./TravelAdaptersContent";

export const metadata: Metadata = {
  title: "Best Travel Adapters Compared — 2025-2026 | The Gadget Pick",
  description: "Compare international power adapters and converters. Detailed specs, prices, ratings, and buying guide.",
  alternates: {
    canonical: "https://thegadgetpick.com/travel-adapters",
  },
  openGraph: {
    title: "Best Travel Adapters Compared",
    description: "Compare international power adapters and converters. Detailed specs, prices, ratings, and buying guide.",
    type: "website",
    url: "https://thegadgetpick.com/travel-adapters",
  },
};

export default function Page() {
  return <Content />;
}
