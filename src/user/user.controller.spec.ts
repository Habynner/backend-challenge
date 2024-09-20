import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NestResponse } from '../utils/http/nest-response';
import { HttpStatus } from '@nestjs/common';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockUserService = {
    createUser: jest.fn(),
    usersList: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('createUser', () => {
    it('should create a user and return a NestResponse', async () => {
      const createUserDto: CreateUserDto = {
          nome: 'John Doe', senha: 'password',
          id: '',
          nickName: '',
          email: '',
          urls: [],
          createdAt: '',
          updatedAt: '',
          deletedAt: ''
      };
      const result = { ...createUserDto, id: '1' };

      mockUserService.createUser.mockResolvedValue(result);

      const response = await userController.createUser(createUserDto);

      expect(response).toEqual(
        expect.objectContaining({
          status: HttpStatus.CREATED,
          headers: { Location: `/users/${result.nome}` },
          body: result,
        }),
      );
      expect(mockUserService.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('usersList', () => {
    it('should return a list of users', async () => {
      const result = [{ nome: 'John Doe', id: '1' }];
      mockUserService.usersList.mockResolvedValue(result);

      const users = await userController.usersList();

      expect(users).toEqual(result);
      expect(mockUserService.usersList).toHaveBeenCalled();
    });
  });

  describe('updateUser', () => {
    it('should update a user and return a message', async () => {
      const updateUserDto: UpdateUserDto = { nome: 'Jane Doe' };
      const userId = '1';
      const result = { ...updateUserDto, id: userId };

      mockUserService.updateUser.mockResolvedValue(result);

      const response = await userController.updateUser(userId, updateUserDto);

      expect(response).toEqual({
        user: result,
        message: `The user ${updateUserDto.nome} has been updated.`,
      });
      expect(mockUserService.updateUser).toHaveBeenCalledWith(userId, updateUserDto);
    });
  });

  describe('removeUser', () => {
    it('should delete a user and return a message', async () => {
      const userId = '1';
      const result = { id: userId };

      mockUserService.deleteUser.mockResolvedValue(result);

      const response = await userController.removeUser(userId);

      expect(response).toEqual({
        user: result,
        message: `The user ${userId} has been deleted.`,
      });
      expect(mockUserService.deleteUser).toHaveBeenCalledWith(userId);
    });
  });
});
