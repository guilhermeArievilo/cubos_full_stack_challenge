import { Module } from "@nestjs/common";
import { AuthDatabaseModule } from "../db/authDatabase.module";
import { JwtServiceRS } from "@/shared/infra/jwt/jwt.service";
import { AuthController } from "./controller/auth.controller";
import LoginUseCase from "../../domain/application/use-cases/loginUseCase";
import LogoutUseCase from "../../domain/application/use-cases/logoutUseCase";
import RefreshUseCase from "../../domain/application/use-cases/refreshUseCase";
import UserRepositoryImpl from "@/core/users/infra/db/prisma/repository/userRepositoryImpl";
import UserRepository from "@/core/users/domain/application/repository/userRepository";
import { PrismaService } from "@/shared/infra/db/prisma/database.service";
import { JwtStrategy } from "@/shared/infra/jwt/jwt.strategy";

@Module({
  imports: [AuthDatabaseModule],
  controllers: [AuthController],
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl
    },
    JwtServiceRS,
    LoginUseCase,
    LogoutUseCase,
    RefreshUseCase,
    JwtStrategy
  ],
})
export class AuthHttpModule {}