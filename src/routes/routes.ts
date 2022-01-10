import { Router } from "express";
import { CreateCityController } from "../app/controller/CreateCityController";

const routes = Router();

routes.post("/cidade", new CreateCityController().handle);

export { routes };