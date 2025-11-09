import { PutObjectCommand } from "@aws-sdk/client-s3";
import UploadRepository, { ContentType, GeneratePresignedUrlResponseDto } from "../../../domain/application/repository/uploadRepository";
import { AwsS3Service } from "../../aws/awsS3.service";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class UploadRepositoryImpl implements UploadRepository {
  constructor(private readonly awsService: AwsS3Service) {}

  async generatePresignedUrl(fileName: string, contentType: ContentType): Promise<GeneratePresignedUrlResponseDto> {
    const uniqueName = `${Date.now()}-${fileName}`;
    const key = `uploads/${uniqueName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(this.awsService.client, command, { expiresIn: 60 });

    return {
      uploadUrl,
      filePath: key,
    };
  }

}