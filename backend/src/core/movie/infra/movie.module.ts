import { Module } from "@nestjs/common";
import { MovieImplementationModule } from "./implementation/movieImplementation.module";
import { MovieHttpModule } from "./http/movieHttp.module";

@Module({
  imports: [
    MovieImplementationModule,
    MovieHttpModule
  ]
})
export class MovieModule {};