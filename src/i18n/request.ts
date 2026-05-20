import { getRequestConfig } from "next-intl/server";

export const locales = ["vi", "en", "zh", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "vi";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? defaultLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
