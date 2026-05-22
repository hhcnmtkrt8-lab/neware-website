const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  trailingSlash: true,
  // Exclude native modules from bundling for Next.js 14
  experimental: {
    serverComponentsExternalPackages: ["better-sqlite3"],
  },
};

module.exports = withNextIntl(nextConfig);
