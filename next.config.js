/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Skip ESLint during builds
    ignoreDuringBuilds: true,
  },
  // Also disable TypeScript checks during builds
  typescript: {
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig
