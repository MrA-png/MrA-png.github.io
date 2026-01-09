import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // No basePath needed for user/organization site (MrA-png.github.io)
  trailingSlash: false,
};

export default nextConfig;
