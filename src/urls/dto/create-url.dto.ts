import { IsNotEmpty, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';
// import {
//   EmailEhUnico,
//   IsNomeUsuarioUnico,
// } from '../validator/email.validator';
import { Exclude, Expose } from 'class-transformer';
import { UserEntity } from 'src/user/entities/user.enetity';

export class CreateUrlDto {

  id: string;

  @Expose({ name: 'url' })
  @IsUrl()
  @IsNotEmpty({ message: 'The url should not be empty.' })
//   @IsNomeUsuarioUnico({ message: 'This user name alredy exist.' })
  url: string;

  @Expose({ name: 'user' })
  @IsString()
  @IsOptional()
  userId: string;

  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}