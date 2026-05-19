import { setRequestLocale } from "next-intl/server";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Metadata } from "next";
import BlogClient from "./BlogClient";

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
        ? "技术博客 — NEWARE 电池测试"
        : isVi
        ? "Blog kỹ thuật — Thiết bị kiểm tra pin NEWARE"
        : "Technical Blog — NEWARE Battery Testing",
      template: "%s | NEWARE",
    },
    description: isZh
      ? "深入了解电池测试技术、充放电曲线分析、EV动力电池测试方法和工况模拟。专业的新威尔技术团队博客，覆盖500+技术文章。"
      : isVi
      ? "Tìm hiểu sâu về công nghệ thử nghiệm pin, phân tích đường cong sạc/xả, phương pháp thử nghiệm pin EV và mô phỏng lái xe. Blog kỹ thuật từ đội ngũ NEWARE."
      : "In-depth knowledge on battery testing technology, charge/discharge curve analysis, EV battery testing methods, and drive cycle simulation. Technical blog by the NEWARE team covering 500+ articles.",
    keywords: isZh
      ? ["电池测试博客", "充放电曲线分析", "EV电池测试", "工况模拟", "DCIR测试", "化成测试", "NEWARE技术"].join(", ")
      : isVi
      ? ["blog thử nghiệm pin", "phân tích đường cong sạc xả", "thử nghiệm pin EV", "mô phỏng lái xe", "NEWARE kỹ thuật"].join(", ")
      : ["battery testing blog", "charge/discharge curves", "EV battery testing", "drive cycle simulation", "DCIR test", "formation testing", "NEWARE technical"].join(", "),
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        en: "/en/blog",
        zh: "/zh/blog",
        vi: "/vi/blog",
        "x-default": "/en/blog",
      },
    },
    openGraph: {
      title: isZh ? "技术博客 | NEWARE" : isVi ? "Blog kỹ thuật | NEWARE" : "Technical Blog | NEWARE",
      description: isZh
        ? "电池测试技术博客，含充放电曲线分析、EV测试、DCIR测量等500+篇文章"
        : isVi
        ? "Blog kỹ thuật thử nghiệm pin với 500+ bài viết"
        : "Battery testing technical blog with 500+ articles on curves, EV testing, DCIR",
      url: `${SITE_URL}/${locale}/blog`,
      siteName: "NEWARE",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "NEWARE Technical Blog" }],
      locale: isZh ? "zh_CN" : isVi ? "vi_VN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@newarebattery",
      creator: "@newarebattery",
      title: isZh ? "技术博客 | NEWARE" : isVi ? "Blog kỹ thuật | NEWARE" : "Technical Blog | NEWARE",
      description: isZh
        ? "NEWARE电池测试技术博客，含500+篇技术文章"
        : isVi
        ? "Blog kỹ thuật NEWARE với 500+ bài viết"
        : "NEWARE battery testing blog with 500+ technical articles",
      images: [ogImage],
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <BlogClient locale={locale} />
    </NextIntlClientProvider>
  );
}
