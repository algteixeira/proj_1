import { Router } from "express";
import { cityRoutes } from "./city.router";
import { personRoutes } from "./person.router";

const routes = Router();

routes.use(cityRoutes);
routes.use(personRoutes);

export { routes };