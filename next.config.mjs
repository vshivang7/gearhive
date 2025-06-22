/** @type {import('next').NextConfig} */

// Extract hostname from NEXT_PUBLIC_SUPABASE_URL
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseHostname = supabaseUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

const nextConfig = {
  experimental: {
    serverComponentsHmrCache: false, // defaults to true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: supabaseHostname,
      },
    ],
    domains: [
      "media.architecturaldigest.com",
    ],
  },

  async headers() {
    return [
      {
        source: "/embed",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-src 'self';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;