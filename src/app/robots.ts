import { MetadataRoute } from "next";

const SITE_URL = process.env.SITE_URL ?? "https://www.neware.com.cn";
const SITE_URL_VN = process.env.SITE_URL_VN ?? "https://neware.vn";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/admin"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
      },
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL_VN}/sitemap.xml`,
    ],
    host: SITE_URL,
  };
}
