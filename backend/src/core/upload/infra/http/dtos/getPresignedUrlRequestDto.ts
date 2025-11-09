import { ALLOWED_CONTENT_TYPES, type ContentType } from "@/core/upload/domain/application/repository/uploadRepository";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export default class GetPresignedUrlRequestDto {

  @IsNotEmpty()
  @IsString()
  fileName: string;

  @IsNotEmpty()
  @IsEnum(ALLOWED_CONTENT_TYPES)
  contentType: ContentType;
}