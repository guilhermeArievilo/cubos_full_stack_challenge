import CreateGenreUseCase from "@/core/movie/domain/application/use-cases/createGenreUseCase";
import ListGenresUseCase from "@/core/movie/domain/application/use-cases/listGenresUseCase";
import { JwtAuthGuard } from "@/shared/infra/jwt/jwt-auth.guard";
import { type AuthenticatedRequest } from "@/shared/infra/jwt/jwt.strategy";
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import CreateGenreBodyDto from "../presentation/dto/createGenreBodyDto";
import Genre from "@/core/movie/domain/entities/genre";
import { GenreHttpDto } from "../presentation/dto/genreHttpDto";
import GenreViewModel from "../presentation/view-models/genreViewModel";

@ApiBearerAuth()
@ApiTags('Genres')
@UseGuards(JwtAuthGuard)
@Controller('genre')
export class GenreController {
  constructor(
    private listGenresUseCase: ListGenresUseCase,
    private createGenresUseCase: CreateGenreUseCase
  ) {}

  @ApiOperation({ summary: 'Cadastrar um novo gênero' })
  @ApiResponse({ status: 201 })
  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async createGenre(
      @Body() genreData: CreateGenreBodyDto
  ): Promise<GenreHttpDto> {
    const genreToCreate =  new Genre({ name: genreData.name });
    const createdDomainGenre = await this.createGenresUseCase.execute(genreToCreate);

    return GenreViewModel.toHttp(createdDomainGenre);
  }

  @Get('/list')
  async listGenres(): Promise<GenreHttpDto[]> {
    const domainGenres = await this.listGenresUseCase.execute()
    return domainGenres.map(GenreViewModel.toHttp);
  }
}