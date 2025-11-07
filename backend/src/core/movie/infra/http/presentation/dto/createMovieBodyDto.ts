import { MovieStatus } from "@/core/movie/domain/entities/movieStatus";
import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";
import { GenreHttpDto } from "./genreHttpDto";

export default class CreateMovieBodyDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  originalTitle: string;

  @IsNotEmpty()
  @IsString()
  tagline: string;

  @IsNotEmpty()
  @IsString()
  synopsis: string;

  @IsNotEmpty()
  genres: GenreHttpDto[];

  @IsNotEmpty()
  @IsString()
  backdropPath: string;

  @IsNotEmpty()
  @IsString()
  posterPath: string;
  
  @IsNotEmpty()
  @IsPositive()
  rating: number;
  
  @IsNotEmpty()
  @IsPositive()
  voteCount: number;
  
  @IsNotEmpty()
  @IsPositive()
  voteAverage: number;
  
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  duration: number;

  @IsNotEmpty()
  status: MovieStatus;
  
  @IsNotEmpty()
  @IsPositive()
  budget: number;
  
  @IsNotEmpty()
  @IsPositive()
  revenue: number;
  
  @IsNotEmpty()
  @IsString()
  originalLanguage: string;

  @IsNotEmpty()
  @IsString()
  trailerLink: string;

  @IsNotEmpty()
  releaseDate: Date;
}