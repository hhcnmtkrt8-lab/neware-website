import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import DownloadsClient from "./DownloadsClient";

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
      default: isZh ? "下载中心" : isVi ? "Trung tâm tải xuống" : "Download Center",
      template: "%s | NEWARE",
    },
    description: isZh
      ? "免费下载 NEWARE BTS 电池测试系统软件、产品手册、技术目录和 ISO9001/CE 资质证书。最新 BTS9.0/BTS8.0 软件版本。"
      : isVi
      ? "Tải miễn phí phần mềm BTS, sổ tay sản phẩm, danh mục kỹ thuật và chứng nhận ISO9001/CE. Phiên bản BTS9.0/BTS8.0 mới nhất."
      : "Download free NEWARE BTS battery testing system software, product manuals, technical catalogs, and ISO9001/CE certificates. Latest BTS9.0/BTS8.0 software versions.",
    keywords: isZh
      ? ["NEWARE下载", "BTS软件", "BTS9000软件", "产品手册", "证书下载", "ISO9001", "CE认证"].join(", ")
      : isVi
      ? ["NEWARE tải về", "phần mềm BTS", "sổ tay sản phẩm", "chứng nhận ISO9001"].join(", ")
      : ["NEWARE download", "BTS software", "BTS9000 software", "product manual", "certificate download", "ISO9001", "CE certified"].join(", "),
    alternates: {
      canonical: `/${locale}/downloads`,
      languages: {
        en: "/en/downloads",
        zh: "/zh/downloads",
        vi: "/vi/downloads",
        "x-default": "/en/downloads",
      },
    },
    openGraph: {
      title: isZh ? "下载中心 | NEWARE" : isVi ? "Tải xuống | NEWARE" : "Download Center | NEWARE",
      description: isZh
        ? "免费下载BTS软件、手册和技术证书"
        : isVi
        ? "Tải miễn phí phần mềm BTS, sổ tay và chứng nhận"
        : "Download BTS software, manuals and certificates for free",
      url: `${SITE_URL}/${locale}/downloads`,
      siteName: "NEWARE",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "NEWARE Download Center" }],
      locale: isZh ? "zh_CN" : isVi ? "vi_VN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@newarebattery",
      creator: "@newarebattery",
      title: isZh ? "下载中心 | NEWARE" : isVi ? "Tải xuống | NEWARE" : "Download Center | NEWARE",
      description: isZh
        ? "免费下载NEWARE BTS软件、手册和技术证书"
        : isVi
        ? "Tải miễn phí NEWARE BTS"
        : "Free NEWARE BTS software, manuals and certificates download",
      images: [ogImage],
    },
  };
}

export default async function DownloadsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <DownloadsClient />;
}
