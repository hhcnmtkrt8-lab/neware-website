import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import KnowledgeBasePage from "@/components/knowledge-base/KnowledgeBasePage";

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
        ? "技术支持知识库 — NEWARE 电池测试设备"
        : isVi
        ? "Cơ sở kiến thức hỗ trợ kỹ thuật — NEWARE"
        : "Technical Knowledge Base — NEWARE Battery Testing Equipment",
      template: "%s | NEWARE",
    },
    description: isZh
      ? "新威尔电池测试系统完整技术文档，包含 BTS4000/BTS9000 软件操作、测试工艺配置、数据分析方法和国际标准应用指南。涵盖电压电流设置、通道配置、能量回收操作等500+篇技术文章。"
      : isVi
      ? "Tài liệu kỹ thuật đầy đủ cho hệ thống kiểm tra pin NEWARE, bao gồm hướng dẫn vận hành BTS4000/BTS9000, cấu hình quy trình thử nghiệm, phương pháp phân tích dữ liệu."
      : "Complete technical documentation for Neware battery testing systems, covering BTS4000/BTS9000 software operation, test profile configuration, data analysis methods, and international standard application guides. 500+ technical articles.",
    keywords: isZh
      ? ["NEWARE知识库", "BTS9000教程", "BTS4000操作", "电池测试参数设置", "通道配置", "能量回收操作", "国际标准", "IEC61960", "IEC62660"].join(", ")
      : isVi
      ? ["NEWARE kiến thức", "hướng dẫn BTS9000", "vận hành BTS4000", "cấu hình pin", "thử nghiệm pin EV"].join(", ")
      : ["NEWARE knowledge base", "BTS9000 tutorial", "BTS4000 operation", "battery testing setup", "channel configuration", "IEC61960", "IEC62660"].join(", "),
    alternates: {
      canonical: `/${locale}/knowledge-base`,
      languages: {
        en: "/en/knowledge-base",
        zh: "/zh/knowledge-base",
        vi: "/vi/knowledge-base",
        "x-default": "/en/knowledge-base",
      },
    },
    openGraph: {
      title: isZh ? "技术支持知识库 | NEWARE" : isVi ? "Cơ sở kiến thức kỹ thuật | NEWARE" : "Technical Knowledge Base | NEWARE",
      description: isZh
        ? "500+篇技术文档，涵盖BTS4000/BTS9000软件操作、测试工艺配置、数据分析"
        : isVi
        ? "500+ tài liệu kỹ thuật bao gồm vận hành phần mềm và cấu hình thử nghiệm"
        : "500+ technical articles covering software operation and test configuration",
      url: `${SITE_URL}/${locale}/knowledge-base`,
      siteName: "NEWARE",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "NEWARE Technical Knowledge Base" }],
      locale: isZh ? "zh_CN" : isVi ? "vi_VN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@newarebattery",
      creator: "@newarebattery",
      title: isZh ? "技术支持知识库 | NEWARE" : isVi ? "Cơ sở kiến thức | NEWARE" : "Technical Knowledge Base | NEWARE",
      description: isZh
        ? "500+篇技术文档，覆盖BTS4000/BTS9000操作"
        : isVi
        ? "500+ tài liệu kỹ thuật NEWARE"
        : "500+ NEWARE technical articles",
      images: [ogImage],
    },
  };
}

export default async function KBLocalePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <KnowledgeBasePage />
    </NextIntlClientProvider>
  );
}
