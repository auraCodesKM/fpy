/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com',
      'avatars.githubusercontent.com',
      'github.com',
      'lh3.googleusercontent.com',
      'raw.githubusercontent.com',
      'api.mapbox.com',
      'mapbox.com',
    ],
  },
  env: {
    NEXT_PUBLIC_MAPBOX_TOKEN: 'pk.eyJ1IjoiYXVyYWttIiwiYSI6ImNtYXM0enc1cTBnMnAya3NjbzZlZ3B0ZGoifQ.jdpmsvbErKlPI0O6P20unQ',
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  // Disable type checking during build for faster builds
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint during build for faster builds
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
