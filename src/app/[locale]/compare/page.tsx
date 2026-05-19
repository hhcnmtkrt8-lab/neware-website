import { setRequestLocale } from "next-intl/server";
import { getMessages } from "next-intl/server";
import { Metadata } from "next";
import { CompareClient } from "@/components/compare/CompareClient";
import { competitors } from "@/data/competitors";

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
        ? "新威尔 vs Arbin vs Maccor vs Bio-Logic | 电池测试仪对比 2024"
        : isVi
        ? "NEWARE vs Arbin vs Maccor vs Bio-Logic | So sánh thiết bị kiểm tra pin 2024"
        : "NEWARE vs Arbin vs Maccor vs Bio-Logic | Battery Tester Comparison 2024",
      template: "%s | NEWARE",
    },
    description: isZh
      ? "全面对比NEWARE与Arbin、Maccor、Bio-Logic电池测试设备的技术规格、功能特性和服务支持。NEWARE精度0.02%FS，采样率1000Hz，70%+能量回收。"
      : isVi
      ? "So sánh toàn diện thiết bị kiểm tra pin NEWARE với Arbin, Maccor, Bio-Logic. Độ chính xác 0,02% FS, tần số lấy mẫu 1000Hz, phục hồi năng lượng 70%+."
      : "Comprehensive comparison of NEWARE vs Arbin, Maccor, Bio-Logic battery testing equipment. 0.02% FS accuracy, 1000Hz sampling, 70%+ energy recovery. NEWARE serves 32,000+ clients in 150+ countries.",
    keywords: isZh
      ? ["NEWARE对比", "电池测试仪对比", "Arbin对比", "Maccor对比", "Bio-Logic对比", "电池测试设备比较", "NEWARE优势"].join(", ")
      : isVi
      ? ["NEWARE so sánh", "so sánh thiết bị kiểm tra pin", "Arbin so sánh", "Maccor so sánh", "Bio-Logic so sánh", "thiết bị kiểm tra pin tốt nhất"].join(", ")
      : ["NEWARE comparison", "battery tester comparison", "Arbin vs NEWARE", "Maccor vs NEWARE", "Bio-Logic vs NEWARE", "best battery testing equipment", "battery cycler comparison"].join(", "),
    alternates: {
      canonical: `/${locale}/compare`,
      languages: {
        en: "/en/compare",
        zh: "/zh/compare",
        vi: "/vi/compare",
        "x-default": "/en/compare",
      },
    },
    openGraph: {
      title: isZh ? "电池测试仪对比 | NEWARE" : isVi ? "So sánh thiết bị kiểm tra pin | NEWARE" : "Battery Tester Comparison | NEWARE",
      description: isZh
        ? "NEWARE与Arbin、Maccor、Bio-Logic全面对比。精度、采样率、服务对比。"
        : isVi
        ? "So sánh NEWARE với Arbin, Maccor, Bio-Logic. Độ chính xác, tần số lấy mẫu, dịch vụ."
        : "NEWARE vs Arbin, Maccor, Bio-Logic comparison. Accuracy, sampling rate, service comparison.",
      url: `${SITE_URL}/${locale}/compare`,
      siteName: "NEWARE",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "NEWARE — Battery Tester Comparison" }],
      locale: isZh ? "zh_CN" : isVi ? "vi_VN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@newarebattery",
      creator: "@newarebattery",
      title: isZh ? "电池测试仪对比 | NEWARE" : isVi ? "So sánh thiết bị kiểm tra pin | NEWARE" : "Battery Tester Comparison | NEWARE",
      description: isZh
        ? "NEWARE与Arbin、Maccor、Bio-Logic全面对比"
        : isVi
        ? "So sánh NEWARE với Arbin, Maccor, Bio-Logic"
        : "NEWARE vs Arbin, Maccor, Bio-Logic comparison",
      images: [ogImage],
    },
  };
}

export default async function ComparePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return <CompareClient competitors={competitors} locale={locale} messages={messages} />;
}
