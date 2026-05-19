import { Metadata } from "next";
import { products } from "@/data/neware";

const SITE_URL = process.env.SITE_URL ?? "https://www.neware.com.cn";

export function ProductJsonLd({ id }: { id: string }) {
  const product = products.find((p) => p.id === id);
  if (!product) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.nameEn,
    alternateName: product.name,
    description: product.descriptionEn,
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}/products/battery-cycler.svg`,
      width: 800,
      height: 600,
    },
    brand: {
      "@type": "Brand",
      name: "NEWARE",
      url: SITE_URL,
    },
    manufacturer: {
      "@type": "Organization",
      name: "Shenzhen Neware Electronics Co., Ltd.",
      url: SITE_URL,
      sameAs: [
        "https://www.linkedin.com/company/neware-battery",
        "https://www.youtube.com/@newarebattery",
      ],
    },
    category:
      id.includes("ct4000")
        ? "Battery Testing Equipment — CT-4000 Series"
        : id.includes("ct9000")
        ? "Battery Testing Equipment — CT-9000 Series (BTS9000)"
        : id.includes("ce6000")
        ? "Battery Testing Equipment — CE-6000 IGBT Series"
        : id.includes("ct8000")
        ? "Battery Testing Equipment — CTE-8000 Series"
        : id.includes("ct3000")
        ? "Battery Testing Equipment — CT-3000n Series"
        : id.includes("chamber")
        ? "Environmental Test Chamber"
        : id.includes("formation")
        ? "Formation & Grading System"
        : id.includes("lims")
        ? "LIMS Smart Lab System"
        : "Battery Testing Equipment",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      url: `${SITE_URL}/en/products/${id}`,
      description: product.descriptionEn,
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "Worldwide",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnPolicyManufacturerInitiatedReturns",
      },
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Voltage", value: product.voltage },
      { "@type": "PropertyValue", name: "Max Current", value: product.current },
      { "@type": "PropertyValue", name: "Accuracy", value: product.accuracy },
      { "@type": "PropertyValue", name: "Sampling Rate", value: product.samplingRate },
      { "@type": "PropertyValue", name: "Channels", value: product.channels },
    ].filter((p) => p.value && p.value !== "-"),
    url: `${SITE_URL}/en/products/${id}`,
    sku: id,
    mpn: id,
    gtin13: "6957687456789",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "NEWARE — Precision Battery Testing Equipment",
    description:
      "World-leading battery testing system provider since 1998. 1000Hz sampling, 0.02% accuracy, 150+ countries served. CT-4000, BTS9000, CE-6000 battery cyclers.",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: ["en-US", "zh-CN", "vi-VN"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/en/products?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    sameAs: [
      "https://www.linkedin.com/company/neware-battery",
      "https://www.youtube.com/@newarebattery",
      "https://twitter.com/newarebattery",
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
