import Joi from 'joi';
import Extension from '@joi/date';
import { NextFunction, Request, Response } from 'express';
import { idRegex } from '../../utils/regex';
import { genders } from '../../utils/genders';

const JoiDate = Joi.extend(Extension);

export default async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void | Response> => {
  try {
    const schema = Joi.object({
      name: Joi.string().trim().min(3).required(),
      sex: Joi.string()
        .valid(...Object.values(genders))
        .required(),
      birthday: JoiDate.date().format('DD/MM/YYYY').required(),
      city_id: Joi.string().regex(idRegex()).required(),
    });

    const { error } = schema.validate(request.body, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return response.status(400).json(error as Joi.ValidationError);
  }
};
