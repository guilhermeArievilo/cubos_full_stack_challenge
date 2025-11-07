import Genre from "@/core/movie/domain/entities/genre";
import { Prisma, Genre as RawGenre } from "@prisma/client";

export default class MovieGenrePrismaMapper {
  static toPrisma(genre: Genre): Prisma.GenreUncheckedCreateInput {
    return {
      id: genre.id,
      name: genre.name,
      slug: genre.slug,
    };
  }

  static toDomain(raw: RawGenre): Genre {
    return new Genre({ name: raw.name }, raw.id);
  }
}