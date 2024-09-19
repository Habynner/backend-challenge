import { UrlEntity } from "../../urls/entities/url.entity";

export class UserListDto {
    constructor(readonly id: string, readonly nome: string, readonly email: string, readonly urls: UrlEntity[]) {}
  }
