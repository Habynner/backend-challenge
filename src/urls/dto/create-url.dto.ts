import { IsNotEmpty, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';
// import {
//   EmailEhUnico,
//   IsNomeUsuarioUnico,
// } from '../validator/email.validator';
import { Exclude, Expose } from 'class-transformer';
import { UserEntity } from 'src/user/entities/user.enetity';

export class CreateUrlDto {

  @IsOptional()
  id?: string;

  @Expose({ name: 'originalUrl' })
  @IsUrl()
  @IsNotEmpty({ message: 'The originalUrl should not be empty.' })
//   @IsNomeUsuarioUnico({ message: 'This user name alredy exist.' })
  originalUrl: string;

  @Expose({ name: 'user' })
  @IsString()
  @IsOptional()
  userId: string;

  @IsOptional()
  createdAt?: string;
  @IsOptional()
  updatedAt?: string;
  @IsOptional()
  deletedAt?: string;
}