import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Redirect,
    Request,
    UseGuards,
  } from '@nestjs/common';
  import { CreateUrlDto } from './dto/create-url.dto';
  import { UpdateUrlDto } from './dto/update-url.dto';
  import { NestResponse } from '../utils/http/nest-response';
  import { NestResponseBuilder } from '../utils/http/nest-response-builder';
  import { UrlService } from './url.service';
import { CreateUrlAuthGuard } from '../auth/guards/createUrl-auth.guard';
import { GeneralAuthGuard } from 'src/auth/guards/auth.guard';

  @Controller('/url')
  export class UrlController {
    constructor(
      private urlService: UrlService,
    ) {}

    @Post()
    @UseGuards(CreateUrlAuthGuard) // Autenticação opcional
    async createUrl(
      @Body() createUrlDto: CreateUrlDto,
    ): Promise<NestResponse> {

      const createdUrl = await this.urlService.createUrl(createUrlDto);
      console.log(createdUrl)
      return new NestResponseBuilder()
        .withStatus(HttpStatus.CREATED)
        .withHeader({
          Location: `/url/${createdUrl.originalUrl}`,
        })
        .withBody(createdUrl)
        .build();
    }

    @Get()
    async urlsList() {
      const userDb = await this.urlService.urlsList();
      return userDb;
    }

    @UseGuards(GeneralAuthGuard)
    @Get('user-urls')
    async getUserUrls(@Request() req) {
      const userId = req.user.id; // Pegue o ID do usuário autenticado do token
      return this.urlService.findUrlsByUser(userId);
    }

    @Put('/:id')
    @UseGuards(GeneralAuthGuard)
    async updateUrl(
      @Param('id') id: string,
      @Body() updateUrlDto: UpdateUrlDto,
    ) {
      const userUpdated = await this.urlService.updateUrl(id, updateUrlDto);

      return {
        url: userUpdated,
        message: `The url has been updated to : ${updateUrlDto.originalUrl} `,
      };
    }

    @Delete('/:id')
    @UseGuards(GeneralAuthGuard)
    async removeUrl(@Param('id') id: string) {
      const userRemoved = await this.urlService.deleteUrl(id);

      return {
        user: userRemoved,
        message: `The url with ${id} has been deleted.`,
      };
    }

    @Redirect()
    @Get(':shortId')
  async redirectUrl(@Param('shortId') shortId: string) {
    const originalUrl = await this.urlService.redirectShortUrl(shortId);
    return { url: originalUrl };
  }

  }
