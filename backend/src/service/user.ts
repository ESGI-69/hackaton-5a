import { Prisma, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db';

interface CreateUserInput {
  username: string;
  password: string;
  name: string;
}

export interface JwtPayload {
  id: number;
}

export default {
  create: async function ({ username, password, name }: CreateUserInput) {
    const user = await prisma.user.create({
      data: {
        username,
        name,
        password: await this.encryptPassword(password),
      },
      select: {
        id: true,
        username: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  },

  find: function (where: Prisma.UserWhereInput = {}) {
    return prisma.user.findMany({
      where,
      select: {
        id: true,
        username: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  findById: function (id: number) {
    return prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  findForLogin: function (username: string) {
    return prisma.user.findUniqueOrThrow({
      where: {
        username,
      },
    });
  },

  encryptPassword: async function (password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  },

  checkPassword: function (password: string, hash: string) {
    return bcrypt.compare(password, hash);
  },

  generateToken: function ({ id }: User) {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET env not set');
    }
    const jwtPayload: JwtPayload = { id };
    return jwt.sign(jwtPayload, process.env.JWT_SECRET, {
      expiresIn: '1y',
      algorithm: 'HS256',
    });
  },
};
