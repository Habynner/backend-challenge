import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserListDto } from './dto/list-user.dto';
import { UserEntity } from './entities/user.enetity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRopository: Repository<UserEntity>,
  ) {}

  async createUser(userEntity: UserEntity) {
    const createUser = await this.userRopository.save(userEntity);

    return createUser;
  }

  async usersList() {
    const savedUsers = await this.userRopository.find();
    const usersList = savedUsers.map(
      (users) => new UserListDto(users.id, users.nome),
    );

    return usersList;
  }

  async updateUser(id: string, userEntity: UpdateUserDto) {
    return await this.userRopository.update(id, userEntity);
  }

  async deleteUser(id: string) {
    return await this.userRopository.delete(id);
  }
}
