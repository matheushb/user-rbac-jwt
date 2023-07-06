import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUserDto } from './dto/sign-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from '@prisma/client';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signUserDto: SignUserDto) {
    return this.authService.signup(signUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@GetUser() user: User) {
    return {
      user,
      token: this.authService.jwtSignToken(user),
    };
  }
}
