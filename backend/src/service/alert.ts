import { Prisma } from '@prisma/client';
import { prisma } from '../db';

interface CreateAlterInput {
  score: number;
  reasons: string[];
  summary: string;
  patientId: number;
}

export interface JwtPayload {
  id: number;
}

export default {
  create: async function (
    { score, reasons, summary, patientId }: CreateAlterInput,
    responsibleId: number,
    conversationId: number,
  ) {
    const alert = await prisma.alert.create({
      data: {
        score,
        reasons,
        summary,
        patientId,
        responsibleId,
        conversationId,
      },
    });
    return alert;
  },

  getAll: async function (where: Prisma.AlertWhereInput = {}) {
    const alerts = await prisma.alert.findMany({
      include: {
        patient: true,
        responsible: true,
      },
      where,
    });
    return alerts;
  },

  getById: async function (id: number) {
    const alert = await prisma.alert.findUnique({
      where: { id },
      include: {
        patient: true,
        responsible: true,
        conversation: {
          include: {
            messages: true,
          },
        },
        actions: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            user: true,
          },
        },
      },
    });
    return alert;
  },

  update: async function (
    id: number,
    data: CreateAlterInput,
    responsibleId: number,
  ) {
    const alert = await prisma.alert.update({
      where: { id },
      data: {
        ...data,
        responsibleId,
      },
    });
    return alert;
  },
};
