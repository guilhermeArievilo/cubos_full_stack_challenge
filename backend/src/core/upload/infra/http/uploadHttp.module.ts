import { Module } from "@nestjs/common";
import { UploadImplementationModule } from "../implementation/uploadImplementation.module";
import UploadController from "./controller/upload.controller";
import GeneratePresignedUrlUseCase from "../../domain/application/use-cases/generatePresignedUrlUseCase";

@Module({
  imports: [
    UploadImplementationModule
  ],
  controllers: [
    UploadController
  ],
  providers: [
    GeneratePresignedUrlUseCase
  ],
})
export class UploadHttpModule {}