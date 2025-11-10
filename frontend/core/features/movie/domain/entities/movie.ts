import { Genre } from "./genre";
import { MovieStatus } from "./movieStatus";
import { Rating } from "./rating";

export type MovieProps = {
  title: string;
  originalTitle: string;
  tagline: string;
  synopsis: string;
  genres: Genre[] | string[];
  backdropPath: string;
  posterPath: string;
  rating: Rating;
  voteCount: number;
  voteAverage: number;
  duration: number;
  status: MovieStatus;
  budget: number;
  revenue: number;
  originalLanguage: string;
  trailerLink: string;
  releaseDate: Date;
}

export type Movie = {
  id: string,
  slug: string,
  createdAt: Date;
  updatedAt?: Date;

} & MovieProps;

export type MovieCard = {
  id: string,
  title: string,
  slug: string,
  genres: Genre[];
  posterPath: string;
  voteCount: number;
  voteAverage: number;
}