import express, { Request, Response } from 'express';
import { prisma } from '../prismaClient';
import { companySchema } from '../validations/companySchema';

const router = express.Router();

router.post('/register/company', async (req: Request, res: Response) => {
  try {
    const parsed = companySchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.format() });
    }

    const { email, password, profile } = parsed.data;

    const company = await prisma.company.create({
      data: {
        email,
        password,
        profile: profile ? { create: profile } : undefined,
      },
      include: { profile: true },
    });

    return res.status(201).json(company);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
