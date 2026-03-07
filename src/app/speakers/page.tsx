import { Metadata } from "next";
import Content from "./SpeakersContent";

export const metadata: Metadata = {
  title: "Best Speakers Compared — 2025-2026 | The Gadget Pick",
  description: "Compare portable to home theater speakers. Detailed specs, prices, ratings, and buying guide.",
  alternates: {
    canonical: "https://thegadgetpick.com/speakers",
  },
  openGraph: {
    title: "Best Speakers Compared",
    description: "Compare portable to home theater speakers. Detailed specs, prices, ratings, and buying guide.",
    type: "website",
    url: "https://thegadgetpick.com/speakers",
  },
};

export default function Page() {
  return <Content />;
}
