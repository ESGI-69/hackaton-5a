import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const main = async () => {
  const moniquePatient = await prisma.patient.create({
    data: {
      name: 'Monique',
      phone: '0623456789',
      birthDate: new Date('1990-01-01'),
      gender: 'male',
    },
  });

  const didierPatient = await prisma.patient.create({
    data: {
      name: 'Didier',
      phone: '0623456789',
      birthDate: new Date('1991-01-01'),
      gender: 'male',
    },
  });

  const juliennePatient = await prisma.patient.create({
    data: {
      name: 'Julienne',
      phone: '0623456789',
      birthDate: new Date('1992-01-01'),
      gender: 'female',
    },
  });

  await prisma.conversation.create({
    data: {
      patientId: juliennePatient.id,
      messages: {
        createMany: {
          data: [
            { text: 'Hello', origin: 'SYSTEM' },
            { text: 'Hi', origin: 'PATIENT' },
            { text: 'How are you?', origin: 'SYSTEM' },
            { text: 'I am fine', origin: 'PATIENT' },
            { text: 'This is a message from a doctor', origin: 'DOCTOR' },
          ],
        },
      },
    },
  });

  const didierConversation = await prisma.conversation.create({
    data: {
      patientId: didierPatient.id,
      messages: {
        createMany: {
          data: [
            { text: 'Hello', origin: 'SYSTEM' },
            { text: 'Hi', origin: 'PATIENT' },
            { text: 'How are you?', origin: 'SYSTEM' },
            { text: 'Jai eu un gros accident de voiture', origin: 'PATIENT' },
            { text: 'Expliquez nous ce quil se passe', origin: 'DOCTOR' },
            {
              text: 'Je ne peux plus bouger, je ne sens plus mes jambes, il y a beaucoup de sang',
              origin: 'PATIENT',
            },
          ],
        },
      },
    },
  });

  const moniqueConversation = await prisma.conversation.create({
    data: {
      patientId: moniquePatient.id,
      messages: {
        createMany: {
          data: [
            { text: 'Hello', origin: 'SYSTEM' },
            { text: 'Hi', origin: 'PATIENT' },
            { text: 'How are you?', origin: 'SYSTEM' },
            { text: 'I am fine', origin: 'PATIENT' },
            { text: 'This is a message from a doctor', origin: 'DOCTOR' },
          ],
        },
      },
    },
  });

  const adminUser = await prisma.user.create({
    data: {
      password: await bcrypt.hash('admin', bcrypt.genSaltSync(10)),
      username: 'admin',
      name: 'Admin User',
    },
  });

  await prisma.alert.create({
    data: {
      score: 2,
      summary: "Monique s'est fait caca dessus à cause des laxatif au plomb",
      reasons: [
        'prise de laxatif au plomb',
        'incontinence',
        'caca dans le pantalon',
      ],
      patientId: moniquePatient.id,
      conversationId: moniqueConversation.id,
    },
  });

  await prisma.alert.create({
    data: {
      score: 5,
      summary:
        "Didier a eu un accident de voiture pendant qu'il échangeait des messages avec le docteur",
      reasons: [
        'accident de voiture',
        'distraction pendant la conduite',
        'échange de messages avec le docteur',
      ],
      patientId: didierPatient.id,
      conversationId: didierConversation.id,
      handledAt: new Date('2021-01-02'),
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-02'),
      responsibleId: adminUser.id,
      actions: {
        createMany: {
          data: [
            {
              type: 'CALL',
              createdAt: new Date('2021-01-01T12:00:00'),
              updatedAt: new Date('2021-01-02'),
              userId: adminUser.id,
            },
            {
              type: 'MESSAGE',
              createdAt: new Date('2021-01-01T13:00:00'),
              updatedAt: new Date('2021-01-02'),
              userId: adminUser.id,
            },
            {
              type: 'APPOINTMENT',
              createdAt: new Date('2021-01-01T14:00:00'),
              updatedAt: new Date('2021-01-02'),
              userId: adminUser.id,
            },
            {
              type: 'CLOSED',
              createdAt: new Date('2021-01-02'),
              updatedAt: new Date('2021-01-02'),
              userId: adminUser.id,
            },
          ],
        },
      },
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
