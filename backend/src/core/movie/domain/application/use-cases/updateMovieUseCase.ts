import { Injectable } from "@nestjs/common";
import MovieRepository from "../repository/movieRepository";
import { MovieProps } from "../../entities/movie";
import User from "@/core/user/domain/entity/user";
import ResourceNotFoundError from "@/shared/exceptions/resourceNotFoundError";
import { ResourceAlreadyExistError } from "@/shared/exceptions/resourceAlreadyExistError";
import UserPermissionError from "@/shared/exceptions/userPermissionError";

@Injectable()
export default class UpdateMovieUseCase {
  constructor(
    private movieRepository: MovieRepository
  ) {}

  async execute(id: string, data: Partial<MovieProps>, User: User): Promise<void> {
    const movie = await this.movieRepository.getMovieById(id);
    if (!movie) throw new ResourceNotFoundError("Movie");

    if (movie.createdById !== User.id) throw new UserPermissionError();
    
    if (data.title) {
      this.movieRepository.findMovieByTitle(data.title)
        .then(movie => {
          if (movie) {
            throw new ResourceAlreadyExistError({
              resource: "Movie",
              field: "Title"
            });
          }
        })
    }
    
    if (data.originalTitle) {
      this.movieRepository.findMovieByTitle(data.originalTitle)
        .then(movie => {
          if (movie) {
            throw new ResourceAlreadyExistError({
              resource: "Movie",
              field: "Original Title"
            });
          }
        })
    }

    await this.movieRepository.updateMovie(id, data);
  }
}