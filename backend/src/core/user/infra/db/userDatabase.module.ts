import { PrismaService } from "@/shared/infra/db/prisma/database.service";
import { Module } from "@nestjs/common";
import UserRepository from "../../domain/application/repository/userRepository";
import UserRepositoryImpl from "./prisma/repository/userRepositoryImpl";

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [UserRepository],
})
export class UserDatabaseModule {}