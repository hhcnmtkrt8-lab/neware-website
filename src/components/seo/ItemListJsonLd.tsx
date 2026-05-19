"use client";

import { products } from "@/data/neware";
import { Product } from "@/data/neware";

interface Props {
  locale: string;
  siteUrl: string;
}

export function ItemListJsonLd({ locale, siteUrl }: Props) {
  const productItems = products.slice(0, 12).map((product: Product, index: number) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Product",
      "name": (locale === "zh" ? product.name : product.nameEn) || product.name,
      "description": (locale === "zh" ? product.description : product.descriptionEn) || product.description,
      "url": `${siteUrl}/${locale}/products/${product.id}`,
      "image": `${siteUrl}/products/${product.id}/thumbnail.jpg`,
      "brand": {
        "@type": "Brand",
        "name": "NEWARE",
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "NEWARE",
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": "0",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "NEWARE",
        },
      },
    },
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": locale === "zh" ? "NEWARE电池测试设备产品列表" : locale === "vi" ? "Danh sách thiết bị kiểm tra pin NEWARE" : "NEWARE Battery Testing Equipment Product List",
    "description": locale === "zh" ? "探索NEWARE全面的电池测试设备产品线，包括CT-4000、BTS9000、CE-6000等系列" : locale === "vi" ? "Khám phá dòng sản phẩm thiết bị kiểm tra pin NEWARE bao gồm CT-4000, BTS9000, CE-6000" : "Explore NEWARE's comprehensive battery testing equipment product line including CT-4000, BTS9000, CE-6000 series",
    "numberOfItems": productItems.length,
    "itemListElement": productItems,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
