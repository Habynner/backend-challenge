import { IsNotEmpty, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';
import { IsUrlUnico } from '../../utils/validator/url.validator';
import { Expose } from 'class-transformer';

export class CreateUrlDto {

  @IsOptional()
  id?: string;

  @Expose({ name: 'originalUrl' })
  @IsUrl()
  @IsNotEmpty({ message: 'The originalUrl should not be empty.' })
  @IsUrlUnico({ message: 'This url alredy exist.' })
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