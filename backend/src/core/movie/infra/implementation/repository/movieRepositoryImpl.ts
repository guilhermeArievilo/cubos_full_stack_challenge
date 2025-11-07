import MovieRepository, { ListMoviesParamsRequestDto, PaginatedDataResponseDto } from "@/core/movie/domain/application/repository/movieRepository";
import Genre, { GenreProps } from "@/core/movie/domain/entities/genre";
import Movie, { MovieProps } from "@/core/movie/domain/entities/movie";
import User from "@/core/user/domain/entity/user";
import { PrismaService } from "@/shared/infra/db/prisma/database.service";
import { Injectable } from "@nestjs/common";
import MoviePrismaMapper from "../../datasource/db/prisma/mapper/moviePrismaMapper";

@Injectable()
export default class MovieRepositoryImpl implements MovieRepository {
  constructor(
    private prismaService: PrismaService
  ) {}

  async listMovies(params: ListMoviesParamsRequestDto): Promise<PaginatedDataResponseDto<Movie>> {
    throw new Error("Method not implemented.");
  }

  async getMovieById(id: string): Promise<Movie | null> {
    const rawMovieData = await this.prismaService.movie.findUnique({
      where: { id },
      include: { genres: true }
    });
    
    if (!rawMovieData) return null;

    return MoviePrismaMapper.toDomain(rawMovieData);
  }

  async getMovieBySlug(slug: string): Promise<Movie | null> {
    const rawMovieData = await this.prismaService.movie.findUnique({
      where: { slug },
      include: { genres: true }
    });

    if (!rawMovieData) return null;

    return MoviePrismaMapper.toDomain(rawMovieData);
  }

  addMovie(movie: MovieProps, createdBy: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateMovie(id: string, movie: Partial<MovieProps>): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteMovie(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findMovieByTitle(title: string): Promise<Movie | null> {
    throw new Error("Method not implemented.");
  }
  findMovieByOriginalTitle(originalTitle: string): Promise<Movie | null> {
    throw new Error("Method not implemented.");
  }
  addGenre(props: GenreProps): Promise<Genre> {
    throw new Error("Method not implemented.");
  }
  findGenreBySlug(slug: string): Promise<Genre | null> {
    throw new Error("Method not implemented.");
  }
  listGenres(): Promise<Genre[]> {
    throw new Error("Method not implemented.");
  }
}