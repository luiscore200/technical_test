import { z } from 'zod'

export const profileSchema = z.object({
  name: z.string().min(2),
  category: z.string(),
  location: z.string(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  tiktok: z.string().optional()
})

export const companySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  profile: profileSchema.optional()
})
