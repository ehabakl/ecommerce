import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {

    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        port: "",
        pathname: "/Route-Academy-categories/**", // allow all category images
      },
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        port: "",
        pathname: "/Route-Academy-products/**", // allow all category images
      },
    ],
}
}

export default nextConfig;
