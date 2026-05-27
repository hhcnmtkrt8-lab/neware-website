import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/floating/FloatingContact";
import { AIChatbot } from "@/components/ai/AIChatbot";
import { WebVitals } from "@/components/performance/WebVitals";
import { PerformanceOptimizations } from "@/components/performance/PerformanceOptimizations";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { WebsiteJsonLd } from "@/components/seo/ProductJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { FaqPageJsonLd } from "@/components/seo/FaqPageJsonLd";
import { ReviewsJsonLd } from "@/components/seo/ReviewsJsonLd";
import { HowToJsonLd } from "@/components/seo/HowToJsonLd";
import { ExitIntentPopup } from "@/components/ui/ExitIntentPopup";
import { locales } from "@/i18n/request";
import "../globals.css";

/**
 * Google Search Console Verification:
 * To verify your site in Google Search Console:
 * 1. Go to https://search.google.com/search-console
 * 2. Add your property (domain or URL prefix)
 * 3. Choose "HTML tag" verification method
 * 4. Copy the meta tag content (the "content" value from the tag)
 * 5. Set the environment variable NEXT_PUBLIC_GSC_VERIFICATION in .env.local:
 *    NEXT_PUBLIC_GSC_VERIFICATION="your-verification-token"
 * 6. Uncomment the line below and remove this comment
 */
// Uncomment after adding real verification token to .env.local:
// {process.env.NEXT_PUBLIC_GSC_VERIFICATION && (
//   <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GSC_VERIFICATION} />
// )}

/**
 * Bing Webmaster Verification:
 * To verify your site in Bing Webmaster:
 * 1. Go to https://www.bing.com/webmasters
 * 2. Add your site
 * 3. Choose "HTML tag" verification method
 * 4. Set NEXT_PUBLIC_BING_VERIFICATION in .env.local
 */
// {process.env.NEXT_PUBLIC_BING_VERIFICATION && (
//   <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_VERIFICATION} />
// )}

/**
 * Google Analytics 4 (GA4) Setup:
 * 1. Create a GA4 property in Google Analytics
 * 2. Get your Measurement ID (G-XXXXXXXXXX)
 * 3. Set NEXT_PUBLIC_GA_ID in .env.local
 * 4. Uncomment the script below and add your ID
 */
// {process.env.NEXT_PUBLIC_GA_ID && (
//   <>
//     <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
//     <script
//       dangerouslySetInnerHTML={{
//         __html: `
//           window.dataLayer = window.dataLayer || [];
//           function gtag(){dataLayer.push(arguments);}
//           gtag('js', new Date());
//           gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
//         `,
//       }}
//     />
//   </>
// )}

const SITE_URL = process.env.SITE_URL ?? "https://www.neware.com.cn";

// Locale-specific OG images
const OG_IMAGES: Record<string, { url: string; width: number; height: number; alt: string }> = {
  zh: { url: "/og-zh.png", width: 1200, height: 630, alt: "NEWARE — 精密电池测试设备制造专家，始于1998年" },
  en: { url: "/og-en.png", width: 1200, height: 630, alt: "NEWARE — Precision Battery Testing Equipment Since 1998" },
  vi: { url: "/og-vi.png", width: 1200, height: 630, alt: "NEWARE — Thiết bị kiểm tra pin chính xác cao từ 1998" },
  ru: { url: "/og-en.png", width: 1200, height: 630, alt: "NEWARE — Производитель прецизионного оборудования для тестирования аккумуляторов с 1998 года" },
};

const OG_LOCALES: Record<string, string> = {
  zh: "zh_CN",
  en: "en_US",
  vi: "vi_VN",
  ru: "ru_RU",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh";
  const isVi = locale === "vi";
  const ogImage = OG_IMAGES[locale] ?? OG_IMAGES.en;

  return {
    title: {
      default: isZh
        ? "NEWARE — 精密电池测试设备制造专家"
        : isVi
        ? "NEWARE — Thiết bị kiểm tra pin chính xác cao từ 1998"
        : "NEWARE — Precision Battery Testing Equipment Manufacturer",
      template: "%s | NEWARE",
    },
    description: isZh
      ? "新威尔(NEWARE)始于1998年，专注高精度电池测试设备制造，服务全球32000+客户，150+国家。主营CT-4000、CT-9000(BTS9000)、CE-6000等电池充放电测试系统。"
      : isVi
      ? "NEWARE — nhà sản xuất thiết bị kiểm tra pin chính xác cao hàng đầu thế giới từ năm 1998. Độ chính xác 0,02%, tần số lấy mẫu 1000Hz, phục hồi năng lượng 70%+. Phục vụ hơn 32.000 khách hàng tại 150+ quốc gia."
      : "NEWARE — world-leading battery testing equipment provider since 1998. 0.02% accuracy, 1000Hz sampling, 70%+ energy recovery. Serving 32,000+ clients in 150+ countries. CT-4000, BTS9000, CE-6000 battery cyclers.",
    keywords: isZh
      ? ["新威尔", "NEWARE", "电池测试设备", "电池充放电测试", "BTS9000", "CT-4000", "CE-6000", "高精度电池测试仪", "EV电池测试", "储能测试"].join(", ")
      : isVi
      ? ["NEWARE", "thiết bị kiểm tra pin", "máy kiểm tra pin", "BTS9000", "CT-4000", "CE-6000", "máy kiểm tra pin chính xác cao", "kiểm tra pin EV", "phục hồi năng lượng", "định hình pin"].join(", ")
      : ["NEWARE", "battery testing equipment", "battery cycler", "BTS9000", "CT-4000", "CE-6000", "high precision battery tester", "EV battery cycler", "energy recovery", "battery formation"].join(", "),
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        zh: "/zh",
        vi: "/vi",
        "x-default": "/en",
      },
    },
    openGraph: {
      title: isZh ? "NEWARE — 精密电池测试设备" : isVi ? "NEWARE — Thiết bị kiểm tra pin chính xác cao" : "NEWARE — Precision Battery Testing Equipment",
      description: isZh
        ? "新威尔始于1998年，0.02%精度，1000Hz采样率，服务全球32000+客户，覆盖150+国家。"
        : isVi
        ? "NEWARE từ năm 1998. Độ chính xác 0,02%, tần số lấy mẫu 1000Hz, hơn 32.000 khách hàng toàn cầu."
        : "NEWARE since 1998. 0.02% accuracy, 1000Hz sampling, 32,000+ clients, 150+ countries.",
      url: `${SITE_URL}/${locale}`,
      siteName: "NEWARE",
      images: [
        {
          url: ogImage.url,
          width: ogImage.width,
          height: ogImage.height,
          alt: ogImage.alt,
        },
      ],
      locale: OG_LOCALES[locale] ?? "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@newarebattery",
      creator: "@newarebattery",
      title: isZh ? "NEWARE — 精密电池测试设备" : isVi ? "NEWARE — Thiết bị kiểm tra pin chính xác cao" : "NEWARE — Precision Battery Testing Equipment",
      description: isZh
        ? "始于1998年，0.02%精度，1000Hz采样率，服务全球32000+客户"
        : isVi
        ? "NEWARE từ 1998. Độ chính xác 0,02%, tần số lấy mẫu 1000Hz, hơn 32.000 khách hàng toàn cầu."
        : "Since 1998. 0.02% accuracy, 1000Hz sampling, 32,000+ global clients",
      images: [ogImage.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION ?? "google-site-verification-code-placeholder",
    },
  };
}

// This layout provides the page shell — it renders inside RootLayout's <body>
// No <html> or <body> tags here; RootLayout owns those.
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as "vi" | "en" | "zh" | "ru")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const fontFamily = locale === "zh"
    ? "'Inter', 'Noto Sans SC', sans-serif"
    : "'Inter', sans-serif";

  // Locale-specific Google Font stylesheet
  const fontHref = locale === "zh"
    ? "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;600;700&display=swap"
    : "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap";

  return (
    <>
      {/* Performance head optimizations */}
      <PerformanceOptimizations />

      {/* Google Fonts — rendered as head element from server component */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={fontHref} />
      <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/logo.svg" />
      {/* Hreflang x-default for international visitors */}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/en`} />
      <link rel="alternate" hrefLang="zh" href={`${SITE_URL}/zh`} />
      <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en`} />
      <link rel="alternate" hrefLang="vi" href={`${SITE_URL}/vi`} />
      <link rel="alternate" hrefLang="ru" href={`${SITE_URL}/ru`} />

      {/* SEO JSON-LD schemas */}
      <OrganizationJsonLd />
      <WebsiteJsonLd />
      <FaqJsonLd />
      <FaqPageJsonLd />
      <ReviewsJsonLd />
      <HowToJsonLd />

      {/* Page shell — NextIntlClientProvider must wrap ALL components
          that call useTranslations() (Navbar, Footer, etc.) */}
      <NextIntlClientProvider messages={messages}>
        <div
          className="antialiased min-h-screen flex flex-col"
          style={{ fontFamily }}
        >
          <Navbar />
          <main id="main-content" aria-label="Main content">
            {children}
          </main>
          <Footer />
          <FloatingContact />
          <AIChatbot />
          <ExitIntentPopup />
          <WebVitals />
        </div>
      </NextIntlClientProvider>
    </>
  );
}
