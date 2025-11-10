import { MovieStatus } from "@/core/movie/domain/entities/movieStatus";
import { GenreHttpDto } from "./genreHttpDto";
import { Rating } from "@/core/movie/domain/entities/rating";

export class MovieHttpDTO {
  id: string;
  title: string;
  originalTitle: string;
  tagline: string;
  synopsis: string;
  genres: GenreHttpDto[];
  backdropPath: string;
  posterPath: string;
  rating: Rating;
  voteCount?: number;
  voteAverage?: number;
  duration: number;
  status: MovieStatus;
  budget?: number;
  revenue?: number;
  profit?: number;
  originalLanguage: string;
  trailerLink: string;
  releaseDate: Date;
  createdAt: Date;
  updatedAt?: Date;
}