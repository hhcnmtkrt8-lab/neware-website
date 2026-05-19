import { setRequestLocale } from "next-intl/server";
import { getMessages } from "next-intl/server";
import { Metadata } from "next";
import { SolutionsClient } from "@/components/layout/SolutionsClient";

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
        ? "解决方案 — NEWARE 电池测试"
        : isVi
        ? "Giải pháp — NEWARE Thiết bị kiểm tra pin"
        : "Solutions — NEWARE Battery Testing",
      template: "%s | NEWARE",
    },
    description: isZh
      ? "为研发实验室、动力电池制造、电动汽车、储能系统和消费电子提供专业的电池测试解决方案。覆盖R&D、EV电池PACK测试、能量回馈等全场景。"
      : isVi
      ? "Giải pháp thử nghiệm pin chuyên nghiệp cho phòng thí nghiệm R&D, sản xuất pin EV, lưu trữ năng lượng và điện tử tiêu dùng."
      : "Professional battery testing solutions for R&D labs, EV battery manufacturing, energy storage systems, and consumer electronics. Full-scenario coverage from R&D to production.",
    keywords: isZh
      ? ["NEWARE解决方案", "电池测试方案", "EV电池测试", "储能测试", "研发实验室测试", "化成测试"].join(", ")
      : isVi
      ? ["NEWARE giải pháp", "thử nghiệm pin EV", "lưu trữ năng lượng", "R&D pin"].join(", ")
      : ["NEWARE solutions", "battery testing solution", "EV battery testing", "energy storage testing", "R&D lab testing", "formation testing"].join(", "),
    alternates: {
      canonical: `/${locale}/solutions`,
      languages: {
        en: "/en/solutions",
        zh: "/zh/solutions",
        vi: "/vi/solutions",
        "x-default": "/en/solutions",
      },
    },
    openGraph: {
      title: isZh ? "解决方案 | NEWARE" : isVi ? "Giải pháp | NEWARE" : "Solutions | NEWARE",
      description: isZh
        ? "覆盖R&D、EV电池PACK测试、能量回馈等全场景电池测试解决方案"
        : isVi
        ? "Giải pháp thử nghiệm pin toàn diện cho mọi kịch bản"
        : "Full-scenario battery testing solutions from R&D to production",
      url: `${SITE_URL}/${locale}/solutions`,
      siteName: "NEWARE",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "NEWARE Battery Testing Solutions" }],
      locale: isZh ? "zh_CN" : isVi ? "vi_VN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@newarebattery",
      creator: "@newarebattery",
      title: isZh ? "解决方案 | NEWARE" : isVi ? "Giải pháp | NEWARE" : "Solutions | NEWARE",
      description: isZh
        ? "NEWARE电池测试全场景解决方案"
        : isVi
        ? "Giải pháp thử nghiệm pin NEWARE"
        : "NEWARE full-scenario battery testing solutions",
      images: [ogImage],
    },
  };
}

export default async function SolutionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SolutionsClient locale={locale} />;
}
