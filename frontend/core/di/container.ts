import AuthRemoteDatasource from "@/core/features/auth/data/datasource/authRemoteDatasource";
import { AuthStoreDatasource } from "@/core/features/auth/data/datasource/authStoreDatasource";
import AuthRepositoryImpl from "@/core/features/auth/data/repository/authRepositoryImpl";
import LoginUseCase from "@/core/features/auth/domain/use-cases/loginUseCase";
import LogoutUseCase from "@/core/features/auth/domain/use-cases/logoutUseCase";
import RefreshUseCase from "@/core/features/auth/domain/use-cases/refreshUseCase";
import RegisterUseCase from "@/core/features/auth/domain/use-cases/registerUseCase";
import GenreRemoteDatasource from "@/core/features/movie/data/datasource/genreRemoteDatasource";
import LanguageRemoteDatasource from "@/core/features/movie/data/datasource/languageRemoteDatasource";
import MovieRemoteDatasource from "@/core/features/movie/data/datasource/movieRemoteDatasource";
import RatingRemoteDatasource from "@/core/features/movie/data/datasource/ratingRemoteDatasource";
import MovieDataRepositoryImpl from "@/core/features/movie/data/repository/movieDataRepositoryImpl";
import AddMovieUseCase from "@/core/features/movie/domain/use-cases/addMovieUseCase";
import CreateGenreUseCase from "@/core/features/movie/domain/use-cases/createGenreUseCase";
import DeleteMovieUseCase from "@/core/features/movie/domain/use-cases/deleteMovieUseCase";
import GetMovieBySlugUseCase from "@/core/features/movie/domain/use-cases/getMovieBySlugUseCase";
import ListGenresUseCase from "@/core/features/movie/domain/use-cases/listGenresUseCase";
import ListLanguagesUseCase from "@/core/features/movie/domain/use-cases/listLanguagesUseCase";
import ListMoviesUseCase from "@/core/features/movie/domain/use-cases/listMoviesUseCase";
import ListRatingsUseCase from "@/core/features/movie/domain/use-cases/listRatingsUseCase";
import UpdateMovieUseCase from "@/core/features/movie/domain/use-cases/updateMovieUseCase";
import BucketRemoteUploadDatasource from "@/core/features/upload/data/datasource/bucketRemoteUploadDatasource";
import UploadRemoteDatasource from "@/core/features/upload/data/datasource/uploadRemoteDatasource";
import UploadRepositoryImpl from "@/core/features/upload/data/repository/uploadRepositoryImpl";
import UploadUseCase from "@/core/features/upload/domain/use-cases/uploadFileUseCase";



type createContainerProps = {
  authStore: AuthStoreDatasource
}

export type AppContainer = ReturnType<typeof createContainer>

export function createContainer({
  authStore
}: createContainerProps) {
  const authRemoteDatasource = new AuthRemoteDatasource();
  const authRepository = new AuthRepositoryImpl(authRemoteDatasource, authStore);

  const authModule = {
    loginUseCase: new LoginUseCase(authRepository),
    logoutUseCase: new LogoutUseCase(authRepository),
    refreshUseCase: new RefreshUseCase(authRepository),
    registerUseCase: new RegisterUseCase(authRepository)
  }

  const movieRemoteDatasource = new MovieRemoteDatasource();
  const genreRemoteDatasource = new GenreRemoteDatasource();
  const languageRemoteDatasource = new LanguageRemoteDatasource();
  const ratingRemoteDatasource = new RatingRemoteDatasource();

  const movieRepository = new MovieDataRepositoryImpl(
    movieRemoteDatasource,
    genreRemoteDatasource,
    languageRemoteDatasource,
    ratingRemoteDatasource
  );

  const movieModule = {
    addMovie: new AddMovieUseCase(movieRepository),
    createGenre: new CreateGenreUseCase(movieRepository),
    deleteMovie: new DeleteMovieUseCase(movieRepository),
    getMovieBySlug: new GetMovieBySlugUseCase(movieRepository),
    listGenres: new ListGenresUseCase(movieRepository),
    listMovies: new ListMoviesUseCase(movieRepository),
    listLanguages: new ListLanguagesUseCase(movieRepository),
    updateMovie: new UpdateMovieUseCase(movieRepository),
    listRatings: new ListRatingsUseCase(movieRepository)
  }

  const bucketRemoteUploadDatasource = new BucketRemoteUploadDatasource();
  const uploadRemoteDatasource = new UploadRemoteDatasource();
  
  const uploadRepository = new UploadRepositoryImpl(
    bucketRemoteUploadDatasource,
    uploadRemoteDatasource
  );

  const uploadModule = {
    upload: new UploadUseCase(uploadRepository)
  }

  return {
    authModule,
    movieModule,
    uploadModule
  }
}
