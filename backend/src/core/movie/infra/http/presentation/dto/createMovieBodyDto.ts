import { MovieStatus } from "@/core/movie/domain/entities/movieStatus";
import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";
import { GenreHttpDto } from "./genreHttpDto";
import { ApiProperty } from "@nestjs/swagger";

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
  genres: GenreHttpDto[];

  @ApiProperty({ description: 'Imagem de background do filme.' })
  @IsNotEmpty()
  @IsString()
  backdropPath: string;

  @ApiProperty({ description: 'Imagem de capa do filme.' })
  @IsNotEmpty()
  @IsString()
  posterPath: string;
  
  @ApiProperty({ description: 'Classificação.' })
  @IsNotEmpty()
  @IsPositive()
  rating: number;
  
  @ApiProperty({ description: 'Quantidade de votos' })
  @IsNotEmpty()
  @IsPositive()
  voteCount: number;
  
  @ApiProperty({ description: 'Média de votos' })
  @IsNotEmpty()
  @IsPositive()
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
  @IsNotEmpty()
  @IsPositive()
  budget: number;
  
  @ApiProperty({ description: 'Receita do filme' })
  @IsNotEmpty()
  @IsPositive()
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