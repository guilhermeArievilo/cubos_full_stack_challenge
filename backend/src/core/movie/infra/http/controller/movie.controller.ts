import { JwtAuthGuard } from "@/shared/infra/jwt/jwt-auth.guard";
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import CreateMovieBodyDTO from "../presentation/dto/createMovieBodyDto";
import { MovieHttpDTO } from "../presentation/dto/movieHttpDto";
import AddMovieUseCase from "@/core/movie/domain/application/use-cases/addMovieUseCase";
import { type AuthenticatedRequest } from "@/shared/infra/jwt/jwt.strategy";
import { JwtPayload } from "@/core/auth/domain/entities/payload";
import GenreViewModel from "../presentation/view-models/genreViewModel";
import GetMovieBySlugUseCase from "@/core/movie/domain/application/use-cases/getMovieBySlugUseCase";
import MovieViewModel from "../presentation/view-models/movieViewModel";
import ListMoviesUseCase from "@/core/movie/domain/application/use-cases/listMoviesUseCase";
import { MovieProps } from "@/core/movie/domain/entities/movie";
import { PaginatedDataResponseDto } from "@/core/movie/domain/application/repository/movieRepository";
import { ListMoviesQueryDTO } from "../presentation/dto/listMoviesQueryDto";
import UpdateMovieBodyDTO from "../presentation/dto/updateMovieBodyDto";
import UpdateMovieUseCase from "@/core/movie/domain/application/use-cases/updateMovieUseCase";
import FindUserByEmailUseCase from "@/core/user/domain/application/use-cases/findUserByEmailUseCase";
import DeleteMovieUseCase from "@/core/movie/domain/application/use-cases/deleteMovieUseCase";
import { PartialHttpMovieDTO } from "../presentation/dto/partialHttpMovieDto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('Movies')
@UseGuards(JwtAuthGuard)
@Controller('movie')
export class MovieController {
  constructor(
    private addMovieUseCase: AddMovieUseCase,
    private getMovieBySlugUseCase: GetMovieBySlugUseCase,
    private listMoviesUseCase: ListMoviesUseCase,
    private updateMovieUseCase: UpdateMovieUseCase,
    private deleteMovieUseCase: DeleteMovieUseCase,
    private findUserByEmailUseCase: FindUserByEmailUseCase
  ) {}

  @ApiOperation({ summary: 'Cadastrar um novo filme' })
  @ApiResponse({ status: 201 })
  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async addMovie(
    @Req() req: AuthenticatedRequest,
    @Body() movieData: CreateMovieBodyDTO
  ): Promise<void> {
    const { email } = req.user as JwtPayload;

    await this.addMovieUseCase.execute({
      ...movieData,
      genres: movieData.genres.map(GenreViewModel.toDomain)
    }, email)

    return;
  }

  @ApiOperation({ summary: 'Buscar um filme pelo seu slug' })
  @Get('/:slug')
  async getMovieBySlug(@Param('slug') slug: string) {
    const domainMovie = await this.getMovieBySlugUseCase.execute(slug);
    return MovieViewModel.toHttp(domainMovie);
  }

  @Get('/list')
  async listMovies(
    @Query() query: ListMoviesQueryDTO
  ): Promise<PaginatedDataResponseDto<PartialHttpMovieDTO>> {
    const {
      page,
      limit,
      orderBy,
      order,
      query: titleQuery,
      duration,
      genre,
      startReleaseData,
      endReleaseData
    } = query

    const domainMovies = await this.listMoviesUseCase.execute({
      page: Number(page),
      limit: Number(limit),
      orderBy: orderBy as keyof MovieProps,
      order,
      query: titleQuery,
      duration: Number(duration),
      genre,
      releaseDate: startReleaseData && endReleaseData ? {
        start: new Date(startReleaseData),
        end: new Date(endReleaseData)
      } : undefined
    })

    return {
      data: domainMovies.data.map(MovieViewModel.toPartialHttpMovie),
      limit: domainMovies.limit,
      page: domainMovies.page,
      total: domainMovies.total
    }
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  async updateMovie(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() updateData: UpdateMovieBodyDTO
  ) {
    const { email } = req.user as JwtPayload;
    const user = await this.findUserByEmailUseCase.execute(email)

    await this.updateMovieUseCase.execute(id, {
      ...updateData,
      genres: updateData.genres?.length ? updateData.genres.map(GenreViewModel.toDomain) : undefined
    }, user)

    return;
  }

  @Delete('/:id')
  async deleteMovie(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    const { email } = req.user as JwtPayload;
    const user = await this.findUserByEmailUseCase.execute(email);
    await this.deleteMovieUseCase.execute(id, user);
  }
}