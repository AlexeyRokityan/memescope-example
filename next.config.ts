import type { NextConfig } from 'next';

const svgLoader = {
  loader: '@svgr/webpack',
  options: {
    icon: true,
    svgo: true,
  },
};

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [svgLoader],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
