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
};
