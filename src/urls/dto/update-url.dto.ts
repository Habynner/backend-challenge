import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsUrlUnico } from '../../utils/validator/url.validator';
import { Expose } from 'class-transformer';
import { UserEntity } from '../../user/entities/user.enetity';

export class UpdateUrlDto {
  @Expose({ name: 'originalUrl' })
  @IsString()
  @IsNotEmpty({ message: 'The originalUrl should not be empty.' })
  @IsUrlUnico({ message: 'This url alredy exist.' })
  originalUrl: string;

  @Expose({ name: 'user' })
  @IsString()
  @IsOptional()
  user?: UserEntity;

  @IsOptional()
  updatedAt?: string;
  @IsOptional()
  deletedAt?: string;
}
