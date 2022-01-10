import { Router } from "express";
import { CreateCityController } from "./controllers/CreateCityController";
import { DeleteCityController } from "./controllers/DeleteCityController";
import { GetAllCityController } from "./controllers/GetAllCityController";

const routes = Router();

routes.post("/cidade", new CreateCityController().handle);
routes.get("/cidade", new GetAllCityController().handle)
routes.delete("/cidade/:id", new DeleteCityController().handle);

export { routes };