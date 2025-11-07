import { IsNotEmpty } from "class-validator";

export default class CreateUserBodyDTO {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}