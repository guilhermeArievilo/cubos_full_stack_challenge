import { PrismaService } from "@/shared/infra/db/prisma/database.service";
import { Module } from "@nestjs/common";
import MovieRepository from "../../domain/application/repository/movieRepository";
import MovieRepositoryImpl from "./repository/movieRepositoryImpl";

@Module({
  providers: [
    PrismaService,
    {
      provide: MovieRepository,
      useClass: MovieRepositoryImpl,
    },
  ],
  exports: [MovieRepository],
})
export class MovieImplementationModule {}