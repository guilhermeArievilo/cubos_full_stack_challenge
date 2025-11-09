import AuthRemoteDatasource from '../features/auth/data/datasource/authRemoteDatasource'
import AuthRepositoryImpl from '../features/auth/data/repository/authRepositoryImpl';
import LoginUseCase from '../features/auth/domain/use-cases/loginUseCase';
import LogoutUseCase from '../features/auth/domain/use-cases/logoutUseCase';
import RefreshUseCase from '../features/auth/domain/use-cases/refreshUseCase';
import RegisterUseCase from '../features/auth/domain/use-cases/registerUseCase';
import { useAuthStore } from '../features/auth/data/datasource/authStoreDatasource';
import MovieDataRepositoryImpl from '../features/movie/data/repository/movieDataRepositoryImpl';
import MovieRemoteDatasource from '../features/movie/data/datasource/movieRemoteDatasource';
import GenreRemoteDatasource from '../features/movie/data/datasource/genreRemoteDatasource';
import AddMovieUseCase from '../features/movie/domain/use-cases/addMovieUseCase';
import CreateGenreUseCase from '../features/movie/domain/use-cases/createGenreUseCase';
import DeleteMovieUseCase from '../features/movie/domain/use-cases/deleteMovieUseCase';
import GetMovieBySlugUseCase from '../features/movie/domain/use-cases/getMovieBySlugUseCase';
import ListGenresUseCase from '../features/movie/domain/use-cases/listGenresUseCase';
import ListMoviesUseCase from '../features/movie/domain/use-cases/listMoviesUseCase';
import UpdateMovieUseCase from '../features/movie/domain/use-cases/updateMovieUseCase';
import ListLanguagesUseCase from '../features/movie/domain/use-cases/listLanguagesUseCase';
import LanguageRemoteDatasource from '../features/movie/data/datasource/languageRemoteDatasource';
import BucketRemoteUploadDatasource from '../features/upload/data/datasource/bucketRemoteUploadDatasource';
import UploadRemoteDatasource from '../features/upload/data/datasource/uploadRemoteDatasource';
import UploadRepositoryImpl from '../features/upload/data/repository/uploadRepositoryImpl';
import UploadUseCase from '../features/upload/domain/use-cases/uploadFileUseCase';
import RatingRemoteDatasource from '../features/movie/data/datasource/ratingRemoteDatasource';
import ListRatingsUseCase from '../features/movie/domain/use-cases/listRatingsUseCase';


export default function useContainer() {
  const authStore = useAuthStore()
  const authRemoteDatasource = new AuthRemoteDatasource();

  const bucketRemoteUploadDatasource = new BucketRemoteUploadDatasource();
  const uploadRemoteDatasource = new UploadRemoteDatasource();

  const movieRemoteDatasource = new MovieRemoteDatasource();
  const genreRemoteDatasource = new GenreRemoteDatasource();
  const languageRemoteDatasource = new LanguageRemoteDatasource();
  const ratingRemoteDatasource = new RatingRemoteDatasource();

  const uploadRepository = new UploadRepositoryImpl(
    bucketRemoteUploadDatasource,
    uploadRemoteDatasource
  );

  const uploadUseCase = new UploadUseCase(uploadRepository);

  const uploadModule = {
    upload: uploadUseCase
  }

  const authRepository = new AuthRepositoryImpl(authRemoteDatasource, authStore);
  
  const loginUseCase = new LoginUseCase(authRepository);
  const logoutUseCase = new LogoutUseCase(authRepository);
  const refreshUseCase = new RefreshUseCase(authRepository);
  const registerUseCase = new RegisterUseCase(authRepository);
  
  const authModule = {
    loginUseCase,
    logoutUseCase,
    refreshUseCase,
    registerUseCase
  }

  const movieRepository = new MovieDataRepositoryImpl(
    movieRemoteDatasource,
    genreRemoteDatasource,
    languageRemoteDatasource,
    ratingRemoteDatasource
  );

  const addMovie = new AddMovieUseCase(movieRepository);
  const createGenre = new CreateGenreUseCase(movieRepository);
  const deleteMovie = new DeleteMovieUseCase(movieRepository);
  const getMovieBySlug = new GetMovieBySlugUseCase(movieRepository);
  const listGenres = new ListGenresUseCase(movieRepository);
  const listMovies = new ListMoviesUseCase(movieRepository);
  const listLanguages = new ListLanguagesUseCase(movieRepository);
  const updateMovie = new UpdateMovieUseCase(movieRepository);
  const listRatings = new ListRatingsUseCase(movieRepository);

  const movieModule = {
    addMovie,
    createGenre,
    deleteMovie,
    getMovieBySlug,
    listGenres,
    listMovies,
    listLanguages,
    listRatings,
    updateMovie
  }

  return {
    authModule,
    movieModule,
    uploadModule
  }
}