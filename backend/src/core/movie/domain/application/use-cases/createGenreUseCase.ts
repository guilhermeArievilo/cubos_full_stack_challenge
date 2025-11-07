import { Injectable } from "@nestjs/common";
import MovieRepository from "../repository/movieRepository";
import Genre, { GenreProps } from "../../entities/genre";
import createSlug from "@/shared/helpers/slugify";
import { ResourceAlreadyExistError } from "@/shared/exceptions/resourceAlreadyExistError";

@Injectable()
export default class CreateGenreUseCase {
  constructor(
    private movieRepository: MovieRepository
  ) {}

  async execute(data: GenreProps): Promise<Genre> {
    const generatedSlug = createSlug(data.name)
    const result = await this.movieRepository.findGenreBySlug(generatedSlug);

    if (result) {
      throw new ResourceAlreadyExistError({
        resource: "Genre"
      });
    }

    return this.movieRepository.addGenre(data);
  }
}