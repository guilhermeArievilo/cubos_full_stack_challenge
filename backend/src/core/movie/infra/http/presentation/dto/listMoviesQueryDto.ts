import {
  IsOptional,
  IsInt,
  IsString,
  IsEnum,
  IsPositive,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ListMoviesQueryDTO {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @IsString()
  orderBy?: string;

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  query?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  duration?: number;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsDateString()
  startReleaseData?: string;

  @IsOptional()
  @IsDateString()
  endReleaseData?: string;
}