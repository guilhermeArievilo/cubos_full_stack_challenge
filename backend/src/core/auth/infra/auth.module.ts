import { Module } from "@nestjs/common";
import { AuthDatabaseModule } from "./db/authDatabase.module";
import { AuthHttpModule } from "./http/authHttp.module";

@Module({
  imports: [AuthDatabaseModule, AuthHttpModule]
})
export class AuthModule {}