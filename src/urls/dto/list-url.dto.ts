import { UserEntity } from "src/user/entities/user.enetity";

export class UrlListDto {
    constructor(readonly id: string, readonly url: string, readonly usuario: UserEntity) {}
  }