import type { NextConfig } from "next";
import { after } from "next/server";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  experimental: {
    ppr: "incremental",
  },
};

export default nextConfig;
