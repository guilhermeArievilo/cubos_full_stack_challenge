import { GenreHttpDto } from "./genreHttpDto";

export class PartialHttpMovieDTO {
  id: string;
  title: string;
  genres: GenreHttpDto[];
  posterPath: string;
  voteCount: number;
  voteAverage: number;
}
