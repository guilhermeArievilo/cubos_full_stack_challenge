import UserRepository, { CreateUserDTO } from "@/core/users/domain/application/repository/userRepository";
import User from "@/core/users/domain/entity/user";
import { PrismaService } from "@/shared/infra/db/prisma/database.service";
import { Injectable } from "@nestjs/common";
import UserPrismaMapper from "../mapper/userPrismaMapper";

@Injectable()
export default class UserRepositoryImpl implements UserRepository {
  constructor(
    private prismaService: PrismaService
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const rawUserData = await this.prismaService.user.findUnique({ where: { email } });

    if (!rawUserData) {
      return null;
    }

    return UserPrismaMapper.toDomain(rawUserData);
  }

  async findById(id: string): Promise<User | null> {
    const rawUserData = await this.prismaService.user.findUnique({ where: { id } });

    if (!rawUserData) {
      return null;
    }

    return UserPrismaMapper.toDomain(rawUserData);
  }

  async create(data: CreateUserDTO): Promise<User> {
    const rawUserData = await this.prismaService.user.create({ data });

    return UserPrismaMapper.toDomain(rawUserData);
  }
}
