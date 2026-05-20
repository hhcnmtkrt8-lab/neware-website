import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { vietnamProducts, vietnamProductRoutes, vietnamSeoKeywords } from "@/data/neware-vietnam";
import { locales } from "@/i18n/request";
import ResistorDetailClient from "./ResistorDetailClient";

const SITE_URL = process.env.SITE_URL ?? "https://neware.vn";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export function generateStaticParams() {
  const params: { locale: string; id: string }[] = [];
  for (const locale of locales) {
    for (const p of vietnamProducts) {
      params.push({ locale, id: p.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const product = vietnamProducts.find((p) => p.id === id);
  if (!product) return { title: "Product Not Found" };

  const route = vietnamProductRoutes.find((r) => r.id === product.routeId);
  const isVi = locale === "vi";
  const title = isVi ? product.name : product.nameEn;
  const description = isVi ? product.description : product.descriptionEn;

  return {
    title: {
      default: `${title} — NEWARE Vietnam`,
      template: "%s | NEWARE Vietnam",
    },
    description,
    keywords: isVi ? product.keywords : product.keywordsEn,
    alternates: {
      canonical: `${SITE_URL}/${locale}/resistors/${id}`,
      languages: {
        en: `${SITE_URL}/en/resistors/${id}`,
        zh: `${SITE_URL}/zh/resistors/${id}`,
        vi: `${SITE_URL}/vi/resistors/${id}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: isVi ? "vi_VN" : "en_US",
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.svg"],
    },
  };
}

export default async function ResistorDetailPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const product = vietnamProducts.find((p) => p.id === id);
  if (!product) {
    notFound();
  }

  const route = vietnamProductRoutes.find((r) => r.id === product.routeId);
  const relatedProducts = vietnamProducts
    .filter((p) => p.routeId === product.routeId && p.id !== product.id)
    .slice(0, 3);

  const isVi = locale === "vi";
  const routeName = isVi ? route?.name ?? "" : route?.nameEn ?? "";
  const productTitle = isVi ? product.name : product.nameEn;

  const breadcrumbItems = [
    { name: isVi ? "Trang chủ" : "Home", href: `${SITE_URL}/${locale}` },
    { name: isVi ? "Điện trở công nghiệp" : "Industrial Resistors", href: `${SITE_URL}/${locale}/resistors` },
    { name: routeName, href: `${SITE_URL}/${locale}/resistors?route=${route?.id}` },
    { name: productTitle, href: `${SITE_URL}/${locale}/resistors/${id}` },
  ];

  return (
    <ResistorDetailClient
      product={product}
      route={route}
      relatedProducts={relatedProducts}
      locale={locale}
      breadcrumbItems={breadcrumbItems}
      siteUrl={SITE_URL}
    />
  );
}
