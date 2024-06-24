import { Request, Response } from 'express';
import { prisma } from '../db';

export default async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    console.log('Connected to the database');
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error);
  }
};
