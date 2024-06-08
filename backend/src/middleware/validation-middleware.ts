import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

enum HttpStatusCode {
    BAD_REQUEST = 400,
    INTERNAL_SERVER_ERROR = 500
}

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
      const errorMessages = error.errors.map((issue: any) => ({
            message: `${issue.path.join('.')} is ${issue.message}`,
        }))
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'Invalid data', details: errorMessages });
      } else {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
      }
    }
  };
}