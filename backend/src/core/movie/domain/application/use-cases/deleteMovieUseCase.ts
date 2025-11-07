import { Injectable, UnauthorizedException } from "@nestjs/common";
import MovieRepository from "../repository/movieRepository";
import User from "@/core/user/domain/entity/user";
import ResourceNotFoundError from "@/shared/exceptions/resourceNotFoundError";
import UserPermissionError from "@/shared/exceptions/userPermissionError";

@Injectable()
export default class DeleteMovieUseCase {
  constructor(
    private movieRepository: MovieRepository
  ) {}

  async execute(id: string, User: User): Promise<void> {
    const movie = await this.movieRepository.getMovieById(id);
    if (!movie) throw new ResourceNotFoundError("Movie");

    if (movie.createdById !== User.id) throw new UserPermissionError();

    await this.movieRepository.deleteMovie(id);
  }
}