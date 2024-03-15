/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.pokemondb.net",
        port: "",
      },
    ],
  },
};

export default nextConfig;
