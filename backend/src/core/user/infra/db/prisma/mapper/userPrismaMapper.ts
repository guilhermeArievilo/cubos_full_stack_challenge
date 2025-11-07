import User from "@/core/users/domain/entity/user";
import { User as RawUser } from "@prisma/client";

export default class UserPrismaMapper {
  static toPrisma(user: User): RawUser {
    return {
      id: user.id!,
      name: user.name  || '',
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User({
      name: raw.name,
      email: raw.email,
      password: raw.password,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }, raw.id);
  }
}