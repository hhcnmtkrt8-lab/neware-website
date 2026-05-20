/** @type {import('next').NextConfig} */
const nextConfig = {
  // 如果你在 Hostinger 部署时发现 .next 路径有问题，
  // 可以考虑添加 output: 'standalone'，这会把所有依赖打包进一个文件夹
  output: 'standalone',
  reactStrictMode: true,
  // 确保资源路径正确
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
