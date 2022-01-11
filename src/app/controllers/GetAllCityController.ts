import {Request, Response} from "express";
import { GetAllCityService } from "../services/GetAllCityService";

export class GetAllCityController {
    async handle(request:Request, response:Response) {
        const service = new GetAllCityService();

        const cities = await service.execute(request.query);

        return response.json(cities);
    }
}