import { IsNotEmpty } from "class-validator";

export default class LoginHttpRequestDTO {
  @IsNotEmpty()
  identifier: string;

  @IsNotEmpty()
  password: string;
}