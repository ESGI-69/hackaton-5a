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
    conversationId: number,
    responsibleId?: number,
  ) {
    let alert;

    try {
      alert = await prisma.alert.create({
        data: {
          score,
          reasons,
          summary,
          patientId,
          responsibleId,
          conversationId,
        },
      });
    } catch (error) {
      console.log('Error creating alert:', error);
    }

    return alert;
  },

  getAll: async function () {
    const alerts = await prisma.alert.findMany({
      include: {
        patient: true,
        responsible: true,
      },
    });
    return alerts;
  },

  getById: async function (id: number) {
    const alert = await prisma.alert.findUnique({
      where: { id },
    });
    return alert;
  },

  update: async function (
    id: number,
    data: CreateAlterInput,
    responsibleId?: number,
  ) {
    let alert;
    try {
      alert = await prisma.alert.update({
        where: { id },
        data: {
          ...data,
          responsibleId,
        },
      });
    } catch (error) {
      console.log('Error updating alert:', error);
    }
    return alert;
  },

  checkConversationHasAlert: async function (conversationId: number) {
    const alert = await prisma.alert.findFirst({
      where: {
        conversationId,
        handledAt: null,
      },
    });
    if (alert) {
      return alert;
    }
    return null;
  },
};
