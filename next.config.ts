import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  env: {
    SITE_URL: process.env.SITE_URL ?? "https://www.neware.com.cn",
    SITE_URL_VN: process.env.SITE_URL_VN ?? "https://neware.vn",
    GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION ?? "",
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.neware.com.cn" },
      { protocol: "https", hostname: "neware.vn" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache for optimized images
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      // Cache images
      {
        source: "/(.*)\\.(png|jpg|jpeg|gif|webp|avif|svg|ico)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "header", key: "x-locale", value: "vi" }],
        destination: "/vi",
        permanent: false,
      },
      {
        source: "/",
        has: [{ type: "header", key: "x-locale", value: "en" }],
        destination: "/en",
        permanent: false,
      },
      {
        source: "/",
        has: [{ type: "header", key: "x-locale", value: "zh" }],
        destination: "/zh",
        permanent: false,
      },
      {
        source: "/",
        has: [{ type: "header", key: "x-locale", value: "ru" }],
        destination: "/ru",
        permanent: false,
      },
    ];
  },
  poweredByHeader: false, // Remove X-Powered-By header for security
  compress: true, // Enable gzip compression
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizeCss: true,
  },
};

export default withNextIntl(nextConfig);
