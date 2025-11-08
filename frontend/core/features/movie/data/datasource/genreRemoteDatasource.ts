import api from "@/infra/http/axios/api";
import { Genre } from "../../domain/entities/genre";

export default class GenreRemoteDatasource {
  public async addGenre(name: string): Promise<Genre> {
    const res = await api.post('/genre/register', {
      name
    });
    return res.data;
  }

  public async findGenreBySlug(slug: string): Promise<Genre> {
    const res = await api.get<Genre>(`/genre/${slug}`);
    return res.data;
  }

  public async listGenres(): Promise<Genre[]> {
    const res = await api.get<Genre[]>(`/genre/list`);
    return res.data;
  }
}