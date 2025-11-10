import { GenreHttpDto } from "./genreHttpDto";

export class PartialHttpMovieDTO {
  id: string;
  title: string;
  slug: string;
  genres: GenreHttpDto[];
  posterPath: string;
  voteCount?: number;
  voteAverage?: number;
  profit?: number;
}
