/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [],
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
  webpack(config) {
    // Add SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })
    return config
  },
  // Add this to ensure proper MIME types for SVG files
  async headers() {
    return [
      {
        source: "/:path*.svg",
        headers: [
          {
            key: "Content-Type",
            value: "image/svg+xml",
          },
        ],
      },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
