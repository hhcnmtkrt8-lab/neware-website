import { setRequestLocale } from "next-intl/server";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";
import BlogPostClient from "./BlogPostClient";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const SITE_URL = process.env.SITE_URL ?? "https://www.neware.com.cn";

const OG_IMAGES: Record<string, string> = {
  en: "/og-en.png",
  zh: "/og-zh.png",
  vi: "/og-vi.png",
};

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };

  const isZh = locale === "zh";
  const isVi = locale === "vi";
  const ogImage = OG_IMAGES[locale] ?? "/og-en.png";
  const title = isZh ? post.title : post.titleEn;
  const description = isZh ? post.summary : post.summaryEn;

  // Map category based on locale
  const categoryMap: Record<string, Record<string, string>> = {
    "Product Guides": { zh: "产品指南", vi: "Hướng dẫn sản phẩm", en: "Product Guides" },
    "Technical Deep Dives": { zh: "技术深度解读", vi: "Phân tích kỹ thuật", en: "Technical Deep Dives" },
  };
  const rawCategory = post.categoryEn || post.category;
  const category = categoryMap[rawCategory]?.[locale] ?? rawCategory ?? "";

  return {
    title: {
      default: title,
      template: "%s | NEWARE",
    },
    description,
    keywords: (isZh ? post.tags : post.tagsEn).join(", "),
    authors: [{ name: isZh ? post.author : post.authorEn }],
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: {
        en: `/en/blog/${slug}`,
        zh: `/zh/blog/${slug}`,
        vi: `/vi/blog/${slug}`,
        "x-default": `/en/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/blog/${slug}`,
      siteName: "NEWARE",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: isZh ? "zh_CN" : isVi ? "vi_VN" : "en_US",
      type: "article",
      publishedTime: post.date,
      authors: [isZh ? post.author : post.authorEn],
      tags: isZh ? post.tags : post.tagsEn,
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

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <>
      <ArticleJsonLd post={post} locale={locale} siteUrl={SITE_URL} />
      <NextIntlClientProvider messages={messages}>
        <BlogPostClient post={post} locale={locale} />
      </NextIntlClientProvider>
    </>
  );
}
