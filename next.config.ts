import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/appointments",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
