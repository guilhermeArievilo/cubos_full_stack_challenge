import { Module } from "@nestjs/common";
import EmailRepository from "../../domain/application/repository/emailRepository";
import EmailRepositoryImpl from "./repository/emailRepositoryImpl";
import SendEmailUseCase from "../../domain/application/use-cases/sendEmailUsecase";
import AwsSESService from "../aws/awsSES.service";

@Module({
  providers: [
    AwsSESService,
    {
      provide: EmailRepository,
      useClass: EmailRepositoryImpl
    },
    SendEmailUseCase
  ],
  exports: [EmailRepository, SendEmailUseCase]
})
export default class EmailImplementationModule {}