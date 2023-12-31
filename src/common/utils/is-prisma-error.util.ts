import { PrismaClientError } from '../errors/types/PrismaClientError';

export const isPrismaError = (e: PrismaClientError) => {
  return (
    typeof e.code === 'string' &&
    typeof e.clientVersion === 'string' &&
    (typeof e.meta === 'object' || typeof e.message === 'object')
  );
};
