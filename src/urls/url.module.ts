import { UrlEntity } from './entities/url.entity';
import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
// import {
//   EmailEhUnicoValidator,
//   // NomeEhUnicoValidator,
// } from './validator/email.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlService } from './url.service';
import { UserEntity } from '../user/entities/user.enetity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UrlEntity])],
  controllers: [UrlController],
  providers: [
    UrlService,
    // NomeEhUnicoValidator,
  ],
})
export class UrlModule {}
