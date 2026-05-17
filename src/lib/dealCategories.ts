export interface DealCategory {
  name: string;
  slug: string;
  emoji: string;
  color: string;
  description: string;
  relatedCategories?: string[];
}

export const dealCategories: DealCategory[] = [
  { name: "Headphones", slug: "headphones", emoji: "🎘", color: "blue", description: "Best headphone deals today — save on Sony, Bose, Apple AirPods, and more. Hand-picked discounts on wireless and noise-canceling headphones. Updated daily.", relatedCategories: ["headphones", "noise-canceling-headphones"] },
  { name: "Speakers", slug: "speakers", emoji: "🔊", color: "blue", description: "Best Bluetooth speaker deals today — save on JBL, Sony, Bose, and more. Hand-picked discounts on portable, outdoor, and smart speakers. Updated daily.", relatedCategories: ["speakers"] },
  { name: "Monitors", slug: "monitors", emoji: "🖥️", color: "purple", description: "Best monitor deals today — save on USB-C, 4K, and ultrawide displays from top brands. Hand-picked discounts on work and gaming monitors. Updated daily.", relatedCategories: ["monitors"] },
  { name: "Keyboards", slug: "keyboards", emoji: "⌨️", color: "purple", description: "Best mechanical keyboard deals today — save on gaming and programming boards from Logitech, Keychron & more. Discounts on top-rated keyboards updated daily.", relatedCategories: ["keyboards"] },
  { name: "Mice", slug: "mice", emoji: "🖡️", color: "purple", description: "Best mouse deals today — save on ergonomic, gaming, and wireless mice from Logitech, Razer, and more. Hand-picked discounts on top-rated mice. Updated daily.", relatedCategories: ["mice"] },
  { name: "Webcams", slug: "webcams", emoji: "📷", color: "cyan", description: "Best webcam deals today — save on 4K, streaming, and conference webcams from top brands. Hand-picked discounts on top-rated webcams. Updated daily.", relatedCategories: ["webcams"] },
  { name: "Power Banks", slug: "power-banks", emoji: "🔋", color: "yellow", description: "Best power bank deals today — save on portable chargers and fast-charging battery packs from Anker, Baseus & more. Top-rated discounts updated daily.", relatedCategories: ["power-banks"] },
  { name: "Travel Adapters", slug: "travel-adapters", emoji: "🔌", color: "yellow", description: "Best travel adapter deals today — save on universal adapters for international travel. Hand-picked discounts on GaN and USB-C adapters. Updated daily.", relatedCategories: ["travel-adapters"] },
];

export function getCategoryBySlug(slug: string): DealCategory | undefined {
  return dealCategories.find((c) => c.slug === slug);
}

export function getCategoryByName(name: string): DealCategory | undefined {
  return dealCategories.find((c) => c.name === name);
}

export function getAllCategorySlugs(): string[] {
  return dealCategories.map((c) => c.slug);
}