import { MovieStatus } from "@/core/movie/domain/entities/movieStatus";
import { IsInt, IsOptional, IsPositive, IsString, Max, Min } from "class-validator";
import { GenreHttpDto } from "./genreHttpDto";
import { Rating } from "@/core/movie/domain/entities/rating";

export default class UpdateMovieBodyDTO {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  originalTitle: string;

  @IsOptional()
  @IsString()
  tagline: string;

  @IsOptional()
  @IsString()
  synopsis: string;

  @IsOptional()
  genres: GenreHttpDto[];

  @IsOptional()
  @IsString()
  backdropPath: string;

  @IsOptional()
  @IsString()
  posterPath: string;
  
  @IsOptional()
  @IsString()
  rating: Rating;
  
  @IsOptional()
  @IsPositive()
  voteCount: number;
  
  @IsOptional()
  @IsPositive()
  @Min(0, { message: 'O valor mínimo é 0' })
  @Max(10, { message: 'O valor máximo é 10' })
  voteAverage: number;
  
  @IsOptional()
  @IsPositive()
  @IsInt()
  duration: number;

  @IsOptional()
  status: MovieStatus;
  
  @IsOptional()
  @IsPositive()
  budget: number;
  
  @IsOptional()
  @IsPositive()
  revenue: number;
  
  @IsOptional()
  @IsString()
  originalLanguage: string;

  @IsOptional()
  @IsString()
  trailerLink: string;

  @IsOptional()
  releaseDate: Date;
}