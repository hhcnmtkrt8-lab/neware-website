import { setRequestLocale } from "next-intl/server";
import { getMessages } from "next-intl/server";
import { Metadata } from "next";
import { AboutClient } from "@/components/layout/AboutClient";

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
        ? "关于我们 — NEWARE 电池测试设备"
        : isVi
        ? "Về chúng tôi — NEWARE Thiết bị kiểm tra pin"
        : isRu
        ? "О нас — NEWARE Оборудование для тестирования аккумуляторов"
        : "About Us — NEWARE Battery Testing Equipment",
      template: "%s | NEWARE",
    },
    description: isZh
      ? "深圳市新威尔电子有限公司成立于1998年，专注电池测试设备26年，服务全球32000+客户，覆盖150+国家。公司总部位于深圳，在美国、香港、印度、韩国设有分支机构和代理商。"
      : isVi
      ? "Công ty TNHH Điện tử Neware Thâm Quyến được thành lập năm 1998, chuyên về thiết bị thử nghiệm pin trong 26 năm, phục vụ hơn 32.000 khách hàng tại 150+ quốc gia."
      : isRu
      ? "Shenzhen Neware Electronics Co., Ltd. основана в 1998 году. 26 лет специализации в области оборудования для тестирования аккумуляторов, более 32 000 клиентов по всему миру в 150+ странах."
      : "Shenzhen Neware Electronics Co., Ltd. founded in 1998. 26 years specializing in battery testing equipment, serving 32,000+ global customers across 150+ countries. HQ in Shenzhen with offices in USA, Hong Kong, India, Korea.",
    keywords: isZh
      ? ["NEWARE", "新威尔", "关于我们", "公司介绍", "电池测试设备厂家", "深圳新威尔", "1998年成立"].join(", ")
      : isVi
      ? ["NEWARE", "về chúng tôi", "công ty pin thử nghiệm", "Thâm Quyến", "thành lập 1998"].join(", ")
      : isRu
      ? ["NEWARE", "о нас", "производитель оборудования для тестирования аккумуляторов", "Шэньчжэнь", "основана 1998"].join(", ")
      : ["NEWARE", "about us", "battery testing equipment manufacturer", "Shenzhen Neware", "founded 1998", "battery cycler company"].join(", "),
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        en: "/en/about",
        zh: "/zh/about",
        vi: "/vi/about",
        ru: "/ru/about",
        "x-default": "/en/about",
      },
    },
    openGraph: {
      title: isZh ? "关于我们 | NEWARE" : isVi ? "Về chúng tôi | NEWARE" : isRu ? "О нас | NEWARE" : "About Us | NEWARE",
      description: isZh
        ? "深圳市新威尔电子有限公司成立于1998年，专注电池测试设备26年，服务全球32000+客户"
        : isVi
        ? "NEWARE thành lập 1998, 26 năm kinh nghiệm, 32.000+ khách hàng toàn cầu"
        : isRu
        ? "NEWARE основана в 1998 году. 26 лет опыта, более 32 000 клиентов по всему миру"
        : "NEWARE founded 1998. 26 years experience, 32,000+ global clients",
      url: `${SITE_URL}/${locale}/about`,
      siteName: "NEWARE",
      images: [{ url: ogImage, width: 1200, height: 630, alt: isZh ? "关于我们 | NEWARE" : isVi ? "Về chúng tôi | NEWARE" : isRu ? "О нас | NEWARE" : "About Us | NEWARE" }],
      locale: isZh ? "zh_CN" : isVi ? "vi_VN" : isRu ? "ru_RU" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@newarebattery",
      creator: "@newarebattery",
      title: isZh ? "关于我们 | NEWARE" : isVi ? "Về chúng tôi | NEWARE" : isRu ? "О нас | NEWARE" : "About Us | NEWARE",
      description: isZh
        ? "26年专注电池测试设备，全球32000+客户，150+国家服务覆盖"
        : isVi
        ? "26 năm kinh nghiệm, 32.000+ khách hàng, 150+ quốc gia"
        : isRu
        ? "26 лет опыта, более 32 000 клиентов, 150+ стран"
        : "26 years experience, 32,000+ clients, 150+ countries",
      images: [ogImage],
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutClient locale={locale} />;
}
