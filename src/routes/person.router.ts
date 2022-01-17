import { Router } from 'express';
import { PersonController } from '../app/controllers/PersonController';
import createPersonValidation from '../app/validations/person/createPersonValidation';
import getAllPersonValidation from '../app/validations/person/getAllPersonValidation';
import getPersonByIdValidation from '../app/validations/person/getPersonByIdValidation';
import updatePersonValidation from '../app/validations/person/updatePersonValidation';

const personRoutes = Router();

personRoutes.post(
  '/pessoa',
  createPersonValidation,
  new PersonController().create,
);
personRoutes.get('/pessoa', getAllPersonValidation, new PersonController().get);
personRoutes.get(
  '/pessoa/:id',
  getPersonByIdValidation,
  new PersonController().getById,
);
personRoutes.delete(
  '/pessoa/:id',
  getPersonByIdValidation,
  new PersonController().delete,
);
personRoutes.put(
  '/pessoa/:id',
  getPersonByIdValidation,
  updatePersonValidation,
  new PersonController().update,
);

export { personRoutes };
