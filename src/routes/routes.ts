import { Router } from "express";
import { CreateCityController } from "../app/controllers/CreateCityController";
import { GetAllCityController } from "../app/controllers/GetAllCityController";

const routes = Router();

routes.post("/cidade", new CreateCityController().handle);
routes.get("/cidade", new GetAllCityController().handle)

export { routes };