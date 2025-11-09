import { Injectable } from "@nestjs/common";
import MovieRepository from "../repository/movieRepository";
import { Language } from "../../entities/language";

@Injectable()
export default class ListLanguagesUseCase {
  constructor(
    private movieRepository: MovieRepository
  ) {}

  async execute(): Promise<Language[]> {
    return await this.movieRepository.listLanguages();
  }
}
