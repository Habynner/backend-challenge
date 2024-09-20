import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { IsUrlUnico } from '../../utils/validator/url.validator';
import { Expose } from 'class-transformer';

export class CreateUrlDto {
  @IsOptional()
  id?: string;

  @Expose({ name: 'originalUrl' })
  @IsUrl()
  @IsNotEmpty({ message: 'O campo originalUrl não pode estar vazio.' })
  @IsUrlUnico({ message: 'Esta url já existe.' })
  originalUrl: string;

  @Expose({ name: 'userId' })
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
