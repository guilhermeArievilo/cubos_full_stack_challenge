import { Module } from "@nestjs/common";
import { UserDatabaseModule } from "./db/userDatabase.module";
import { UserHttpModule } from "./http/userHttp.module";

@Module({
  imports: [UserDatabaseModule, UserHttpModule],
})
export class UserModule {}
