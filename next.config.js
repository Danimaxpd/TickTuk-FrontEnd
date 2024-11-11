/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost',
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY || (process.env.NODE_ENV === 'development' ? 'dev-api-key' : ''),
  },
};

module.exports = nextConfig;
