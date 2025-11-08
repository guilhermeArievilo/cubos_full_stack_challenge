import { Movie, MovieCard } from "../entities/movie";
import MovieRepository, { ListMoviesParamsRequestDto, PaginatedDataResponseDto } from "../repository/movieRepository";

export default class ListMoviesUseCase {
  constructor(
    private movieRepository: MovieRepository
  ) {}

  async execute(params: ListMoviesParamsRequestDto): Promise<PaginatedDataResponseDto<MovieCard>> {
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
