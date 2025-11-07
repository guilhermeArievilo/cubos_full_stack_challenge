import { Module } from "@nestjs/common";
import { UserDatabaseModule } from "../db/userDatabase.module";
import FindUserByEmailUseCase from "../../domain/application/use-cases/findUserByEmailUseCase";
import { UserController } from "./controller/user.controller";
import CreateUserUseCase from "../../domain/application/use-cases/createUserUseCase";

@Module({
  imports: [UserDatabaseModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    FindUserByEmailUseCase
  ],
})
export class UserHttpModule {}