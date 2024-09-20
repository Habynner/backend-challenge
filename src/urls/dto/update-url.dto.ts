import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
// import {
//   EmailEhUnico,
//   IsNomeUsuarioUnico,
// } from '../validator/email.validator';
import { Expose } from 'class-transformer';
import { UserEntity } from '../../user/entities/user.enetity';

export class UpdateUrlDto {

  @Expose({ name: 'originalUrl' })
  @IsString()
  @IsNotEmpty({ message: 'The originalUrl should not be empty.' })
//   @IsNomeUsuarioUnico({ message: 'This user name alredy exist.' })
  originalUrl: string;

  @Expose({ name: 'user' })
  @IsString()
  @IsOptional()
  user?: UserEntity;

  @IsOptional()
  updatedAt?: string;
  @IsOptional()
  deletedAt?: string;
}