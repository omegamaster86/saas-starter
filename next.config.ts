import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    newDevOverlay: true
  },
  images: {
    domains: ['files.stripe.com'],
  },
};

export default nextConfig;
