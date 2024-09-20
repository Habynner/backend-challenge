import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { EmailEhUnicoValidator } from '../utils/validator/email.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.enetity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, EmailEhUnicoValidator],
})
export class UserModule {}
