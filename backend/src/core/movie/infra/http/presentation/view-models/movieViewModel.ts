import Movie from "@/core/movie/domain/entities/movie";
import { MovieHttpDTO } from "../dto/movieHttpDto";
import GenreViewModel from "./genreViewModel";
import { PartialHttpMovieDTO } from "../dto/partialHttpMovieDto";
import Genre from "@/core/movie/domain/entities/genre";

export default class MovieViewModel {
  static toHttp(data: Movie): MovieHttpDTO {
    const {
      id,
      title,
      originalTitle,
      tagline,
      synopsis,
      genres,
      backdropPath,
      posterPath,
      rating,
      voteCount,
      voteAverage,
      duration,
      status,
      budget,
      revenue,
      profit,
      originalLanguage,
      trailerLink,
      releaseDate,
      createdAt
    } = data

    return {
      id,
      title,
      originalTitle,
      tagline,
      synopsis,
      genres: typeof genres === 'string' ? [] : genres.map((genre) => GenreViewModel.toHttp(genre as Genre)),
      backdropPath,
      posterPath,
      rating,
      voteCount,
      voteAverage,
      duration,
      status,
      budget,
      revenue,
      profit,
      originalLanguage,
      trailerLink,
      releaseDate,
      createdAt
    }
  }

  static toPartialHttpMovie({
    id,
    title,
    slug,
    genres,
    posterPath,
    voteAverage,
    voteCount,
    profit
  }: Movie): PartialHttpMovieDTO {
    return {
      id,
      title,
      slug,
      genres: typeof genres === 'string' ? [] : genres.map((genre) => GenreViewModel.toHttp(genre as Genre)),
      posterPath,
      voteAverage,
      voteCount,
      profit
    }
  }
}