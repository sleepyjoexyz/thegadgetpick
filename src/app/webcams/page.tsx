import { Metadata } from "next";
import Content from "./WebcamsContent";

export const metadata: Metadata = {
  title: "Best Webcams Compared — 2025-2026 | The Gadget Pick",
  description: "Compare HD and 4K webcams for streaming and calls. Detailed specs, prices, ratings, and buying guide.",
  alternates: {
    canonical: "https://thegadgetpick.com/webcams",
  },
  openGraph: {
    title: "Best Webcams Compared",
    description: "Compare HD and 4K webcams for streaming and calls. Detailed specs, prices, ratings, and buying guide.",
    type: "website",
    url: "https://thegadgetpick.com/webcams",
  },
};

export default function Page() {
  return <Content />;
}
