import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { enumUf } from '../../utils/enumUF';

export default async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void | Response> => {
  try {
    const schema = Joi.object({
      name: Joi.string().trim().min(2).required(),
      state: Joi.string()
        .valid(...Object.values(enumUf))
        .required(),
    });

    const { error } = schema.validate(request.body, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return response.status(400).json(error as Joi.ValidationError);
  }
};
