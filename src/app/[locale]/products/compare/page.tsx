import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { products } from "@/data/neware";
import ProductCompareClient from "./ProductCompareClient";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ ids?: string }>;
};

const SITE_URL = process.env.SITE_URL ?? "https://www.neware.com.cn";

const FLAGSHIP_PRODUCTS = [
  "bts4000-5v100a",
  "bts9000-5v5a-4ch",
  "ce6000-5v100a",
  "ct8000-10v50a",
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh";
  const isVi = locale === "vi";

  const title = isZh
    ? "产品对比 — NEWARE 电池测试设备"
    : isVi
    ? "So sánh sản phẩm — Thiết bị kiểm tra pin NEWARE"
    : "Product Comparison — NEWARE Battery Testing Equipment";

  const description = isZh
    ? "对比 NEWARE CT-4000、BTS9000、CE-6000、CTE-8000 系列电池测试设备的详细规格参数"
    : isVi
    ? "So sánh chi tiết các thông số kỹ thuật của các dòng thiết bị kiểm tra pin NEWARE CT-4000, BTS9000, CE-6000, CTE-8000"
    : "Compare detailed specifications of NEWARE CT-4000, BTS9000, CE-6000, CTE-8000 battery testing equipment series";

  return {
    title: {
      default: title,
      template: "%s | NEWARE",
    },
    description,
    keywords: isZh
      ? ["NEWARE", "产品对比", "电池测试设备", "CT-4000", "BTS9000", "CE-6000", "规格对比"].join(", ")
      : ["NEWARE", "product comparison", "battery tester", "CT-4000", "BTS9000", "CE-6000", "specs comparison"].join(", "),
    alternates: {
      canonical: `/${locale}/products/compare`,
      languages: {
        en: "/en/products/compare",
        zh: "/zh/products/compare",
        vi: "/vi/products/compare",
        "x-default": "/en/products/compare",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: isZh ? "zh_CN" : isVi ? "vi_VN" : "en_US",
      siteName: "NEWARE",
      images: [
        {
          url: isZh ? "/og-zh.png" : isVi ? "/og-vi.png" : "/og-en.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@newarebattery",
      creator: "@newarebattery",
      title,
      description,
    },
  };
}

export default async function ProductComparePage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { ids } = await searchParams;
  setRequestLocale(locale);

  let selectedProducts;

  if (ids) {
    const productIds = ids.split(",").filter(Boolean);
    selectedProducts = products.filter((p) => productIds.includes(p.id));
  } else {
    selectedProducts = products.filter((p) => FLAGSHIP_PRODUCTS.includes(p.id));
  }

  return <ProductCompareClient products={selectedProducts} locale={locale} />;
}
