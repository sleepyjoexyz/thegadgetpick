import { getAmazonLink } from "@/lib/utils";
import { headphones } from "@/data/headphones";
import { keyboards } from "@/data/keyboards";
import { mice } from "@/data/mice";
import { microphones } from "@/data/microphones";
import { ncHeadphones } from "@/data/noise-canceling-headphones";
import { petCameras } from "@/data/pet-cameras";
import { powerBanks } from "@/data/power-banks";
import { securityCameras } from "@/data/security-cameras";
import { speakers } from "@/data/speakers";
import { travelAdapters } from "@/data/travel-adapters";
import { webcams } from "@/data/webcams";

export interface QuickPick {
  id: string;
  name: string;
  categoryLabel: string;
  categorySlug: string;
  amazonUrl: string;
  imageAlt: string;
}

interface CatItem {
  id: string;
  brand: string;
  model: string;
  price: number;
  amazonAsin: string | null;
  imageAlt?: string;
}

interface Source {
  items: CatItem[];
  label: string;
  slug: string;
}

const SOURCES: Source[] = [
  { items: headphones, label: "Headphones", slug: "headphones" },
  { items: keyboards, label: "Keyboards", slug: "keyboards" },
  { items: mice, label: "Mice", slug: "mice" },
  { items: microphones, label: "Microphones", slug: "microphones" },
  { items: ncHeadphones, label: "Noise-Canceling", slug: "noise-canceling-headphones" },
  { items: petCameras, label: "Pet Cameras", slug: "pet-cameras" },
  { items: powerBanks, label: "Power Banks", slug: "power-banks" },
  { items: securityCameras, label: "Security Cameras", slug: "security-cameras" },
  { items: speakers, label: "Speakers", slug: "speakers" },
  { items: travelAdapters, label: "Travel Adapters", slug: "travel-adapters" },
  { items: webcams, label: "Webcams", slug: "webcams" },
];

// Surface the lowest-priced items that have a valid affiliate link. Impulse-priced
// products convert inside Amazon's 24-hour cookie window far better than the
// $150+ considered purchases that dominate the catalog. Price is used only for
// ranking/filtering here and is intentionally NOT displayed (Amazon Operating
// Agreement requires live PA-API prices; catalog prices are lastVerified: null).
export function getQuickPicks(maxPrice = 40, limit = 12): QuickPick[] {
  const picks: (QuickPick & { price: number })[] = [];
  for (const src of SOURCES) {
    for (const p of src.items) {
      const url = getAmazonLink(p.amazonAsin);
      if (!url) continue;
      if (p.price > maxPrice) continue;
      picks.push({
        id: `${src.slug}-${p.id}`,
        name: `${p.brand} ${p.model}`,
        categoryLabel: src.label,
        categorySlug: src.slug,
        amazonUrl: url,
        imageAlt: p.imageAlt ?? `${p.brand} ${p.model}`,
        price: p.price,
      });
    }
  }
  picks.sort((a, b) => a.price - b.price);
  return picks.slice(0, limit).map(({ price, ...rest }) => rest);
}
