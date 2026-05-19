"use client";

import { BlogPost } from "@/data/blog-posts";

interface Props {
  post: BlogPost;
  locale: string;
  siteUrl: string;
}

export function ArticleJsonLd({ post, locale, siteUrl }: Props) {
  const authorNames: Record<string, string> = {
    "Dr. Wei Zhang": "Wei Zhang",
    "Dr. James Liu": "James Liu",
    "Dr. Sarah Chen": "Sarah Chen",
    "Mike Thompson": "Mike Thompson",
    "Prof. Maria Schmidt": "Maria Schmidt",
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": (locale === "zh" ? post.titleZh : locale === "vi" ? post.titleVi : post.titleEn) || post.title,
    "description": (locale === "zh" ? post.summaryZh : locale === "vi" ? post.summaryVi : post.summaryEn) || post.summary,
    "author": {
      "@type": "Person",
      "name": authorNames[post.authorEn || post.author] || post.author || "NEWARE Team",
      "jobTitle": post.authorTitle || "Application Engineer",
      "worksFor": {
        "@type": "Organization",
        "name": "NEWARE",
      },
    },
    "publisher": {
      "@type": "Organization",
      "name": "NEWARE",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.svg`,
      },
    },
    "datePublished": post.publishedAt || post.date || post.dateEn,
    "dateModified": post.publishedAt || post.date || post.dateEn,
    "image": `${siteUrl}/og-en.png`,
    "url": `${siteUrl}/${locale}/blog/${post.slug}`,
    "about": {
      "@type": "Thing",
      "name": "Battery Testing Equipment",
    },
    "keywords": (post.tagsEn || post.tags || []).join(", "),
    "inLanguage": locale === "vi" ? "vi" : locale === "zh" ? "zh" : "en",
    "isAccessibleForFree": true,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".post-excerpt", ".faq-item"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
