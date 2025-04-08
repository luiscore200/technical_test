import express, { Request, Response } from 'express';
import { prisma } from '../prismaClient';
import { creatorSchema } from '../validators/creatorSchema';

const router = express.Router();

// Registrar un creador de contenido con sus categorías
router.post('/register/creator', async (req: Request, res: Response) => {
  try {

    const parsed = creatorSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.format() });
    }

    const { name, location, categoryIds } = parsed.data;

    if (!name || !location || !Array.isArray(categoryIds)) {
      return res.status(400).json({ error: 'Faltan datos o el formato es incorrecto' });
    }

    const creator = await prisma.creator.create({
      data: {
        name,
        location,
        categories: {
          connect: categoryIds.map((id: string) => ({ id }))
        }
      },
      include: {
        categories: true
      }
    });

    return res.status(201).json(creator);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
