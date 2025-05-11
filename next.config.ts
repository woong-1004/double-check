import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable cache in development to avoid ENOENT errors
      config.cache = false;
    }
    return config;
  }
};

export default nextConfig;