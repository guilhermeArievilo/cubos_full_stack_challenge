import { Rating } from "@/core/movie/domain/entities/rating";
import { $Enums } from "@prisma/client";

export default class RatingPrismaMapper {
  static toPrismaRating(rating: Rating): $Enums.Rating {
    return $Enums.Rating[Rating[rating] as keyof typeof $Enums.Rating];
  }

  static fromPrismaRating(rating: $Enums.Rating): Rating {
    return Rating[rating as keyof typeof Rating];
  }
}