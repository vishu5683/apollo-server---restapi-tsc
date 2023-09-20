import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  // Add the following line to enable query logging
  log: ['query', 'info', 'warn'],
});

export default prisma;
