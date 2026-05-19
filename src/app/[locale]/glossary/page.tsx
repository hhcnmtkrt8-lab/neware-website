import { setRequestLocale, getMessages } from "next-intl/server";
import { Metadata } from "next";
import { GlossaryClient } from "./GlossaryClient";
import { GlossaryJsonLd } from "@/components/seo/GlossaryJsonLd";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh";
  const isVi = locale === "vi";
  return {
    title: isZh ? "电池测试术语表 | NEWARE" : isVi ? "Bảng thuật ngữ kiểm tra pin | NEWARE" : "Battery Testing Glossary | NEWARE",
    description: isZh ? "NEWARE电池测试设备专业术语表，包含DCIR、精度、采样率、能量回收等核心概念的详细定义" : isVi ? "Bảng thuật ngữ chuyên ngành thiết bị kiểm tra pin NEWARE với định nghĩa chi tiết về DCIR, độ chính xác, tốc độ lấy mẫu" : "NEWARE battery testing equipment glossary with detailed definitions for DCIR, accuracy, sampling rate, energy recovery, and core concepts",
    keywords: ["battery glossary", "DCIR definition", "battery terminology", isZh ? "电池术语" : isVi ? "thuật ngữ pin" : "battery terminology", "NEWARE"],
    alternates: {
      canonical: `/${locale}/glossary`,
      languages: {
        en: "/en/glossary",
        zh: "/zh/glossary",
        vi: "/vi/glossary",
        "x-default": "/en/glossary",
      },
    },
    openGraph: {
      title: isZh ? "电池测试术语表 | NEWARE" : isVi ? "Bảng thuật ngữ kiểm tra pin | NEWARE" : "Battery Testing Glossary | NEWARE",
      description: isZh ? "NEWARE电池测试设备专业术语表，包含DCIR、精度、采样率、能量回收等核心概念的详细定义" : isVi ? "Bảng thuật ngữ chuyên ngành thiết bị kiểm tra pin NEWARE với định nghĩa chi tiết về DCIR, độ chính xác, tốc độ lấy mẫu" : "NEWARE battery testing equipment glossary with detailed definitions for DCIR, accuracy, sampling rate, energy recovery, and core concepts",
      url: `/${locale}/glossary`,
      siteName: "NEWARE",
      locale: isZh ? "zh_CN" : isVi ? "vi_VN" : "en_US",
      type: "website",
    },
  };
}

export default async function GlossaryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const siteUrl = process.env.SITE_URL ?? "https://www.neware.com.cn";
  return (
    <>
      <GlossaryJsonLd locale={locale} siteUrl={siteUrl} />
      <GlossaryClient locale={locale} messages={messages} />
    </>
  );
}
