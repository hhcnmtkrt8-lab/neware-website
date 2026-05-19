import { setRequestLocale } from "next-intl/server";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Metadata } from "next";
import CaseStudiesClient from "./CaseStudiesClient";

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
  const ogImage = OG_IMAGES[locale] ?? "/og-en.png";

  return {
    title: {
      default: isZh
        ? "客户案例 — NEWARE 电池测试设备"
        : isVi
        ? "Khách hàng tiêu biểu — Thiết bị kiểm tra pin NEWARE"
        : "Customer Cases — NEWARE Battery Testing Equipment",
      template: "%s | NEWARE",
    },
    description: isZh
      ? "查看新威尔电池测试设备在全球高校、电池制造商和科研机构的应用案例，包括MIT、比亚迪、宁德时代、斯坦福大学等标杆客户。真实测试规模、量化成果数据。"
      : isVi
      ? "Khám phá cách thiết bị kiểm tra pin NEWARE được sử dụng bởi các trường đại học, nhà sản xuất pin và viện nghiên cứu trên toàn thế giới — bao gồm MIT, BYD, CATL và Stanford."
      : "Explore how NEWARE battery testing equipment is used by universities, battery manufacturers and research institutions worldwide — including MIT, BYD, CATL, and Stanford. Real scale and quantified results.",
    keywords: isZh
      ? ["NEWARE客户案例", "BYD电池测试", "宁德时代案例", "MIT电池研究", "电池测试设备用户", "标杆客户"].join(", ")
      : isVi
      ? ["NEWARE khách hàng", "thử nghiệm pin BYD", "CATL nghiên cứu", "MIT thử nghiệm pin"].join(", ")
      : ["NEWARE customer cases", "BYD battery testing", "CATL case study", "MIT battery research", "battery cycler users", "case studies"].join(", "),
    alternates: {
      canonical: `/${locale}/case-studies`,
      languages: {
        en: "/en/case-studies",
        zh: "/zh/case-studies",
        vi: "/vi/case-studies",
        "x-default": "/en/case-studies",
      },
    },
    openGraph: {
      title: isZh ? "客户案例 | NEWARE" : isVi ? "Khách hàng tiêu biểu | NEWARE" : "Customer Cases | NEWARE",
      description: isZh
        ? "MIT、比亚迪、宁德时代、斯坦福等标杆客户的真实测试案例"
        : isVi
        ? "Các trường hợp khách hàng tiêu biểu của NEWARE trên toàn thế giới"
        : "Real customer cases from MIT, BYD, CATL, Stanford and more",
      url: `${SITE_URL}/${locale}/case-studies`,
      siteName: "NEWARE",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "NEWARE Customer Case Studies" }],
      locale: isZh ? "zh_CN" : isVi ? "vi_VN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@newarebattery",
      creator: "@newarebattery",
      title: isZh ? "客户案例 | NEWARE" : isVi ? "Khách hàng tiêu biểu | NEWARE" : "Customer Cases | NEWARE",
      description: isZh
        ? "NEWARE标杆客户案例：MIT、比亚迪、宁德时代、斯坦福大学"
        : isVi
        ? "Các trường hợp khách hàng NEWARE: MIT, BYD, CATL, Stanford"
        : "NEWARE customer cases: MIT, BYD, CATL, Stanford University",
      images: [ogImage],
    },
  };
}

export default async function CaseStudiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <CaseStudiesClient locale={locale} />
    </NextIntlClientProvider>
  );
}
