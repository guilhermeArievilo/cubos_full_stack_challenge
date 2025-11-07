import { Injectable } from "@nestjs/common";
import MovieRepository from "../repository/movieRepository";
import Movie from "../../entities/movie";
import ResourceNotFoundError from "@/shared/exceptions/resourceNotFoundError";

@Injectable()
export default class GetMovieBySlugUseCase {
  constructor(
    private movieRepository: MovieRepository
  ) {}

  async execute(slug: string): Promise<Movie> {
    const movie = await this.movieRepository.getMovieBySlug(slug);

    if (!movie) {
      throw new ResourceNotFoundError("Movie");
    }

    return movie;
  }
}