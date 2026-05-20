/** @type {import('next').NextConfig} */
const nextConfig = {
  // 核心：使用 standalone 模式，将所有依赖打包到一个文件夹
  output: 'standalone',
  // 核心：部署在 Hostinger 这种非 Vercel 环境必须开启
  images: {
    unoptimized: true,
  },
  // 确保生产环境严格模式
  reactStrictMode: true,
};

module.exports = nextConfig;
