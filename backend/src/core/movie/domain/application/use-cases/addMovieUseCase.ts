import { Injectable } from "@nestjs/common";
import MovieRepository from "../repository/movieRepository";
import Movie, { MovieProps } from "../../entities/movie";
import UserRepository from "@/core/user/domain/application/repository/userRepository";
import ResourceNotFoundError from "@/shared/exceptions/resourceNotFoundError";
import RequiredFieldError from "@/shared/exceptions/requiredFieldError";
import { ResourceAlreadyExistError } from "@/shared/exceptions/resourceAlreadyExistError";
import FieldValidationError from "@/shared/exceptions/fieldValidationError";

@Injectable()
export default class AddMovieUseCase {
  constructor(
    private movieRepository: MovieRepository,
    private userRepository: UserRepository
  ) {}

  async execute(data: MovieProps, email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new ResourceNotFoundError("User");

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
      throw new FieldValidationError("The average votes should be a value between 0 and 10.");
    }

    const result = await Promise.all([
      this.movieRepository.findMovieByTitle(data.title),
      this.movieRepository.findMovieByOriginalTitle(data.originalTitle)
    ])

    if (result[0] !== null || result[1] !== null) {
      throw new ResourceAlreadyExistError({
        resource: "Movie",
        field: result[0] !== null ? "Title" : "Original Title"
      });
    }

    const movie = new Movie(data, user.id!);

    await this.movieRepository.addMovie(movie);
  }
}