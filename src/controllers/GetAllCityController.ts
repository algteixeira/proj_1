import {Request, Response} from "express";
import { GetAllCityService } from "../services/GetAllCityService";

export class GetAllCityController {
    async handle(request:Request, response:Response) {
        const service = new GetAllCityService();

        const categories = await service.execute();

        return response.json(categories);
    }
}