import { Injectable } from "@nestjs/common";
import MovieRepository from "../repository/movieRepository";
import { RatingData } from "../../entities/rating";

@Injectable()
export default class ListRatingsUseCase {
  constructor(
    private movieRepository: MovieRepository
  ) {}

  async execute(): Promise<RatingData[]> {
    return await this.movieRepository.listRatings();
  }
}
