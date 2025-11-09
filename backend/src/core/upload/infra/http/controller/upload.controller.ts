import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import GeneratePresignedUrlUseCase from "../../../domain/application/use-cases/generatePresignedUrlUseCase";
import { JwtAuthGuard } from "@/shared/infra/jwt/jwt-auth.guard";
import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import GetPresignedUrlRequestDto from "../dtos/getPresignedUrlRequestDto";


@ApiBearerAuth()
@ApiTags('Upload')
@UseGuards(JwtAuthGuard)
@Controller('upload')
export default class UploadController {
  constructor(
    private generatePresignedUrl: GeneratePresignedUrlUseCase
  ) {}


  @Get('/pre-signed-url')
  async getPresignedUrl(
    @Query() params: GetPresignedUrlRequestDto
  ) {
    return await this.generatePresignedUrl.execute(params.fileName, params.contentType);
  }
}