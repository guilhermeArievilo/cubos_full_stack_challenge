import MovieRepository, { ListMoviesParamsRequestDto, PaginatedDataResponseDto } from "@/core/movie/domain/application/repository/movieRepository";
import Genre from "@/core/movie/domain/entities/genre";
import Movie, { MovieProps } from "@/core/movie/domain/entities/movie";
import { PrismaService } from "@/shared/infra/db/prisma/database.service";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import MoviePrismaMapper from "../datasource/db/prisma/mapper/moviePrismaMapper";
import MovieStatusPrismaMapper from "../datasource/db/prisma/mapper/movieStatusPrismaMapper";
import MovieGenrePrismaMapper from "../datasource/db/prisma/mapper/movieGenrePrismaMapper";
import { Language } from "@/core/movie/domain/entities/language";
import { movieLanguages } from "../datasource/in-memory/languages";
import { RatingData } from "@/core/movie/domain/entities/rating";
import { allRatingsData } from "../datasource/in-memory/ratingsInMemoryDatasource";
@Injectable()
export default class MovieRepositoryImpl implements MovieRepository {
  constructor(
    private prismaService: PrismaService
  ) {}

  listRatings(): RatingData[] {
    return allRatingsData;
  }

  listLanguages(): Language[] {
    return movieLanguages;
  }

  async listMovies(params: ListMoviesParamsRequestDto): Promise<PaginatedDataResponseDto<Movie>> {
    const { page = 1, limit = 10, orderBy = 'title', order = 'asc', query, genre, releaseDate, duration} = params || {};
    
    const skip = (page - 1) * limit;
    const take = limit;

    const OR = [];

    if (query) {
      OR.push({
        title: {
          contains: query,
          mode: Prisma.QueryMode.insensitive
        }
      });
    }

    if (genre) {
      OR.push({
        genres: {
          some: {
            slug: genre
          }
        }
      });
    }

    if (releaseDate) {
      OR.push({
        releaseDate: {
          gte: releaseDate.start,
          lte: releaseDate.end
        }
      });
    }

    if (duration) {
      OR.push({
        duration: {
          lte: duration
        }
      });
    }

    const where = OR.length ? {
      OR
    } : {};

    const totalItems = await this.prismaService.movie.count({
      where
    });

    console.log({
      where,
      orderBy: {
        [orderBy]: order
      },
      skip,
      take,
      include: { genres: true }
    })
    const rawMovies = await this.prismaService.movie.findMany({
      where,
      orderBy: {
        [orderBy]: order
      },
      skip,
      take,
      include: { genres: true }
    });

    const data = rawMovies.map(MoviePrismaMapper.toDomain);

    return {
      data,
      total: totalItems,
      page,
      limit
    };
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

  async addMovie(movie: Movie): Promise<void> {
    console.log('repo', movie)
    const prismaRawMovie = MoviePrismaMapper.toPrisma(movie);


    await this.prismaService.movie.create({
      data: prismaRawMovie
    });
  }

  async updateMovie(id: string, movie: Partial<MovieProps>): Promise<void> {
    const data = Object.fromEntries(
      Object.entries(movie).filter(([_, value]) => value !== undefined)
    ) as Partial<MovieProps>;

    await this.prismaService.movie.update({
      where: { id },
      data: {
        ...data,
        status: data.status ? MovieStatusPrismaMapper.toPrismaStatus(data.status) : undefined,
        genres: data.genres ? {
          connect: data.genres.map(g => {
            if (typeof g === 'string') {
              return {
                id: g
              }
            }

            return {
              id: g.id
            }
          })
        } : undefined
      }
    });
  }

  async deleteMovie(id: string): Promise<void> {
    await this.prismaService.movie.delete({
      where: { id }
    });
  }

  async findMovieByTitle(title: string): Promise<Movie | null> {
    const rawMovieData = await this.prismaService.movie.findUnique({
      where: { title },
      include: { genres: true }
    });
    
    if (!rawMovieData) return null;

    return MoviePrismaMapper.toDomain(rawMovieData);
  }

  async findMovieByOriginalTitle(originalTitle: string): Promise<Movie | null> {
    const rawMovieData = await this.prismaService.movie.findUnique({
      where: { originalTitle },
      include: { genres: true }
    });
    
    if (!rawMovieData) return null;

    return MoviePrismaMapper.toDomain(rawMovieData);
  }

  async addGenre(data: Genre): Promise<Genre> {
    const prismaRawGenre = await this.prismaService.genre.create({
      data: MovieGenrePrismaMapper.toPrisma(data)
    })

    return MovieGenrePrismaMapper.toDomain(prismaRawGenre);
  }

  async findGenreBySlug(slug: string): Promise<Genre | null> {
    const prismaRawGenre = await this.prismaService.genre.findUnique({
      where: { slug }
    });
    
    if (!prismaRawGenre) return null;

    return MovieGenrePrismaMapper.toDomain(prismaRawGenre);
  }

  async listGenres(): Promise<Genre[]> {
    const prismaRawGenres = await this.prismaService.genre.findMany();
    return prismaRawGenres.map(MovieGenrePrismaMapper.toDomain);
  }
}