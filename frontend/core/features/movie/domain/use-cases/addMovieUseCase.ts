import RequiredFieldError from "@/core/exceptions/errors/requiredFieldError";
import { MovieProps } from "../entities/movie";
import MovieRepository from "../repository/movieRepository";
import InvalidFieldError from "@/core/exceptions/errors/invalidFieldError";

export default class AddMovieUseCase {
  constructor(
    private movieRepository: MovieRepository
  ) {}

  async execute(data: MovieProps): Promise<void> {
    const keys = Object.keys(data).filter((key) => 
      key !== 'voteCount' &&
      key !== 'voteAverage' &&
      key !== 'budget' &&
      key !== 'revenue'
    );

    for (const key of keys) {
      if (data[key as keyof MovieProps] === undefined) {
        throw new RequiredFieldError(key);
      }
    }

    if (data.voteAverage && (data.voteAverage < 0 || data.voteAverage > 10)) {
      throw new InvalidFieldError("voteAverage");
    }

    await this.movieRepository.addMovie(data);
  }
}