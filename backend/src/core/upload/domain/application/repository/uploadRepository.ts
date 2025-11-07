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

export type GeneratePresignedUrlResponseDto = {
  key: string;
  uploadUrl: string;
}

export default abstract class UploadRepository {
  abstract generatePresignedUrl(fileName: string, contentType: ContentType): Promise<GeneratePresignedUrlResponseDto>
}