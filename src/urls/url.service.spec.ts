import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';
import { UrlEntity } from './entities/url.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.enetity';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { NotFoundException } from '@nestjs/common';
import utils from '../utils/functions/global-functions';

const mockUrlRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  findOneBy: jest.fn(),
};

const mockUserRepository = {
  findOneBy: jest.fn(),
};

describe('UrlService', () => {
  let urlService: UrlService;
  let urlRepository: Repository<UrlEntity>;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlService,
        {
          provide: getRepositoryToken(UrlEntity),
          useValue: mockUrlRepository,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    urlService = module.get<UrlService>(UrlService);
    urlRepository = module.get<Repository<UrlEntity>>(getRepositoryToken(UrlEntity));
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(urlService).toBeDefined();
  });

  describe('createUrl', () => {
    it('should create and save a new URL', async () => {
      const createUrlDto: CreateUrlDto = {
        originalUrl: 'http://example.com',
        userId: '1',
      };
      const user = { id: '1', nome: 'Test User' };

      mockUserRepository.findOneBy.mockResolvedValue(user);
      mockUrlRepository.save.mockResolvedValue({ id: '1', ...createUrlDto });

      const result = await urlService.createUrl(createUrlDto);

      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: createUrlDto.userId });
      expect(urlRepository.save).toHaveBeenCalled();
      expect(result).toEqual({ id: '1', ...createUrlDto });
    });

    it('should throw an error if user is not found', async () => {
      const createUrlDto: CreateUrlDto = {
        originalUrl: 'http://example.com',
        userId: '1',
      };

      mockUserRepository.findOneBy.mockResolvedValue(null);

      await expect(urlService.createUrl(createUrlDto)).rejects.toThrow(Error);
    });
  });

  describe('urlsList', () => {
    it('should return a list of URLs', async () => {
      const urls = [{ id: '1', shortUrl: 'shortUrl1', originalUrl: 'http://example.com', user: undefined }];
      mockUrlRepository.find.mockResolvedValue(urls);

      const result = await urlService.urlsList();

      expect(result).toEqual([{ id: '1', url: 'shortUrl1', usuario: undefined }]); // Ajuste aqui
    });
  });

  describe('findUrlsByUser', () => {
    it('should return URLs for a specific user', async () => {
      const userId = '1';
      const urls = [{ id: '1', shortUrl: 'shortUrl1', user: { id: userId } }];
      mockUrlRepository.find.mockResolvedValue(urls);

      const result = await urlService.findUrlsByUser(userId);

      expect(result).toEqual(urls);
    });
  });

  describe('updateUrl', () => {
    it('should update a URL', async () => {
      const id = '1';
      const updateUrlDto: UpdateUrlDto = { originalUrl: 'http://updated-url.com' };

      mockUrlRepository.update.mockResolvedValue({ affected: 1 });

      await urlService.updateUrl(id, updateUrlDto);

      expect(urlRepository.update).toHaveBeenCalledWith(id, updateUrlDto);
    });
  });

  describe('deleteUrl', () => {
    it('should delete a URL', async () => {
      const id = '1';

      mockUrlRepository.delete.mockResolvedValue({ affected: 1 });

      await urlService.deleteUrl(id);

      expect(urlRepository.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('redirectShortUrl', () => {
    it('should return the original URL and increment clicks', async () => {
      const shortId = 'shortUrl1';
      const urlEntity = { id: '1', originalUrl: 'http://example.com', clicks: 0, shortUrl: `http://backend-challenge.com/${shortId}` };

      mockUrlRepository.findOne.mockResolvedValue(urlEntity);
      mockUrlRepository.save.mockResolvedValue(urlEntity);

      const result = await urlService.redirectShortUrl(shortId);

      expect(urlRepository.findOne).toHaveBeenCalledWith({ where: { shortUrl: `http://backend-challenge.com/${shortId}` } });
      expect(result).toEqual('http://example.com');
      expect(urlEntity.clicks).toBe(1); // Ensure clicks are incremented
    });

    it('should throw NotFoundException if URL is not found', async () => {
      const shortId = 'notFoundShortUrl';

      mockUrlRepository.findOne.mockResolvedValue(null);

      await expect(urlService.redirectShortUrl(shortId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('verificaUrl', () => {
    it('should return true if URL exists', async () => {
      const originalUrl = 'http://example.com';
      mockUrlRepository.findOneBy.mockResolvedValue({ originalUrl });

      const result = await urlService.verificaUrl(originalUrl);

      expect(result).toBe(true);
    });

    it('should return false if URL does not exist', async () => {
      const originalUrl = 'http://notfound.com';
      mockUrlRepository.findOneBy.mockResolvedValue(null);

      const result = await urlService.verificaUrl(originalUrl);

      expect(result).toBe(false);
    });
  });
});
