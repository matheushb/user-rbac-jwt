import { DatabaseError } from '../errors/types/DatabaseError';
import { NotFoundOnUpdate } from '../errors/types/NotFoundOnUpdate';
import { PrismaClientError } from '../errors/types/PrismaClientError';
import { UniqueConstraintError } from '../errors/types/UniqueConstraintError';

enum PrismaErrors {
  UniqueConstraintFail = 'P2002',
  NotFoundOnUpdate = 'P2025',
}

export const handleDatabaseErrors = (e: PrismaClientError): Error => {
  switch (e.code) {
    case PrismaErrors.UniqueConstraintFail:
      return new UniqueConstraintError(e);
    case PrismaErrors.NotFoundOnUpdate:
      return new NotFoundOnUpdate(e);
    default:
      return new DatabaseError(e.message);
  }
};
