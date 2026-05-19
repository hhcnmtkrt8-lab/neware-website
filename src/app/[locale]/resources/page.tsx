import { setRequestLocale } from "next-intl/server";
import { getMessages } from "next-intl/server";
import { Metadata } from "next";
import { ResourcesPageClient } from "@/components/resources/ResourcesPageClient";

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = process.env.SITE_URL ?? "https://www.neware.com.cn";

const OG_IMAGES: Record<string, string> = {
  en: "/og-en.png",
  zh: "/og-zh.png",
  vi: "/og-vi.png",
  ru: "/og-en.png",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh";
  const isVi = locale === "vi";
  const isRu = locale === "ru";
  const ogImage = OG_IMAGES[locale] ?? "/og-en.png";

  return {
    title: {
      default: isZh
        ? "技术资源中心 — 白皮书与选型指南"
        : isVi
        ? "Trung tâm tài nguyên kỹ thuật — Sách trắng & Hướng dẫn chọn lựa"
        : "Technical Resources — Whitepapers & Selection Guides",
      template: "%s | NEWARE",
    },
    description: isZh
      ? "免费下载新威尔电池测试设备选型指南、白皮书和技术文档。了解如何选择合适的电池测试系统、能量回收技术的ROI计算、以及高精度测试对研发的影响。"
      : isVi
      ? "Tải miễn phí hướng dẫn chọn lựa thiết bị kiểm tra pin NEWARE, sách trắng và tài liệu kỹ thuật."
      : "Download free Neware battery testing equipment selection guides, whitepapers and technical documents. Learn how to choose the right battery testing system and understand the ROI of energy recovery technology.",
    keywords: isZh
      ? ["电池测试白皮书", "选型指南", "技术文档", "NEWARE下载", "ROI计算", "能量回收"].join(", ")
      : isVi
      ? ["NEWARE tài nguyên", "sách trắng pin", "hướng dẫn chọn lựa", "tài liệu kỹ thuật"].join(", ")
      : ["NEWARE whitepaper", "selection guide", "technical document", "battery testing ROI", "energy recovery whitepaper"].join(", "),
    alternates: {
      canonical: `/${locale}/resources`,
      languages: {
        en: "/en/resources",
        zh: "/zh/resources",
        vi: "/vi/resources",
        "x-default": "/en/resources",
      },
    },
    openGraph: {
      title: isZh ? "技术资源中心 | NEWARE" : isVi ? "Trung tâm tài nguyên | NEWARE" : "Technical Resources | NEWARE",
      description: isZh
        ? "免费下载白皮书、选型指南和技术文档"
        : isVi
        ? "Tải miễn phí sách trắng và tài liệu kỹ thuật"
        : "Download free whitepapers and technical documents",
      url: `${SITE_URL}/${locale}/resources`,
      siteName: "NEWARE",
      images: [{ url: ogImage, width: 1200, height: 630, alt: isRu ? "Технические ресурсы NEWARE" : "NEWARE Technical Resources" }],
      locale: isZh ? "zh_CN" : isVi ? "vi_VN" : isRu ? "ru_RU" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@newarebattery",
      creator: "@newarebattery",
      title: isZh ? "技术资源中心 | NEWARE" : isVi ? "Trung tâm tài nguyên | NEWARE" : isRu ? "Центр технических ресурсов | NEWARE" : "Technical Resources | NEWARE",
      description: isZh
        ? "免费下载NEWARE白皮书和选型指南"
        : isVi
        ? "Tải miễn phí tài liệu NEWARE"
        : "Free NEWARE whitepapers and selection guides",
      images: [ogImage],
    },
  };
}

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ResourcesPageClient locale={locale} />;
}
