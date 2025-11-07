import Movie from "@/core/movie/domain/entities/movie";
import { MovieHttpDTO } from "../dto/movieHttpDto";
import GenreViewModel from "./genreViewModel";
import { PartialHttpMovieDTO } from "../dto/partialHttpMovieDto";

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
      genres: data.genres.map(GenreViewModel.toHttp),
      backdropPath,
      posterPath,
      rating,
      voteCount,
      voteAverage,
      duration,
      status,
      budget,
      revenue,
      originalLanguage,
      trailerLink,
      releaseDate,
      createdAt
    }
  }

  static toPartialHttpMovie({
    id,
    title,
    genres,
    posterPath,
    voteAverage,
    voteCount
  }: Movie): PartialHttpMovieDTO {
    return {
      id,
      title,
      genres: genres.map(GenreViewModel.toHttp),
      posterPath,
      voteAverage,
      voteCount
    }
  }
}