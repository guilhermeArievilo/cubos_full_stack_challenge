export const ALLOWED_CONTENT_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/avif',
  'image/tiff',
  'image/bmp',
] as const;

export type ContentType = typeof ALLOWED_CONTENT_TYPES[number];