import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { Metadata } from "next";
import { getProducts, productRoutes } from "@/lib/get-products";
import ProductsClient from "./ProductsClient";

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
        ? "产品中心 — NEWARE 电池测试设备"
        : isVi
        ? "Sản phẩm — Thiết bị kiểm tra pin NEWARE"
        : "Products — NEWARE Battery Testing Equipment",
      template: "%s | NEWARE",
    },
    description: isZh
      ? "从1mA扣式电池测试仪到3000A动力电池测试系统，NEWARE提供覆盖所有电池化学体系和形态的全系列产品，满足研发、动力电池制造和储能系统的测试需求。"
      : isVi
      ? "Từ máy thử pin cúc áo 1mA đến hệ thống thử nghiệm pin EV 3000A, NEWARE cung cấp đầy đủ các dòng sản phẩm phủ mọi hóa học và hình dạng pin."
      : "From 1mA coin cell testers to 3000A EV battery cyclers, NEWARE offers a full range of products covering all battery chemistries and form factors for R&D, EV battery manufacturing, and energy storage.",
    keywords: isZh
      ? ["NEWARE", "电池测试设备", "电池充放电测试", "BTS9000", "CT-4000", "CE-6000", "电池检测仪", "EV电池测试"].join(", ")
      : isVi
      ? ["NEWARE", "thiết bị kiểm tra pin", "máy thử pin", "BTS9000", "CT-4000", "CE-6000", "máy thử pin EV"].join(", ")
      : ["NEWARE battery testing", "battery cycler", "BTS9000", "CT-4000", "CE-6000", "EV battery tester", "battery charge discharge"].join(", "),
    alternates: {
      canonical: `/${locale}/products`,
      languages: {
        en: "/en/products",
        zh: "/zh/products",
        vi: "/vi/products",
        "x-default": "/en/products",
      },
    },
    openGraph: {
      title: isZh ? "产品中心 — NEWARE" : isVi ? "Sản phẩm — NEWARE" : "Products — NEWARE",
      description: isZh
        ? "从扣式电池到EV动力电池，NEWARE提供500+型号，覆盖所有测试需求"
        : isVi
        ? "Từ pin cúc áo đến pin EV, NEWARE cung cấp 500+ model phủ mọi nhu cầu thử nghiệm"
        : "From coin cells to EV batteries, NEWARE offers 500+ models covering all testing needs",
      url: `${SITE_URL}/${locale}/products`,
      siteName: "NEWARE",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "NEWARE Battery Testing Equipment Products" }],
      locale: isZh ? "zh_CN" : isVi ? "vi_VN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@newarebattery",
      creator: "@newarebattery",
      title: isZh ? "产品中心 — NEWARE 电池测试设备" : isVi ? "Sản phẩm — NEWARE" : "Products — NEWARE Battery Testing Equipment",
      description: isZh
        ? "从扣式电池到EV动力电池，NEWARE提供500+型号"
        : isVi
        ? "NEWARE cung cấp 500+ model pin thử nghiệm"
        : "From coin cells to EV batteries — 500+ models available",
      images: [ogImage],
    },
  };
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [products, routes] = await Promise.all([getProducts(), Promise.resolve(productRoutes)]);

  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <ProductsClient products={products} routes={routes} locale={locale} />
    </Suspense>
  );
}
