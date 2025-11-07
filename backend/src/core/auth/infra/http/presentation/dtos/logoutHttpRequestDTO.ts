import { IsNotEmpty } from "class-validator";

export default class LogoutHttpRequestDTO {
  @IsNotEmpty()
  refreshToken: string;
}