import type { Metadata } from "next";
import "./globals.css";
import { locales } from "@/i18n/request";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.SITE_URL ?? "https://www.neware.com.cn"
  ),
  title: {
    template: "%s | NEWARE — Battery Testing Equipment",
    default: "NEWARE — Precision Battery Testing Equipment Since 1998",
  },
  description:
    "NEWARE is a leading manufacturer of battery testing equipment since 1998. From 1mA coin cell testers to 3000A EV battery cyclers. Trusted by 26,000+ customers worldwide including MIT, Tesla, CATL, LG, Samsung SDI.",
  keywords: [
    "battery testing equipment",
    "battery cycler",
    "EV battery tester",
    "battery charge discharge",
    "Neware",
    "电池测试设备",
    "电池充放电测试",
    "动力电池测试",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "zh_CN",
    siteName: "NEWARE",
    title: "NEWARE — Precision Battery Testing Equipment Since 1998",
    description:
      "Leading manufacturer of battery testing equipment since 1998. From 1mA coin cell testers to 3000A EV battery cyclers.",
    images: [
      {
        url: "/og-en.png",
        width: 1200,
        height: 630,
        alt: "NEWARE — Precision Battery Testing Equipment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEWARE — Precision Battery Testing Equipment Since 1998",
    description: "Leading manufacturer of battery testing equipment since 1998.",
    images: ["/og-en.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const LOCALE_HTML_LANG: Record<string, string> = {
  zh: "zh-CN",
  en: "en-US",
  vi: "vi-VN",
  ru: "ru-RU",
};

const LOCALE_DIR: Record<string, string> = {
  zh: "ltr",
  en: "ltr",
  vi: "ltr",
  ru: "ltr",
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const htmlLang = LOCALE_HTML_LANG[locale] ?? "en-US";
  const dir = LOCALE_DIR[locale] ?? "ltr";

  return (
    <html lang={htmlLang} dir={dir}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5FEFQ86GX5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5FEFQ86GX5');
          `}
        </Script>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
