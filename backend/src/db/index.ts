import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config({ path: '../.env' });

const prisma = new PrismaClient({
  errorFormat: 'pretty',
});

// Hide password middleware

export {
  prisma,
};
