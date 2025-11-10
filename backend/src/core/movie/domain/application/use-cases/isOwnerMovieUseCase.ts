import { Injectable } from "@nestjs/common";
import MovieRepository from "../repository/movieRepository";
import ResourceNotFoundError from "@/shared/exceptions/resourceNotFoundError";

@Injectable()
export default class IsOwnerMovieUseCase {
  constructor(
    private movieRepository: MovieRepository
  ) {}

  async execute(userid: string, movieId: string): Promise<boolean> {
    const movie = await this.movieRepository.getMovieById(movieId);
    
    if (!movie) {
      throw new ResourceNotFoundError("Movie");
    }

    if (movie?.createdById === userid) {
      return true;
    }

    return false;
  }
}