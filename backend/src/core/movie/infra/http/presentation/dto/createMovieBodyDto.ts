import { MovieStatus } from "@/core/movie/domain/entities/movieStatus";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Max, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Rating } from "@/core/movie/domain/entities/rating";
export default class CreateMovieBodyDTO {
  @ApiProperty({ example: 'Bumblebee', description: 'Título do filme' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Bumblebee', description: 'Título Original do filme' })
  @IsNotEmpty()
  @IsString()
  originalTitle: string;

  @ApiProperty({ example: 'Every hero has a beginning.', description: 'Frase curta, memorável e impactante.' })
  @IsNotEmpty()
  @IsString()
  tagline: string;

  @ApiProperty({ example: 'Em 1987, Bumblebee, um Autobot, encontra refúgio na pequena cidade californiana de Brighton Falls. Charlie Watson, uma adolescente à beira dos 18 anos, encontra um Volkswagen Fusca....', description: 'Frase curta, memorável e impactante.' })
  @IsNotEmpty()
  @IsString()
  synopsis: string;

  @ApiProperty({ description: 'Gêneros do filme.' })
  @IsNotEmpty()
  genres: string[];

  @ApiProperty({ description: 'Imagem de background do filme.' })
  @IsNotEmpty()
  @IsString()
  backdropPath: string;

  @ApiProperty({ description: 'Imagem de capa do filme.' })
  @IsNotEmpty()
  @IsString()
  posterPath: string;
  
  @ApiProperty({ description: 'Classificação indicativa.' })
  @IsNotEmpty()
  rating: Rating;
  
  @ApiProperty({ description: 'Quantidade de votos' })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  voteCount: number;
  
  @ApiProperty({ description: 'Média de votos' })
  @IsOptional()
  @IsPositive()
  @Min(0, { message: 'O valor mínimo é 0' })
  @Max(10, { message: 'O valor máximo é 10' })
  @IsNumber()
  voteAverage: number;
  
  @ApiProperty({ example: '115', description: 'Duração em minutos' })
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  duration: number;

  @ApiProperty({ description: 'Status do filme' })
  @IsNotEmpty()
  status: MovieStatus;
  
  @ApiProperty({ description: 'Orçamento do filme' })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  budget: number;
  
  @ApiProperty({ description: 'Receita do filme' })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  revenue: number;
  
  @ApiProperty({ description: 'Linguagem original' })
  @IsNotEmpty()
  @IsString()
  originalLanguage: string;

  @ApiProperty({ description: 'Link do trailer' })
  @IsNotEmpty()
  @IsString()
  trailerLink: string;

  @ApiProperty({ description: 'Data de lançamento' })
  @IsNotEmpty()
  releaseDate: Date;
}