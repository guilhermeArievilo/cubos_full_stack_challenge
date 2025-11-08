import ResourceNotFound from "@/core/exceptions/errors/resourceNotFound";
import { Movie } from "../entities/movie";
import MovieRepository from "../repository/movieRepository";

export default class GetMovieBySlugUseCase {
  constructor(
    private movieRepository: MovieRepository
  ) {}

  async execute(slug: string): Promise<Movie> {
    const movie = await this.movieRepository.getMovieBySlug(slug);
    return movie;
  }
}