const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = withNextIntl(nextConfig);
