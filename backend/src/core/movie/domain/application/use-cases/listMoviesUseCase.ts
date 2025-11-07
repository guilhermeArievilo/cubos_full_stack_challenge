import { Injectable } from "@nestjs/common";
import MovieRepository, { ListMoviesParamsRequestDto, PaginatedDataResponseDto } from "../repository/movieRepository";
import Movie, { MovieProps } from "../../entities/movie";

@Injectable()
export default class ListMoviesUseCase {
  constructor(
    private movieRepository: MovieRepository
  ) {}

  async execute(params: ListMoviesParamsRequestDto): Promise<PaginatedDataResponseDto<Movie>> {
    const {
      page = 1,
      limit = 10,
      orderBy = 'title',
      order = 'asc',
      ...filters
    } = params

    return await this.movieRepository.listMovies({
      page,
      limit,
      orderBy,
      order,
      ...filters
    });
  }
}
