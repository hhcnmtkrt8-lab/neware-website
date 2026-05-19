"use client";

import { useParams } from "next/navigation";

const SITE_URL = typeof window !== "undefined"
  ? window.location.origin
  : (process.env.SITE_URL ?? "https://www.neware.com.cn");

interface Review {
  author: string;
  jobTitle: string;
  company: string;
  reviewBody: string;
  reviewRating: number;
  datePublished: string;
}

const reviews: Review[] = [
  {
    author: "Dr. S. C.",
    jobTitle: "Senior Battery R&D Engineer",
    company: "Leading Electric Vehicle Manufacturer (US)",
    reviewBody: "We migrated from Arbin to NEWARE BTS9000 for our R&D lab. The 0.02% accuracy and 1000Hz sampling rate gave us data quality we never had before. The migration support team was excellent.",
    reviewRating: 5,
    datePublished: "2024-09-15",
  },
  {
    author: "Prof. M. W.",
    jobTitle: "Director of Energy Storage Research",
    company: "Top-tier Technological University (Germany)",
    reviewBody: "NEWARE CT-4000 has been running in our lab for 5 years without any major issues. The software is intuitive and the customer support from NEWARE Germany office is outstanding.",
    reviewRating: 5,
    datePublished: "2024-03-22",
  },
  {
    author: "James R.",
    jobTitle: "VP of Manufacturing",
    company: "Tier-1 Battery Technology Enterprise (US)",
    reviewBody: "We evaluated Arbin, Maccor, and NEWARE. NEWARE CE-6000 with energy recovery saves us over $50,000 per year in electricity costs alone. The ROI was clear within 8 months.",
    reviewRating: 5,
    datePublished: "2024-11-08",
  },
];

export function ReviewsJsonLd() {
  const params = useParams();
  const locale = (params.locale as string) || "zh";

  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name:
      locale === "zh"
        ? "新威尔电池测试系统"
        : locale === "vi"
        ? "Hệ thống kiểm tra pin NEWARE"
        : "NEWARE Battery Testing Systems",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(review.reviewRating),
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: review.author,
        jobTitle: review.jobTitle,
        worksFor: {
          "@type": "Organization",
          name: review.company,
        },
      },
      reviewBody: review.reviewBody,
      datePublished: review.datePublished,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
    />
  );
}
