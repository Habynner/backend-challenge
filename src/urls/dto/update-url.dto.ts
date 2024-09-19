import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
// import {
//   EmailEhUnico,
//   IsNomeUsuarioUnico,
// } from '../validator/email.validator';
import { Expose } from 'class-transformer';

export class CreateUserDto {

  @Expose({ name: 'url' })
  @IsString()
  @IsNotEmpty({ message: 'The name should not be empty.' })
//   @IsNomeUsuarioUnico({ message: 'This user name alredy exist.' })
  url: string;

  @Expose({ name: 'user' })
  @IsString()
  @IsOptional()
  usuario: string;

  updatedAt: string;
  deletedAt: string;
}