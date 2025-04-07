import { z } from 'zod';

export const creatorSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  location: z.string().min(1, 'La ubicación es requerida'),
  categoryIds: z.array(z.string().uuid()).min(1, 'Debes seleccionar al menos una categoría'),
});
