import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.enetity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserListDto } from './dto/list-user.dto';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  const mockUserRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a user and return it', async () => {
      const createUserDto: CreateUserDto = {
          email: 'test@example.com',
          nickName: 'testUser',
          id: '',
          nome: '',
          urls: [],
          senha: '',
          createdAt: '',
          updatedAt: '',
          deletedAt: ''
      };
      const savedUser = { id: '1', ...createUserDto };

      mockUserRepository.save.mockResolvedValue(savedUser);

      const result = await userService.createUser(createUserDto);

      expect(result).toEqual(savedUser);
      expect(mockUserRepository.save).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('usersList', () => {
    it('should return a list of users', async () => {
      const users = [
        { id: '1', email: 'test@example.com', nickName: 'testUser', urls: [] },
      ];
      const expectedList = users.map(user => new UserListDto(user.id, user.nickName, user.email, user.urls));

      mockUserRepository.find.mockResolvedValue(users);

      const result = await userService.usersList();

      expect(result).toEqual(expectedList);
      expect(mockUserRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by email', async () => {
      const email = 'test@example.com';
      const user = { id: '1', email };
      const updateUserDto: UpdateUserDto = { email };

      mockUserRepository.findOneBy.mockResolvedValue(user);

      const result = await userService.findOne(updateUserDto);

      expect(result).toEqual(user);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ email });
    });
  });

  describe('updateUser', () => {
    it('should update a user and return the result', async () => {
      const id = '1';
      const updateUserDto: UpdateUserDto = { email: 'updated@example.com' };

      mockUserRepository.update.mockResolvedValue({ affected: 1 });

      const result = await userService.updateUser(id, updateUserDto);

      expect(result).toEqual({ affected: 1 });
      expect(mockUserRepository.update).toHaveBeenCalledWith(id, updateUserDto);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user and return the result', async () => {
      const id = '1';

      mockUserRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await userService.deleteUser(id);

      expect(result).toEqual({ affected: 1 });
      expect(mockUserRepository.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('verificaEmail', () => {
    it('should return true if email exists', async () => {
      const email = 'test@example.com';
      const user = { email };

      mockUserRepository.findOneBy.mockResolvedValue(user);

      const result = await userService.verificaEmail(email);

      expect(result).toBe(true);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ email });
    });

    it('should return false if email does not exist', async () => {
      const email = 'nonexistent@example.com';

      mockUserRepository.findOneBy.mockResolvedValue(null);

      const result = await userService.verificaEmail(email);

      expect(result).toBe(false);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ email });
    });
  });
});
