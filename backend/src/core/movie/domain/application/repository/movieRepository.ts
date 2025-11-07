import Movie, { MovieProps } from "../../entities/movie";
import Genre from "../../entities/genre";

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
  abstract listMovies(params: ListMoviesParamsRequestDto): Promise<PaginatedDataResponseDto<Movie>>
  abstract getMovieById(id: string): Promise<Movie | null>
  abstract getMovieBySlug(slug: string): Promise<Movie | null>
  abstract addMovie(movie: Movie): Promise<void>
  abstract updateMovie(id: string, movie: Partial<MovieProps>): Promise<void>
  abstract deleteMovie(id: string): Promise<void>
  abstract findMovieByTitle(title: string): Promise<Movie | null>
  abstract findMovieByOriginalTitle(originalTitle: string): Promise<Movie | null>
  abstract addGenre(props: Genre): Promise<Genre>
  abstract findGenreBySlug(slug: string): Promise<Genre | null>
  abstract listGenres(): Promise<Genre[]>
}