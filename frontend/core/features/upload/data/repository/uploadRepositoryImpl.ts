import { ContentType } from "../../domain/entities/contentType";
import UploadRepository, { GeneratePresignedUrlResponseDto } from "../../domain/repository/uploadRepository";
import BucketRemoteUploadDatasource from "../datasource/bucketRemoteUploadDatasource";
import UploadRemoteDatasource from "../datasource/uploadRemoteDatasource";

export default class UploadRepositoryImpl implements UploadRepository {
  constructor(
    private readonly bucketRemoteUploadDatasource: BucketRemoteUploadDatasource,
    private readonly uploadRemoteDatasource: UploadRemoteDatasource
  ) {}

  async generatePresignedUrl(fileName: string, contentType: ContentType): Promise<GeneratePresignedUrlResponseDto> {
    return await this.uploadRemoteDatasource.getPresignedUrl(fileName, contentType);
  }

  async uploadFile(path: string, file: Blob): Promise<void> {
    return await this.bucketRemoteUploadDatasource.uploadFile(path, file);
  }
}