export interface DealCategory {
  name: string;
  slug: string;
  emoji: string;
  color: string;
  description: string;
}

export const dealCategories: DealCategory[] = [
  { name: 'Headphones', slug: 'headphones', emoji: '🎧', color: 'blue', description: 'Best headphone deals today — save on Sony, Bose, Apple AirPods & more. Updated daily.' },
  { name: 'Speakers', slug: 'speakers', emoji: '🔊', color: 'blue', description: 'Best bluetooth speaker deals today — save on JBL, Sony, Bose & more. Updated daily.' },
  { name: 'Monitors', slug: 'monitors', emoji: '🖥️', color: 'purple', description: 'Best monitor deals today — save on USB-C, 4K, ultrawide displays. Updated daily.' },
  { name: 'Keyboards', slug: 'keyboards', emoji: '⌨️', color: 'purple', description: 'Best mechanical keyboard deals today — save on gaming & programming keyboards. Updated daily.' },
  { name: 'Mice', slug: 'mice', emoji: '🖱️', color: 'purple', description: 'Best mouse deals today — save on ergonomic, gaming & wireless mice. Updated daily.' },
  { name: 'Webcams', slug: 'webcams', emoji: '📷', color: 'cyan', description: 'Best webcam deals today — save on 4K, streaming & conference webcams. Updated daily.' },
  { name: 'Power Banks', slug: 'power-banks', emoji: '🔋', color: 'yellow', description: 'Best power bank deals today — save on portable chargers & battery packs. Updated daily.' },
  { name: 'Travel Adapters', slug: 'travel-adapters', emoji: '🔌', color: 'yellow', description: 'Best travel adapter deals today — save on universal adapters & converters. Updated daily.' },
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
