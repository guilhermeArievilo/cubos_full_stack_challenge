import MovieRepository from "../repository/movieRepository";
import { Genre } from "../entities/genre";

export default class ListGenresUseCase {
  constructor(
    private movieRepository: MovieRepository
  ) {}

  async execute(): Promise<Genre[]> {
    return await this.movieRepository.listGenres();
  }
}
