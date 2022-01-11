import { Router } from "express";
import { CreateCityController } from "../app/controllers/CreateCityController";
import { CreatePersonController } from "../app/controllers/CreatePersonController";
import { GetAllCityController } from "../app/controllers/GetAllCityController";
import { GetAllPersonController } from "../app/controllers/GetAllPersonController";
import { GetPersonByIdController } from "../app/controllers/GetPersonByIdController";

const routes = Router();

routes.post("/cidade", new CreateCityController().handle);
routes.get("/cidade", new GetAllCityController().handle);
routes.post("/pessoa", new CreatePersonController().handle);
routes.get("/pessoa", new GetAllPersonController().handle);
routes.get("/pessoa/:id", new GetPersonByIdController().handle);

export { routes };