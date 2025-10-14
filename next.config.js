/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    GITHUB_ID: process.env.AUTH_GITHUB_ID,
    GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
  },
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

module.exports = nextConfig;
