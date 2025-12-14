import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      root: process.env.TURBO_ROOT ?? __dirname,
    }
  }
};

export default nextConfig;
