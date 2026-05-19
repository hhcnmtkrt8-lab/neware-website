import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { WhyNewarePageClient } from "@/components/why-neware/WhyNewarePageClient";

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = process.env.SITE_URL ?? "https://www.neware.com.cn";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh";

  return {
    title: {
      default: isZh
        ? "为什么选择新威尔 — 行业领先的电池测试设备"
        : "Why Choose Neware — Industry-Leading Battery Testing Equipment",
      template: "%s | NEWARE",
    },
    description: isZh
      ? "26年专注电池测试设备制造，0.02%精度、1000Hz采样率、70%+能量回收、150+国家服务覆盖。了解新威尔如何在每一个核心指标上超越行业平均水平。"
      : "26 years of battery testing excellence. 0.02% accuracy, 1000Hz sampling, 70%+ energy recovery, 150+ countries. Discover how Neware leads in every core metric above the industry average.",
    keywords: ["NEWARE优势", "电池测试设备对比", "行业领先", "高精度电池测试", "battery testing comparison", "Neware vs competitors", "precision battery cycler"],
    alternates: {
      canonical: `${SITE_URL}/${locale}/why-neware`,
      languages: {
        en: `${SITE_URL}/en/why-neware`,
        zh: `${SITE_URL}/zh/why-neware`,
      },
    },
    openGraph: {
      title: isZh ? "为什么选择新威尔" : "Why Choose Neware",
      description: isZh
        ? "26年专注，0.02%精度，150+国家服务覆盖"
        : "26 years of excellence, 0.02% accuracy, 150+ countries served",
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: isZh ? "为什么选择新威尔" : "Why Choose Neware",
      description: isZh
        ? "26年专注，0.02%精度，150+国家服务覆盖"
        : "26 years of excellence, 0.02% accuracy, 150+ countries served",
    },
  };
}

export default async function WhyNewarePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <WhyNewarePageClient locale={locale} />;
}
