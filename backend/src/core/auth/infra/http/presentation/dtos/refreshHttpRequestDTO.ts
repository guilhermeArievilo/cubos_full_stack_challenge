import { IsNotEmpty } from "class-validator";

export default class RefreshHttpRequestDTO {
  @IsNotEmpty()
  refreshToken: string;
}