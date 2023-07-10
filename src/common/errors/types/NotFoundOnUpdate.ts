import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ConflictError } from './ConflictError';

export class NotFoundOnUpdate extends ConflictError {
  constructor(e: PrismaClientKnownRequestError) {
    super(`${e.meta.cause}`);
  }
}
