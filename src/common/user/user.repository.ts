import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignUserDto } from '../auth/dto/sign-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({});
  }

  async create(signUserDto: SignUserDto) {
    try {
      return await this.prisma.user.create({ data: signUserDto });
    } catch (err) {
      throw new BadRequestException('Email already registered');
    }
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: string) {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (err) {
      throw new NotFoundException(`ID "${id}" not found in DB`);
    }
  }
}
