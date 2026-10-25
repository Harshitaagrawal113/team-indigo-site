import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: { root: process.cwd() },
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
