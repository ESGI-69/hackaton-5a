import { prisma } from '../db';

interface CreatePatientInput {
  phone: string;
  birthDate: Date;
  gender: string;
  name: string;
}

export interface JwtPayload {
  id: number;
}

export default {
  create: async function ({
    phone,
    birthDate,
    gender,
    name,
  }: CreatePatientInput) {
    const patient = await prisma.patient.create({
      data: {
        phone,
        birthDate,
        gender,
        name,
      },
    });
    return patient;
  },

  getAll: async function () {
    const patients = await prisma.patient.findMany();
    return patients;
  },

  update: async function (id: number, data: CreatePatientInput) {
    const patient = await prisma.patient.update({
      where: { id },
      data,
    });
    return patient;
  },

  postMessage: async function (id: number, message: string) {
    let conversation = await prisma.conversation.findFirst({
      where: {
        patientId: id,
        closedAt: {
          equals: null,
        },
      },
    });
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          patientId: id,
        },
      });
    }

    const newMessage = await prisma.messages.create({
      data: {
        text: message,
        conversationId: conversation.id,
        origin: 'PATIENT',
      },
    });
    return newMessage;
  },
};
