import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    const users = await this.userRepository.findAll();
    if (users.length === 0) throw new NotFoundError();
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundError();
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.update(id, updateUserDto);
    if (!user) throw new NotFoundError();
    return user;
  }

  async remove(id: string) {
    const user = await this.userRepository.remove(id);
    if (!user) throw new NotFoundError();
    return user;
  }
}
