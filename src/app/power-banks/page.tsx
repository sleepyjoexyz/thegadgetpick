import { Metadata } from "next";
import Content from "./PowerBanksContent";

export const metadata: Metadata = {
  title: "Best Power Banks Compared — 2025-2026 | The Gadget Pick",
  description: "Compare portable power banks for phones and tablets. Detailed specs, prices, ratings, and buying guide.",
  alternates: {
    canonical: "https://thegadgetpick.com/power-banks",
  },
  openGraph: {
    title: "Best Power Banks Compared",
    description: "Compare portable power banks for phones and tablets. Detailed specs, prices, ratings, and buying guide.",
    type: "website",
    url: "https://thegadgetpick.com/power-banks",
  },
};

export default function Page() {
  return <Content />;
}
