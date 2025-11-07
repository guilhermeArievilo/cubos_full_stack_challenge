import { Module } from "@nestjs/common";
import AuthRepository from "../../domain/application/repository/authRepository";
import AuthRepositoryImpl from "./prisma/repository/authRepositoryImpl";
import { PrismaService } from "@/shared/infra/db/prisma/database.service";

@Module({
  providers: [
    PrismaService,
    {
      provide: AuthRepository,
      useClass: AuthRepositoryImpl,
    },
  ],
  exports: [AuthRepository],
})
export class AuthDatabaseModule {}