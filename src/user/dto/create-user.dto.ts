import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import {
  EmailEhUnico,
  // IsNomeUsuarioUnico,
} from '../validator/email.validator';
import { Exclude, Expose } from 'class-transformer';
import { UrlEntity } from 'src/urls/entities/url.entity';

export class CreateUserDto {
  id: string;

  @Expose({ name: 'name' })
  @IsString()
  @IsNotEmpty({ message: 'The name should not be empty.' })
  // @IsNomeUsuarioUnico({ message: 'This user name alredy exist.' })
  nome: string;

  @Expose({ name: 'nickName' })
  @IsString()
  @IsNotEmpty({ message: 'The nickName should not be empty.' })
  nickName: string;

  @IsEmail(undefined, { message: 'email must be e-mail.' })
  @EmailEhUnico({ message: 'This user email alredy exist.' })
  email: string;

  @IsOptional()
  urls: UrlEntity[];

  @Expose({ name: 'password' })
  @Exclude({ toPlainOnly: true })
  @MinLength(6, { message: 'The password do not has less then 6 characthers.' })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  senha: string;

  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}