import Movie from '@/core/movie/domain/entities/movie';
import Genre from '@/core/movie/domain/entities/genre';
import { Prisma, Movie as RawMovie, Genre as RawGenre, $Enums, MovieStatus } from '@prisma/client';
import MovieStatusPrismaMapper from './movieStatusPrismaMapper';
import MovieGenrePrismaMapper from './movieGenrePrismaMapper';

type RawMovieWithGenres = RawMovie & {
  genres: RawGenre[];
}

export default class MoviePrismaMapper {
  static toPrisma(movie: Movie): Prisma.MovieUncheckedCreateInput {
    return {
      id: movie.id,
      title: movie.title,
      originalTitle: movie.originalTitle,
      tagline: movie.tagline,
      synopsis: movie.synopsis,
      slug: movie.slug,
      backdropPath: movie.backdropPath,
      posterPath: movie.posterPath,
      rating: movie.rating,
      voteCount: movie.voteCount,
      voteAverage: movie.voteAverage,
      duration: movie.duration,
      status: MovieStatusPrismaMapper.toPrismaStatus(movie.status),
      budget: movie.budget,
      revenue: movie.revenue,
      originalLanguage: movie.originalLanguage,
      releaseDate: movie.releaseDate,
      trailerLink: movie.trailerLink,
      createdById: movie.createdById,
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
      genres: {
        connect: movie.genres.map(g => ({ id: g.id! }))
      }
    };
  }

  static toDomain(raw: RawMovieWithGenres): Movie {
  const genres: Genre[] = raw.genres.map(genre => MovieGenrePrismaMapper.toDomain(genre))

    return new Movie({
      title: raw.title,
      slug: raw.slug,
      originalTitle: raw.originalTitle,
      tagline: raw.tagline,
      synopsis: raw.synopsis,
      genres,
      backdropPath: raw.backdropPath,
      posterPath: raw.posterPath,
      rating: raw.rating,
      voteCount: raw.voteCount,
      voteAverage: Number(raw.voteAverage),
      duration: raw.duration,
      status: MovieStatusPrismaMapper.fromPrismaStatus(raw.status),
      budget: Number(raw.budget),
      revenue: Number(raw.revenue),
      originalLanguage: raw.originalLanguage,
      trailerLink: raw.trailerLink,
      releaseDate: raw.releaseDate,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }, raw.createdById, raw.id);
  }
}