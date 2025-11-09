import { Module } from "@nestjs/common";
import { MovieImplementationModule } from "../implementation/movieImplementation.module";
import { MovieController } from "./controller/movie.controller";
import AddMovieUseCase from "../../domain/application/use-cases/addMovieUseCase";
import GetMovieBySlugUseCase from "../../domain/application/use-cases/getMovieBySlugUseCase";
import ListMoviesUseCase from "../../domain/application/use-cases/listMoviesUseCase";
import UpdateMovieUseCase from "../../domain/application/use-cases/updateMovieUseCase";
import DeleteMovieUseCase from "../../domain/application/use-cases/deleteMovieUseCase";
import FindUserByEmailUseCase from "@/core/user/domain/application/use-cases/findUserByEmailUseCase";
import { UserDatabaseModule } from "@/core/user/infra/db/userDatabase.module";
import { GenreController } from "./controller/genre.controller";
import ListGenresUseCase from "../../domain/application/use-cases/listGenresUseCase";
import CreateGenreUseCase from "../../domain/application/use-cases/createGenreUseCase";
import ListLanguagesUseCase from "../../domain/application/use-cases/listLanguagesUseCase";
import { LanguageController } from "./controller/language.controller";
import ListRatingsUseCase from "../../domain/application/use-cases/listRatingsUseCase";
import { RatingController } from "./controller/rating.controller";

@Module({
  imports: [
    MovieImplementationModule,
    UserDatabaseModule
  ],
  controllers: [
    MovieController,
    GenreController,
    LanguageController,
    RatingController
  ],
  providers: [
    AddMovieUseCase,
    GetMovieBySlugUseCase,
    ListMoviesUseCase,
    UpdateMovieUseCase,
    DeleteMovieUseCase,
    FindUserByEmailUseCase,
    ListGenresUseCase,
    CreateGenreUseCase,
    ListLanguagesUseCase,
    ListRatingsUseCase
  ],
})
export class MovieHttpModule {}