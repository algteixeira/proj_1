import { Router } from "express";
import { CreateCityController } from "../app/controllers/CreateCityController";
import { CreatePersonController } from "../app/controllers/CreatePersonController";
import { GetAllCityController } from "../app/controllers/GetAllCityController";

const routes = Router();

routes.post("/cidade", new CreateCityController().handle);
routes.get("/cidade", new GetAllCityController().handle);
routes.post("/pessoa", new CreatePersonController().handle);

export { routes };