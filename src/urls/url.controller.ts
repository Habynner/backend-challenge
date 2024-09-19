import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { CreateUrlDto } from './dto/create-url.dto';
  import { UpdateUrlDto } from './dto/update-url.dto';
  import { NestResponse } from '../core/http/nest-response';
  import { NestResponseBuilder } from '../core/http/nest-response-builder';
  import { UrlService } from './url.service';

  @Controller('/url')
  export class UrlController {
    constructor(
      private urlService: UrlService,
    ) {}

    @Post()
    async createUser(
      @Body() createUrlDto: CreateUrlDto,
    ): Promise<NestResponse> {
      const createdUrl = await this.urlService.createUser(createUrlDto);
      console.log(createdUrl)
      return new NestResponseBuilder()
        .withStatus(HttpStatus.CREATED)
        .withHeader({
          Location: `/url/${createdUrl.url}`,
        })
        .withBody(createdUrl)
        .build();
    }

    @Get()
    async usersList() {
      const userDb = await this.urlService.usersList();
      return userDb;
    }
    // @Get(':nomeDeUsuario')
    // async usersByName(
    //   @Param('nomeDeUsuario') nomDeUsuario: string,
    // ): Promise<UserEntity> {
    //   const userFind = await this.userRepository.findByName(nomDeUsuario);
    //   if (!userFind) {
    //     throw new NotFoundException({
    //       statusCode: HttpStatus.NOT_FOUND,
    //       message: 'User not found.',
    //     });
    //   }
    //   return userFind;
    // }

    @Put('/:id')
    async updateUser(
      @Param('id') id: string,
      @Body() updateUrlDto: UpdateUrlDto,
    ) {
      const userUpdated = await this.urlService.updateUser(id, updateUrlDto);

      return {
        url: userUpdated,
        message: `The url has been updated to : ${updateUrlDto.url} `,
      };
    }

    @Delete('/:id')
    async removeUser(@Param('id') id: string) {
      const userRemoved = await this.urlService.deleteUser(id);

      return {
        user: userRemoved,
        message: `The url with ${id} has been deleted.`,
      };
    }
  }
