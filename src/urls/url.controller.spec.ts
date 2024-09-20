import { Test, TestingModule } from '@nestjs/testing';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { NestResponse } from '../utils/http/nest-response';
import { NestResponseBuilder } from '../utils/http/nest-response-builder';
import { HttpStatus } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

describe('UrlController', () => {
  let controller: UrlController;
  let service: UrlService;

  const mockUrlService = {
    createUrl: jest.fn(),
    urlsList: jest.fn(),
    findUrlsByUser: jest.fn(),
    updateUrl: jest.fn(),
    deleteUrl: jest.fn(),
    redirectShortUrl: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [
            JwtModule.register({
              secret: 'test-secret',
              signOptions: { expiresIn: '60s' },
            }),
          ],
      controllers: [UrlController],
      providers: [
        {
          provide: UrlService,
          useValue: mockUrlService,
        },
      ],
    }).compile();

    controller = module.get<UrlController>(UrlController);
    service = module.get<UrlService>(UrlService);
  });

  it('should create a new URL', async () => {
    const createUrlDto: CreateUrlDto = { originalUrl: 'http://example.com', userId: null };
    const createdUrl = { id: 1, ...createUrlDto };

    mockUrlService.createUrl.mockResolvedValue(createdUrl);

    const response: NestResponse = await controller.createUrl(createUrlDto);

    expect(response).toEqual(
      new NestResponseBuilder()
        .withStatus(HttpStatus.CREATED)
        .withHeader({
          Location: `/url/${createdUrl.originalUrl}`,
        })
        .withBody(createdUrl)
        .build()
    );
  });

  it('should return a list of URLs', async () => {
    const urls = [{ originalUrl: 'http://example.com', shortUrl: 'http://short.url' }];
    mockUrlService.urlsList.mockResolvedValue(urls);

    expect(await controller.urlsList()).toEqual(urls);
  });

  it('should return URLs of the authenticated user', async () => {
    const userId = 1;
    const userUrls = [{ originalUrl: 'http://example.com', shortUrl: 'http://short.url' }];
    const req = { user: { id: userId } };

    mockUrlService.findUrlsByUser.mockResolvedValue(userUrls);

    expect(await controller.getUserUrls(req)).toEqual(userUrls);
  });

  it('should update a URL', async () => {
    const updateUrlDto: UpdateUrlDto = { originalUrl: 'http://new-url.com' };
    const updatedUrl = { id: 1, ...updateUrlDto };

    mockUrlService.updateUrl.mockResolvedValue(updatedUrl);

    expect(await controller.updateUrl('1', updateUrlDto)).toEqual({
      url: updatedUrl,
      message: `The url has been updated to : ${updateUrlDto.originalUrl} `,
    });
  });

  it('should delete a URL', async () => {
    const deletedUrl = { id: 1 };
    mockUrlService.deleteUrl.mockResolvedValue(deletedUrl);

    expect(await controller.removeUrl('1')).toEqual({
      user: deletedUrl,
      message: `The url with 1 has been deleted.`,
    });
  });

  it('should redirect to the original URL', async () => {
    const originalUrl = 'http://example.com';
    const shortId = 'short-url-id';
    mockUrlService.redirectShortUrl.mockResolvedValue(originalUrl);

    const response = await controller.redirectUrl(shortId);
    expect(response).toEqual({ url: originalUrl });
  });
});
