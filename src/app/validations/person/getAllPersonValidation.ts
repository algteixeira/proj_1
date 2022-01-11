import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

export default async (request: Request, response: Response, next: NextFunction): Promise<void | Response> => {
  try {
    const schema = Joi.object({
      name: Joi.string().trim().min(3),
      page: Joi.number().min(1),
      limit: Joi.number().min(1)      
    });

    const { error } = schema.validate(request.query, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return response.status(400).json((error as Joi.ValidationError));
  }
};