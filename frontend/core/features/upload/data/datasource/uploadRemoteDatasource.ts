import api from "@/infra/http/axios/api";
import { ContentType } from "../../domain/entities/contentType";
import { GeneratePresignedUrlResponseDto } from "../../domain/repository/uploadRepository";

export default class UploadRemoteDatasource {

  public async getPresignedUrl(fileName: string, contentType: ContentType): Promise<GeneratePresignedUrlResponseDto> {
    const res = await api.get<GeneratePresignedUrlResponseDto>(`/upload/pre-signed-url?fileName=${fileName}&contentType=${contentType}`);
    return res.data;
  }
}