"use client";

import { useState } from "react";

interface ProductImageProps {
  imageUrl: string;
  alt: string;
  brand: string;
}

export default function ProductImage({
  imageUrl,
  alt,
  brand,
}: ProductImageProps) {
  const [imageError, setImageError] = useState(false);

  const hasImage = imageUrl && imageUrl.trim() !== "";
  const showFallback = imageError || !hasImage;

  if (showFallback) {
    const firstLetter = brand.charAt(0).toUpperCase();

    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex flex-col items-center gap-2">
          <div className="text-6xl font-bold text-indigo-200">
            {firstLetter}
          </div>
          <p className="text-xs text-gray-500">{brand}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      onError={() => setImageError(true)}
      className="max-h-full max-w-full object-contain p-4"
    />
  );
}
