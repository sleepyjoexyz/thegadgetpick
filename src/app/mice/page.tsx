import { Metadata } from "next";
import Content from "./MiceContent";

export const metadata: Metadata = {
  title: "Best Mice Compared — 2025-2026 | The Gadget Pick",
  description: "Compare gaming, ergonomic, and wireless mice. Detailed specs, prices, ratings, and buying guide.",
  alternates: {
    canonical: "https://thegadgetpick.com/mice",
  },
  openGraph: {
    title: "Best Mice Compared",
    description: "Compare gaming, ergonomic, and wireless mice. Detailed specs, prices, ratings, and buying guide.",
    type: "website",
    url: "https://thegadgetpick.com/mice",
  },
};

export default function Page() {
  return <Content />;
}
