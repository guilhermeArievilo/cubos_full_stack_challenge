import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class CreateGenreBodyDto {
  @ApiProperty({ example: 'Ação', description: 'Nome do Gênero do filme' })
  @IsNotEmpty()
  @IsString()
  name: string;
}