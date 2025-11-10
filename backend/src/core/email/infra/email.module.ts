import { Module } from "@nestjs/common";
import EmailImplementationModule from "./implementation/emailImplementation.module";
import SendEmailUseCase from "../domain/application/use-cases/sendEmailUsecase";

@Module({
  imports: [
    EmailImplementationModule
  ]
})
export default class EmailModule {}