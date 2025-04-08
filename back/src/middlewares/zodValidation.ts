import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export const validateWithZod = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // Devolver error en la arquitectura correcta
      return res.json({
        success: false,
        message: 'Validation failed.',
        data: result.error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message
        }))
      });
    }

    req.body = result.data; // Datos validados
    next();
  };
};
