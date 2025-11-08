import ResourceAlreadyExist from "@/core/exceptions/errors/resourceAlreadyExist";
import { Genre } from "../entities/genre";
import MovieRepository from "../repository/movieRepository";

export default class CreateGenreUseCase {
  constructor(
    private movieRepository: MovieRepository
  ) {}

  async execute(name: string): Promise<Genre> {
    return this.movieRepository.addGenre(name);
  }
}