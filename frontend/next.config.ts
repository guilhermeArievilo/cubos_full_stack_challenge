import type { NextConfig } from "next";

const API_URL = process.env.MOVIE_API_URL;

if (!API_URL) throw new Error('Api url not found.')

const UPLOAD_API_URL = process.env.AWS_S3_API_BASE_URL;

if (!UPLOAD_API_URL) throw new Error('Upload api base-url not found.')
  
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const AWS_REGION = process.env.AWS_REGION;

if (!BUCKET_NAME && !AWS_REGION) throw new Error('Bucket name or aws region not found.')

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.jsx',
      },
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com`,
        port: '',
        pathname: '/**',
      }
    ]
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/:path*`,
      },
      {
        source: "/images/:path*",
        destination: `https://${BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/:path*`
      }
    ]
  }
};

export default nextConfig;
