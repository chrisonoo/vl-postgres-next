/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@vercel/postgres"],
  },
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      config.resolve.alias = {
        ...config.resolve.alias,
        pg: false,
      };
    }
    return config;
  },
  images: {
    domains: ["images.ctfassets.net"],
  },
};

module.exports = nextConfig;
