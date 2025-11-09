import ListLanguagesUseCase from "@/core/movie/domain/application/use-cases/listLanguagesUseCase";
import { JwtAuthGuard } from "@/shared/infra/jwt/jwt-auth.guard";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('Language')
@UseGuards(JwtAuthGuard)
@Controller('language')
export class LanguageController {
  constructor(
    private listLanguagesUseCase: ListLanguagesUseCase
  ) {}

  @ApiOperation({ summary: 'Traz todas as linguagens para um filme' })
  @Get('/list')
  async listLanguages() {
    const languages = await this.listLanguagesUseCase.execute();
    return languages;
  }
}