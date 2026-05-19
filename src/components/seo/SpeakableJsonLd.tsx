"use client";

interface Props {
  cssSelectors?: string[];
  siteUrl?: string;
}

export function SpeakableJsonLd({
  cssSelectors = ["h1", ".speakable-text", ".post-excerpt", ".faq-item"],
  siteUrl = "https://www.neware.com.cn",
}: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "NEWARE - Precision Battery Testing Equipment",
    "url": siteUrl,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": cssSelectors,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
