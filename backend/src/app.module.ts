import { Module } from '@nestjs/common';
import { AuthModule } from './core/auth/infra/auth.module';
import { UserModule } from './core/user/infra/user.module';
import { MovieModule } from './core/movie/infra/movie.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MovieModule
  ],
})
export class AppModule {}
