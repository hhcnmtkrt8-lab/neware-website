import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { products, productRoutes } from "@/data/neware";
import ProductDetailClient from "./ProductDetailClient";
import { ProductJsonLd } from "@/components/seo/ProductJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

const SITE_URL = process.env.SITE_URL ?? "https://www.neware.com.cn";

const OG_IMAGES: Record<string, string> = {
  en: "/og-en.png",
  zh: "/og-zh.png",
  vi: "/og-vi.png",
};

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return { title: "Product Not Found" };

  const route = productRoutes.find((r) => r.id === product.routeId);
  const title = locale === "zh" ? product.name : product.nameEn;
  const description = locale === "zh" ? product.description : product.descriptionEn;
  const keywords = locale === "zh" ? product.keywords : product.keywordsEn;
  const ogImage = OG_IMAGES[locale] ?? "/og-en.png";

  return {
    title: {
      default: `${title} — NEWARE`,
      template: "%s | NEWARE",
    },
    description,
    keywords: [
      keywords,
      "NEWARE",
      "battery testing equipment",
      locale === "zh" ? "电池测试设备" : locale === "vi" ? "thiết bị thử nghiệm pin" : "battery cycler",
      locale === "zh" ? "电池检测设备" : locale === "vi" ? "máy thử nghiệm pin" : "battery testing system",
      product.voltage,
      product.current,
    ].join(", "),
    alternates: {
      canonical: `/${locale}/products/${id}`,
      languages: {
        en: `/en/products/${id}`,
        zh: `/zh/products/${id}`,
        vi: `/vi/products/${id}`,
        "x-default": `/en/products/${id}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "zh" ? "zh_CN" : locale === "vi" ? "vi_VN" : "en_US",
      siteName: "NEWARE",
      images: [
        {
          url: ogImage,
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
      images: [ogImage],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const product = products.find((p) => p.id === id);
  if (!product) {
    notFound();
  }

  const route = productRoutes.find((r) => r.id === product.routeId);
  const relatedProducts = products
    .filter((p) => p.routeId === product.routeId && p.id !== product.id)
    .slice(0, 3);

  const routeName = locale === "zh" ? route?.name : route?.nameEn;
  const productTitle = locale === "zh" ? product.name : product.nameEn;

  const breadcrumbItems = [
    { name: locale === "zh" ? "首页" : locale === "vi" ? "Trang chủ" : "Home", href: `${SITE_URL}/${locale}` },
    { name: locale === "zh" ? "产品中心" : locale === "vi" ? "Sản phẩm" : "Products", href: `${SITE_URL}/${locale}/products` },
    { name: routeName ?? "", href: `${SITE_URL}/${locale}/products?route=${route?.id}` },
    { name: productTitle, href: `${SITE_URL}/${locale}/products/${id}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <ProductJsonLd id={id} />
      <ProductDetailClient
        product={product}
        route={route}
        relatedProducts={relatedProducts}
        locale={locale}
      />
    </>
  );
}
