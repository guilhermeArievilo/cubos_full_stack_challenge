import { Module } from "@nestjs/common";
import { AuthDatabaseModule } from "../db/authDatabase.module";
import { JwtServiceRS } from "@/shared/infra/jwt/jwt.service";
import { AuthController } from "./controller/auth.controller";
import LoginUseCase from "../../domain/application/use-cases/loginUseCase";
import LogoutUseCase from "../../domain/application/use-cases/logoutUseCase";
import RefreshUseCase from "../../domain/application/use-cases/refreshUseCase";
import { PrismaService } from "@/shared/infra/db/prisma/database.service";
import { JwtStrategy } from "@/shared/infra/jwt/jwt.strategy";
import UserRepository from "@/core/user/domain/application/repository/userRepository";
import UserRepositoryImpl from "@/core/user/infra/db/prisma/repository/userRepositoryImpl";

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