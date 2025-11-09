import { Language } from "../entities/language";
import MovieRepository from "../repository/movieRepository";

export default class ListLanguagesUseCase {
  constructor(
    private movieRepository: MovieRepository
  ) {}

  async execute(): Promise<Language[]> {
    return await this.movieRepository.listLanguages();
  }
}
