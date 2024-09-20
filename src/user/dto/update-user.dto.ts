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

  @IsEmail(undefined, { message: 'email must be e-mail.' })
  @EmailEhUnico({ message: 'This user email alredy exist.' })
  @IsOptional()
  email?: string;

  @MinLength(6, { message: 'The password do not has less then 6 characthers.' })
  @IsOptional()
  senha?: string;

  @IsOptional()
  urls?: UrlEntity[];

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
