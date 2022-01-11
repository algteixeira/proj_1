import { Router } from "express";
import { CityController } from "../app/controllers/CityController";
import createCityValidation from "../app/validations/city/createCityValidation";
import getAllCityValidation from "../app/validations/city/getAllCityValidation";

const cityRoutes = Router();

cityRoutes.post("/cidade", createCityValidation ,new CityController().create);
cityRoutes.get("/cidade", getAllCityValidation ,new CityController().get);

export { cityRoutes };