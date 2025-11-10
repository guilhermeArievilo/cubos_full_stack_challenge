import { PrismaService } from "@/shared/infra/db/prisma/database.service";
import { Module } from "@nestjs/common";
import MovieRepository from "../../domain/application/repository/movieRepository";
import MovieRepositoryImpl from "./repository/movieRepositoryImpl";
import MovieReminderListener from "../listeners/movieReminder.listener";
import { ScheduleModule } from "@nestjs/schedule";
import EmailImplementationModule from "@/core/email/infra/implementation/emailImplementation.module";

@Module({
  imports: [
    ScheduleModule,
    EmailImplementationModule
  ],
  providers: [
    PrismaService,
    MovieReminderListener,
    {
      provide: MovieRepository,
      useClass: MovieRepositoryImpl,
    },
  ],
  exports: [MovieRepository],
})
export class MovieImplementationModule {}