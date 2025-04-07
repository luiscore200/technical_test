import express, { Request, Response } from 'express';
import { prisma } from '../prismaClient';
import { contentRequestSchema } from '../validations/contentRequestSchema';

const router = express.Router();

// Crear un nuevo pedido de contenido
router.post('/create-request', async (req: Request, res: Response) => {
  try {

    const parsed = contentRequestSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.format() });
    }
  
    const { companyId, category, format, duration } = parsed.data;
  

    if (!companyId || !category || !format || !duration) {
      return res.status(400).json({ error: 'Faltan datos' });
    }

    // Cálculo simple de créditos (puedes ajustar esta lógica)
    const creditMultiplier = format === 'Post' ? 1 : format === 'Historia' ? 2 : 3;
    const credits = duration * creditMultiplier;

    // Buscar creadores compatibles
    const matchingCreators = await prisma.creator.findMany({
      where: {
        location: (await prisma.company.findUnique({ where: { id: parseInt(companyId) } }))?.profile?.location,
        categories: {
          some: { name: category }
        }
      }
    });

    // Crear la solicitud
    const request = await prisma.contentRequest.create({
      data: {
        companyId: parseInt(companyId),
        category,
        format,
        duration,
        credits,
        suggestedCCs: {
          create: matchingCreators.map((c:any) => ({
            creatorId: c.id
          }))
        }
      },
      include: {
        suggestedCCs: {
          include: {
            creator: true
          }
        }
      }
    });

    return res.status(201).json(request);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
