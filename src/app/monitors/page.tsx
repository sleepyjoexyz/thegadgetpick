import { Metadata } from "next";
import Content from "./MonitorsContent";

export const metadata: Metadata = {
  title: "Best Monitors Compared — 2025-2026 | The Gadget Pick",
  description: "Compare gaming, productivity, and curved display monitors. Detailed specs, prices, ratings, and buying guide.",
  alternates: {
    canonical: "https://thegadgetpick.com/monitors",
  },
  openGraph: {
    title: "Best Monitors Compared",
    description: "Compare gaming, productivity, and curved display monitors. Detailed specs, prices, ratings, and buying guide.",
    type: "website",
    url: "https://thegadgetpick.com/monitors",
  },
};

export default function Page() {
  return <Content />;
}
