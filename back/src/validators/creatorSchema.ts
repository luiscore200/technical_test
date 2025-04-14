import { z } from 'zod';

export const creatorSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }), // Nombre es requerido
  location: z.string().min(1, { message: 'Location is required' }), // Ubicación es requerida
  instagram: z.string().optional(), // Instagram es opcional
  facebook: z.string().optional(), // Facebook es opcional
  tiktok: z.string().optional(), // TikTok es opcional
  categories: z
    .array(
      z.object({
        id: z.string().min(1, { message: 'Category ID is required' }), // El ID de la categoría es requerido
      })
    )
    .optional(), // Hacer que categories sea completamente opcional
});
