import { Metadata } from "next";
import Content from "./MicrophonesContent";

export const metadata: Metadata = {
  title: "Best Microphones Compared — 2025-2026 | The Gadget Pick",
  description: "Compare streaming, podcasting, and studio microphones. Detailed specs, prices, ratings, and buying guide.",
  alternates: {
    canonical: "https://thegadgetpick.com/microphones",
  },
  openGraph: {
    title: "Best Microphones Compared",
    description: "Compare streaming, podcasting, and studio microphones. Detailed specs, prices, ratings, and buying guide.",
    type: "website",
    url: "https://thegadgetpick.com/microphones",
  },
};

export default function Page() {
  return <Content />;
}
