import { Metadata } from "next";
import Content from "./NoiseCancelingHeadphonesContent";

export const metadata: Metadata = {
  title: "Best Noise-Canceling Headphones Compared — 2025-2026 | The Gadget Pick",
  description: "Compare ANC headphones for flights and commutes. Detailed specs, prices, ratings, and buying guide.",
  alternates: {
    canonical: "https://thegadgetpick.com/nc-headphones",
  },
  openGraph: {
    title: "Best Noise-Canceling Headphones Compared",
    description: "Compare ANC headphones for flights and commutes. Detailed specs, prices, ratings, and buying guide.",
    type: "website",
    url: "https://thegadgetpick.com/nc-headphones",
  },
};

export default function Page() {
  return <Content />;
}
