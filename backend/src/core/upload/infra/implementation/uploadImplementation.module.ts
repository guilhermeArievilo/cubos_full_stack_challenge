import { Module } from "@nestjs/common";
import { AwsS3Service } from "../aws/awsS3.service";
import UploadRepository from "../../domain/application/repository/uploadRepository";
import UploadRepositoryImpl from "./repository/uploadRepositoryImpl";

@Module({
  providers: [
    AwsS3Service,
    {
      provide: UploadRepository,
      useClass: UploadRepositoryImpl
    }
  ],
  exports: [UploadRepository]
})
export class UploadImplementationModule {};