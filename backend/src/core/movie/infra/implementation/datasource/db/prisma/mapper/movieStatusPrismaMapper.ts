import { MovieStatus } from "@/core/movie/domain/entities/movieStatus";
import { $Enums } from "@prisma/client";

export default class MovieStatusPrismaMapper {
  static toPrismaStatus(status: MovieStatus): $Enums.MovieStatus {
    return $Enums.MovieStatus[MovieStatus[status] as keyof typeof $Enums.MovieStatus];
  }

  static fromPrismaStatus(status: $Enums.MovieStatus): MovieStatus {
    return MovieStatus[status as keyof typeof MovieStatus];
  }
}