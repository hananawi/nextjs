/**
 * @type {import('next').NextConfig}
 */
exports.module = {
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
    };
    return config;
  },
};
