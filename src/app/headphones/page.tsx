import { Metadata } from "next";
import Content from "./HeadphonesContent";

export const metadata: Metadata = {
  title: "Best Headphones Compared — 2025-2026 | The Gadget Pick",
  description: "Compare headphones across all types and price points. Detailed specs, prices, ratings, and buying guide.",
  alternates: {
    canonical: "https://thegadgetpick.com/headphones",
  },
  openGraph: {
    title: "Best Headphones Compared",
    description: "Compare headphones across all types and price points. Detailed specs, prices, ratings, and buying guide.",
    type: "website",
    url: "https://thegadgetpick.com/headphones",
  },
};

export default function Page() {
  return <Content />;
}
