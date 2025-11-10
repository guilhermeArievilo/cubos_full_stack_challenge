import { Genre } from "../../domain/entities/genre";
import { Language } from "../../domain/entities/language";
import { MovieCard, Movie, MovieProps } from "../../domain/entities/movie";
import { RatingData } from "../../domain/entities/rating";
import MovieRepository, { ListMoviesParamsRequestDto, PaginatedDataResponseDto } from "../../domain/repository/movieRepository";
import GenreRemoteDatasource from "../datasource/genreRemoteDatasource";
import LanguageRemoteDatasource from "../datasource/languageRemoteDatasource";
import MovieRemoteDatasource from "../datasource/movieRemoteDatasource";
import RatingRemoteDatasource from "../datasource/ratingRemoteDatasource";

export default class MovieDataRepositoryImpl implements MovieRepository {
  constructor(
    private movieRemoteDatasource: MovieRemoteDatasource,
    private genreRemoteDatasource: GenreRemoteDatasource,
    private languageRemoteDatasource: LanguageRemoteDatasource,
    private ratingRemoteDatasource: RatingRemoteDatasource
  ) {}

  async isOwner(movieId: string): Promise<{ status: boolean; }> {
    return await this.movieRemoteDatasource.isOwnerMovie(movieId);
  }

  async listRatings(): Promise<RatingData[]> {
    return await this.ratingRemoteDatasource.listRatings();
  }

  async listLanguages(): Promise<Language[]> {
    return await this.languageRemoteDatasource.listLanguages();
  }

  async listMovies(params: ListMoviesParamsRequestDto): Promise<PaginatedDataResponseDto<MovieCard>> {
    return await this.movieRemoteDatasource.listMovies(params);
  }

  async getMovieBySlug(slug: string): Promise<Movie> {
    return await this.movieRemoteDatasource.findMovieBySlug(slug);
  }
  
  async addMovie(movie: MovieProps): Promise<void> {
    await this.movieRemoteDatasource.addMovie(movie);
  }

  async updateMovie(id: string, movie: Partial<MovieProps>): Promise<void> {
    await this.movieRemoteDatasource.updateMovie(id, movie);
  }

  async deleteMovie(id: string): Promise<void> {
    await this.movieRemoteDatasource.deleteMovie(id);
  }

  async addGenre(name: string): Promise<Genre> {
    return await this.genreRemoteDatasource.addGenre(name);
  }

  async findGenreBySlug(slug: string): Promise<Genre> {
    return await this.genreRemoteDatasource.findGenreBySlug(slug);
  }

  async listGenres(): Promise<Genre[]> {
    return await this.genreRemoteDatasource.listGenres()
  }
}