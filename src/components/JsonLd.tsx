'use client';

export function WebSiteSchema() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "The Gadget Pick",
      "url": "https://www.thegadgetpick.com",
      "description": "Data-driven audio, PC peripheral, and travel tech product comparisons",
      "publisher": {
        "@type": "Organization",
        "name": "The Gadget Pick",
        "url": "https://www.thegadgetpick.com"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.thegadgetpick.com/?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    })}} />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": item.name,
        "item": item.url
      }))
    })}} />
  );
}

export function ArticleSchema({ title, description, url, datePublished, dateModified }: {
  title: string; description: string; url: string; datePublished?: string; dateModified?: string;
}) {
  const today = new Date().toISOString().split('T')[0];
  const publishDate = datePublished || today;
  const modifyDate = dateModified || today;

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "url": url,
      "datePublished": publishDate,
      "dateModified": modifyDate,
      "author": { "@type": "Organization", "name": "The Gadget Pick" },
      "publisher": { "@type": "Organization", "name": "The Gadget Pick", "url": "https://www.thegadgetpick.com" }
    })}} />
  );
}

export function ProductListSchema({ products, categoryName, categoryUrl }: {
  products: { name: string; brand: string; price: number; rating: number; description: string; imageUrl?: string }[];
  categoryName: string; categoryUrl: string;
}) {
  // priceValidUntil = tomorrow (matches DealSchema convention; Google Merchant listings expects a forward date)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const priceValidUntil = tomorrow.toISOString().split('T')[0];
  const FALLBACK_IMAGE = "https://www.thegadgetpick.com/og-image.jpg";

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": `Best ${categoryName} Compared`,
      "url": categoryUrl,
      "numberOfItems": products.length,
      "itemListElement": products.map((p, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "Product",
          "name": `${p.brand} ${p.name}`,
          "image": p.imageUrl || FALLBACK_IMAGE,
          "brand": { "@type": "Brand", "name": p.brand },
          "description": p.description || `${p.brand} ${p.name}`,
          "offers": {
            "@type": "Offer",
            "price": p.price,
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "priceValidUntil": priceValidUntil,
            "shippingDetails": {
              "@type": "OfferShippingDetails",
              "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "US" },
              "shippingRate": { "@type": "MonetaryAmount", "value": 0, "currency": "USD" },
              "deliveryTime": {
                "@type": "ShippingDeliveryTime",
                "handlingTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 1, "unitCode": "DAY" },
                "transitTime": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 5, "unitCode": "DAY" }
              }
            },
            "hasMerchantReturnPolicy": {
              "@type": "MerchantReturnPolicy",
              "applicableCountry": "US",
              "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
              "merchantReturnDays": 30,
              "returnMethod": "https://schema.org/ReturnByMail",
              "returnFees": "https://schema.org/FreeReturn"
            }
          },
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": p.rating, "bestRating": 5, "worstRating": 1, "ratingCount": 1 }
        }
      }))
    })}} />
  );
}

export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  if (!faqs || faqs.length === 0) return null;
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    })}} />
  );
}
