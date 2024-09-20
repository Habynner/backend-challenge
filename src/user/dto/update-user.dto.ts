import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { EmailEhUnico } from '../../utils/validator/email.validator';
import { UrlEntity } from 'src/urls/entities/url.entity';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  nickName?: string;

  @IsEmail(undefined, { message: 'email precisa estar no formato e-mail.' })
  @EmailEhUnico({ message: 'Email já cadastrado.' })
  @IsOptional()
  email?: string;

  @MinLength(6, { message: 'A senha não pode ter menos de 6 caracteres.' })
  @IsOptional()
  senha?: string;

  @IsOptional()
  urls?: UrlEntity[];

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
