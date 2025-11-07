import { Injectable } from "@nestjs/common";
import UploadRepository, { ALLOWED_CONTENT_TYPES, ContentType, GeneratePresignedUrlResponseDto } from "../repository/uploadRepository";
import RequiredFieldError from "@/shared/exceptions/requiredFieldError";
import InvalidFieldError from "@/shared/exceptions/invalidFieldError";

@Injectable()
export default class GeneratePresignedUrlUseCase {
  constructor(
    private uploadRepository: UploadRepository
  ) {}

  async execute(fileName: string, contentType: ContentType): Promise<GeneratePresignedUrlResponseDto> {
    if (!fileName) throw new RequiredFieldError("fileName");
    if (!contentType) throw new RequiredFieldError("contentType");
    
    if (!ALLOWED_CONTENT_TYPES.includes(contentType)) {
      throw new InvalidFieldError('contentType');
    }

    return await this.uploadRepository.generatePresignedUrl(fileName, contentType);
  }
}
