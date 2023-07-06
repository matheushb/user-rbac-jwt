import { Role } from '@prisma/client';

export class User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  role: Role;
}
