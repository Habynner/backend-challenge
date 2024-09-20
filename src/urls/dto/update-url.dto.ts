import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsUrlUnico } from '../../utils/validator/url.validator';
import { Expose } from 'class-transformer';
import { UserEntity } from '../../user/entities/user.enetity';

export class UpdateUrlDto {
  @Expose({ name: 'originalUrl' })
  @IsString()
  @IsNotEmpty({ message: 'O campo originalUrl não pode estar vazio.' })
  @IsUrlUnico({ message: 'Esta url já existe.' })
  originalUrl: string;

  @Expose({ name: 'userId' })
  @IsString()
  @IsOptional()
  user?: UserEntity;

  @IsOptional()
  updatedAt?: string;
  @IsOptional()
  deletedAt?: string;
}
