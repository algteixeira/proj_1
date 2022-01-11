import { Router } from "express";
import { CityController } from "../app/controllers/CityController";
import { PersonController } from "../app/controllers/PersonController"; 
import createCityValidation from "../app/validations/city/createCityValidation";
import getAllCityValidation from "../app/validations/city/getAllCityValidation";
import createPersonValidation from "../app/validations/person/createPersonValidation";
import getAllPersonValidation from "../app/validations/person/getAllPersonValidation";
import getPersonByIdValidation from "../app/validations/person/getPersonByIdValidation";
import updatePersonValidation from "../app/validations/person/updatePersonValidation";

const routes = Router();

routes.post("/cidade", createCityValidation ,new CityController().create);
routes.get("/cidade", getAllCityValidation ,new CityController().get);
routes.post("/pessoa", createPersonValidation ,new PersonController().create);
routes.get("/pessoa", getAllPersonValidation ,new PersonController().get);
routes.get("/pessoa/:id", getPersonByIdValidation ,new PersonController().getById);
routes.delete("/pessoa/:id", getPersonByIdValidation, new PersonController().delete);
routes.put("/pessoa/:id", getPersonByIdValidation, updatePersonValidation ,new PersonController().update);

export { routes };