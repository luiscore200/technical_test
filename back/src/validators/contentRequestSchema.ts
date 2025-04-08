import { z } from 'zod';

export const contentRequestSchema = z.object({
  companyId: z.string().regex(/^\d+$/, 'Debe ser un ID numérico'),
  category: z.string().min(1, 'La categoría es requerida'),
  format: z.enum(['Post', 'Historia', 'Reel'], {
    errorMap: () => ({ message: 'Formato inválido' })
  }),
  duration: z.number().min(1, 'La duración debe ser al menos 1'),
});
