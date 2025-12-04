/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, { encoding: 'encoding' }];
    return config;
  },
};

module.exports = nextConfig;