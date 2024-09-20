import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfigService } from './config/db.config.service';
import { ConfigModule } from '@nestjs/config';
import { UrlModule } from './urls/url.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    UrlModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DbConfigService,
      inject: [DbConfigService]
    }),
    AuthModule
  ]
})
export class AppModule {}
