import { Metadata } from "next";
import Content from "./TurntablesContent";

export const metadata: Metadata = {
  title: "Best Turntables Compared — 2025-2026 | The Gadget Pick",
  description: "Compare vinyl turntables for audiophiles and collectors. Detailed specs, prices, ratings, and buying guide.",
  alternates: {
    canonical: "https://thegadgetpick.com/turntables",
  },
  openGraph: {
    title: "Best Turntables Compared",
    description: "Compare vinyl turntables for audiophiles and collectors. Detailed specs, prices, ratings, and buying guide.",
    type: "website",
    url: "https://thegadgetpick.com/turntables",
  },
};

export default function Page() {
  return <Content />;
}
