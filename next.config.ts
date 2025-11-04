import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "", // normalmente vacío
        pathname: "/**", // permite todas las rutas dentro de este dominio
      },
    ],
  },
};

export default nextConfig;
