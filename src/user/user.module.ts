import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
// import {
//   EmailEhUnicoValidator,
//   NomeEhUnicoValidator,
// } from './validator/email-unico.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.enetity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    // EmailEhUnicoValidator,
    // NomeEhUnicoValidator,
  ],
})
export class UserModule {}
