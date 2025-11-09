import { Module } from "@nestjs/common";
import { UploadImplementationModule } from "./implementation/uploadImplementation.module";
import { UploadHttpModule } from "./http/uploadHttp.module";

@Module({
  imports: [
    UploadImplementationModule,
    UploadHttpModule
  ]
})
export default class UploadModule {}