import api from "@/infra/http/axios/api";
import { Movie, MovieCard, MovieProps } from "../../domain/entities/movie";
import { ListMoviesParamsRequestDto, PaginatedDataResponseDto } from "../../domain/repository/movieRepository";

export default class MovieRemoteDatasource {
  public async addMovie(data: MovieProps): Promise<void> {
    const res = await api.post('/movie/register', data);
    return res.data;
  }

  public async findMovieBySlug(slug: string): Promise<Movie> {
    const res = await api.get<Movie>(`/movie/by/${slug}`);
    return res.data;
  }

  public async listMovies({
    page,
    limit,
    order,
    orderBy,
    query,
    duration,
    genre,
    releaseDate
  }: ListMoviesParamsRequestDto): Promise<PaginatedDataResponseDto<MovieCard>> {
    const queryParams = new URLSearchParams()

    if (page !== undefined) queryParams.append('page', String(page))
    if (limit !== undefined) queryParams.append('limit', String(limit))
    if (orderBy) queryParams.append('orderBy', String(orderBy))
    if (order) queryParams.append('order', order)

    if (query) queryParams.append('query', query)

    if (duration !== undefined) queryParams.append('duration', duration.toString())
    if (genre !== undefined) queryParams.append('genre', genre)

    if (releaseDate && releaseDate.start) queryParams.append('startReleaseData', releaseDate.start.toISOString())
    if (releaseDate && releaseDate.end) queryParams.append('endReleaseData', releaseDate.end.toISOString())

    const url = `/movie/list?${queryParams.toString()}`
    const res = await api.get<PaginatedDataResponseDto<MovieCard>>(url);
    return res.data;
  }

  public async updateMovie(id: string, data: Partial<MovieProps>): Promise<void> {
    await api.patch(`/movie/${id}`, data);
  }

  public async deleteMovie(id: string): Promise<void> {
    await api.delete(`/movie/${id}`);
  }
}