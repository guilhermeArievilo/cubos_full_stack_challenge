import type { NextConfig } from "next";

const API_URL = process.env.MOVIE_API_URL;

if (!API_URL) throw new Error('Api url not found.')

const UPLOAD_API_URL = process.env.AWS_S3_API_BASE_URL;

if (!UPLOAD_API_URL) throw new Error('Upload api base-url not found.')

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.jsx',
      },
    },
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/:path*`,
      },
      {
        source: "/upload/:path*",
        destination: `${UPLOAD_API_URL}/:path*`
      }
    ]
  }
};

export default nextConfig;
