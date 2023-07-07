import { Role } from '@prisma/client';
import { Request } from 'express';

export interface UserRequest extends Request {
  user: UserPayload;
}

export interface UserPayload {
  sub: string;
  email: string;
  role: Role;
}
