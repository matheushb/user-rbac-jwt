import { PartialType } from '@nestjs/mapped-types';
import { SignUserDto } from 'src/common/auth/dto/sign-user.dto';

export class UpdateUserDto extends PartialType(SignUserDto) {}
