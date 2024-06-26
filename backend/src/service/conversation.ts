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
};
