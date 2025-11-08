import RequiredFieldError from "@/core/exceptions/errors/requiredFieldError";
import { MovieProps } from "../entities/movie";
import MovieRepository from "../repository/movieRepository";

export default class AddMovieUseCase {
  constructor(
    private movieRepository: MovieRepository
  ) {}

  async execute(data: MovieProps): Promise<void> {
    const keys = Object.keys(data);

    for (const key of keys) {
      if (data[key as keyof MovieProps] === undefined) {
        throw new RequiredFieldError(key);
      }
    }

    await this.movieRepository.addMovie(data);
  }
}