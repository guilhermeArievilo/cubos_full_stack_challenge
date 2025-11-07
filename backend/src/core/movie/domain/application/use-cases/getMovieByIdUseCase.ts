import { Injectable } from "@nestjs/common";
import MovieRepository from "../repository/movieRepository";
import Movie from "../../entities/movie";
import ResourceNotFoundError from "@/shared/exceptions/resourceNotFoundError";

@Injectable()
export default class GetMovieByIdUseCase {
  constructor(
    private movieRepository: MovieRepository
  ) {}

  async execute(id: string): Promise<Movie> {
    const movie = await this.movieRepository.getMovieById(id);

    if (!movie) {
      throw new ResourceNotFoundError("Movie");
    }

    return movie;
  }
}