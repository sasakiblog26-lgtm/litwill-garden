import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/characters/:path*",
        destination: "/tools/mbti",
        permanent: true,
      },
      {
        source: "/weapons/:path*",
        destination: "/tools/compatibility",
        permanent: true,
      },
      {
        source: "/tier-list",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/ranking",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/settings",
        destination: "/tools/numerology",
        permanent: true,
      },
      {
        source: "/guides",
        destination: "/articles/self-understanding-guide",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
