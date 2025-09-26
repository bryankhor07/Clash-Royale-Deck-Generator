/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.deckshop.pro",
        pathname: "/img/**",
      },
    ],
  },
};

export default nextConfig;
