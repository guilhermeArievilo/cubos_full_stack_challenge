import { Genre, GenreProps } from "../entities/genre";
import { Language } from "../entities/language";
import { Movie, MovieCard, MovieProps } from "../entities/movie";

export type ListDataRequestDto<T> = {
  page?: number;
  limit?: number;
  orderBy?: keyof T;
  order?: 'asc' | 'desc';
  query?: string;
}

export type PaginatedDataResponseDto<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

export type ListMoviesParamsRequestDto = ListDataRequestDto<MovieProps> & {
  releaseDate?: {
    start: Date,
    end: Date
  },
  duration?: number,
  genre?: string
};

export default abstract class MovieRepository {
  abstract listMovies(params: ListMoviesParamsRequestDto): Promise<PaginatedDataResponseDto<MovieCard>>
  abstract getMovieBySlug(slug: string): Promise<Movie>
  abstract addMovie(movie: MovieProps): Promise<void>
  abstract updateMovie(id: string, movie: Partial<MovieProps>): Promise<void>
  abstract deleteMovie(id: string): Promise<void>
  abstract addGenre(name: string): Promise<Genre>
  abstract findGenreBySlug(slug: string): Promise<Genre>
  abstract listGenres(): Promise<Genre[]>
  abstract listLanguages(): Promise<Language[]>
}