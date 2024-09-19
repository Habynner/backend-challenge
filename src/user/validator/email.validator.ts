import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UserService } from '../user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(
    value: any,
  ): Promise<boolean> {
    const usuarioComEmailExiste = await this.userService.verificaEmail(
      value,
    );
    return !usuarioComEmailExiste;
  }
}

export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: EmailEhUnicoValidator,
    });
  };
};

// @Injectable()
// @ValidatorConstraint({ async: true })
// export class NomeEhUnicoValidator implements ValidatorConstraintInterface {
//   constructor(private userService: UserService) {}

//   async validate(
//     value: any,
//     validationArguments?: ValidationArguments,
//   ): Promise<boolean> {
//     const usuarioComNomeExiste = await this.userService.existeComNome(
//       value,
//     );
//     return !usuarioComNomeExiste;
//   }
// }
// export const IsNomeUsuarioUnico = (opcoesDeValidacao: ValidationOptions) => {
//   return (objeto: object, propriedade: string) => {
//     registerDecorator({
//       target: objeto.constructor,
//       propertyName: propriedade,
//       options: opcoesDeValidacao,
//       constraints: [],
//       validator: NomeEhUnicoValidator,
//     });
//   };
// };
