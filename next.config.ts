import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md'],
  turbopack: {
    rules: {
      "*.md": {
        loaders: ["raw-loader"],
      },
    },
  },
};

export default nextConfig;
