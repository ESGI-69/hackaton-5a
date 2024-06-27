import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const main = async () => {
  const didierPatient = await prisma.patient.create({
    data: {
      name: 'Didier Leblanc',
      phone: '0623456789',
      birthDate: new Date('1991-01-01'),
      gender: 'male',
    },
  });

  const JeanToutVasBienPatient = await prisma.patient.create({
    data: {
      name: 'Jean Dujardin',
      phone: '0623456789',
      birthDate: new Date('1993-01-01'),
      gender: 'male',
    },
  });

  const brigitteCaVaPasFortPatient = await prisma.patient.create({
    data: {
      name: 'Brigitte Dupont',
      phone: '0623456789',
      birthDate: new Date('1994-01-01'),
      gender: 'female',
    },
  });

  await prisma.conversation.create({
    data: {
      patientId: didierPatient.id,
      messages: {
        createMany: {
          data: [
            {
              text: 'Bonjour, notez votre séjour de 1 à 4, TAPEZ UNIQUEMENT 1, 2, 3 ou 4',
              origin: 'SYSTEM',
            },
            { text: '3', origin: 'PATIENT' },
            { text: 'Notation bien prise en compte', origin: 'SYSTEM' },
            {
              text: 'Comment est votre douleur sur une note de 1 à 10',
              origin: 'SYSTEM',
            },
            // A faire pdt la demo : 'Ca depend entre 5 et 7 ca depends des moments'
          ],
        },
      },
    },
  });

  await prisma.conversation.create({
    data: {
      patientId: JeanToutVasBienPatient.id,
      messages: {
        createMany: {
          data: [
            { text: 'Bonjour, notez votre séjour de 1 à 4', origin: 'SYSTEM' },
            // a faire pdt la demo : 'ca cest bien passé, la bouffe etait bonne, les infirmier tres cool'
          ],
        },
      },
    },
  });

  const brigitteCaVaPasFortConversation = await prisma.conversation.create({
    data: {
      patientId: brigitteCaVaPasFortPatient.id,
      messages: {
        createMany: {
          data: [
            {
              text: 'Comment cest passé vorte séjour à lhopital notez de 1 à 4',
              origin: 'SYSTEM',
            },
            { text: 'Bjr', origin: 'PATIENT' },
            {
              text: 'Bien mais je nais pas beaucoup d appétit, je mange peu',
              origin: 'PATIENT',
            },
            { text: 'Pouvez vous me donner plus de détails', origin: 'DOCTOR' },
            // A faire pdt la demo : 'je mange pas beaucoup, je nai pas dappetit'
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

  //brigitteCaVaPasFort light alert created
  await prisma.alert.create({
    data: {
      score: 126,
      summary: 'Brigitte Dupont mange peu et na pas dappetit',
      reasons: ['peu dappetit', 'mange pas beaucoup'],
      patientId: brigitteCaVaPasFortPatient.id,
      conversationId: brigitteCaVaPasFortConversation.id,
      responsibleId: adminUser.id,
      actions: {
        createMany: {
          data: [
            {
              type: 'MESSAGE',
              userId: adminUser.id,
              comment:
                'envoi du message au patient : Pouvez vous me donner plus de détails',
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
