import { ContentType } from "../entities/contentType";

export type GeneratePresignedUrlResponseDto = {
  filePath: string;
  uploadUrl: string;
}

export default abstract class UploadRepository {
  abstract generatePresignedUrl(fileName: string, contentType: ContentType): Promise<GeneratePresignedUrlResponseDto>
  abstract uploadFile(path: string, file: Blob): Promise<void>
}