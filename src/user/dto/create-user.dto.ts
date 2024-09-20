import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { EmailEhUnico } from '../../utils/validator/email.validator';
import { Exclude, Expose } from 'class-transformer';
import { UrlEntity } from 'src/urls/entities/url.entity';

export class CreateUserDto {
  id: string;

  @Expose({ name: 'name' })
  @IsString()
  @IsNotEmpty({
    message:
      'O campo name não pode estar vazio. certifique-se de estar usando (name) no payload.',
  })
  nome: string;

  @Expose({ name: 'nickName' })
  @IsString()
  @IsNotEmpty({ message: 'O campo nickName não pode estar vazio.' })
  nickName: string;

  @IsEmail(undefined, { message: 'email precisa estar no formato e-mail.' })
  @EmailEhUnico({ message: 'Email já cadastrado.' })
  email: string;

  @IsOptional()
  urls: UrlEntity[];

  @Expose({ name: 'password' })
  @Exclude({ toPlainOnly: true })
  @MinLength(6, { message: 'A senha não pode ter menos de 6 caracteres.' })
  @IsNotEmpty({
    message:
      'A senha é obrigatória. certifique-se de estar usando (password) no payload.',
  })
  senha: string;

  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
