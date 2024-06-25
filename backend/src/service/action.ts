import { ActionType } from '@prisma/client';
import { prisma } from '../db';

interface CreateActionInput {
  comment: string;
  alertId: number;
  type: ActionType;
}

export interface JwtPayload {
  id: number;
}

export default {
  create: async function (
    { comment, alertId, type }: CreateActionInput,
    userId: number,
  ) {
    const action = await prisma.action.create({
      data: {
        comment,
        alertId,
        type,
        userId,
      },
    });
    return action;
  },

  getAll: async function () {
    const actions = await prisma.action.findMany();
    return actions;
  },

  getById: async function (id: number) {
    const action = await prisma.action.findUnique({
      where: { id },
    });
    return action;
  },

  update: async function (id: number, data: CreateActionInput, userId: number) {
    const action = await prisma.action.update({
      where: { id },
      data: {
        ...data,
        userId,
      },
    });
    return action;
  },
};
