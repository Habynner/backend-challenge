import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
  } from 'class-validator';
//   import { EmailEhUnico } from '../validator/email.validator';

  export class UpdateUserDto {
    @IsString()
    @IsNotEmpty({ message: 'The name should not be empty.' })
    @IsOptional()
    nome: string;

    @IsString()
    @IsNotEmpty({ message: 'The User name should not be empty.' })
    @IsOptional()
    nomeUsuario: string;

    @IsEmail(undefined, { message: 'email must be e-mail.' })
    // @EmailEhUnico({ message: 'This user email alredy exist.' })
    @IsOptional()
    email: string;

    @MinLength(6, { message: 'The password do not has less then 6 characthers.' })
    @IsOptional()
    senha: string;

    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  }
