import Genre from "@/core/movie/domain/entities/genre";
import { GenreHttpDto } from "../dto/genreHttpDto";

export default class GenreViewModel {
  static toHttp(data: Genre): GenreHttpDto {
    return {
      id: data.id,
      name: data.name,
      slug: data.slug
    }
  }

  static toDomain(data: GenreHttpDto): Genre {
    const domainGenre = new Genre({
      name: data.name,
      slug: data.slug
    }, data.id);

    return domainGenre;
  }
}