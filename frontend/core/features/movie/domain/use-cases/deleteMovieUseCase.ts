import MovieRepository from "../repository/movieRepository";

export default class DeleteMovieUseCase {
  constructor(
    private movieRepository: MovieRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.movieRepository.deleteMovie(id);
  }
}