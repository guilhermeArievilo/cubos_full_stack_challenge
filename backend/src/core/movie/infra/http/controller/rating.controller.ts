import ListRatingsUseCase from "@/core/movie/domain/application/use-cases/listRatingsUseCase";
import { JwtAuthGuard } from "@/shared/infra/jwt/jwt-auth.guard";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('Rating')
@UseGuards(JwtAuthGuard)
@Controller('rating')
export class RatingController {
  constructor(
    private readonly listRatingsUseCase: ListRatingsUseCase
  ) {}

  @ApiOperation({ summary: 'Traz todas as classificações indicativas para um filme' })
  @Get('/list')
  async listRatings() {
    const ratings = await this.listRatingsUseCase.execute();
    return ratings;
  }
}