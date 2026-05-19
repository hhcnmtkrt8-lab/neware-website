import { locales } from "@/i18n/request";

const SITE_URL = process.env.SITE_URL ?? "https://www.neware.com.cn";

export function generateAlternateUrls(path: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const locale of locales) {
    result[locale] = `${SITE_URL}/${locale}${path}`;
  }
  return result;
}

export function buildCanonicalUrl(locale: string, path: string): string {
  return `${SITE_URL}/${locale}${path}`;
}
