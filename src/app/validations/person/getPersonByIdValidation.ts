import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { idRegex } from '../../utils/regex';

export default async (request: Request, response: Response, next: NextFunction): Promise<void | Response> => {
  try {
    const schema = Joi.object({
      id: Joi.string().regex(idRegex()).required()
    });

    const { error } = schema.validate(request.params, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return response.status(400).json((error as Joi.ValidationError));
  }
};