import { RatingData } from "../entities/rating";
import MovieRepository from "../repository/movieRepository";

export default class ListRatingsUseCase {
  constructor(
    private movieRepository: MovieRepository
  ) {}

  async execute(): Promise<RatingData[]> {
    return await this.movieRepository.listRatings();
  }
}
