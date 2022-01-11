import { Router } from "express";
import { CreateCityController } from "../app/controllers/CreateCityController";
import { CreatePersonController } from "../app/controllers/CreatePersonController";
import { DeletePersonController } from "../app/controllers/DeletePersonController";
import { GetAllCityController } from "../app/controllers/GetAllCityController";
import { GetAllPersonController } from "../app/controllers/GetAllPersonController";
import { GetPersonByIdController } from "../app/controllers/GetPersonByIdController";
import { UpdatePersonController } from "../app/controllers/UpdatePersonController";
import createCityValidation from "../app/validations/city/createCityValidation";
import getAllCityValidation from "../app/validations/city/getAllCityValidation";

const routes = Router();

routes.post("/cidade", createCityValidation ,new CreateCityController().handle);
routes.get("/cidade", getAllCityValidation ,new GetAllCityController().handle);
routes.post("/pessoa", new CreatePersonController().handle);
routes.get("/pessoa", new GetAllPersonController().handle);
routes.get("/pessoa/:id", new GetPersonByIdController().handle);
routes.delete("/pessoa/:id", new DeletePersonController().handle);
routes.put("/pessoa/:id", new UpdatePersonController().handle);

export { routes };