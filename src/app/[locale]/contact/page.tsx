import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { getProducts } from "@/lib/get-products";
import ContactPageClient from "./ContactPageClient";

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
        ? "联系我们 — NEWARE 电池测试设备"
        : isVi
        ? "Liên hệ — NEWARE Thiết bị kiểm tra pin"
        : "Contact Us — NEWARE Battery Testing Equipment",
      template: "%s | NEWARE",
    },
    description: isZh
      ? "联系深圳市新威尔电子有限公司，获取电池测试设备报价和技术咨询。我们的销售工程师将在24小时内与您联系。支持从扣式电池测试仪到EV动力电池系统的全系列设备咨询。"
      : isVi
      ? "Liên hệ Công ty TNHH Điện tử Neware Thâm Quyến để được tư vấn về thiết bị thử nghiệm pin. Kỹ sư bán hàng sẽ phản hồi trong 24 giờ."
      : "Contact Shenzhen Neware Electronics for battery testing equipment quotes and technical consultation. Our sales engineers will respond within 24 hours. Full product range from coin cell testers to EV battery systems.",
    keywords: isZh
      ? ["NEWARE联系方式", "电池测试设备报价", "技术咨询", "销售工程师", "产品咨询"].join(", ")
      : isVi
      ? ["NEWARE liên hệ", "báo giá thiết bị thử nghiệm pin", "tư vấn kỹ thuật", "kỹ sư bán hàng"].join(", ")
      : ["NEWARE contact", "battery testing equipment quote", "technical consultation", "sales engineer", "product inquiry"].join(", "),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        en: "/en/contact",
        zh: "/zh/contact",
        vi: "/vi/contact",
        "x-default": "/en/contact",
      },
    },
    openGraph: {
      title: isZh ? "联系我们 | NEWARE" : isVi ? "Liên hệ | NEWARE" : "Contact Us | NEWARE",
      description: isZh
        ? "获取NEWARE电池测试设备报价，24小时内响应"
        : isVi
        ? "NEWARE liên hệ, phản hồi trong 24 giờ"
        : "NEWARE contact — response within 24 hours",
      url: `${SITE_URL}/${locale}/contact`,
      siteName: "NEWARE",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "Contact NEWARE" }],
      locale: isZh ? "zh_CN" : isVi ? "vi_VN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@newarebattery",
      creator: "@newarebattery",
      title: isZh ? "联系我们 | NEWARE" : isVi ? "Liên hệ | NEWARE" : "Contact Us | NEWARE",
      description: isZh
        ? "NEWARE电池测试设备报价咨询，24小时内响应"
        : isVi
        ? "NEWARE liên hệ tư vấn, phản hồi 24h"
        : "NEWARE contact — quotes & consultation",
      images: [ogImage],
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const products = await getProducts();
  return <ContactPageClient locale={locale} products={products} />;
}
