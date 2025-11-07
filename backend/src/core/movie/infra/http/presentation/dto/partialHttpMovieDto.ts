import { GenreHttpDto } from "./genreHttpDto";

export type PartialHttpMovieDTO = {
  id: string;
  title: string;
  genres: GenreHttpDto[];
  posterPath: string;
  voteCount: number;
  voteAverage: number;
}
