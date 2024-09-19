import { CreateUrlDto } from './dto/create-url.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlListDto } from './dto/list-url.dto';
import { UrlEntity } from './entities/url.entity';
import { Repository } from 'typeorm';
import { UpdateUrlDto } from './dto/update-url.dto';
import { UserEntity } from '../user/entities/user.enetity';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepository: Repository<UrlEntity>,

    @InjectRepository(UserEntity)
    private readonly userRopository: Repository<UserEntity>,
  ) {}

  async createUser(createUrlDto: CreateUrlDto): Promise<UrlEntity>{
    const { url, userId } = createUrlDto;

    const user = await this.userRopository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Cria a nova URL associada ao usuário
    const newUrl = this.urlRepository.create({ url, user });
    return this.urlRepository.save(newUrl);
  }

  async usersList() {
    const savedUrls = await this.urlRepository.find();
    const urlsList = savedUrls.map(
      (urls) => new UrlListDto(urls.id, urls.url, urls.user),
    );

    return urlsList;
  }

  async updateUser(id: string, updateUrlDto: UpdateUrlDto) {
    return await this.urlRepository.update(id, updateUrlDto);
  }

  async deleteUser(id: string) {
    return await this.urlRepository.delete(id);
  }

  async verificaUrl(url: string): Promise<boolean> {
      const possivelUsuario = await this.urlRepository.findOneBy({ url });

      return !!possivelUsuario;
  }
}
