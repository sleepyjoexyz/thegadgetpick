'use client';

import React, { useState } from 'react';

interface DealCardProps {
  id: string;
  title: string;
  category: string;
  // Legacy price fields — no longer displayed (Amazon Associates Operating
  // Agreement requires live-API prices with timestamps; static prices banned).
  originalPrice?: number;
  dealPrice?: number;
  percentOff?: number;
  source: string;
  sourceUrl?: string;
  amazonUrl: string;
  timeLeft?: string;
  imageAlt: string;
  imageUrl: string;
  coupon?: string;
}

const categoryIcons: Record<string, string> = {
  'Headphones': '\u{1F3A7}',
  'Speakers': '\u{1F50A}',
  'Monitors': '\u{1F5A5}\uFE0F',
  'Keyboards': '\u2328\uFE0F',
  'Mice': '\u{1F5B1}\uFE0F',
  'Webcams': '\u{1F4F9}',
  'Power Banks': '\u{1F50B}',
  'Travel Adapters': '\u{1F50C}',
};

const categoryColors: Record<string, string> = {
  'Headphones': 'bg-blue-50 text-blue-600',
  'Speakers': 'bg-blue-50 text-blue-600',
  'Monitors': 'bg-purple-50 text-purple-600',
  'Keyboards': 'bg-purple-50 text-purple-600',
  'Mice': 'bg-purple-50 text-purple-600',
  'Webcams': 'bg-cyan-50 text-cyan-600',
  'Power Banks': 'bg-yellow-50 text-yellow-600',
  'Travel Adapters': 'bg-yellow-50 text-yellow-600',
  'Luggage': 'bg-yellow-50 text-yellow-600',
};

export default function DealCard({
  title,
  category,
  source,
  amazonUrl,
  imageAlt,
  imageUrl,
  coupon,
}: DealCardProps) {
  const [imgError, setImgError] = useState(false);
  const icon = categoryIcons[category] || '\u{1F4E6}';
  const colorClass = categoryColors[category] || 'bg-gray-50 text-gray-600';

  return (
    <a
      href={amazonUrl}
      target="_blank"
      rel="sponsored noopener noreferrer"
      className="block bg-white rounded border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="bg-gray-50 aspect-square flex items-center justify-center overflow-hidden">
        {imageUrl && !imgError ? (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-contain p-2"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-4xl">{icon}</span>
            <span className="text-[9px] text-gray-400 text-center px-2 line-clamp-2">{imageAlt}</span>
          </div>
        )}
      </div>
      <div className="p-2">
        <div className="mb-1">
          <span className={`text-[10px] font-semibold px-1 py-0.5 rounded ${colorClass}`}>
            {category}
          </span>
        </div>
        <h3 className="text-[11px] font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">{title}</h3>
        {coupon && (
          <div className="bg-green-50 border border-green-200 rounded px-1 py-0.5 mb-1">
            <span className="text-[9px] font-semibold text-green-700">{coupon}</span>
          </div>
        )}
        <div className="mt-1 mb-1 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded text-center">
          Check price on Amazon →
        </div>
        <div className="text-[9px] text-gray-400 text-right">{source}</div>
      </div>
    </a>
  );
}
