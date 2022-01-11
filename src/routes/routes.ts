import { Router } from "express";
import { CityController } from "../app/controllers/CityController";
import { CreatePersonController } from "../app/controllers/CreatePersonController";
import { DeletePersonController } from "../app/controllers/DeletePersonController";
import { GetAllPersonController } from "../app/controllers/GetAllPersonController";
import { GetPersonByIdController } from "../app/controllers/GetPersonByIdController";
import { UpdatePersonController } from "../app/controllers/UpdatePersonController";
import createCityValidation from "../app/validations/city/createCityValidation";
import getAllCityValidation from "../app/validations/city/getAllCityValidation";
import createPersonValidation from "../app/validations/person/createPersonValidation";
import getAllPersonValidation from "../app/validations/person/getAllPersonValidation";
import getPersonByIdValidation from "../app/validations/person/getPersonByIdValidation";
import updatePersonValidation from "../app/validations/person/updatePersonValidation";

const routes = Router();

routes.post("/cidade", createCityValidation ,new CityController().create);
routes.get("/cidade", getAllCityValidation ,new CityController().get);
routes.post("/pessoa", createPersonValidation ,new CreatePersonController().handle);
routes.get("/pessoa", getAllPersonValidation ,new GetAllPersonController().handle);
routes.get("/pessoa/:id", getPersonByIdValidation ,new GetPersonByIdController().handle);
routes.delete("/pessoa/:id", getPersonByIdValidation, new DeletePersonController().handle);
routes.put("/pessoa/:id", getPersonByIdValidation, updatePersonValidation ,new UpdatePersonController().handle);

export { routes };