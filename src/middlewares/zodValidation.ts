import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export const validateWithZod = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(422).json({
        errors: result.error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message
        }))
      });
    }

    req.body = result.data; // Datos validados
    next();
  };
};
