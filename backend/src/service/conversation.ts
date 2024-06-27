import { Prisma } from '@prisma/client';
import { prisma } from '../db';

export default {
  getById: async function (id: number) {
    const conversation = await prisma.conversation.findUnique({
      where: { id },
      include: {
        messages: true,
      },
    });
    return conversation;
  },

  update: async function (id: number, data: Prisma.ConversationUpdateInput) {
    const conversation = await prisma.conversation.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return conversation;
  },

  postMessage: async function (message: Prisma.MessagesCreateInput) {
    const newMessage = await prisma.messages.create({
      data: {
        ...message,
      },
    });

    return newMessage;
  },
};
