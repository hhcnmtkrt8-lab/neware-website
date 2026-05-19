import { MetadataRoute } from "next";
import { locales } from "@/i18n/request";
import { products } from "@/data/neware";
import { vietnamProducts } from "@/data/neware-vietnam";

const SITE_URL = process.env.SITE_URL ?? "https://www.neware.com.cn";
const SITE_URL_VN = process.env.SITE_URL_VN ?? "https://neware.vn";

const ogImages: Record<string, string> = {
  en: "/og-en.png",
  zh: "/og-zh.png",
  vi: "/og-vi.png",
};

const solutions = [
  { id: "rd", slug: "research-development", priority: 0.8 },
  { id: "mfg", slug: "ev-battery-manufacturing", priority: 0.8 },
  { id: "ev", slug: "electric-vehicles", priority: 0.8 },
  { id: "ess", slug: "energy-storage", priority: 0.7 },
  { id: "consumer", slug: "consumer-electronics", priority: 0.7 },
  { id: "supercap", slug: "supercapacitors", priority: 0.6 },
];

// Blog post slugs from src/data/blog/
const blogSlugs = [
  // Product guides
  "neware-ct-4000-battery-cycler-complete-guide",
  "neware-bts9000-high-precision-battery-testing",
  "neware-ce-6000-energy-recovery-battery-testing",
  "how-to-choose-battery-testing-equipment",
  "neware-btsda-software-complete-guide",
  // Technical deep dives
  "battery-dcir-measurement-guide",
  "battery-cycler-sampling-rate-explained",
  "battery-charging-profiles-cc-cv-cccv",
  "battery-safety-testing-standards-iec-gbt",
  "battery-formation-cycling-process-guide",
];

const staticRoutes = [
  { href: "", changeFrequency: "weekly" as const, priority: 1.0 },
  { href: "/products", changeFrequency: "monthly" as const, priority: 0.9 },
  { href: "/solutions", changeFrequency: "monthly" as const, priority: 0.8 },
  { href: "/compare", changeFrequency: "monthly" as const, priority: 0.9 },
  { href: "/about", changeFrequency: "monthly" as const, priority: 0.7 },
  { href: "/contact", changeFrequency: "yearly" as const, priority: 0.8 },
  { href: "/downloads", changeFrequency: "monthly" as const, priority: 0.7 },
  { href: "/why-neware", changeFrequency: "monthly" as const, priority: 0.7 },
  { href: "/resources", changeFrequency: "monthly" as const, priority: 0.6 },
  { href: "/knowledge-base", changeFrequency: "weekly" as const, priority: 0.8 },
  { href: "/faq", changeFrequency: "monthly" as const, priority: 0.8 },
  { href: "/blog", changeFrequency: "weekly" as const, priority: 0.7 },
  { href: "/glossary", changeFrequency: "monthly" as const, priority: 0.6 },
  { href: "/case-studies", changeFrequency: "monthly" as const, priority: 0.7 },
  { href: "/testimonials", changeFrequency: "monthly" as const, priority: 0.7 },
  { href: "/quote-calculator", changeFrequency: "monthly" as const, priority: 0.8 },
  { href: "/whitepapers", changeFrequency: "monthly" as const, priority: 0.8 },
];

const lastModified = new Date();

type SitemapEntry = {
  url: string;
  lastModified?: Date;
  changeFrequency?:
    | "weekly"
    | "monthly"
    | "yearly"
    | "always"
    | "hourly"
    | "daily"
    | "never";
  priority?: number;
  images?: string[];
  links?: Array<{ locale: string; url: string }>;
};

function buildHreflangs(path: string) {
  return locales.map((locale) => ({
    locale,
    url: `${SITE_URL}/${locale}${path}`,
  }));
}

export default function sitemap(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];

  for (const locale of locales) {
    const ogImage = ogImages[locale] ?? "/og-en.png";

    for (const route of staticRoutes) {
      entries.push({
        url: `${SITE_URL}/${locale}${route.href}`,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        images: [`${SITE_URL}${ogImage}`],
        links: buildHreflangs(route.href),
      });
    }

    for (const solution of solutions) {
      entries.push({
        url: `${SITE_URL}/${locale}/solutions/${solution.slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: solution.priority,
        images: [`${SITE_URL}${ogImage}`],
        links: buildHreflangs(`/solutions/${solution.slug}`),
      });
    }

    for (const product of products) {
      entries.push({
        url: `${SITE_URL}/${locale}/products/${product.id}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.8,
        images: [`${SITE_URL}${ogImage}`],
        links: buildHreflangs(`/products/${product.id}`),
      });
    }

    entries.push({
      url: `${SITE_URL}/${locale}/why-neware`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [`${SITE_URL}${ogImage}`],
      links: buildHreflangs("/why-neware"),
    });

    entries.push({
      url: `${SITE_URL}/${locale}/resources`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
      images: [`${SITE_URL}${ogImage}`],
      links: buildHreflangs("/resources"),
    });

    entries.push({
      url: `${SITE_URL}/${locale}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
      images: [`${SITE_URL}${ogImage}`],
      links: buildHreflangs("/blog"),
    });

    // Add individual blog post routes
    for (const slug of blogSlugs) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
        images: [`${SITE_URL}${ogImage}`],
        links: buildHreflangs(`/blog/${slug}`),
      });
    }

    entries.push({
      url: `${SITE_URL}/${locale}/glossary`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
      images: [`${SITE_URL}${ogImage}`],
      links: buildHreflangs("/glossary"),
    });

    entries.push({
      url: `${SITE_URL}/${locale}/case-studies`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [`${SITE_URL}${ogImage}`],
      links: buildHreflangs("/case-studies"),
    });
  }

  for (const product of vietnamProducts) {
    entries.push({
      url: `${SITE_URL_VN}/vi/resistors/${product.id}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [`${SITE_URL_VN}/og-vi.png`],
      links: [
        { locale: "vi", url: `${SITE_URL_VN}/vi/resistors/${product.id}` },
      ],
    });
  }

  entries.push({
    url: `${SITE_URL_VN}/vi/resistors`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
    images: [`${SITE_URL_VN}/og-vi.png`],
    links: [
      { locale: "vi", url: `${SITE_URL_VN}/vi/resistors` },
    ],
  });

  return entries;
}
