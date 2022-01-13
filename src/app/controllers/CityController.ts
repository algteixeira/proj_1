import { Request, Response } from "express";
import { CityService } from "../services/CityService";

const cityService = new CityService();

export class CityController {
    async create (request: Request, response: Response) {
        try {
            const result = await cityService.create(request.body);
            return response.status(201).json(result);
        } catch (error) {
            return response.status(error.statusCode).json(error.description);
        }
    }

    async get (request: Request, response: Response) {
        const result = await cityService.get(request.query);
        return response.status(200).json(result);
    }
}