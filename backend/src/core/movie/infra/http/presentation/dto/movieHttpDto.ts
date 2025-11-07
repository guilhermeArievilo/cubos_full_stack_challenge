import { MovieStatus } from "@/core/movie/domain/entities/movieStatus";
import { GenreHttpDto } from "./genreHttpDto";

export type MovieHttpDTO = {
  id: string;
  title: string;
  originalTitle: string;
  tagline: string;
  synopsis: string;
  genres: GenreHttpDto[];
  backdropPath: string;
  posterPath: string;
  rating: number;
  voteCount: number;
  voteAverage: number;
  duration: number;
  status: MovieStatus;
  budget: number;
  revenue: number;
  originalLanguage: string;
  trailerLink: string;
  releaseDate: Date;
  createdAt: Date;
  updatedAt?: Date;
}