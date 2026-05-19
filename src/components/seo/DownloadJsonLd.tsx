"use client";

import { whitepapers } from "@/data/whitepapers";
import { Whitepaper } from "@/data/whitepapers";

interface Props {
  locale: string;
  siteUrl: string;
}

export function DownloadJsonLd({ locale, siteUrl }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": locale === "zh" ? "NEWARE白皮书与技术指南" : locale === "vi" ? "Báo cáo trắng & Hướng dẫn kỹ thuật NEWARE" : "NEWARE Whitepapers & Technical Guides",
    "description": locale === "zh" ? "免费下载NEWARE专家编写的技术白皮书和选购指南" : locale === "vi" ? "Tải miễn phí các báo cáo trắng và hướng dẫn kỹ thuật từ các chuyên gia NEWARE" : "Download free technical whitepapers and buying guides from NEWARE experts",
    "itemListElement": whitepapers.map((wp: Whitepaper, i: number) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "SoftwareSourceCode",
        "name": (locale === "zh" ? wp.titleZh : locale === "vi" ? wp.titleVi : wp.titleEn) || wp.title,
        "description": (locale === "zh" ? wp.descriptionZh : locale === "vi" ? wp.descriptionVi : wp.descriptionEn) || wp.description,
        "url": `${siteUrl}/${locale}/whitepapers`,
        "numberOfPages": wp.pages,
        "datePublished": wp.publishedAt,
        "author": {
          "@type": "Organization",
          "name": "NEWARE",
        },
        "publisher": {
          "@type": "Organization",
          "name": "NEWARE",
        },
        "keywords": ["battery testing", "whitepaper", "NEWARE", wp.category].join(", "),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
