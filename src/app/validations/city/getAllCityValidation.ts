import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

export default async (request: Request, response: Response, next: NextFunction): Promise<void | Response> => {
  try {
    const schema = Joi.object({
      name: Joi.string().trim().min(2),
      state: Joi.string().valid('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES',
      'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS',
      'RO', 'RR', 'SP', 'SC', 'SE', 'TO')
    });

    const { error } = schema.validate(request.query, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return response.status(400).json((error as Joi.ValidationError));
  }
};