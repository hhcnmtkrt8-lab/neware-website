"use client";

import { useParams } from "next/navigation";

const SITE_URL = typeof window !== "undefined"
  ? window.location.origin
  : (process.env.SITE_URL ?? "https://www.neware.com.cn");

export function OrganizationJsonLd() {
  const params = useParams();
  const locale = (params.locale as string) || "zh";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: locale === "zh"
      ? "新威尔电子（深圳市新威尔电子有限公司）"
      : "NEWARE (Shenzhen Neware Electronics Co., Ltd.)",
    alternateName: locale === "zh" ? "NEWARE" : "新威尔电子",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.svg`,
      width: 256,
      height: 256,
    },
    description:
      locale === "zh"
        ? "深圳市新威尔电子有限公司成立于1998年，专注电池测试设备研发制造26年，服务全球32000+客户，覆盖150+国家。主要产品包括CT-4000、BTS9000、CE-6000等电池充放电测试系统。"
        : locale === "vi"
        ? "Công ty TNHH Điện tử Neware Thâm Quyến được thành lập năm 1998, chuyên về R&D và sản xuất thiết bị kiểm tra pin trong 26 năm, phục vụ hơn 32.000 khách hàng tại 150+ quốc gia."
        : "Shenzhen Neware Electronics Co., Ltd. has specialized in battery testing equipment R&D and manufacturing since 1998, serving 32,000+ customers across 150+ countries.",
    foundingDate: "1998",
    foundingLocation: {
      "@type": "Place",
      name: "Shenzhen, Guangdong, China",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "support@batteryxlab.shop",
        contactType: "customer service",
        availableLanguage: ["Chinese", "English", "Vietnamese"],
        areaServed: "WW",
      },
      {
        "@type": "ContactPoint",
        email: "jason@batteryxlab.shop",
        contactType: "sales",
        availableLanguage: ["English"],
        areaServed: "US",
      },
      {
        "@type": "ContactPoint",
        email: "info@batteryxlab.shop",
        contactType: "sales",
        availableLanguage: ["Chinese", "English"],
        areaServed: "CN",
      },
    ],
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "5F, Building R2-B, South Hi-Tech Park, Nanshan District",
        addressLocality: "Shenzhen",
        addressRegion: "Guangdong",
        postalCode: "518000",
        addressCountry: "CN",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/neware-battery",
      "https://www.youtube.com/@newarebattery",
      "https://twitter.com/newarebattery",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name:
        locale === "zh"
          ? "电池测试设备产品目录"
          : locale === "vi"
          ? "Danh mục thiết bị kiểm tra pin"
          : "Battery Testing Equipment Catalog",
      itemListElement: [
        { "@type": "Offer", name: locale === "zh" ? "CT-4000 系列" : locale === "vi" ? "Dòng CT-4000" : "CT-4000 Series" },
        { "@type": "Offer", name: locale === "zh" ? "CT-9000 系列 (BTS9000)" : locale === "vi" ? "Dòng CT-9000 (BTS9000)" : "CT-9000 Series (BTS9000)" },
        { "@type": "Offer", name: locale === "zh" ? "CE-6000 IGBT 系列" : locale === "vi" ? "Dòng CE-6000 IGBT" : "CE-6000 / IGBT Series" },
        { "@type": "Offer", name: locale === "zh" ? "CT-8000 系列" : locale === "vi" ? "Dòng CT-8000" : "CT/CTE-8000 Series" },
        { "@type": "Offer", name: locale === "zh" ? "环境试验箱" : locale === "vi" ? "Buồng thử nghiệm môi trường" : "Environmental Test Chambers" },
        { "@type": "Offer", name: locale === "zh" ? "化成分容系统" : locale === "vi" ? "Hệ thống định hình & phân loại" : "Formation & Grading Systems" },
        { "@type": "Offer", name: locale === "zh" ? "LIMS 智慧管理系统" : locale === "vi" ? "Hệ thống quản lý LIMS" : "LIMS Smart Lab System" },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
