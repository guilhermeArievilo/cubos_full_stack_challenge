import RequiredFieldError from "@/core/exceptions/errors/requiredFieldError";
import { ALLOWED_CONTENT_TYPES, ContentType } from "../entities/contentType";
import UploadRepository from "../repository/uploadRepository";
import InvalidFieldError from "@/core/exceptions/errors/invalidFieldError";

export interface UploadUseCaseResponse {
  uploadPath: string;
}

export default class UploadUseCase {
  constructor(
    private uploadRepository: UploadRepository
  ) {}

  async execute(fileName: string, contentType: ContentType, file: Blob): Promise<UploadUseCaseResponse> {
    if (!fileName) throw new RequiredFieldError("fileName");
    if (!contentType) throw new RequiredFieldError("contentType");
    
    if (!ALLOWED_CONTENT_TYPES.includes(contentType)) {
      throw new InvalidFieldError('contentType');
    }

    const { filePath, uploadUrl } = await this.uploadRepository.generatePresignedUrl(fileName, contentType);

    await this.uploadRepository.uploadFile(uploadUrl, file);

    return {
      uploadPath: filePath
    }
  }
}
