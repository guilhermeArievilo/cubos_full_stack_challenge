import { IsEmail, IsNotEmpty } from "class-validator";

export default class CreateUserBodyDTO {
  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  password: string;
}