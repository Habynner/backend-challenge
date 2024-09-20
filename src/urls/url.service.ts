import { CreateUrlDto } from './dto/create-url.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlListDto } from './dto/list-url.dto';
import { UrlEntity } from './entities/url.entity';
import { Repository } from 'typeorm';
import { UpdateUrlDto } from './dto/update-url.dto';
import { UserEntity } from '../user/entities/user.enetity';
import utils from '../utils/functions/global-functions';

@Injectable()
export class UrlService {
  private readonly baseUrl = 'http://backend-challenge.com';
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepository: Repository<UrlEntity>,

    @InjectRepository(UserEntity)
    private readonly userRopository: Repository<UserEntity>,
  ) {}

  async createUrl(createUrlDto: CreateUrlDto): Promise<UrlEntity> {
    const { originalUrl, userId } = createUrlDto;

    let user: UserEntity | null = null;

    if (userId) {
      user = await this.userRopository.findOneBy({ id: userId });
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
    }
    const shortUrl = `${this.baseUrl}/${utils.generateShortId(6)}`;

    const newUrl = this.urlRepository.create({ originalUrl, shortUrl, user });
    return this.urlRepository.save(newUrl);
  }

  async urlsList() {
    const savedUrls = await this.urlRepository.find();
    const urlsList = savedUrls.map(
      (urls) => new UrlListDto(urls.id, urls.shortUrl, urls.user),
    );

    return urlsList;
  }

  async findUrlsByUser(userId: string): Promise<UrlEntity[]> {
    return this.urlRepository.find({
      where: { user: { id: userId } },
    });
  }

  async updateUrl(id: string, updateUrlDto: UpdateUrlDto) {
    return await this.urlRepository.update(id, updateUrlDto);
  }

  async deleteUrl(id: string) {
    return await this.urlRepository.delete(id);
  }

  async redirectShortUrl(shortId: string): Promise<string> {
    const fullShortUrl = `${this.baseUrl}/${shortId}`;
    const url = await this.urlRepository.findOne({
      where: { shortUrl: fullShortUrl },
    });

    if (!url) {
      throw new NotFoundException('URL não encontrada');
    }

    url.clicks += 1;
    await this.urlRepository.save(url);

    return url.originalUrl;
  }

  async verificaUrl(originalUrl: string): Promise<boolean> {
    const possivelUsuario = await this.urlRepository.findOneBy({ originalUrl });

    return !!possivelUsuario;
  }
}
