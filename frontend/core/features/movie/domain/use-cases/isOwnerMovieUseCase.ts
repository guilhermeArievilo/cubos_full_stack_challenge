import MovieRepository from "../repository/movieRepository";

export default class IsOwnerMovieUseCase {
  constructor(
    private movieRepository: MovieRepository
  ) {}

  async execute(movieId: string) {
    return await this.movieRepository.isOwner(movieId);
  }
}