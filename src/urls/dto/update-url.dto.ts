import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
// import {
//   EmailEhUnico,
//   IsNomeUsuarioUnico,
// } from '../validator/email.validator';
import { Expose } from 'class-transformer';
import { UserEntity } from 'src/user/entities/user.enetity';

export class UpdateUrlDto {

  @Expose({ name: 'url' })
  @IsString()
  @IsNotEmpty({ message: 'The name should not be empty.' })
//   @IsNomeUsuarioUnico({ message: 'This user name alredy exist.' })
  url: string;

  @Expose({ name: 'user' })
  @IsString()
  @IsOptional()
  user: UserEntity;

  updatedAt: string;
  deletedAt: string;
}