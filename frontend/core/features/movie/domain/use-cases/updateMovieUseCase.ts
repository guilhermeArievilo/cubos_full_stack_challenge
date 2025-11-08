import { MovieProps } from "../entities/movie";
import MovieRepository from "../repository/movieRepository";

export default class UpdateMovieUseCase {
  constructor(
    private movieRepository: MovieRepository
  ) {}

  async execute(id: string, data: Partial<MovieProps>): Promise<void> {
    await this.movieRepository.updateMovie(id, data);
  }
}