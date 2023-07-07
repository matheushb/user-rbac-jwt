import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUserDto } from './dto/sign-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../user/user.repository';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signUserDto: SignUserDto) {
    signUserDto.password = await bcrypt.hash(signUserDto.password, 10);
    const user = await this.userRepository.create(signUserDto);
    const token = this.jwtSignToken(user);

    return token;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findByEmail(loginUserDto.email);
    if (
      !user ||
      !(await bcrypt.compare(loginUserDto.password, user.password))
    ) {
      throw new UnauthorizedException('Wrong credentials');
    }
    const { password, createdAt, name, ...result } = user;

    return result;
  }

  jwtSignToken(user: User) {
    return this.jwtService.sign(
      { sub: user.id, email: user.email, role: user.role },
      { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRES_IN },
    );
  }
}
