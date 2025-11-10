import { Module } from '@nestjs/common';
import { AuthModule } from './core/auth/infra/auth.module';
import { UserModule } from './core/user/infra/user.module';
import { MovieModule } from './core/movie/infra/movie.module';
import { ConfigModule } from '@nestjs/config';
import UploadModule from './core/upload/infra/upload.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    UploadModule,
    UserModule,
    AuthModule,
    MovieModule
  ],
})
export class AppModule {}
