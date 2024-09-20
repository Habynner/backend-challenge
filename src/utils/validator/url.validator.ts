import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UrlService } from '../../urls/url.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class UrlEhUnicoValidator implements ValidatorConstraintInterface {
  constructor(private urlService: UrlService) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const usuarioComNomeExiste = await this.urlService.verificaUrl(
      value,
    );
    return !usuarioComNomeExiste;
  }
}
export const IsUrlUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: UrlEhUnicoValidator,
    });
  };
};