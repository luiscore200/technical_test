import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  category: z.string().min(1, "La categoría es obligatoria"),
  location: z.string().min(1, "La ubicación es obligatoria"),
  instagram: z.string().url("Instagram debe ser una URL válida").optional(),
  facebook: z.string().url("Facebook debe ser una URL válida").optional(),
  tiktok: z.string().url("TikTok debe ser una URL válida").optional(),
});

export const companySchema = z.object({
  email: z.string().email("Debe ser un correo electrónico válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  profile: profileSchema.optional(),
});
