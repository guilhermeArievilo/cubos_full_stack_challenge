import { Module } from '@nestjs/common';
import { AuthModule } from './core/auth/infra/auth.module';
import { UserModule } from './core/user/infra/user.module';

@Module({
  imports: [
    UserModule,
    AuthModule
  ],
})
export class AppModule {}
