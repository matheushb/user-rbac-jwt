import { IsEmail, IsString } from 'class-validator';

export class SignUserDto {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
