"use client";

import { QuickPick } from "@/lib/quickPicks";

const EMOJI: Record<string, string> = {
  "Headphones": "\u{1F3A7}",
  "Keyboards": "\u{2328}\u{FE0F}",
  "Mice": "\u{1F5B1}\u{FE0F}",
  "Microphones": "\u{1F3A4}",
  "Noise-Canceling": "\u{1F507}",
  "Pet Cameras": "\u{1F4F7}",
  "Power Banks": "\u{1F50B}",
  "Security Cameras": "\u{1F512}",
  "Speakers": "\u{1F50A}",
  "Travel Adapters": "\u{1F50C}",
  "Webcams": "\u{1F4F9}",
};

export default function QuickPickCard({ pick }: { pick: QuickPick }) {
  const emoji = EMOJI[pick.categoryLabel] || "\u{1F6CD}\u{FE0F}";

  return (
    <a
      href={pick.amazonUrl}
      target="_blank"
      rel="sponsored noopener noreferrer"
      className="block bg-white rounded border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="bg-gray-50 aspect-square flex flex-col items-center justify-center gap-1">
        <span className="text-4xl">{emoji}</span>
        <span className="text-[9px] text-gray-400 text-center px-2 line-clamp-2">
          {pick.imageAlt}
        </span>
      </div>
      <div className="p-2">
        <span className="text-[10px] font-semibold px-1 py-0.5 rounded bg-amber-50 text-amber-700">
          {pick.categoryLabel}
        </span>
        <h3 className="text-[11px] font-bold text-gray-900 mb-1 mt-1 line-clamp-2 leading-tight">
          {pick.name}
        </h3>
        <div className="mt-1 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded text-center">
          Check price on Amazon &rarr;
        </div>
      </div>
    </a>
  );
}
